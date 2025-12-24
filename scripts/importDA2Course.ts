import { PrismaClient } from '@prisma/client';
import * as fs from 'fs';
import * as path from 'path';

const prisma = new PrismaClient();

// Convert Google Drive share link to thumbnail/direct image URL
// Using thumbnail API which is more reliable for embedding
function convertDriveUrl(url: string): string {
  const fileIdMatch = url.match(/\/d\/([a-zA-Z0-9_-]+)/);
  if (fileIdMatch) {
    // Use thumbnail API for better reliability (sz=w2000 for high quality)
    return `https://drive.google.com/thumbnail?id=${fileIdMatch[1]}&sz=w2000`;
  }
  return url;
}

interface ParsedClass {
  title: string;
  description?: string;
  contentType: 'video' | 'text' | 'contest';
  videoUrl?: string;
  textContent?: string;
  contestUrl?: string;
  contestQuestions?: number;
  contestSyllabus?: string[];
  duration: number;
  order: number;
}

interface ParsedTopic {
  title: string;
  order: number;
  classes: ParsedClass[];
}

interface ParsedModule {
  title: string;
  description: string;
  order: number;
  learningOutcomes: string[];
  topics: ParsedTopic[];
}

interface ParsedCourse {
  type: string;
  role?: string;
  skill?: string;
  companyName?: string;
  title: string;
  description: string;
  modules: ParsedModule[];
}

function parseCourseContent(content: string): ParsedCourse {
  const lines = content.split('\n');

  const course: ParsedCourse = {
    type: 'role-specific',
    title: '',
    description: '',
    modules: []
  };

  let currentModule: ParsedModule | null = null;
  let currentTopic: ParsedTopic | null = null;
  let currentClass: ParsedClass | null = null;
  let collectingTextContent = false;
  let textContentBuffer: string[] = [];
  let collectingLearningOutcomes = false;
  let learningOutcomesBuffer: string[] = [];
  let collectingContestSyllabus = false;
  let contestSyllabusBuffer: string[] = [];

  const saveCurrentClass = () => {
    if (currentClass && currentTopic) {
      if (collectingTextContent && textContentBuffer.length > 0) {
        currentClass.textContent = textContentBuffer.join('\n').trim();
        textContentBuffer = [];
        collectingTextContent = false;
      }
      if (collectingContestSyllabus && contestSyllabusBuffer.length > 0) {
        currentClass.contestSyllabus = [...contestSyllabusBuffer];
        contestSyllabusBuffer = [];
        collectingContestSyllabus = false;
      }
      currentTopic.classes.push(currentClass);
      currentClass = null;
    }
  };

  const saveCurrentTopic = () => {
    saveCurrentClass();
    if (currentTopic && currentModule) {
      if (currentModule.learningOutcomes.length === 0 && learningOutcomesBuffer.length > 0) {
        currentModule.learningOutcomes = [...learningOutcomesBuffer];
        learningOutcomesBuffer = [];
      }
      currentModule.topics.push(currentTopic);
      currentTopic = null;
    }
  };

  const saveCurrentModule = () => {
    saveCurrentTopic();
    if (currentModule) {
      course.modules.push(currentModule);
      currentModule = null;
    }
  };

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    const originalLine = lines[i];

    // Parse course metadata
    if (line.startsWith('Course Type:')) {
      course.type = line.replace('Course Type:', '').trim();
    } else if (line.startsWith('Role:')) {
      course.role = line.replace('Role:', '').trim();
    } else if (line.startsWith('Skill:')) {
      course.skill = line.replace('Skill:', '').trim();
    } else if (line.startsWith('Company:')) {
      course.companyName = line.replace('Company:', '').trim();
    } else if (line.startsWith('Course Title:')) {
      course.title = line.replace('Course Title:', '').trim();
    } else if (line.startsWith('Course Description:')) {
      course.description = line.replace('Course Description:', '').trim();
    }

    // Parse modules
    else if (line.match(/^Module \d+:$/)) {
      saveCurrentModule();

      const moduleNumber = parseInt(line.match(/\d+/)![0]);
      currentModule = {
        title: '',
        description: '',
        order: moduleNumber,
        learningOutcomes: [],
        topics: []
      };
      collectingLearningOutcomes = false;
      collectingTextContent = false;
    }

    // Module properties
    else if (line.startsWith('Title:') && currentModule && !currentTopic && !currentClass) {
      currentModule.title = line.replace('Title:', '').trim();
    } else if (line.startsWith('Description:') && currentModule && !currentTopic && !currentClass) {
      currentModule.description = line.replace('Description:', '').trim();
    } else if (line.startsWith('Learning Outcomes:')) {
      collectingLearningOutcomes = true;
      learningOutcomesBuffer = [];
      collectingTextContent = false;
    } else if (collectingLearningOutcomes && line && !line.startsWith('Topic') && !line.startsWith('Module') && !line.startsWith('Class')) {
      learningOutcomesBuffer.push(line);
    }

    // Parse topics
    else if (line.match(/^Topic \d+\.\d+:$/)) {
      saveCurrentTopic();

      const topicMatch = line.match(/Topic (\d+)\.(\d+):/);
      const topicNumber = topicMatch ? parseInt(topicMatch[2]) : 1;
      currentTopic = {
        title: '',
        order: topicNumber,
        classes: []
      };
      collectingLearningOutcomes = false;
      collectingTextContent = false;
    }

    // Topic title
    else if (line.startsWith('Title:') && currentTopic && !currentClass) {
      currentTopic.title = line.replace('Title:', '').trim();
    }

    // Parse classes
    else if (line.match(/^Class \d+\.\d+\.\d+:$/)) {
      saveCurrentClass();

      const classMatch = line.match(/Class (\d+)\.(\d+)\.(\d+):/);
      const classNumber = classMatch ? parseInt(classMatch[3]) : 1;
      currentClass = {
        title: '',
        contentType: 'text',  // Default to text for this course
        duration: 300,
        order: classNumber
      };
      collectingTextContent = false;
    }

    // Class properties
    else if (line.startsWith('Title:') && currentClass) {
      currentClass.title = line.replace('Title:', '').trim();
    } else if (line.startsWith('Description:') && currentClass) {
      currentClass.description = line.replace('Description:', '').trim();
    } else if (line.startsWith('Content Type:')) {
      const typeStr = line.replace('Content Type:', '').trim().toLowerCase();
      if (currentClass) {
        if (typeStr === 'video') currentClass.contentType = 'video';
        else if (typeStr === 'text') currentClass.contentType = 'text';
        else if (typeStr === 'contest' || typeStr === 'quiz') currentClass.contentType = 'contest';
      }
      collectingTextContent = false;
    } else if (line.startsWith('Duration:')) {
      const duration = parseInt(line.replace('Duration:', '').trim());
      if (currentClass && !isNaN(duration)) {
        currentClass.duration = duration;
      }
      collectingTextContent = false;
    } else if (line.startsWith('Video URL:')) {
      if (currentClass) {
        currentClass.videoUrl = line.replace('Video URL:', '').trim();
      }
      collectingTextContent = false;
    } else if (line.startsWith('Contest URL:')) {
      if (currentClass) {
        currentClass.contestUrl = line.replace('Contest URL:', '').trim();
      }
      collectingTextContent = false;
      collectingContestSyllabus = false;
    } else if (line.startsWith('Contest Questions:')) {
      const questionsStr = line.replace('Contest Questions:', '').trim();
      const questionsNum = parseInt(questionsStr);
      if (currentClass && !isNaN(questionsNum)) {
        currentClass.contestQuestions = questionsNum;
      }
      collectingTextContent = false;
      collectingContestSyllabus = false;
    } else if (line.match(/^Contest Syllabus\s*:?$/i)) {
      collectingContestSyllabus = true;
      contestSyllabusBuffer = [];
      collectingTextContent = false;
    } else if (collectingContestSyllabus && currentClass) {
      // Stop collecting if we hit a new section
      if (line.startsWith('Class ') || line.startsWith('Topic ') || line.startsWith('Module ') || line.startsWith('Text Content')) {
        currentClass.contestSyllabus = [...contestSyllabusBuffer];
        contestSyllabusBuffer = [];
        collectingContestSyllabus = false;
        i--; // Reprocess this line
      } else if (line.trim()) {
        // Strip leading "- " from syllabus items
        const cleanedLine = line.trim().replace(/^-\s*/, '');
        contestSyllabusBuffer.push(cleanedLine);
      }
    } else if (line.match(/^Text Content\s*:?$/i)) {
      collectingTextContent = true;
      textContentBuffer = [];
    } else if (line.match(/^Image url\s*:/i) || line.match(/^Image URL\s*:/i)) {
      // Parse image URL and add to text content as markdown image
      const imageUrl = line.replace(/^Image [uU][rR][lL]\s*:/i, '').trim();
      if (imageUrl && collectingTextContent) {
        const directUrl = convertDriveUrl(imageUrl);
        textContentBuffer.push(`\n![Image](${directUrl})\n`);
      }
    } else if (collectingTextContent && currentClass) {
      // Stop collecting if we hit a new section
      if (line.startsWith('Class ') || line.startsWith('Topic ') || line.startsWith('Module ')) {
        currentClass.textContent = textContentBuffer.join('\n').trim();
        textContentBuffer = [];
        collectingTextContent = false;
        i--; // Reprocess this line
      } else {
        // Add the line (preserve original spacing)
        textContentBuffer.push(originalLine);
      }
    }
  }

  // Save last items
  saveCurrentModule();

  return course;
}

async function deleteOldCourseContent(courseId: string) {
  console.log(`Deleting old course content for: ${courseId}`);

  try {
    // Delete all modules, topics, and classes (cascade will handle it)
    await prisma.module.deleteMany({
      where: { courseId }
    });
    console.log('Old course content deleted successfully');
  } catch (e) {
    console.log('Error deleting old content:', e);
  }
}

async function seedCourse(parsedCourse: ParsedCourse, courseId: string) {
  console.log('Starting course seeding...');
  console.log(`Course: ${parsedCourse.title}`);

  // Check if course exists
  const existingCourse = await prisma.course.findUnique({
    where: { id: courseId }
  });

  let course;

  if (existingCourse) {
    // Update existing course
    console.log(`Updating existing course: ${courseId}`);

    course = await prisma.course.update({
      where: { id: courseId },
      data: {
        title: parsedCourse.title,
        description: parsedCourse.description,
        type: parsedCourse.type,
        role: parsedCourse.role,
        skill: parsedCourse.skill,
        companyName: parsedCourse.companyName,
      }
    });

    console.log(`Updated course: ${course.id}`);

    // Delete old modules, topics, and classes
    await deleteOldCourseContent(course.id);
  } else {
    // Create new course with specified ID
    console.log(`Creating new course with ID: ${courseId}`);

    course = await prisma.course.create({
      data: {
        id: courseId,
        title: parsedCourse.title,
        description: parsedCourse.description,
        type: parsedCourse.type,
        role: parsedCourse.role,
        skill: parsedCourse.skill,
        companyName: parsedCourse.companyName,
      }
    });

    console.log(`Created new course: ${course.id}`);
  }

  let totalClasses = 0;
  let classesWithContent = 0;
  let classesWithImages = 0;
  let contestClasses = 0;

  // Create modules
  for (const moduleData of parsedCourse.modules) {
    console.log(`  Creating module ${moduleData.order}: ${moduleData.title}`);

    const module = await prisma.module.create({
      data: {
        courseId: course.id,
        title: moduleData.title,
        description: moduleData.description,
        order: moduleData.order,
        learningOutcomes: moduleData.learningOutcomes,
      }
    });

    // Create topics
    for (const topicData of moduleData.topics) {
      console.log(`    Creating topic ${topicData.order}: ${topicData.title}`);

      const topic = await prisma.topic.create({
        data: {
          courseId: course.id,
          moduleId: module.id,
          title: topicData.title,
          order: topicData.order,
        }
      });

      // Create classes
      for (const classData of topicData.classes) {
        totalClasses++;
        const hasContent = !!classData.textContent && classData.textContent.length > 50;
        const hasImages = !!classData.textContent && classData.textContent.includes('![Image]');
        const isContest = classData.contentType === 'contest';

        if (hasContent) classesWithContent++;
        if (hasImages) classesWithImages++;
        if (isContest) contestClasses++;

        const contentIndicator = hasContent ? '[content]' : '[no content]';
        const imageIndicator = hasImages ? '[images] ' : '';
        const contestIndicator = isContest ? `[contest: ${classData.contestQuestions || 0}Q] ` : '';
        console.log(`      ${contentIndicator} ${imageIndicator}${contestIndicator}Creating class ${classData.order}: ${classData.title}`);

        await prisma.class.create({
          data: {
            topicId: topic.id,
            title: classData.title,
            description: classData.description,
            contentType: classData.contentType,
            videoUrl: classData.videoUrl,
            textContent: classData.textContent,
            contestUrl: classData.contestUrl,
            contestQuestions: classData.contestQuestions,
            contestSyllabus: classData.contestSyllabus || [],
            duration: classData.duration,
            order: classData.order,
          }
        });
      }
    }
  }

  console.log('\nCourse seeding completed successfully!');
  console.log(`Course ID: ${course.id}`);
  console.log(`Statistics:`);
  console.log(`   Total Modules: ${parsedCourse.modules.length}`);
  console.log(`   Total Topics: ${parsedCourse.modules.reduce((sum, m) => sum + m.topics.length, 0)}`);
  console.log(`   Total Classes: ${totalClasses}`);
  console.log(`   Classes with Content: ${classesWithContent} (${Math.round(classesWithContent/totalClasses*100)}%)`);
  console.log(`   Classes with Images: ${classesWithImages}`);
  console.log(`   Contest Classes: ${contestClasses}`);

  return course;
}

async function main() {
  try {
    // Use DA2.md from Course_Content folder
    const courseFilePath = path.join(__dirname, '..', 'Course_Content', 'DA2.md');

    console.log(`Reading course file: ${courseFilePath}`);
    const parsedCourse = parseCourseContent(fs.readFileSync(courseFilePath, 'utf-8'));

    console.log(`\nParsed Course Summary:`);
    console.log(`   Title: ${parsedCourse.title}`);
    console.log(`   Type: ${parsedCourse.type}`);
    console.log(`   Role: ${parsedCourse.role}`);
    console.log(`   Modules: ${parsedCourse.modules.length}`);
    console.log(`   Total Topics: ${parsedCourse.modules.reduce((sum, m) => sum + m.topics.length, 0)}`);
    console.log(`   Total Classes: ${parsedCourse.modules.reduce((sum, m) =>
      sum + m.topics.reduce((tSum, t) => tSum + t.classes.length, 0), 0)}`);
    console.log('');

    // Course ID for DA2 course
    const COURSE_ID = 'DA001';

    await seedCourse(parsedCourse, COURSE_ID);

  } catch (error) {
    console.error('Error seeding course:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

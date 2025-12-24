import { PrismaClient } from '@prisma/client';
import * as fs from 'fs';
import * as path from 'path';

const prisma = new PrismaClient();

/**
 * INCREMENTAL UPDATE SCRIPT FOR FULLSTACK COURSE
 * Updates content WITHOUT losing user progress.
 */

function convertDriveUrl(url: string): string {
  const fileIdMatch = url.match(/\/d\/([a-zA-Z0-9_-]+)/);
  if (fileIdMatch) {
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
  let collectingDescription = false;
  let descriptionBuffer: string[] = [];

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
      currentModule.topics.push(currentTopic);
      currentTopic = null;
    }
  };

  const saveCurrentModule = () => {
    saveCurrentTopic();
    if (currentModule) {
      if (collectingLearningOutcomes && learningOutcomesBuffer.length > 0) {
        currentModule.learningOutcomes = learningOutcomesBuffer.filter(l => l.trim());
        learningOutcomesBuffer = [];
        collectingLearningOutcomes = false;
      }
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
      const desc = line.replace('Course Description:', '').trim();
      if (desc) course.description = desc;
      collectingDescription = true;
      descriptionBuffer = [];
    } else if (collectingDescription && !line.startsWith('Module') && line && !line.startsWith('Title:')) {
      descriptionBuffer.push(line);
    } else if (collectingDescription && (line.startsWith('Module') || line.startsWith('Title:'))) {
      if (descriptionBuffer.length > 0 && !course.description) {
        course.description = descriptionBuffer.join(' ').trim();
      }
      collectingDescription = false;
    }

    // Parse modules - handle both "Module 1:" and "Module 1" formats
    if (line.match(/^Module \d+:?$/)) {
      saveCurrentModule();
      collectingDescription = false;

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
    } else if (collectingLearningOutcomes && currentModule && !currentTopic) {
      if (line.startsWith('Topic') || line.startsWith('Module') || line.startsWith('Class')) {
        currentModule.learningOutcomes = learningOutcomesBuffer.filter(l => l.trim());
        learningOutcomesBuffer = [];
        collectingLearningOutcomes = false;
        i--;
        continue;
      } else if (line) {
        learningOutcomesBuffer.push(line);
      }
    }

    // Parse topics - handle both "Topic 1.1:" and "Topic 1.1" formats
    else if (line.match(/^Topic \d+\.\d+:?$/)) {
      saveCurrentTopic();
      if (collectingLearningOutcomes && currentModule) {
        currentModule.learningOutcomes = learningOutcomesBuffer.filter(l => l.trim());
        learningOutcomesBuffer = [];
        collectingLearningOutcomes = false;
      }

      const topicMatch = line.match(/Topic (\d+)\.(\d+)/);
      const topicNumber = topicMatch ? parseInt(topicMatch[2]) : 1;
      currentTopic = {
        title: '',
        order: topicNumber,
        classes: []
      };
      collectingTextContent = false;
    }

    // Topic title
    else if (line.startsWith('Title:') && currentTopic && !currentClass) {
      currentTopic.title = line.replace('Title:', '').trim();
    }

    // Parse classes - handle both "Class 1.1.1:" and "Class 1.1.1" formats
    else if (line.match(/^Class \d+\.\d+\.\d+:?$/)) {
      saveCurrentClass();

      const classMatch = line.match(/Class (\d+)\.(\d+)\.(\d+)/);
      const classNumber = classMatch ? parseInt(classMatch[3]) : 1;
      currentClass = {
        title: '',
        contentType: 'text',
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
    } else if (line.startsWith('Contest Questions:')) {
      const questionsNum = parseInt(line.replace('Contest Questions:', '').trim());
      if (currentClass && !isNaN(questionsNum)) {
        currentClass.contestQuestions = questionsNum;
      }
      collectingTextContent = false;
    } else if (line.match(/^Contest Syllabus\s*:?$/i)) {
      collectingContestSyllabus = true;
      contestSyllabusBuffer = [];
      collectingTextContent = false;
    } else if (collectingContestSyllabus && currentClass) {
      if (line.startsWith('Class ') || line.startsWith('Topic ') || line.startsWith('Module ') || line.startsWith('Text Content')) {
        currentClass.contestSyllabus = [...contestSyllabusBuffer];
        contestSyllabusBuffer = [];
        collectingContestSyllabus = false;
        i--;
      } else if (line.trim()) {
        const cleanedLine = line.trim().replace(/^-\s*/, '');
        contestSyllabusBuffer.push(cleanedLine);
      }
    } else if (line.match(/^Text Content\s*:?$/i)) {
      collectingTextContent = true;
      textContentBuffer = [];
    } else if (line.match(/^Image [uU][rR][lL]\s*:/i)) {
      const imageUrl = line.replace(/^Image [uU][rR][lL]\s*:/i, '').trim();
      if (imageUrl && collectingTextContent) {
        const directUrl = convertDriveUrl(imageUrl);
        textContentBuffer.push(`\n![Image](${directUrl})\n`);
      }
    } else if (collectingTextContent && currentClass) {
      if (line.startsWith('Class ') || line.startsWith('Topic ') || line.startsWith('Module ')) {
        currentClass.textContent = textContentBuffer.join('\n').trim();
        textContentBuffer = [];
        collectingTextContent = false;
        i--;
      } else {
        textContentBuffer.push(originalLine);
      }
    }
  }

  saveCurrentModule();

  return course;
}

async function updateCourseIncremental(parsedCourse: ParsedCourse, courseId: string) {
  console.log('Starting INCREMENTAL course update...');
  console.log(`Course: ${parsedCourse.title}`);
  console.log('User progress will be PRESERVED.\n');

  let modulesUpdated = 0, modulesCreated = 0;
  let topicsUpdated = 0, topicsCreated = 0;
  let classesUpdated = 0, classesCreated = 0;

  let course = await prisma.course.findUnique({
    where: { id: courseId },
    include: {
      modules: {
        include: {
          topics: {
            include: {
              classes: true
            }
          }
        }
      }
    }
  });

  if (!course) {
    console.error(`Course not found: ${courseId}`);
    return;
  }

  // Update course metadata
  await prisma.course.update({
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
  console.log(`Updated course metadata: ${courseId}`);

  const existingModulesMap = new Map(
    course.modules.map(m => [m.order, m])
  );

  for (const moduleData of parsedCourse.modules) {
    const existingModule = existingModulesMap.get(moduleData.order);

    let moduleRecord;
    if (existingModule) {
      moduleRecord = await prisma.module.update({
        where: { id: existingModule.id },
        data: {
          title: moduleData.title,
          description: moduleData.description,
          learningOutcomes: moduleData.learningOutcomes,
        }
      });
      modulesUpdated++;
      console.log(`  ✓ Updated module ${moduleData.order}: ${moduleData.title}`);
    } else {
      moduleRecord = await prisma.module.create({
        data: {
          courseId: course.id,
          title: moduleData.title,
          description: moduleData.description,
          order: moduleData.order,
          learningOutcomes: moduleData.learningOutcomes,
        }
      });
      modulesCreated++;
      console.log(`  + Created module ${moduleData.order}: ${moduleData.title}`);
    }

    const existingTopicsMap = new Map(
      (existingModule?.topics || []).map(t => [t.order, t])
    );

    for (const topicData of moduleData.topics) {
      const existingTopic = existingTopicsMap.get(topicData.order);

      let topicRecord;
      if (existingTopic) {
        topicRecord = await prisma.topic.update({
          where: { id: existingTopic.id },
          data: {
            title: topicData.title,
          }
        });
        topicsUpdated++;
        console.log(`    ✓ Updated topic ${topicData.order}: ${topicData.title}`);
      } else {
        topicRecord = await prisma.topic.create({
          data: {
            courseId: course.id,
            moduleId: moduleRecord.id,
            title: topicData.title,
            order: topicData.order,
          }
        });
        topicsCreated++;
        console.log(`    + Created topic ${topicData.order}: ${topicData.title}`);
      }

      const existingClassesMap = new Map(
        (existingTopic?.classes || []).map(c => [c.order, c])
      );

      for (const classData of topicData.classes) {
        const existingClass = existingClassesMap.get(classData.order);

        if (existingClass) {
          await prisma.class.update({
            where: { id: existingClass.id },
            data: {
              title: classData.title,
              description: classData.description,
              contentType: classData.contentType,
              videoUrl: classData.videoUrl,
              textContent: classData.textContent,
              contestUrl: classData.contestUrl,
              contestQuestions: classData.contestQuestions,
              contestSyllabus: classData.contestSyllabus || [],
              duration: classData.duration,
            }
          });
          classesUpdated++;
          console.log(`      ✓ Updated class ${classData.order}: ${classData.title}`);
        } else {
          await prisma.class.create({
            data: {
              topicId: topicRecord.id,
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
          classesCreated++;
          console.log(`      + Created class ${classData.order}: ${classData.title}`);
        }
      }
    }
  }

  console.log('\n========================================');
  console.log('INCREMENTAL UPDATE COMPLETED!');
  console.log('========================================');
  console.log(`Course ID: ${course.id}`);
  console.log('\nSummary:');
  console.log(`  Modules: ${modulesUpdated} updated, ${modulesCreated} created`);
  console.log(`  Topics:  ${topicsUpdated} updated, ${topicsCreated} created`);
  console.log(`  Classes: ${classesUpdated} updated, ${classesCreated} created`);
  console.log('\n✅ User progress has been PRESERVED!');

  return course;
}

async function main() {
  try {
    const courseFilePath = path.join(__dirname, '..', 'Course_Content', 'Fullstack_Interview_Mastery.md');
    const COURSE_ID = 'cmj9ly4mq0000sgsrk46ql04i';

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

    await updateCourseIncremental(parsedCourse, COURSE_ID);

  } catch (error) {
    console.error('Error updating course:', error);
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

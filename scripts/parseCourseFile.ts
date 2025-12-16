import { PrismaClient } from '@prisma/client';
import * as fs from 'fs';
import * as path from 'path';

const prisma = new PrismaClient();

interface ParsedClass {
  title: string;
  description?: string;
  contentType: 'video' | 'text' | 'contest';
  videoUrl?: string;
  textContent?: string;
  contestUrl?: string;
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

function parseCourseFile(filePath: string): ParsedCourse {
  const content = fs.readFileSync(filePath, 'utf-8');
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

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();

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
      // Save previous module if exists
      if (currentModule && currentTopic) {
        if (currentClass) {
          currentTopic.classes.push(currentClass);
          currentClass = null;
        }
        currentModule.topics.push(currentTopic);
        currentTopic = null;
      }
      if (currentModule) {
        course.modules.push(currentModule);
      }

      const moduleNumber = parseInt(line.match(/\d+/)![0]);
      currentModule = {
        title: '',
        description: '',
        order: moduleNumber,
        learningOutcomes: [],
        topics: []
      };
      collectingLearningOutcomes = false;
    }

    // Module properties
    else if (line.startsWith('Title:') && currentModule && !currentTopic && !currentClass) {
      currentModule.title = line.replace('Title:', '').trim();
    } else if (line.startsWith('Description:') && currentModule && !currentTopic && !currentClass) {
      currentModule.description = line.replace('Description:', '').trim();
    } else if (line.startsWith('Learning Outcomes:')) {
      collectingLearningOutcomes = true;
      learningOutcomesBuffer = [];
    } else if (collectingLearningOutcomes && line && !line.startsWith('Topic') && !line.startsWith('Module')) {
      learningOutcomesBuffer.push(line);
    }

    // Parse topics
    else if (line.match(/^Topic \d+\.\d+:$/)) {
      // Save previous topic and class
      if (currentTopic && currentClass) {
        currentTopic.classes.push(currentClass);
        currentClass = null;
      }
      if (currentTopic && currentModule) {
        if (currentModule.learningOutcomes.length === 0 && learningOutcomesBuffer.length > 0) {
          currentModule.learningOutcomes = [...learningOutcomesBuffer];
          learningOutcomesBuffer = [];
        }
        currentModule.topics.push(currentTopic);
      }

      const topicMatch = line.match(/Topic (\d+)\.(\d+):/);
      const topicNumber = topicMatch ? parseInt(topicMatch[2]) : 1;
      currentTopic = {
        title: '',
        order: topicNumber,
        classes: []
      };
      collectingLearningOutcomes = false;
    }

    // Topic title
    else if (line.startsWith('Title:') && currentTopic && !currentClass) {
      currentTopic.title = line.replace('Title:', '').trim();
    }

    // Parse classes
    else if (line.match(/^Class \d+\.\d+\.\d+:$/)) {
      // Save previous class
      if (currentClass && currentTopic) {
        if (collectingTextContent && textContentBuffer.length > 0) {
          currentClass.textContent = textContentBuffer.join('\n').trim();
          textContentBuffer = [];
          collectingTextContent = false;
        }
        currentTopic.classes.push(currentClass);
      }

      const classMatch = line.match(/Class (\d+)\.(\d+)\.(\d+):/);
      const classNumber = classMatch ? parseInt(classMatch[3]) : 1;
      currentClass = {
        title: '',
        contentType: 'video',
        duration: 300,
        order: classNumber
      };
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
    } else if (line.startsWith('Duration:')) {
      const duration = parseInt(line.replace('Duration:', '').trim());
      if (currentClass && !isNaN(duration)) {
        currentClass.duration = duration;
      }
    } else if (line.startsWith('Video URL:')) {
      if (currentClass) {
        currentClass.videoUrl = line.replace('Video URL:', '').trim();
      }
    } else if (line.startsWith('Contest URL:')) {
      if (currentClass) {
        currentClass.contestUrl = line.replace('Contest URL:', '').trim();
      }
    } else if (line.startsWith('Text Content:')) {
      collectingTextContent = true;
      textContentBuffer = [];
    } else if (collectingTextContent && currentClass) {
      // Stop collecting if we hit a new section
      if (line.startsWith('Class ') || line.startsWith('Topic ') || line.startsWith('Module ')) {
        currentClass.textContent = textContentBuffer.join('\n').trim();
        textContentBuffer = [];
        collectingTextContent = false;
        i--; // Reprocess this line
      } else {
        textContentBuffer.push(lines[i]); // Use original line with spacing
      }
    }
  }

  // Save last items
  if (currentClass && currentTopic) {
    if (collectingTextContent && textContentBuffer.length > 0) {
      currentClass.textContent = textContentBuffer.join('\n').trim();
    }
    currentTopic.classes.push(currentClass);
  }
  if (currentTopic && currentModule) {
    currentModule.topics.push(currentTopic);
  }
  if (currentModule) {
    course.modules.push(currentModule);
  }

  return course;
}

async function seedCourse(parsedCourse: ParsedCourse) {
  console.log('🌱 Starting course seeding...');
  console.log(`📚 Course: ${parsedCourse.title}`);

  // Create course
  const course = await prisma.course.create({
    data: {
      title: parsedCourse.title,
      description: parsedCourse.description,
      type: parsedCourse.type,
      role: parsedCourse.role,
      skill: parsedCourse.skill,
      companyName: parsedCourse.companyName,
    }
  });

  console.log(`✅ Created course: ${course.id}`);

  // Create modules
  for (const moduleData of parsedCourse.modules) {
    console.log(`  📦 Creating module ${moduleData.order}: ${moduleData.title}`);

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
      console.log(`    📂 Creating topic ${topicData.order}: ${topicData.title}`);

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
        console.log(`      📝 Creating class ${classData.order}: ${classData.title}`);

        await prisma.class.create({
          data: {
            topicId: topic.id,
            title: classData.title,
            description: classData.description,
            contentType: classData.contentType,
            videoUrl: classData.videoUrl,
            textContent: classData.textContent,
            contestUrl: classData.contestUrl,
            duration: classData.duration,
            order: classData.order,
          }
        });
      }
    }
  }

  console.log('✨ Course seeding completed successfully!');
  console.log(`📊 Course ID: ${course.id}`);

  return course;
}

async function main() {
  try {
    const courseFilePath = path.join(__dirname, '..', 'course1');

    console.log(`📖 Reading course file: ${courseFilePath}`);
    const parsedCourse = parseCourseFile(courseFilePath);

    console.log(`\n📊 Parsed Course Summary:`);
    console.log(`   Title: ${parsedCourse.title}`);
    console.log(`   Type: ${parsedCourse.type}`);
    console.log(`   Role: ${parsedCourse.role}`);
    console.log(`   Modules: ${parsedCourse.modules.length}`);
    console.log(`   Total Topics: ${parsedCourse.modules.reduce((sum, m) => sum + m.topics.length, 0)}`);
    console.log(`   Total Classes: ${parsedCourse.modules.reduce((sum, m) =>
      sum + m.topics.reduce((tSum, t) => tSum + t.classes.length, 0), 0)}`);
    console.log('');

    await seedCourse(parsedCourse);

  } catch (error) {
    console.error('❌ Error seeding course:', error);
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

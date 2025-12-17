import { PrismaClient } from '@prisma/client';
import * as fs from 'fs';
import * as path from 'path';

const prisma = new PrismaClient();

interface ParsedClass {
  title: string;
  description: string;
  contentType: 'video' | 'text' | 'contest';
  duration: number;
  order: number;
  videoUrl?: string;
  textContent?: string;
  contestUrl?: string;
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
  role: string;
  title: string;
  description: string;
  modules: ParsedModule[];
}

function parseMarkdownCourse(filePath: string): ParsedCourse {
  const content = fs.readFileSync(filePath, 'utf-8');
  const lines = content.split('\n');

  const course: ParsedCourse = {
    type: '',
    role: '',
    title: '',
    description: '',
    modules: []
  };

  let currentModule: ParsedModule | null = null;
  let currentTopic: ParsedTopic | null = null;
  let currentClass: ParsedClass | null = null;
  let collectingTextContent = false;
  let textContentLines: string[] = [];

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();

    // Parse course metadata
    if (line.startsWith('Course Type:')) {
      course.type = line.split(':')[1].trim();
    } else if (line.startsWith('Role:')) {
      course.role = line.split(':')[1].trim();
    } else if (line.startsWith('Course Title:')) {
      course.title = line.split(':')[1].trim();
    } else if (line.startsWith('Course Description:')) {
      course.description = line.split(':')[1].trim();
    }
    // Parse Module
    else if (line.match(/^Module \d+$/)) {
      // Save previous class if exists
      if (currentClass && collectingTextContent) {
        currentClass.textContent = textContentLines.join('\n').trim();
        collectingTextContent = false;
        textContentLines = [];
      }

      currentModule = {
        title: '',
        description: '',
        order: parseInt(line.split(' ')[1]),
        learningOutcomes: [],
        topics: []
      };
      course.modules.push(currentModule);
      currentTopic = null;
      currentClass = null;
    }
    // Parse Module Title
    else if (line.startsWith('Title:') && currentModule && !currentTopic && !currentClass) {
      currentModule.title = line.split(':')[1].trim();
    }
    // Parse Module Description
    else if (line.startsWith('Description:') && currentModule && !currentTopic && !currentClass) {
      currentModule.description = line.split(':')[1].trim();
    }
    // Parse Module Order
    else if (line.startsWith('Order:') && currentModule && !currentTopic && !currentClass) {
      currentModule.order = parseInt(line.split(':')[1].trim());
    }
    // Parse Learning Outcomes
    else if (line.startsWith('Learning Outcomes:') && currentModule) {
      // Collect learning outcomes until we hit a blank line or next section
      let j = i + 1;
      while (j < lines.length && lines[j].trim() !== '' && !lines[j].trim().startsWith('Topic')) {
        const outcome = lines[j].trim();
        if (outcome) {
          currentModule.learningOutcomes.push(outcome);
        }
        j++;
      }
      i = j - 1;
    }
    // Parse Topic
    else if (line.match(/^Topic \d+\.\d+$/)) {
      // Save previous class if exists
      if (currentClass && collectingTextContent) {
        currentClass.textContent = textContentLines.join('\n').trim();
        collectingTextContent = false;
        textContentLines = [];
      }

      currentTopic = {
        title: '',
        order: parseInt(line.split(' ')[1].split('.')[1]),
        classes: []
      };
      if (currentModule) {
        currentModule.topics.push(currentTopic);
      }
      currentClass = null;
    }
    // Parse Topic Title
    else if (line.startsWith('Title:') && currentTopic && !currentClass) {
      currentTopic.title = line.split(':')[1].trim();
    }
    // Parse Topic Order
    else if (line.startsWith('Order:') && currentTopic && !currentClass) {
      currentTopic.order = parseInt(line.split(':')[1].trim());
    }
    // Parse Class
    else if (line.match(/^Class \d+\.\d+\.\d+$/)) {
      // Save previous class if exists
      if (currentClass && collectingTextContent) {
        currentClass.textContent = textContentLines.join('\n').trim();
        collectingTextContent = false;
        textContentLines = [];
      }

      currentClass = {
        title: '',
        description: '',
        contentType: 'text',
        duration: 0,
        order: 0
      };
      if (currentTopic) {
        currentTopic.classes.push(currentClass);
      }
    }
    // Parse Class Title
    else if (line.startsWith('Title:') && currentClass) {
      currentClass.title = line.split(':')[1].trim();
    }
    // Parse Class Description
    else if (line.startsWith('Description:') && currentClass) {
      currentClass.description = line.split(':')[1].trim();
    }
    // Parse Content Type
    else if (line.startsWith('Content Type:') && currentClass) {
      const type = line.split(':')[1].trim().toLowerCase();
      currentClass.contentType = type as 'video' | 'text' | 'contest';
    }
    // Parse Duration
    else if (line.startsWith('Duration:') && currentClass) {
      currentClass.duration = parseInt(line.split(':')[1].trim());
    }
    // Parse Class Order
    else if (line.startsWith('Order:') && currentClass) {
      currentClass.order = parseInt(line.split(':')[1].trim());
    }
    // Parse Video URL
    else if (line.startsWith('Video URL:') && currentClass) {
      currentClass.videoUrl = line.split(':').slice(1).join(':').trim();
    }
    // Parse Contest URL
    else if (line.startsWith('Contest URL:') && currentClass) {
      currentClass.contestUrl = line.split(':').slice(1).join(':').trim();
    }
    // Start collecting text content
    else if (line.startsWith('Text Content:') && currentClass) {
      collectingTextContent = true;
      textContentLines = [];
    }
    // Collect text content
    else if (collectingTextContent) {
      // Stop if we hit the next Class/Topic/Module
      if (line.match(/^(Class|Topic|Module) /)) {
        currentClass!.textContent = textContentLines.join('\n').trim();
        collectingTextContent = false;
        textContentLines = [];
        i--; // Re-process this line
      } else {
        textContentLines.push(lines[i]); // Keep original formatting
      }
    }
  }

  // Save last class if exists
  if (currentClass && collectingTextContent) {
    currentClass.textContent = textContentLines.join('\n').trim();
  }

  return course;
}

async function addCourse() {
  try {
    console.log('Starting to add Full Stack Interview Mastery course...\n');

    const filePath = path.join(process.cwd(), 'Course_Content', 'Fullstack_Interview_Mastery.md');
    const parsedCourse = parseMarkdownCourse(filePath);

    console.log(`Parsed course: ${parsedCourse.title}`);
    console.log(`Modules: ${parsedCourse.modules.length}\n`);

    // Create the course
    const course = await prisma.course.create({
      data: {
        title: parsedCourse.title,
        description: parsedCourse.description,
        type: parsedCourse.type || 'role-specific',
        role: parsedCourse.role || 'Full Stack Developer',
        thumbnailUrl: 'https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=800',
      }
    });

    console.log(`✓ Created course: ${course.title} (ID: ${course.id})\n`);

    // Create modules, topics, and classes
    for (const moduleData of parsedCourse.modules) {
      console.log(`Creating Module ${moduleData.order}: ${moduleData.title}`);

      const module = await prisma.module.create({
        data: {
          courseId: course.id,
          title: moduleData.title,
          description: moduleData.description,
          order: moduleData.order,
          learningOutcomes: moduleData.learningOutcomes,
        }
      });

      console.log(`  ✓ Module created (ID: ${module.id})`);

      for (const topicData of moduleData.topics) {
        console.log(`  Creating Topic ${topicData.order}: ${topicData.title}`);

        const topic = await prisma.topic.create({
          data: {
            moduleId: module.id,
            courseId: course.id,
            title: topicData.title,
            order: topicData.order,
          }
        });

        console.log(`    ✓ Topic created (ID: ${topic.id})`);

        for (const classData of topicData.classes) {
          console.log(`    Creating Class ${classData.order}: ${classData.title}`);

          await prisma.class.create({
            data: {
              topicId: topic.id,
              title: classData.title,
              description: classData.description,
              contentType: classData.contentType,
              duration: classData.duration,
              order: classData.order,
              videoUrl: classData.videoUrl,
              textContent: classData.textContent,
              contestUrl: classData.contestUrl,
            }
          });

          console.log(`      ✓ Class created`);
        }
      }

      console.log('');
    }

    console.log('\n✅ Successfully added Full Stack Interview Mastery course to database!');
    console.log(`Course ID: ${course.id}`);
    console.log(`Total Modules: ${parsedCourse.modules.length}`);
    console.log(`Total Topics: ${parsedCourse.modules.reduce((sum, m) => sum + m.topics.length, 0)}`);
    console.log(`Total Classes: ${parsedCourse.modules.reduce((sum, m) =>
      sum + m.topics.reduce((topicSum, t) => topicSum + t.classes.length, 0), 0)}`);

  } catch (error) {
    console.error('Error adding course:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

addCourse();

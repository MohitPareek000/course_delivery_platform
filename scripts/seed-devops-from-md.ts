import { PrismaClient } from '@prisma/client';
import * as fs from 'fs';
import * as path from 'path';

const prisma = new PrismaClient();

// Custom course ID as requested
const COURSE_ID = 'DEVOPS001';

interface ParsedClass {
  title: string;
  description: string;
  contentType: 'video' | 'text' | 'contest';
  duration: number;
  order: number;
  textContent: string;
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
  title: string;
  description: string;
  type: string;
  role: string;
  modules: ParsedModule[];
}

function parseMarkdownContent(content: string): ParsedCourse {
  const lines = content.split('\n');

  // Parse course info from first few lines
  const courseTitle = lines[0].trim(); // "DevOps Engineer (3 - 7 yrs)"
  let courseType = 'role-specific';
  let role = '';
  let title = '';
  let description = '';

  // Find course metadata
  for (let i = 0; i < 20; i++) {
    const line = lines[i];
    if (line.startsWith('Course Type:')) {
      courseType = line.replace('Course Type:', '').trim();
    } else if (line.startsWith('Role:')) {
      role = line.replace('Role:', '').trim();
    } else if (line.startsWith('Course Title:')) {
      title = line.replace('Course Title:', '').trim();
    } else if (line.startsWith('Course Description:')) {
      description = line.replace('Course Description:', '').trim();
    }
  }

  const modules: ParsedModule[] = [];
  let currentModule: ParsedModule | null = null;
  let currentTopic: ParsedTopic | null = null;
  let currentClass: ParsedClass | null = null;
  let collectingTextContent = false;
  let textContentBuffer: string[] = [];
  let collectingLearningOutcomes = false;
  let learningOutcomesBuffer: string[] = [];

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const trimmedLine = line.trim();

    // Module detection
    const moduleMatch = trimmedLine.match(/^Module (\d+):$/);
    if (moduleMatch) {
      // Save previous class text content
      if (currentClass && textContentBuffer.length > 0) {
        currentClass.textContent = textContentBuffer.join('\n').trim();
        textContentBuffer = [];
      }
      collectingTextContent = false;
      collectingLearningOutcomes = false;

      // Save previous module
      if (currentModule) {
        if (currentTopic && currentClass) {
          currentTopic.classes.push(currentClass);
        }
        if (currentTopic) {
          currentModule.topics.push(currentTopic);
        }
        modules.push(currentModule);
      }

      currentModule = {
        title: '',
        description: '',
        order: parseInt(moduleMatch[1]),
        learningOutcomes: [],
        topics: []
      };
      currentTopic = null;
      currentClass = null;
      continue;
    }

    // Module title
    if (currentModule && trimmedLine.startsWith('Title:') && !currentTopic) {
      currentModule.title = trimmedLine.replace('Title:', '').trim();
      continue;
    }

    // Module description
    if (currentModule && trimmedLine.startsWith('Description:') && !currentTopic) {
      currentModule.description = trimmedLine.replace('Description:', '').trim();
      continue;
    }

    // Learning outcomes start
    if (currentModule && trimmedLine === 'Learning Outcomes:') {
      collectingLearningOutcomes = true;
      learningOutcomesBuffer = [];
      continue;
    }

    // Collect learning outcomes (until we hit a Topic or next section)
    if (collectingLearningOutcomes && currentModule) {
      if (trimmedLine.match(/^Topic \d+\.\d+:$/) || trimmedLine.startsWith('Module ')) {
        currentModule.learningOutcomes = learningOutcomesBuffer.filter(o => o.length > 0);
        collectingLearningOutcomes = false;
        // Don't continue - let topic detection handle this line
      } else if (trimmedLine.length > 0 && !trimmedLine.startsWith('Order:')) {
        learningOutcomesBuffer.push(trimmedLine);
        continue;
      }
    }

    // Topic detection
    const topicMatch = trimmedLine.match(/^Topic (\d+)\.(\d+):$/);
    if (topicMatch && currentModule) {
      // Save previous class text content
      if (currentClass && textContentBuffer.length > 0) {
        currentClass.textContent = textContentBuffer.join('\n').trim();
        textContentBuffer = [];
      }
      collectingTextContent = false;
      collectingLearningOutcomes = false;

      // Save previous topic
      if (currentTopic) {
        if (currentClass) {
          currentTopic.classes.push(currentClass);
        }
        currentModule.topics.push(currentTopic);
      }

      currentTopic = {
        title: '',
        order: parseInt(topicMatch[2]),
        classes: []
      };
      currentClass = null;
      continue;
    }

    // Topic title
    if (currentTopic && trimmedLine.startsWith('Title:') && !currentClass) {
      currentTopic.title = trimmedLine.replace('Title:', '').trim();
      continue;
    }

    // Class detection
    const classMatch = trimmedLine.match(/^Class (\d+)\.(\d+)\.(\d+):$/);
    if (classMatch && currentTopic) {
      // Save previous class text content
      if (currentClass && textContentBuffer.length > 0) {
        currentClass.textContent = textContentBuffer.join('\n').trim();
        textContentBuffer = [];
      }
      collectingTextContent = false;

      // Save previous class
      if (currentClass) {
        currentTopic.classes.push(currentClass);
      }

      currentClass = {
        title: '',
        description: '',
        contentType: 'text',
        duration: 300, // default
        order: parseInt(classMatch[3]),
        textContent: ''
      };
      continue;
    }

    // Class properties
    if (currentClass) {
      if (trimmedLine.startsWith('Title:')) {
        currentClass.title = trimmedLine.replace('Title:', '').trim();
        continue;
      }
      if (trimmedLine.startsWith('Description:')) {
        currentClass.description = trimmedLine.replace('Description:', '').trim();
        continue;
      }
      if (trimmedLine.startsWith('Content Type:')) {
        const type = trimmedLine.replace('Content Type:', '').trim().toLowerCase();
        currentClass.contentType = type as 'video' | 'text' | 'contest';
        continue;
      }
      if (trimmedLine.startsWith('Duration:')) {
        const durationStr = trimmedLine.replace('Duration:', '').trim();
        currentClass.duration = parseInt(durationStr) || 300;
        continue;
      }
      if (trimmedLine.startsWith('Order:')) {
        continue; // Already captured from class match
      }
      if (trimmedLine === 'Text Content :' || trimmedLine === 'Text Content:') {
        collectingTextContent = true;
        textContentBuffer = [];
        continue;
      }
    }

    // Collect text content
    if (collectingTextContent && currentClass) {
      // Check if we're hitting a new class, topic, or module
      if (trimmedLine.match(/^Class \d+\.\d+\.\d+:$/) ||
          trimmedLine.match(/^Topic \d+\.\d+:$/) ||
          trimmedLine.match(/^Module \d+:$/)) {
        currentClass.textContent = textContentBuffer.join('\n').trim();
        textContentBuffer = [];
        collectingTextContent = false;
        // Re-process this line
        i--;
        continue;
      }
      textContentBuffer.push(line); // Keep original line with formatting
    }
  }

  // Save final items
  if (currentClass && textContentBuffer.length > 0) {
    currentClass.textContent = textContentBuffer.join('\n').trim();
  }
  if (currentClass && currentTopic) {
    currentTopic.classes.push(currentClass);
  }
  if (currentTopic && currentModule) {
    currentModule.topics.push(currentTopic);
  }
  if (currentModule) {
    modules.push(currentModule);
  }

  return {
    title,
    description,
    type: courseType,
    role,
    modules
  };
}

async function seedDevOpsCourse() {
  console.log('📚 Starting DevOps course seed from markdown...\n');

  // Read the markdown file
  const mdPath = path.join(process.cwd(), 'Course_Content', 'DevOps.md');

  if (!fs.existsSync(mdPath)) {
    console.error('❌ DevOps.md not found at:', mdPath);
    process.exit(1);
  }

  console.log('📄 Reading:', mdPath);
  const content = fs.readFileSync(mdPath, 'utf-8');

  // Parse the markdown
  console.log('🔍 Parsing markdown content...');
  const courseData = parseMarkdownContent(content);

  console.log('\n📊 Parsed course structure:');
  console.log(`   Title: ${courseData.title}`);
  console.log(`   Type: ${courseData.type}`);
  console.log(`   Role: ${courseData.role}`);
  console.log(`   Modules: ${courseData.modules.length}`);

  let totalTopics = 0;
  let totalClasses = 0;
  for (const mod of courseData.modules) {
    totalTopics += mod.topics.length;
    for (const topic of mod.topics) {
      totalClasses += topic.classes.length;
    }
  }
  console.log(`   Topics: ${totalTopics}`);
  console.log(`   Classes: ${totalClasses}`);

  // Check if course already exists
  const existingCourse = await prisma.course.findUnique({
    where: { id: COURSE_ID }
  });

  if (existingCourse) {
    console.log(`\n⚠️  Course with ID ${COURSE_ID} already exists.`);
    console.log('   Deleting existing course and recreating...');

    // Delete in correct order due to foreign keys
    await prisma.class.deleteMany({
      where: {
        topic: {
          courseId: COURSE_ID
        }
      }
    });
    await prisma.topic.deleteMany({
      where: { courseId: COURSE_ID }
    });
    await prisma.module.deleteMany({
      where: { courseId: COURSE_ID }
    });
    await prisma.course.delete({
      where: { id: COURSE_ID }
    });
    console.log('   ✅ Existing course deleted.');
  }

  // Create the course with custom ID
  console.log('\n📖 Creating course with ID:', COURSE_ID);
  const course = await prisma.course.create({
    data: {
      id: COURSE_ID,
      title: courseData.title,
      description: courseData.description,
      type: courseData.type,
      role: courseData.role || null,
    }
  });
  console.log('   ✅ Course created');

  // Create modules, topics, and classes
  for (const moduleData of courseData.modules) {
    console.log(`\n📦 Creating module ${moduleData.order}: ${moduleData.title}`);

    const module = await prisma.module.create({
      data: {
        courseId: course.id,
        title: moduleData.title,
        description: moduleData.description,
        order: moduleData.order,
        learningOutcomes: moduleData.learningOutcomes,
      }
    });

    for (const topicData of moduleData.topics) {
      console.log(`   📑 Creating topic ${topicData.order}: ${topicData.title}`);

      const topic = await prisma.topic.create({
        data: {
          moduleId: module.id,
          courseId: course.id,
          title: topicData.title,
          order: topicData.order,
        }
      });

      for (const classData of topicData.classes) {
        await prisma.class.create({
          data: {
            topicId: topic.id,
            title: classData.title,
            description: classData.description || null,
            contentType: classData.contentType,
            textContent: classData.textContent || null,
            duration: classData.duration,
            order: classData.order,
          }
        });
      }
      console.log(`      ✅ Created ${topicData.classes.length} classes`);
    }
  }

  console.log('\n🎉 DevOps course seeded successfully!');
  console.log('\n📊 Final Summary:');
  console.log(`   Course ID: ${COURSE_ID}`);
  console.log(`   Course Title: ${courseData.title}`);
  console.log(`   Modules: ${courseData.modules.length}`);
  console.log(`   Topics: ${totalTopics}`);
  console.log(`   Classes: ${totalClasses}`);
}

async function main() {
  try {
    await seedDevOpsCourse();
  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

main();

import { PrismaClient } from '@prisma/client';
import * as fs from 'fs';
import * as path from 'path';

const prisma = new PrismaClient();

interface ClassData {
  title: string;
  description?: string;
  content_type: 'video' | 'text' | 'contest';
  duration: number;
  order: number;
  video_url?: string;
  text_content?: string;
  contest_url?: string;
}

interface TopicData {
  title: string;
  order: number;
  classes: Record<string, ClassData>;
}

interface ModuleData {
  title: string;
  description: string;
  order: number;
  learning_outcomes: string[];
  topics: Record<string, TopicData>;
}

interface CourseData {
  course_information: {
    course_type: 'role-specific' | 'skill-based' | 'company-specific';
    role?: string;
    skill?: string;
    company_name?: string;
    course_title: string;
    course_description: string;
    course_thumbnail?: string;
  };
  modules: Record<string, ModuleData>;
}

async function seedDevOpsCourse() {
  try {
    console.log('📚 Starting DevOps course seed...');

    // Read the course JSON file
    const courseJsonPath = path.join(process.cwd(), 'data', 'devops-course.json');
    const courseJson = fs.readFileSync(courseJsonPath, 'utf-8');
    const courseData: CourseData = JSON.parse(courseJson);

    const { course_information, modules } = courseData;

    // Create the course
    console.log('📖 Creating course:', course_information.course_title);
    const course = await prisma.course.create({
      data: {
        title: course_information.course_title,
        description: course_information.course_description,
        type: course_information.course_type,
        role: course_information.role || null,
        skill: course_information.skill || null,
        companyName: course_information.company_name || null,
        thumbnailUrl: course_information.course_thumbnail || null,
      },
    });

    console.log('✅ Course created with ID:', course.id);

    // Create modules, topics, and classes
    for (const [moduleKey, moduleData] of Object.entries(modules)) {
      console.log(`\n📦 Creating module: ${moduleData.title}`);

      const module = await prisma.module.create({
        data: {
          courseId: course.id,
          title: moduleData.title,
          description: moduleData.description,
          order: moduleData.order,
          learningOutcomes: moduleData.learning_outcomes,
        },
      });

      console.log(`  ✅ Module created with ID: ${module.id}`);

      // Create topics for this module
      for (const [topicKey, topicData] of Object.entries(moduleData.topics)) {
        console.log(`    📑 Creating topic: ${topicData.title}`);

        const topic = await prisma.topic.create({
          data: {
            moduleId: module.id,
            courseId: course.id,
            title: topicData.title,
            order: topicData.order,
          },
        });

        console.log(`      ✅ Topic created with ID: ${topic.id}`);

        // Create classes for this topic
        for (const [classKey, classData] of Object.entries(topicData.classes)) {
          console.log(`        📝 Creating class: ${classData.title}`);

          const classItem = await prisma.class.create({
            data: {
              topicId: topic.id,
              title: classData.title,
              description: classData.description || null,
              contentType: classData.content_type,
              videoUrl: classData.video_url || null,
              textContent: classData.text_content || null,
              contestUrl: classData.contest_url || null,
              duration: classData.duration,
              order: classData.order,
            },
          });

          console.log(`          ✅ Class created with ID: ${classItem.id}`);
        }
      }
    }

    console.log('\n🎉 DevOps course seeded successfully!');
    console.log(`\n📊 Summary:`);
    console.log(`   Course: ${course_information.course_title}`);
    console.log(`   Modules: ${Object.keys(modules).length}`);

    let totalTopics = 0;
    let totalClasses = 0;
    for (const moduleData of Object.values(modules)) {
      totalTopics += Object.keys(moduleData.topics).length;
      for (const topicData of Object.values(moduleData.topics)) {
        totalClasses += Object.keys(topicData.classes).length;
      }
    }
    console.log(`   Topics: ${totalTopics}`);
    console.log(`   Classes: ${totalClasses}`);

  } catch (error) {
    console.error('❌ Error seeding DevOps course:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

// Run the seed function
seedDevOpsCourse()
  .then(() => {
    console.log('✅ Seed completed successfully');
    process.exit(0);
  })
  .catch((error) => {
    console.error('❌ Seed failed:', error);
    process.exit(1);
  });

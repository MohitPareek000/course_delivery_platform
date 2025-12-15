import { PrismaClient } from '@prisma/client';
import {
  mockUsers,
  mockCourses,
  mockModules,
  mockTopics,
  mockClasses,
  mockCourseAccess
} from '@/lib/db/mockData';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seed...');

  // Create demo user
  console.log('Creating users...');
  for (const user of mockUsers) {
    await prisma.user.upsert({
      where: { id: user.id },
      update: {
        email: user.email,
        name: user.name,
      },
      create: {
        id: user.id,
        email: user.email,
        name: user.name,
      },
    });
  }
  console.log('✅ Users created');

  // Create courses
  console.log('Creating courses...');
  for (const course of mockCourses) {
    await prisma.course.upsert({
      where: { id: course.id },
      update: {},
      create: {
        id: course.id,
        title: course.title,
        description: course.description,
        type: course.type,
        role: course.role,
        skill: course.skill,
        companyName: course.companyName,
        thumbnailUrl: course.thumbnailUrl,
      },
    });
  }
  console.log('✅ Courses created');

  // Create modules (previously called rounds)
  console.log('Creating modules...');
  for (const module of mockModules) {
    await prisma.module.upsert({
      where: { id: module.id },
      update: {},
      create: {
        id: module.id,
        courseId: module.courseId,
        title: module.title,
        description: module.description,
        order: module.order,
        learningOutcomes: module.learningOutcomes,
      },
    });
  }
  console.log('✅ Modules created');

  // Create topics
  console.log('Creating topics...');
  for (const topic of mockTopics) {
    await prisma.topic.upsert({
      where: { id: topic.id },
      update: {},
      create: {
        id: topic.id,
        moduleId: topic.moduleId,
        courseId: topic.courseId,
        title: topic.title,
        order: topic.order,
      },
    });
  }
  console.log('✅ Topics created');

  // Create classes (previously called modules)
  console.log('Creating classes...');
  for (const classItem of mockClasses) {
    await prisma.class.upsert({
      where: { id: classItem.id },
      update: {},
      create: {
        id: classItem.id,
        topicId: classItem.topicId,
        title: classItem.title,
        description: classItem.description,
        contentType: classItem.contentType || 'video',
        videoUrl: classItem.videoUrl,
        textContent: classItem.textContent,
        contestUrl: classItem.contestUrl,
        duration: classItem.duration,
        order: classItem.order,
      },
    });
  }
  console.log('✅ Classes created');

  // Create course access
  console.log('Creating course access records...');
  for (const access of mockCourseAccess) {
    await prisma.courseAccess.upsert({
      where: {
        userId_courseId: {
          userId: access.userId,
          courseId: access.courseId,
        }
      },
      update: {},
      create: {
        id: access.id,
        userId: access.userId,
        courseId: access.courseId,
      },
    });
  }
  console.log('✅ Course access records created');

  console.log('🎉 Database seeded successfully!');
}

main()
  .catch((e) => {
    console.error('Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

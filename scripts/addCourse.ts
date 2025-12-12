import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Creating course...');

  // Create a course first
  const course = await prisma.course.create({
    data: {
      title: 'Full Stack Development Bootcamp',
      description: 'Master modern web development with React, Node.js, and databases. Build production-ready applications from scratch.',
      type: 'skill-based',
      skill: 'Full Stack Development',
      thumbnailUrl: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&q=80',
    },
  });

  console.log(`✅ Course created: ${course.id}`);

  // Create Module 1: Frontend Fundamentals
  const module1 = await prisma.module.create({
    data: {
      courseId: course.id,
      title: 'Frontend Fundamentals',
      description: 'Learn the basics of HTML, CSS, and JavaScript to build responsive web pages',
      order: 1,
      learningOutcomes: [
        'Master HTML5 semantic elements',
        'Create responsive layouts with CSS',
        'Understand JavaScript fundamentals'
      ],
    },
  });

  // Create Topics for Module 1
  const topic1_1 = await prisma.topic.create({
    data: {
      moduleId: module1.id,
      courseId: course.id,
      title: 'HTML & CSS Basics',
      order: 1,
    },
  });

  // Create Classes for Topic 1.1
  await prisma.class.createMany({
    data: [
      {
        topicId: topic1_1.id,
        title: 'Introduction to HTML',
        description: 'Learn HTML structure and semantic elements',
        contentType: 'video',
        videoUrl: 'https://www.youtube.com/watch?v=UB1O30fR-EE',
        duration: 900, // 15 minutes in seconds
        order: 1
      },
      {
        topicId: topic1_1.id,
        title: 'CSS Styling Fundamentals',
        description: 'Master CSS selectors, properties, and layouts',
        contentType: 'video',
        videoUrl: 'https://www.youtube.com/watch?v=1Rs2ND1ryYc',
        duration: 1200, // 20 minutes in seconds
        order: 2
      }
    ]
  });

  const topic1_2 = await prisma.topic.create({
    data: {
      moduleId: module1.id,
      courseId: course.id,
      title: 'JavaScript Essentials',
      order: 2,
    },
  });

  await prisma.class.createMany({
    data: [
      {
        topicId: topic1_2.id,
        title: 'JavaScript Variables & Data Types',
        description: 'Understanding JavaScript fundamentals',
        contentType: 'video',
        videoUrl: 'https://www.youtube.com/watch?v=W6NZfCO5SIk',
        duration: 1080, // 18 minutes in seconds
        order: 1
      },
      {
        topicId: topic1_2.id,
        title: 'Functions and Scope',
        description: 'Deep dive into JavaScript functions',
        contentType: 'video',
        videoUrl: 'https://www.youtube.com/watch?v=gigtS_5KOqo',
        duration: 1320, // 22 minutes in seconds
        order: 2
      }
    ]
  });

  console.log('✅ Module 1 created with topics and classes');

  // Create Module 2: React Development
  const module2 = await prisma.module.create({
    data: {
      courseId: course.id,
      title: 'React Development',
      description: 'Build modern single-page applications with React',
      order: 2,
      learningOutcomes: [
        'Understand React components and props',
        'Manage state with hooks',
        'Build reusable UI components'
      ],
    },
  });

  const topic2_1 = await prisma.topic.create({
    data: {
      moduleId: module2.id,
      courseId: course.id,
      title: 'React Fundamentals',
      order: 1,
    },
  });

  await prisma.class.createMany({
    data: [
      {
        topicId: topic2_1.id,
        title: 'Introduction to React',
        description: 'What is React and why use it?',
        contentType: 'video',
        videoUrl: 'https://www.youtube.com/watch?v=Tn6-PIqc4UM',
        duration: 1500, // 25 minutes in seconds
        order: 1
      },
      {
        topicId: topic2_1.id,
        title: 'Components and Props',
        description: 'Building blocks of React applications',
        contentType: 'video',
        videoUrl: 'https://www.youtube.com/watch?v=RVFAyFWO4go',
        duration: 1800, // 30 minutes in seconds
        order: 2
      },
      {
        topicId: topic2_1.id,
        title: 'State and Hooks',
        description: 'Managing component state with useState',
        contentType: 'video',
        videoUrl: 'https://www.youtube.com/watch?v=O6P86uwfdR0',
        duration: 1680, // 28 minutes in seconds
        order: 3
      }
    ]
  });

  console.log('✅ Module 2 created with topics and classes');

  // Create Module 3: Backend with Node.js
  const module3 = await prisma.module.create({
    data: {
      courseId: course.id,
      title: 'Backend with Node.js',
      description: 'Create powerful server-side applications',
      order: 3,
      learningOutcomes: [
        'Build RESTful APIs',
        'Work with databases',
        'Implement authentication'
      ],
    },
  });

  const topic3_1 = await prisma.topic.create({
    data: {
      moduleId: module3.id,
      courseId: course.id,
      title: 'Node.js Basics',
      order: 1,
    },
  });

  await prisma.class.createMany({
    data: [
      {
        topicId: topic3_1.id,
        title: 'Getting Started with Node.js',
        description: 'Introduction to server-side JavaScript',
        contentType: 'video',
        videoUrl: 'https://www.youtube.com/watch?v=TlB_eWDSMt4',
        duration: 1200, // 20 minutes in seconds
        order: 1
      },
      {
        topicId: topic3_1.id,
        title: 'Building REST APIs',
        description: 'Create your first API with Express',
        contentType: 'video',
        videoUrl: 'https://www.youtube.com/watch?v=pKd0Rpw7O48',
        duration: 2100, // 35 minutes in seconds
        order: 2
      }
    ]
  });

  console.log('✅ Module 3 created with topics and classes');

  // Get final course with all relations
  const finalCourse = await prisma.course.findUnique({
    where: { id: course.id },
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

  console.log('\n📚 Course created successfully!');
  console.log(`Course ID: ${finalCourse?.id}`);
  console.log(`Title: ${finalCourse?.title}`);
  console.log(`Modules: ${finalCourse?.modules.length}`);

  let totalClasses = 0;
  finalCourse?.modules.forEach(module => {
    module.topics.forEach(topic => {
      totalClasses += topic.classes.length;
    });
  });

  console.log(`Total Classes: ${totalClasses}`);
}

main()
  .catch((e) => {
    console.error('Error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

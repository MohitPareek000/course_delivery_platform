import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Creating role-based course...');

  // Create a role-based course
  const course = await prisma.course.create({
    data: {
      title: 'Software Engineer Interview Preparation',
      description: 'Comprehensive preparation for software engineering interviews covering data structures, algorithms, system design, and behavioral questions.',
      type: 'role-specific',
      role: 'Software Engineer',
      thumbnailUrl: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&q=80',
    },
  });

  console.log(`✅ Course created: ${course.id}`);

  // Create Module 1: Data Structures & Algorithms
  const module1 = await prisma.module.create({
    data: {
      courseId: course.id,
      title: 'Data Structures & Algorithms',
      description: 'Master fundamental data structures and algorithms essential for coding interviews',
      order: 1,
      learningOutcomes: [
        'Understand time and space complexity analysis',
        'Implement common data structures from scratch',
        'Solve algorithmic problems efficiently'
      ],
    },
  });

  // Create Topics for Module 1
  const topic1_1 = await prisma.topic.create({
    data: {
      moduleId: module1.id,
      courseId: course.id,
      title: 'Arrays & Strings',
      order: 1,
    },
  });

  await prisma.class.createMany({
    data: [
      {
        topicId: topic1_1.id,
        title: 'Two Pointer Technique',
        description: 'Learn the two pointer pattern for solving array problems',
        contentType: 'video',
        videoUrl: 'https://www.youtube.com/watch?v=On03HWe2tZM',
        duration: 900, // 15 minutes
        order: 1
      },
      {
        topicId: topic1_1.id,
        title: 'Sliding Window Problems',
        description: 'Master sliding window technique for substring problems',
        contentType: 'video',
        videoUrl: 'https://www.youtube.com/watch?v=jM2dhDPYMQM',
        duration: 1200, // 20 minutes
        order: 2
      },
      {
        topicId: topic1_1.id,
        title: 'String Manipulation',
        description: 'Common string operations and interview questions',
        contentType: 'video',
        videoUrl: 'https://www.youtube.com/watch?v=tI_tIZFyKBw',
        duration: 1080, // 18 minutes
        order: 3
      }
    ]
  });

  const topic1_2 = await prisma.topic.create({
    data: {
      moduleId: module1.id,
      courseId: course.id,
      title: 'Trees & Graphs',
      order: 2,
    },
  });

  await prisma.class.createMany({
    data: [
      {
        topicId: topic1_2.id,
        title: 'Binary Tree Traversals',
        description: 'Inorder, preorder, and postorder traversals',
        contentType: 'video',
        videoUrl: 'https://www.youtube.com/watch?v=WLvU5EQVZqY',
        duration: 1500, // 25 minutes
        order: 1
      },
      {
        topicId: topic1_2.id,
        title: 'Graph Algorithms - BFS & DFS',
        description: 'Breadth-first and depth-first search implementations',
        contentType: 'video',
        videoUrl: 'https://www.youtube.com/watch?v=pcKY4hjDrxk',
        duration: 1800, // 30 minutes
        order: 2
      }
    ]
  });

  console.log('✅ Module 1 created with topics and classes');

  // Create Module 2: System Design
  const module2 = await prisma.module.create({
    data: {
      courseId: course.id,
      title: 'System Design',
      description: 'Learn to design scalable distributed systems',
      order: 2,
      learningOutcomes: [
        'Design large-scale distributed systems',
        'Understand trade-offs in system architecture',
        'Handle scalability and reliability challenges'
      ],
    },
  });

  const topic2_1 = await prisma.topic.create({
    data: {
      moduleId: module2.id,
      courseId: course.id,
      title: 'System Design Fundamentals',
      order: 1,
    },
  });

  await prisma.class.createMany({
    data: [
      {
        topicId: topic2_1.id,
        title: 'Introduction to System Design',
        description: 'Key concepts and principles of system design',
        contentType: 'video',
        videoUrl: 'https://www.youtube.com/watch?v=UzLMhqg3_Wc',
        duration: 2400, // 40 minutes
        order: 1
      },
      {
        topicId: topic2_1.id,
        title: 'Load Balancing & Caching',
        description: 'Understanding load balancers and caching strategies',
        contentType: 'video',
        videoUrl: 'https://www.youtube.com/watch?v=K0Ta65OqQkY',
        duration: 1800, // 30 minutes
        order: 2
      },
      {
        topicId: topic2_1.id,
        title: 'Database Scaling',
        description: 'Sharding, replication, and database optimization',
        contentType: 'video',
        videoUrl: 'https://www.youtube.com/watch?v=dkhOZOmV7Fo',
        duration: 2100, // 35 minutes
        order: 3
      }
    ]
  });

  console.log('✅ Module 2 created with topics and classes');

  // Create Module 3: Behavioral Interviews
  const module3 = await prisma.module.create({
    data: {
      courseId: course.id,
      title: 'Behavioral Interviews',
      description: 'Ace behavioral interviews with the STAR method',
      order: 3,
      learningOutcomes: [
        'Structure answers using the STAR method',
        'Demonstrate leadership and teamwork skills',
        'Handle difficult interview questions'
      ],
    },
  });

  const topic3_1 = await prisma.topic.create({
    data: {
      moduleId: module3.id,
      courseId: course.id,
      title: 'Common Behavioral Questions',
      order: 1,
    },
  });

  await prisma.class.createMany({
    data: [
      {
        topicId: topic3_1.id,
        title: 'Tell Me About Yourself',
        description: 'Crafting your personal pitch',
        contentType: 'video',
        videoUrl: 'https://www.youtube.com/watch?v=es7XtrloDIQ',
        duration: 900, // 15 minutes
        order: 1
      },
      {
        topicId: topic3_1.id,
        title: 'Handling Conflict & Challenges',
        description: 'Answering questions about difficult situations',
        contentType: 'video',
        videoUrl: 'https://www.youtube.com/watch?v=BN3cGXa6ac0',
        duration: 1200, // 20 minutes
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

  let totalClasses = 0;
  finalCourse?.modules.forEach(module => {
    module.topics.forEach(topic => {
      totalClasses += topic.classes.length;
    });
  });

  console.log('\n📚 Course created successfully!');
  console.log(`Course ID: ${finalCourse?.id}`);
  console.log(`Title: ${finalCourse?.title}`);
  console.log(`Type: ${finalCourse?.type}`);
  console.log(`Role: ${finalCourse?.role}`);
  console.log(`Modules: ${finalCourse?.modules.length}`);
  console.log(`Total Classes: ${totalClasses}`);

  // Assign to user
  const email = 'mohit000pareek@gmail.com';
  console.log(`\nAssigning course to ${email}...`);

  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) {
    console.error(`❌ User not found: ${email}`);
    process.exit(1);
  }

  // Check if already assigned
  const existingAccess = await prisma.courseAccess.findUnique({
    where: {
      userId_courseId: {
        userId: user.id,
        courseId: course.id,
      },
    },
  });

  if (existingAccess) {
    console.log(`⚠️  Course already assigned to user!`);
  } else {
    await prisma.courseAccess.create({
      data: {
        userId: user.id,
        courseId: course.id,
      },
    });
    console.log(`✅ Course assigned to ${email}`);
  }
}

main()
  .catch((e) => {
    console.error('Error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

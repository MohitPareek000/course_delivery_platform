import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function findSoftwareCourse() {
  console.log('🔍 Searching for Software Engineer course...\n');

  // Find course with "software" in title
  const courses = await prisma.course.findMany({
    where: {
      OR: [
        { title: { contains: 'Software', mode: 'insensitive' } },
        { title: { contains: 'Engineer', mode: 'insensitive' } },
      ],
    },
    include: {
      modules: {
        include: {
          topics: {
            include: {
              classes: {
                orderBy: { order: 'asc' },
              },
            },
            orderBy: { order: 'asc' },
          },
        },
        orderBy: { order: 'asc' },
      },
    },
  });

  if (courses.length === 0) {
    console.log('❌ No Software Engineer course found\n');
    return;
  }

  console.log(`✅ Found ${courses.length} matching course(s):\n`);

  for (const course of courses) {
    console.log(`📚 Course: ${course.title}`);
    console.log(`   ID: ${course.id}`);
    console.log(`   Type: ${course.type}\n`);

    if (course.modules && course.modules.length > 0) {
      console.log(`   📖 Modules (${course.modules.length}):`);

      for (const module of course.modules) {
        console.log(`   \n   Module ${module.order}: ${module.title}`);
        console.log(`   Module ID: ${module.id}`);

        if (module.topics && module.topics.length > 0) {
          for (const topic of module.topics) {
            console.log(`   \n      Topic: ${topic.title}`);

            if (topic.classes && topic.classes.length > 0) {
              for (const cls of topic.classes) {
                console.log(`         ${cls.order}. ${cls.title}`);
                console.log(`            Class ID: ${cls.id}`);
                console.log(`            Content Type: ${cls.contentType || 'video'}`);
                console.log(`            Current Video URL: ${cls.videoUrl || 'None'}`);
              }
            }
          }
        }
      }
    }

    console.log('\n' + '='.repeat(80) + '\n');
  }
}

async function main() {
  try {
    await findSoftwareCourse();
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

main();

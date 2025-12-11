import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  // Test fetching a course like the API does
  const courseId = 'course-1';

  const course = await prisma.course.findUnique({
    where: { id: courseId },
    include: {
      modules: {
        include: {
          topics: {
            include: {
              classes: {
                orderBy: { order: 'asc' }
              }
            },
            orderBy: { order: 'asc' }
          }
        },
        orderBy: { order: 'asc' }
      },
      topics: {
        where: {
          moduleId: null // Topics without a module (for skill-based courses)
        },
        include: {
          classes: {
            orderBy: { order: 'asc' }
          }
        },
        orderBy: { order: 'asc' }
      }
    }
  });

  console.log('\n=== COURSE DATA ===');
  console.log('Course:', course?.title);
  console.log('Type:', course?.type);
  console.log('Modules count:', course?.modules.length);
  console.log('Topics (no module):', course?.topics.length);

  if (course && course.modules.length > 0) {
    console.log('\n=== MODULES ===');
    course.modules.forEach(module => {
      console.log(`\nModule: ${module.title}`);
      console.log(`  Topics: ${module.topics.length}`);
      module.topics.forEach(topic => {
        console.log(`    Topic: ${topic.title} (${topic.classes.length} classes)`);
      });
    });
  }

  if (course && course.topics.length > 0) {
    console.log('\n=== DIRECT TOPICS (Skill-based) ===');
    course.topics.forEach(topic => {
      console.log(`Topic: ${topic.title} (${topic.classes.length} classes)`);
    });
  }
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());

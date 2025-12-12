import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Fixing course structure for skill-based course...');

  const courseTitle = 'Full Stack Development Bootcamp';

  // Find the course
  const course = await prisma.course.findFirst({
    where: { title: courseTitle },
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
    console.error(`❌ Course "${courseTitle}" not found!`);
    process.exit(1);
  }

  console.log(`✅ Found course: ${course.id}`);
  console.log(`   Modules: ${course.modules.length}`);

  // For skill-based courses, move topics from modules directly under the course
  // and set moduleId to null
  let topicsUpdated = 0;

  for (const module of course.modules) {
    console.log(`\nProcessing module: ${module.title}`);
    console.log(`  Topics: ${module.topics.length}`);

    for (const topic of module.topics) {
      // Update topic to have no moduleId (move it directly under course)
      await prisma.topic.update({
        where: { id: topic.id },
        data: { moduleId: null }
      });
      topicsUpdated++;
      console.log(`  ✅ Moved topic: ${topic.title}`);
    }

    // Delete the module since it's now empty
    await prisma.module.delete({
      where: { id: module.id }
    });
    console.log(`  ✅ Deleted empty module: ${module.title}`);
  }

  console.log(`\n✅ Successfully restructured course!`);
  console.log(`   Topics moved: ${topicsUpdated}`);
  console.log(`   Modules deleted: ${course.modules.length}`);
}

main()
  .catch((e) => {
    console.error('Error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

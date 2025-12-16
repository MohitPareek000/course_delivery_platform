import { prisma } from '../lib/prisma';

async function main() {
  const course = await prisma.course.findFirst({
    where: {
      title: {
        contains: 'Data Analyst',
      },
    },
    include: {
      modules: {
        where: {
          title: {
            contains: 'Introduction',
          },
        },
        include: {
          topics: {
            include: {
              classes: {
                select: {
                  id: true,
                  title: true,
                  duration: true,
                },
              },
            },
          },
        },
      },
    },
  });

  if (!course || course.modules.length === 0) {
    console.log('Module not found');
    return;
  }

  const module = course.modules[0];
  console.log('\n📊 Module:', module.title);
  console.log('='.repeat(60));

  let totalDurationSeconds = 0;
  let classCount = 0;

  module.topics.forEach((topic: any) => {
    console.log(`\nTopic: ${topic.title}`);
    topic.classes.forEach((classItem: any) => {
      console.log(`  - ${classItem.title}: ${classItem.duration} seconds (${Math.round(classItem.duration / 60)} mins)`);
      totalDurationSeconds += classItem.duration;
      classCount++;
    });
  });

  const totalMinutes = Math.round(totalDurationSeconds / 60);
  const hours = Math.floor(totalMinutes / 60);
  const mins = totalMinutes % 60;

  console.log('\n' + '='.repeat(60));
  console.log(`Total Classes: ${classCount}`);
  console.log(`Total Duration: ${totalDurationSeconds} seconds`);
  console.log(`Total Duration: ${totalMinutes} minutes`);
  console.log(`Total Duration: ${hours}h ${mins}m`);
  console.log('');
}

main().finally(() => prisma.$disconnect());

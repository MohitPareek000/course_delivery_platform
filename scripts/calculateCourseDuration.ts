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
  });

  if (!course) {
    console.log('Course not found');
    return;
  }

  console.log('\n📊 Data Analyst Interview Mastery Course Analysis\n');
  console.log('Course ID:', course.id);
  console.log('Course Type:', course.type);
  console.log('\n');

  let totalClasses = 0;
  let totalDurationMinutes = 0;
  let allClasses: any[] = [];

  if (course.type === 'role-specific' || course.type === 'company-specific') {
    // Classes are in modules.topics
    console.log('Structure: Modules → Topics → Classes\n');

    course.modules.forEach((module: any, i: number) => {
      console.log(`Module ${i + 1}: ${module.title}`);
      let moduleDuration = 0;
      let moduleClasses = 0;

      module.topics.forEach((topic: any) => {
        const topicDuration = topic.classes.reduce((sum: number, c: any) => sum + c.duration, 0);
        moduleDuration += topicDuration;
        moduleClasses += topic.classes.length;
        allClasses.push(...topic.classes);
      });

      totalDurationMinutes += moduleDuration;
      totalClasses += moduleClasses;

      const hours = Math.floor(moduleDuration / 60);
      const mins = moduleDuration % 60;
      console.log(`  Classes: ${moduleClasses}`);
      console.log(`  Duration: ${hours}h ${mins}m (${moduleDuration} mins)\n`);
    });
  } else {
    // Classes are in topics directly
    console.log('Structure: Topics → Classes\n');

    course.topics.forEach((topic: any) => {
      const topicDuration = topic.classes.reduce((sum: number, c: any) => sum + c.duration, 0);
      totalDurationMinutes += topicDuration;
      totalClasses += topic.classes.length;
      allClasses.push(...topic.classes);
    });
  }

  // Calculate using Math.ceil like the UI does
  const totalMinutesCeil = allClasses.reduce((sum, c) => sum + Math.ceil(c.duration / 60), 0);

  const totalHours = Math.floor(totalDurationMinutes / 60);
  const remainingMins = totalDurationMinutes % 60;

  const totalHoursCeil = Math.floor(totalMinutesCeil / 60);
  const remainingMinsCeil = totalMinutesCeil % 60;

  console.log('='.repeat(60));
  console.log('📈 TOTAL COURSE STATS');
  console.log('='.repeat(60));
  console.log(`Total Classes: ${totalClasses}`);
  console.log('');
  console.log('Using exact seconds from database:');
  console.log(`  Total: ${totalDurationMinutes} seconds`);
  console.log(`  Total: ${totalDurationMinutes} minutes`);
  console.log(`  Total: ${totalHours}h ${remainingMins}m`);
  console.log('');
  console.log('Using Math.ceil() like UI (rounding up):');
  console.log(`  Total: ${totalMinutesCeil} minutes`);
  console.log(`  Total: ${totalHoursCeil}h ${remainingMinsCeil}m`);
  console.log('');
  console.log(`Average Class Length: ${Math.round(totalDurationMinutes / totalClasses)} minutes`);
  console.log('');

  // Show shortest and longest classes
  allClasses.sort((a, b) => a.duration - b.duration);
  console.log(`Shortest class: "${allClasses[0].title}" - ${allClasses[0].duration} seconds (${Math.ceil(allClasses[0].duration / 60)} mins rounded up)`);
  console.log(`Longest class: "${allClasses[allClasses.length - 1].title}" - ${allClasses[allClasses.length - 1].duration} seconds (${Math.ceil(allClasses[allClasses.length - 1].duration / 60)} mins rounded up)`);
  console.log('');
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());

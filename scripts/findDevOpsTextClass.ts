import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function findDevOpsTextClass() {
  try {
    // Find DevOps course
    const devOpsCourse = await prisma.course.findFirst({
      where: {
        title: {
          contains: 'DevOps',
        },
      },
    });

    if (!devOpsCourse) {
      console.log('DevOps course not found');
      return;
    }

    console.log('Found DevOps course:', devOpsCourse.title, '(ID:', devOpsCourse.id + ')');

    // Find text-based classes in this course
    const textClasses = await prisma.class.findMany({
      where: {
        topic: {
          courseId: devOpsCourse.id,
        },
        contentType: 'text',
      },
      include: {
        topic: true,
      },
      take: 5,
    });

    console.log('\nText-based classes in DevOps course:');
    textClasses.forEach((c) => {
      console.log('\n-', c.title);
      console.log('  ID:', c.id);
      console.log('  Topic:', c.topic.title);
      console.log('  Current content length:', c.textContent?.length || 0, 'characters');
    });

    if (textClasses.length > 0) {
      console.log('\n\nFirst text class ID:', textClasses[0].id);
      console.log('Current content preview:');
      console.log(textClasses[0].textContent?.substring(0, 200));
    }
  } catch (error) {
    console.error('Error:', error);
  } finally {
    await prisma.$disconnect();
  }
}

findDevOpsTextClass();

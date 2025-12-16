import { prisma } from '../lib/prisma';

async function main() {
  const course = await prisma.course.findFirst({
    where: {
      title: {
        contains: 'Data Analyst',
      },
    },
    select: {
      id: true,
      title: true,
    },
  });

  if (course) {
    console.log(`\nCourse: ${course.title}`);
    console.log(`ID: ${course.id}\n`);
  } else {
    console.log('\nCourse not found\n');
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

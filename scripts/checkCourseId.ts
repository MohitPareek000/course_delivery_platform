import { prisma } from '../lib/prisma';

async function main() {
  const courseId = 'cmj88btbt0000sgbjwhfv2ggn';

  const course = await prisma.course.findUnique({
    where: { id: courseId },
    select: {
      id: true,
      title: true,
      type: true,
    },
  });

  if (course) {
    console.log('\n✅ Course found:');
    console.log(`   ID: ${course.id}`);
    console.log(`   Title: ${course.title}`);
    console.log(`   Type: ${course.type}\n`);
  } else {
    console.log(`\n❌ Course with ID "${courseId}" not found in database\n`);
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

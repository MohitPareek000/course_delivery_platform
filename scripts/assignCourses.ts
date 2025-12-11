import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  // Find mohit user
  const user = await prisma.user.findUnique({
    where: { email: 'mohit@gmail.com' }
  });

  if (!user) {
    console.log('User not found!');
    return;
  }

  // Get all courses
  const courses = await prisma.course.findMany();
  console.log(`Found ${courses.length} courses`);

  // Assign all courses to mohit
  for (const course of courses) {
    await prisma.courseAccess.upsert({
      where: {
        userId_courseId: {
          userId: user.id,
          courseId: course.id
        }
      },
      update: {},
      create: {
        userId: user.id,
        courseId: course.id
      }
    });
    console.log(`✅ Assigned: ${course.title}`);
  }

  console.log(`\n🎉 Successfully assigned ${courses.length} courses to mohit@gmail.com`);
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const email = 'mohit000pareek@gmail.com';
  const courseTitle = 'Full Stack Development Bootcamp';

  console.log(`Assigning course to ${email}...`);

  // Find the user
  let user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) {
    console.log(`User not found. Creating user for ${email}...`);
    user = await prisma.user.create({
      data: {
        email,
        name: email.split('@')[0],
      },
    });
    console.log(`✅ User created: ${user.id}`);
  } else {
    console.log(`✅ User found: ${user.id}`);
  }

  // Find the course
  const course = await prisma.course.findFirst({
    where: { title: courseTitle },
  });

  if (!course) {
    console.error(`❌ Course "${courseTitle}" not found!`);
    process.exit(1);
  }

  console.log(`✅ Course found: ${course.id}`);

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
    // Assign the course
    await prisma.courseAccess.create({
      data: {
        userId: user.id,
        courseId: course.id,
      },
    });
    console.log(`✅ Course assigned successfully!`);
  }

  console.log(`\n📚 Summary:`);
  console.log(`User: ${user.email}`);
  console.log(`Course: ${course.title}`);
  console.log(`Course ID: ${course.id}`);
}

main()
  .catch((e) => {
    console.error('Error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function grantCourseAccess() {
  try {
    // Get command line arguments
    const email = process.argv[2];
    const courseId = process.argv[3];

    if (!email || !courseId) {
      console.error('❌ Usage: npm run grant-access <email> <courseId>');
      console.error('   Example: npm run grant-access user@example.com course-1');
      process.exit(1);
    }

    // Find the user by email
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      console.error(`❌ User with email "${email}" not found.`);
      console.error('   Make sure the user has signed up first.');
      process.exit(1);
    }

    // Find the course by ID
    const course = await prisma.course.findUnique({
      where: { id: courseId },
    });

    if (!course) {
      console.error(`❌ Course with ID "${courseId}" not found.`);
      console.error('\n📚 Available courses:');
      const courses = await prisma.course.findMany({
        select: { id: true, title: true },
      });
      courses.forEach((c) => {
        console.log(`   - ${c.id}: ${c.title}`);
      });
      process.exit(1);
    }

    // Check if access already exists
    const existingAccess = await prisma.courseAccess.findUnique({
      where: {
        userId_courseId: {
          userId: user.id,
          courseId: courseId,
        },
      },
    });

    if (existingAccess) {
      console.log(`✅ User "${email}" already has access to "${course.title}"`);
      process.exit(0);
    }

    // Grant course access
    await prisma.courseAccess.create({
      data: {
        userId: user.id,
        courseId: courseId,
      },
    });

    console.log('✅ Course access granted successfully!');
    console.log(`   User: ${user.name || 'N/A'} (${email})`);
    console.log(`   Course: ${course.title}`);
    console.log(`   Course ID: ${courseId}`);

    // Show user's all course access
    const allAccess = await prisma.courseAccess.findMany({
      where: { userId: user.id },
      include: { course: { select: { title: true } } },
    });

    console.log(`\n📚 User now has access to ${allAccess.length} course(s):`);
    allAccess.forEach((access) => {
      console.log(`   - ${access.course.title}`);
    });

  } catch (error) {
    console.error('❌ Error granting course access:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

// Show available courses if no arguments provided
async function showHelp() {
  try {
    console.log('📚 Grant Course Access Script\n');
    console.log('Usage: npm run grant-access <email> <courseId>\n');

    const courses = await prisma.course.findMany({
      select: { id: true, title: true },
    });

    console.log('Available courses:');
    courses.forEach((c) => {
      console.log(`   - ${c.id}: ${c.title}`);
    });

    console.log('\nExample:');
    console.log('   npm run grant-access user@example.com course-1');
  } catch (error) {
    console.error('Error:', error);
  } finally {
    await prisma.$disconnect();
  }
}

// Run the script
if (process.argv.length < 3) {
  showHelp();
} else {
  grantCourseAccess();
}

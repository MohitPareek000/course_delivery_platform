import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function assignDevOpsCourse() {
  try {
    console.log('🔗 Assigning DevOps course to users...');

    // Find the DevOps course
    const devOpsCourse = await prisma.course.findFirst({
      where: {
        title: 'DevOps Mastery Path',
      },
    });

    if (!devOpsCourse) {
      throw new Error('DevOps Mastery Path course not found!');
    }

    console.log(`✅ Found course: ${devOpsCourse.title} (${devOpsCourse.id})`);

    // Get all users
    const users = await prisma.user.findMany();

    if (users.length === 0) {
      console.log('⚠️  No users found in the database. Skipping course assignment.');
      return;
    }

    console.log(`👥 Found ${users.length} user(s)`);

    // Assign course to each user
    for (const user of users) {
      // Check if user already has access
      const existingAccess = await prisma.courseAccess.findUnique({
        where: {
          userId_courseId: {
            userId: user.id,
            courseId: devOpsCourse.id,
          },
        },
      });

      if (existingAccess) {
        console.log(`  ℹ️  ${user.email} already has access to ${devOpsCourse.title}`);
      } else {
        await prisma.courseAccess.create({
          data: {
            userId: user.id,
            courseId: devOpsCourse.id,
          },
        });
        console.log(`  ✅ Assigned ${devOpsCourse.title} to ${user.email}`);
      }
    }

    console.log('\n🎉 DevOps course assignment completed!');

  } catch (error) {
    console.error('❌ Error assigning DevOps course:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

// Run the function
assignDevOpsCourse()
  .then(() => {
    console.log('✅ Assignment completed successfully');
    process.exit(0);
  })
  .catch((error) => {
    console.error('❌ Assignment failed:', error);
    process.exit(1);
  });

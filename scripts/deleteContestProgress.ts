import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function deleteContestProgress() {
  try {
    console.log('🔍 Finding all contest classes...');

    // Find all classes with contentType = 'contest'
    const contestClasses = await prisma.class.findMany({
      where: {
        contentType: 'contest'
      },
      select: {
        id: true,
        title: true
      }
    });

    console.log(`\n📊 Found ${contestClasses.length} contest class(es):`);
    contestClasses.forEach((contestClass, index) => {
      console.log(`   ${index + 1}. ${contestClass.title} (ID: ${contestClass.id})`);
    });

    if (contestClasses.length === 0) {
      console.log('\n✅ No contest classes found. Nothing to delete.');
      return;
    }

    // Get the contest class IDs
    const contestClassIds = contestClasses.map(c => c.id);

    // Count existing progress records for these contests
    const progressCount = await prisma.userProgress.count({
      where: {
        classId: {
          in: contestClassIds
        }
      }
    });

    console.log(`\n📈 Found ${progressCount} user progress record(s) for contest classes.`);

    if (progressCount === 0) {
      console.log('\n✅ No progress records to delete.');
      return;
    }

    // Delete all progress records for contest classes
    console.log('\n🗑️  Deleting user progress for contest classes...');
    const deleteResult = await prisma.userProgress.deleteMany({
      where: {
        classId: {
          in: contestClassIds
        }
      }
    });

    console.log(`\n✅ Successfully deleted ${deleteResult.count} user progress record(s) for contests.`);

  } catch (error) {
    console.error('❌ Error deleting contest progress:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

deleteContestProgress()
  .then(() => {
    console.log('\n✨ Script completed successfully!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('❌ Script failed:', error);
    process.exit(1);
  });

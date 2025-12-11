import { prisma } from '../lib/prisma';

async function checkProgress() {
  try {
    console.log('📊 Fetching all user progress records...\n');

    const allProgress = await prisma.userProgress.findMany({
      take: 10,
      orderBy: {
        updatedAt: 'desc'
      }
    });

    if (allProgress.length === 0) {
      console.log('❌ No progress records found in database');
      return;
    }

    console.log(`Found ${allProgress.length} progress records:\n`);

    allProgress.forEach((record, index) => {
      console.log(`Record ${index + 1}:`);
      console.log(`  User ID: ${record.userId}`);
      console.log(`  Class ID: ${record.classId}`);
      console.log(`  Watched Duration: ${record.watchedDuration}s`);
      console.log(`  Last Position: ${record.lastPosition}s`);
      console.log(`  Is Completed: ${record.isCompleted}`);
      console.log(`  Last Watched: ${record.lastWatchedAt}`);
      console.log(`  Updated At: ${record.updatedAt}`);
      console.log('---');
    });

  } catch (error) {
    console.error('Error:', error);
  } finally {
    await prisma.$disconnect();
  }
}

checkProgress();

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🗑️  Clearing all user progress...');

  const result = await prisma.userProgress.deleteMany({});

  console.log(`✅ Deleted ${result.count} progress records`);
}

main()
  .catch((e) => {
    console.error('Error clearing progress:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

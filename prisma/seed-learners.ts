import { PrismaClient } from '@prisma/client';
import * as fs from 'fs';
import * as path from 'path';

const prisma = new PrismaClient();

interface Learner {
  email: string;
  name: string;
  courses: string[];
}

interface LearnersData {
  learners: Learner[];
}

async function main() {
  console.log('📚 Starting learner enrollment...');

  // Read the learners.json file
  const dataPath = path.join(process.cwd(), 'data', 'learners.json');

  if (!fs.existsSync(dataPath)) {
    console.error('❌ Error: learners.json file not found at:', dataPath);
    console.log('💡 Please create data/learners.json with your learner data.');
    console.log('💡 You can use data/learners.example.json as a template.');
    process.exit(1);
  }

  const fileContent = fs.readFileSync(dataPath, 'utf-8');
  const data: LearnersData = JSON.parse(fileContent);

  console.log(`\n👥 Found ${data.learners.length} learners to process\n`);

  let successCount = 0;
  let errorCount = 0;

  for (const learner of data.learners) {
    try {
      console.log(`Processing: ${learner.email}...`);

      // Create or update user
      const user = await prisma.user.upsert({
        where: { email: learner.email },
        update: {
          name: learner.name,
        },
        create: {
          email: learner.email,
          name: learner.name,
        },
      });

      console.log(`  ✓ User created/updated: ${user.name} (${user.id})`);

      // Assign courses
      for (const courseId of learner.courses) {
        // Check if course exists
        const courseExists = await prisma.course.findUnique({
          where: { id: courseId },
        });

        if (!courseExists) {
          console.log(`  ⚠️  Warning: Course ${courseId} not found, skipping`);
          continue;
        }

        // Create course access
        await prisma.courseAccess.upsert({
          where: {
            userId_courseId: {
              userId: user.id,
              courseId: courseId,
            },
          },
          update: {},
          create: {
            userId: user.id,
            courseId: courseId,
          },
        });

        console.log(`  ✓ Assigned course: ${courseId}`);
      }

      console.log(`  ✅ Successfully enrolled ${learner.email}\n`);
      successCount++;
    } catch (error: any) {
      console.error(`  ❌ Error processing ${learner.email}:`, error.message);
      errorCount++;
    }
  }

  console.log('\n' + '='.repeat(50));
  console.log('📊 Summary:');
  console.log(`  ✅ Successfully processed: ${successCount} learners`);
  if (errorCount > 0) {
    console.log(`  ❌ Errors: ${errorCount} learners`);
  }
  console.log('='.repeat(50));
  console.log('\n🎉 Learner enrollment complete!');
}

main()
  .catch((e) => {
    console.error('❌ Fatal error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

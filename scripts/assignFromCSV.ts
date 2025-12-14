/**
 * Simple CSV Course Assignment Script
 *
 * CSV Format:
 *   email,name,courseId
 *   john@example.com,John Doe,clq8x9y0z0001
 *   sarah@example.com,Sarah Smith,clq8x9y0z0001
 *
 * Usage:
 *   npx tsx scripts/assignFromCSV.ts path/to/file.csv
 */

import { PrismaClient } from '@prisma/client';
import * as fs from 'fs';
import * as path from 'path';

const prisma = new PrismaClient();

async function assignFromCSV(filePath: string) {
  console.log('\n🚀 Starting Course Assignment from CSV\n');

  // Read CSV file
  const absolutePath = path.resolve(filePath);
  if (!fs.existsSync(absolutePath)) {
    console.error(`❌ File not found: ${absolutePath}`);
    process.exit(1);
  }

  const content = fs.readFileSync(absolutePath, 'utf-8');
  const lines = content.trim().split('\n');

  if (lines.length < 2) {
    console.error('❌ CSV file must contain at least a header and one data row');
    process.exit(1);
  }

  // Parse CSV
  const header = lines[0].toLowerCase().split(',').map(h => h.trim());
  const emailIndex = header.indexOf('email');
  const nameIndex = header.indexOf('name');
  const courseIdIndex = header.indexOf('courseid') !== -1 ? header.indexOf('courseid') : header.indexOf('course_id');

  if (emailIndex === -1 || courseIdIndex === -1) {
    console.error('❌ CSV must have "email" and "courseId" columns');
    process.exit(1);
  }

  const dataLines = lines.slice(1).filter(line => line.trim());
  console.log(`📄 Found ${dataLines.length} entries in CSV\n`);

  let successful = 0;
  let failed = 0;

  // Process each line
  for (let i = 0; i < dataLines.length; i++) {
    const columns = dataLines[i].split(',').map(c => c.trim());
    const email = columns[emailIndex];
    const name = nameIndex !== -1 ? columns[nameIndex] : undefined;
    const courseId = columns[courseIdIndex];

    if (!email || !courseId) {
      console.log(`⏭️  [${i + 1}/${dataLines.length}] Skipping - missing email or courseId`);
      failed++;
      continue;
    }

    try {
      // Find or create user
      let user = await prisma.user.findUnique({ where: { email } });

      if (!user) {
        const userName = name || email.split('@')[0];
        user = await prisma.user.create({
          data: { email, name: userName },
        });
        console.log(`✅ [${i + 1}/${dataLines.length}] Created user: ${email}`);
      } else if (name && user.name !== name) {
        user = await prisma.user.update({
          where: { id: user.id },
          data: { name },
        });
        console.log(`📝 [${i + 1}/${dataLines.length}] Updated name: ${email}`);
      }

      // Check if course exists
      const course = await prisma.course.findUnique({ where: { id: courseId } });
      if (!course) {
        console.log(`❌ [${i + 1}/${dataLines.length}] Course not found: ${courseId}`);
        failed++;
        continue;
      }

      // Check if already assigned
      const existing = await prisma.courseAccess.findUnique({
        where: {
          userId_courseId: { userId: user.id, courseId: courseId },
        },
      });

      if (existing) {
        console.log(`⏭️  [${i + 1}/${dataLines.length}] Already assigned: ${email} → ${course.title}`);
        successful++;
        continue;
      }

      // Create access
      await prisma.courseAccess.create({
        data: { userId: user.id, courseId: courseId },
      });

      console.log(`🎓 [${i + 1}/${dataLines.length}] Assigned: ${email} → ${course.title}`);
      successful++;
    } catch (error: any) {
      console.error(`❌ [${i + 1}/${dataLines.length}] Error for ${email}: ${error.message}`);
      failed++;
    }
  }

  // Summary
  console.log('\n' + '='.repeat(60));
  console.log('📊 SUMMARY');
  console.log('='.repeat(60));
  console.log(`Total: ${dataLines.length}`);
  console.log(`✅ Successful: ${successful}`);
  console.log(`❌ Failed: ${failed}`);
  console.log('\n✅ Done!\n');
}

// Main
const csvFile = process.argv[2];
if (!csvFile) {
  console.error('\n❌ Please provide a CSV file path\n');
  console.log('Usage: npx tsx scripts/assignFromCSV.ts path/to/file.csv\n');
  process.exit(1);
}

assignFromCSV(csvFile)
  .catch(error => {
    console.error('\n❌ Error:', error.message);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());

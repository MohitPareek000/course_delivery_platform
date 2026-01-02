import { PrismaClient } from '@prisma/client';
import * as fs from 'fs';
import * as path from 'path';

const prisma = new PrismaClient();

const COURSE_ID = 'cmj9ly4mq0000sgsrk46ql04i';

async function grantAccess() {
  console.log('=== GRANTING FULL STACK COURSE ACCESS ===\n');
  console.log(`Course ID: ${COURSE_ID}\n`);

  // Read CSV file
  const csvPath = path.join(__dirname, '../CourseAccess/learnerFullStackAccess.csv');
  const csvContent = fs.readFileSync(csvPath, 'utf-8');
  const lines = csvContent.trim().split('\n');

  // Skip header
  const dataLines = lines.slice(1);
  console.log(`Total learners in CSV: ${dataLines.length}\n`);

  let created = 0;
  let alreadyExists = 0;
  let userNotFound = 0;
  let errors = 0;

  for (const line of dataLines) {
    const [email, name, courseId] = line.split(',').map(s => s.trim());

    if (!email) continue;

    try {
      // Find user by email
      const user = await prisma.user.findUnique({
        where: { email: email.toLowerCase() }
      });

      if (!user) {
        userNotFound++;
        continue;
      }

      // Check if access already exists
      const existingAccess = await prisma.courseAccess.findUnique({
        where: {
          userId_courseId: {
            userId: user.id,
            courseId: COURSE_ID
          }
        }
      });

      if (existingAccess) {
        alreadyExists++;
        continue;
      }

      // Create course access
      await prisma.courseAccess.create({
        data: {
          userId: user.id,
          courseId: COURSE_ID,
          assignedAt: new Date()
        }
      });

      created++;
    } catch (error: any) {
      errors++;
      console.error(`Error for ${email}: ${error.message}`);
    }
  }

  console.log('=== SUMMARY ===\n');
  console.log(`| Metric | Count |`);
  console.log(`|--------|-------|`);
  console.log(`| Total in CSV | ${dataLines.length} |`);
  console.log(`| Access Created | ${created} |`);
  console.log(`| Already Had Access | ${alreadyExists} |`);
  console.log(`| User Not Found | ${userNotFound} |`);
  console.log(`| Errors | ${errors} |`);

  await prisma.$disconnect();
}

grantAccess();

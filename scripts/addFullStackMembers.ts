import { PrismaClient } from '@prisma/client';
import * as fs from 'fs';
import * as path from 'path';
import { getISTDate } from '../lib/dateUtils';

const prisma = new PrismaClient();

// Full Stack Course ID
const COURSE_ID = 'cmj9ly4mq0000sgsrk46ql04i';

// CSV file path
const CSV_FILE_PATH = path.join(process.cwd(), 'CourseAccess/learnerFullStackAccess.csv');

interface MemberRow {
  email: string;
  name: string;
  courseId: string;
}

function parseCSV(filePath: string): MemberRow[] {
  const fileContent = fs.readFileSync(filePath, 'utf-8');
  const lines = fileContent.split('\n').filter(line => line.trim() !== '');

  // Skip header row
  const dataLines = lines.slice(1);

  const members: MemberRow[] = [];

  for (const line of dataLines) {
    const [email, name, courseId] = line.split(',').map(field => field.trim());

    if (email && name) {
      members.push({ email: email.toLowerCase(), name, courseId: courseId || COURSE_ID });
    }
  }

  return members;
}

async function addFullStackMembers() {
  console.log('=== ADDING FULL STACK COURSE MEMBERS ===\n');
  console.log(`Course ID: ${COURSE_ID}`);
  console.log(`CSV File: ${CSV_FILE_PATH}\n`);

  // Verify course exists
  const course = await prisma.course.findUnique({
    where: { id: COURSE_ID },
    select: { id: true, title: true }
  });

  if (!course) {
    console.error(`❌ Course not found with ID: ${COURSE_ID}`);
    process.exit(1);
  }

  console.log(`Course: ${course.title}\n`);

  // Parse CSV file
  let members: MemberRow[];
  try {
    members = parseCSV(CSV_FILE_PATH);
    console.log(`Total members in CSV: ${members.length}\n`);
  } catch (error) {
    console.error('❌ Error reading CSV file:', error);
    process.exit(1);
  }

  let usersCreated = 0;
  let usersExisted = 0;
  let accessGranted = 0;
  let accessExisted = 0;
  let errors = 0;

  const istNow = getISTDate();

  // Process in batches for performance
  const batchSize = 100;
  const totalBatches = Math.ceil(members.length / batchSize);

  for (let batch = 0; batch < totalBatches; batch++) {
    const start = batch * batchSize;
    const end = Math.min(start + batchSize, members.length);
    const batchMembers = members.slice(start, end);

    console.log(`Processing batch ${batch + 1}/${totalBatches} (${start + 1}-${end})...`);

    for (const member of batchMembers) {
      try {
        // Check if user already exists
        let user = await prisma.user.findUnique({
          where: { email: member.email },
        });

        if (user) {
          usersExisted++;
        } else {
          // Create new user
          user = await prisma.user.create({
            data: {
              email: member.email,
              name: member.name,
              emailVerified: istNow,
              createdAt: istNow,
              updatedAt: istNow,
            },
          });
          usersCreated++;
        }

        // Check if user already has access to this course
        const existingAccess = await prisma.courseAccess.findUnique({
          where: {
            userId_courseId: {
              userId: user.id,
              courseId: COURSE_ID,
            },
          },
        });

        if (existingAccess) {
          accessExisted++;
        } else {
          // Grant course access
          await prisma.courseAccess.create({
            data: {
              userId: user.id,
              courseId: COURSE_ID,
              assignedAt: istNow,
            },
          });
          accessGranted++;
        }
      } catch (error: any) {
        errors++;
        if (errors <= 5) {
          console.error(`  Error for ${member.email}: ${error.message}`);
        }
      }
    }
  }

  console.log('\n=== SUMMARY ===\n');
  console.log('| Metric | Count |');
  console.log('|--------|-------|');
  console.log(`| Total in CSV | ${members.length} |`);
  console.log(`| Users Created | ${usersCreated} |`);
  console.log(`| Users Already Existed | ${usersExisted} |`);
  console.log(`| Course Access Granted | ${accessGranted} |`);
  console.log(`| Access Already Existed | ${accessExisted} |`);
  console.log(`| Errors | ${errors} |`);

  console.log('\n✅ Done!');
}

async function main() {
  try {
    // Check if CSV file exists
    if (!fs.existsSync(CSV_FILE_PATH)) {
      console.error(`❌ CSV file not found at: ${CSV_FILE_PATH}`);
      console.log('\nExpected CSV format:');
      console.log('email,name,courseId');
      console.log('john@example.com,John Doe,cmj9ly4mq0000sgsrk46ql04i');
      process.exit(1);
    }

    await addFullStackMembers();
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

main();

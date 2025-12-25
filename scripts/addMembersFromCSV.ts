import { PrismaClient } from '@prisma/client';
import * as fs from 'fs';
import * as path from 'path';
import { getISTDate } from '../lib/dateUtils';

const prisma = new PrismaClient();

// CSV file path
const CSV_FILE_PATH = path.join(process.cwd(), 'example-assignment.csv');

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

    if (email && name && courseId) {
      members.push({ email, name, courseId });
    }
  }

  return members;
}

async function addMembersFromCSV() {
  console.log('🚀 Starting to add members from CSV...\n');
  console.log(`📄 Reading from: ${CSV_FILE_PATH}\n`);

  // Parse CSV file
  let members: MemberRow[];
  try {
    members = parseCSV(CSV_FILE_PATH);
    console.log(`✅ Found ${members.length} members in CSV file\n`);
  } catch (error) {
    console.error('❌ Error reading CSV file:', error);
    process.exit(1);
  }

  // Group members by email to handle multiple course assignments
  const membersByCourse = new Map<string, { name: string; courseIds: string[] }>();

  for (const member of members) {
    if (!membersByCourse.has(member.email)) {
      membersByCourse.set(member.email, {
        name: member.name,
        courseIds: [],
      });
    }
    membersByCourse.get(member.email)!.courseIds.push(member.courseId);
  }

  console.log(`👥 Processing ${membersByCourse.size} unique users...\n`);

  // Process each member
  for (const [email, data] of membersByCourse.entries()) {
    try {
      console.log(`📝 Processing: ${data.name} (${email})`);

      // Check if user already exists
      let user = await prisma.user.findUnique({
        where: { email },
      });

      if (user) {
        console.log(`   ⚠️  User already exists with ID: ${user.id}`);
      } else {
        // Create new user
        const istNow = getISTDate();
        user = await prisma.user.create({
          data: {
            email,
            name: data.name,
            emailVerified: istNow,
            createdAt: istNow,
            updatedAt: istNow,
          },
        });
        console.log(`   ✅ Created user with ID: ${user.id}`);
      }

      // Assign courses to user
      for (const courseId of data.courseIds) {
        // Check if course exists
        const courseExists = await prisma.course.findUnique({
          where: { id: courseId },
          select: { id: true, title: true },
        });

        if (!courseExists) {
          console.log(`   ❌ Course ${courseId} does not exist - skipping`);
          continue;
        }

        // Check if user already has access to this course
        const existingAccess = await prisma.courseAccess.findUnique({
          where: {
            userId_courseId: {
              userId: user.id,
              courseId: courseId,
            },
          },
        });

        if (existingAccess) {
          console.log(`   ⚠️  Already has access to: ${courseExists.title}`);
        } else {
          // Grant course access
          await prisma.courseAccess.create({
            data: {
              userId: user.id,
              courseId: courseId,
            },
          });
          console.log(`   ✅ Granted access to: ${courseExists.title}`);
        }
      }

      console.log('');
    } catch (error) {
      console.error(`   ❌ Error processing ${email}:`, error);
      console.log('');
    }
  }

  console.log('✨ Finished adding members from CSV!\n');
}

async function listAvailableCourses() {
  console.log('📚 Available Courses in Database:\n');

  const courses = await prisma.course.findMany({
    select: {
      id: true,
      title: true,
      type: true,
    },
    orderBy: {
      title: 'asc',
    },
  });

  if (courses.length === 0) {
    console.log('⚠️  No courses found in database!\n');
    return;
  }

  courses.forEach(course => {
    console.log(`ID: ${course.id}`);
    console.log(`Title: ${course.title}`);
    console.log(`Type: ${course.type}`);
    console.log('---');
  });

  console.log('');
}

async function main() {
  try {
    // Check if CSV file exists
    if (!fs.existsSync(CSV_FILE_PATH)) {
      console.error(`❌ CSV file not found at: ${CSV_FILE_PATH}`);
      console.log('\nExpected CSV format:');
      console.log('email,name,courseId');
      console.log('john@example.com,John Doe,course-id-123');
      process.exit(1);
    }

    // List available courses first
    await listAvailableCourses();

    // Add members from CSV
    await addMembersFromCSV();
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

main();

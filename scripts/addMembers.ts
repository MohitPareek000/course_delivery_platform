import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Define members to add
// Format: { name, email, courseIds: [array of course IDs to assign] }
const membersToAdd = [
  {
    name: "John Doe",
    email: "john.doe@example.com",
    courseIds: ["cmj2ulp0d0000sgm62xoncj41"], // Replace with actual course IDs
  },
  {
    name: "Jane Smith",
    email: "jane.smith@example.com",
    courseIds: ["cmj2ulp0d0000sgm62xoncj41", "cmj2ulqhz0004sgm6k0e0kjud"],
  },
  {
    name: "Bob Johnson",
    email: "bob.johnson@example.com",
    courseIds: ["cmj2ulqhz0004sgm6k0e0kjud"],
  },
  // Add more members here...
];

async function addMembers() {
  console.log('🚀 Starting to add members...\n');

  for (const member of membersToAdd) {
    try {
      console.log(`📝 Processing: ${member.name} (${member.email})`);

      // Check if user already exists
      let user = await prisma.user.findUnique({
        where: { email: member.email },
      });

      if (user) {
        console.log(`   ⚠️  User already exists with ID: ${user.id}`);
      } else {
        // Create new user
        user = await prisma.user.create({
          data: {
            email: member.email,
            name: member.name,
            emailVerified: new Date(), // Mark as verified
          },
        });
        console.log(`   ✅ Created user with ID: ${user.id}`);
      }

      // Assign courses to user
      for (const courseId of member.courseIds) {
        // Check if course exists
        const courseExists = await prisma.course.findUnique({
          where: { id: courseId },
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
          console.log(`   ⚠️  Already has access to course: ${courseId}`);
        } else {
          // Grant course access
          await prisma.courseAccess.create({
            data: {
              userId: user.id,
              courseId: courseId,
            },
          });
          console.log(`   ✅ Granted access to course: ${courseId}`);
        }
      }

      console.log('');
    } catch (error) {
      console.error(`   ❌ Error processing ${member.email}:`, error);
      console.log('');
    }
  }

  console.log('✨ Finished adding members!\n');
}

async function listAvailableCourses() {
  console.log('📚 Available Courses:\n');

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
    // First, list available courses
    await listAvailableCourses();

    // Then add members
    await addMembers();
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

main();

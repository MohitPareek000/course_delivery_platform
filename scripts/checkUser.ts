import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  // Find user by email
  const user = await prisma.user.findUnique({
    where: { email: 'mohit@gmail.com' }
  });

  console.log('User:', JSON.stringify(user, null, 2));

  if (user) {
    // Check course access
    const courseAccess = await prisma.courseAccess.findMany({
      where: { userId: user.id },
      include: { course: true }
    });

    console.log('\nCourse Access:', JSON.stringify(courseAccess, null, 2));
    console.log('\nTotal courses assigned:', courseAccess.length);

    // Check all users
    const allUsers = await prisma.user.findMany();
    console.log('\nAll users in database:', allUsers.map(u => u.email));
  } else {
    console.log('\nUser not found!');

    // Check all users
    const allUsers = await prisma.user.findMany();
    console.log('\nAll users in database:', allUsers.map(u => u.email));
  }
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());

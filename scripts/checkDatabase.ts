import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  const courses = await prisma.course.findMany();
  const modules = await prisma.module.findMany();
  const topics = await prisma.topic.findMany();
  const classes = await prisma.class.findMany();
  const courseAccess = await prisma.courseAccess.findMany();

  console.log('\n=== DATABASE STATUS ===');
  console.log('Courses:', courses.length);
  console.log('Modules:', modules.length);
  console.log('Topics:', topics.length);
  console.log('Classes:', classes.length);
  console.log('CourseAccess:', courseAccess.length);

  if (courses.length > 0) {
    console.log('\nCourses:', courses.map(c => c.title));
  }
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());

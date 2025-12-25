/**
 * Script to convert all existing UTC timestamps in the database to IST
 * IST is UTC+5:30 (5 hours 30 minutes ahead)
 *
 * Run with: npx tsx scripts/convertTimestampsToIST.ts
 */

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const IST_OFFSET_MS = 5.5 * 60 * 60 * 1000; // 5 hours 30 minutes in milliseconds

function toIST(date: Date): Date {
  return new Date(date.getTime() + IST_OFFSET_MS);
}

async function convertTimestamps() {
  console.log('🕐 Starting timestamp conversion from UTC to IST...\n');

  try {
    // 1. Convert User timestamps
    console.log('📌 Converting User timestamps...');
    const users = await prisma.user.findMany();
    let userCount = 0;
    for (const user of users) {
      await prisma.user.update({
        where: { id: user.id },
        data: {
          createdAt: toIST(user.createdAt),
          updatedAt: toIST(user.updatedAt),
          emailVerified: user.emailVerified ? toIST(user.emailVerified) : null,
        },
      });
      userCount++;
    }
    console.log(`   ✅ Converted ${userCount} users\n`);

    // 2. Convert Session timestamps
    console.log('📌 Converting Session timestamps...');
    const sessions = await prisma.session.findMany();
    let sessionCount = 0;
    for (const session of sessions) {
      await prisma.session.update({
        where: { id: session.id },
        data: {
          expires: toIST(session.expires),
        },
      });
      sessionCount++;
    }
    console.log(`   ✅ Converted ${sessionCount} sessions\n`);

    // 3. Convert OTP timestamps
    console.log('📌 Converting OTP timestamps...');
    const otps = await prisma.oTP.findMany();
    let otpCount = 0;
    for (const otp of otps) {
      await prisma.oTP.update({
        where: { id: otp.id },
        data: {
          createdAt: toIST(otp.createdAt),
          expiresAt: toIST(otp.expiresAt),
        },
      });
      otpCount++;
    }
    console.log(`   ✅ Converted ${otpCount} OTPs\n`);

    // 4. Convert Course timestamps
    console.log('📌 Converting Course timestamps...');
    const courses = await prisma.course.findMany();
    let courseCount = 0;
    for (const course of courses) {
      await prisma.course.update({
        where: { id: course.id },
        data: {
          createdAt: toIST(course.createdAt),
          updatedAt: toIST(course.updatedAt),
        },
      });
      courseCount++;
    }
    console.log(`   ✅ Converted ${courseCount} courses\n`);

    // 5. Convert Module timestamps
    console.log('📌 Converting Module timestamps...');
    const modules = await prisma.module.findMany();
    let moduleCount = 0;
    for (const module of modules) {
      await prisma.module.update({
        where: { id: module.id },
        data: {
          createdAt: toIST(module.createdAt),
          updatedAt: toIST(module.updatedAt),
        },
      });
      moduleCount++;
    }
    console.log(`   ✅ Converted ${moduleCount} modules\n`);

    // 6. Convert Topic timestamps
    console.log('📌 Converting Topic timestamps...');
    const topics = await prisma.topic.findMany();
    let topicCount = 0;
    for (const topic of topics) {
      await prisma.topic.update({
        where: { id: topic.id },
        data: {
          createdAt: toIST(topic.createdAt),
          updatedAt: toIST(topic.updatedAt),
        },
      });
      topicCount++;
    }
    console.log(`   ✅ Converted ${topicCount} topics\n`);

    // 7. Convert Class timestamps
    console.log('📌 Converting Class timestamps...');
    const classes = await prisma.class.findMany();
    let classCount = 0;
    for (const cls of classes) {
      await prisma.class.update({
        where: { id: cls.id },
        data: {
          createdAt: toIST(cls.createdAt),
          updatedAt: toIST(cls.updatedAt),
        },
      });
      classCount++;
    }
    console.log(`   ✅ Converted ${classCount} classes\n`);

    // 8. Convert UserProgress timestamps
    console.log('📌 Converting UserProgress timestamps...');
    const progressRecords = await prisma.userProgress.findMany();
    let progressCount = 0;
    for (const progress of progressRecords) {
      await prisma.userProgress.update({
        where: { id: progress.id },
        data: {
          createdAt: toIST(progress.createdAt),
          updatedAt: toIST(progress.updatedAt),
          lastWatchedAt: toIST(progress.lastWatchedAt),
          completedAt: progress.completedAt ? toIST(progress.completedAt) : null,
        },
      });
      progressCount++;
    }
    console.log(`   ✅ Converted ${progressCount} progress records\n`);

    // 9. Convert CourseAccess timestamps
    console.log('📌 Converting CourseAccess timestamps...');
    const courseAccess = await prisma.courseAccess.findMany();
    let accessCount = 0;
    for (const access of courseAccess) {
      await prisma.courseAccess.update({
        where: { id: access.id },
        data: {
          createdAt: toIST(access.createdAt),
          updatedAt: toIST(access.updatedAt),
          assignedAt: access.assignedAt ? toIST(access.assignedAt) : null,
        },
      });
      accessCount++;
    }
    console.log(`   ✅ Converted ${accessCount} course access records\n`);

    // 10. Convert Rating timestamps
    console.log('📌 Converting Rating timestamps...');
    const ratings = await prisma.rating.findMany();
    let ratingCount = 0;
    for (const rating of ratings) {
      await prisma.rating.update({
        where: { id: rating.id },
        data: {
          createdAt: toIST(rating.createdAt),
          updatedAt: toIST(rating.updatedAt),
        },
      });
      ratingCount++;
    }
    console.log(`   ✅ Converted ${ratingCount} ratings\n`);

    // 11. Convert AnalyticsEvent timestamps
    console.log('📌 Converting AnalyticsEvent timestamps...');
    const events = await prisma.analyticsEvent.findMany();
    let eventCount = 0;
    for (const event of events) {
      await prisma.analyticsEvent.update({
        where: { id: event.id },
        data: {
          createdAt: toIST(event.createdAt),
          timestamp: toIST(event.timestamp),
        },
      });
      eventCount++;
    }
    console.log(`   ✅ Converted ${eventCount} analytics events\n`);

    console.log('========================================');
    console.log('🎉 All timestamps converted to IST successfully!');
    console.log('========================================');
    console.log('\nSummary:');
    console.log(`   Users: ${userCount}`);
    console.log(`   Sessions: ${sessionCount}`);
    console.log(`   OTPs: ${otpCount}`);
    console.log(`   Courses: ${courseCount}`);
    console.log(`   Modules: ${moduleCount}`);
    console.log(`   Topics: ${topicCount}`);
    console.log(`   Classes: ${classCount}`);
    console.log(`   Progress Records: ${progressCount}`);
    console.log(`   Course Access: ${accessCount}`);
    console.log(`   Ratings: ${ratingCount}`);
    console.log(`   Analytics Events: ${eventCount}`);

  } catch (error) {
    console.error('❌ Error converting timestamps:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

convertTimestamps();

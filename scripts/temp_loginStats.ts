import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function getLoginStats() {
  // Exclude test accounts
  const excludeEmails = ['mohit000pareek@gmail.com', 'mohit.pareek@scaler.com'];

  // Get test user IDs
  const testUsers = await prisma.user.findMany({
    where: { email: { in: excludeEmails } },
    select: { id: true }
  });
  const testUserIds = testUsers.map(u => u.id);

  // Get all login_success events from 25th Dec onwards (excluding test accounts)
  const loginEvents = await prisma.analyticsEvent.findMany({
    where: {
      eventType: 'auth_event',
      eventAction: 'login_success',
      timestamp: {
        gte: new Date('2024-12-25T00:00:00.000Z')
      },
      userId: {
        notIn: testUserIds
      }
    },
    select: { userId: true }
  });

  const totalEvents = loginEvents.length;
  const uniqueUsers = new Set(loginEvents.map(e => e.userId).filter(Boolean)).size;

  console.log('=== LOGIN STATS (25th Dec onwards) ===');
  console.log('(Excluding test accounts: mohit000pareek@gmail.com, mohit.pareek@scaler.com)\n');
  console.log('| Metric | Count |');
  console.log('|--------|-------|');
  console.log(`| Total Login Events | ${totalEvents} |`);
  console.log(`| Unique Users Logged In | ${uniqueUsers} |`);
  console.log(`| Avg Logins per User | ${(totalEvents / uniqueUsers).toFixed(2)} |`);

  await prisma.$disconnect();
}

getLoginStats();

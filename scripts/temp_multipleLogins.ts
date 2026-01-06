import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function analyzeMultipleLogins() {
  // Get all login_success events from 25th Dec onwards
  const loginEvents = await prisma.analyticsEvent.findMany({
    where: {
      eventType: 'auth_event',
      eventAction: 'login_success',
      timestamp: {
        gte: new Date('2024-12-25T00:00:00.000Z')
      }
    },
    orderBy: { timestamp: 'asc' }
  });

  // Quick summary
  const totalEvents = loginEvents.length;
  const uniqueUserIds = new Set(loginEvents.map(e => e.userId).filter(Boolean));

  console.log('=== LOGIN STATS (25th Dec onwards) ===\n');
  console.log('| Metric | Count |');
  console.log('|--------|-------|');
  console.log(`| Total Login Events | ${totalEvents} |`);
  console.log(`| Unique Users Logged In | ${uniqueUserIds.size} |`);
  console.log(`| Avg Logins per User | ${(totalEvents / uniqueUserIds.size).toFixed(2)} |`);
  console.log('');

  // Group by userId
  const userLogins: Record<string, { count: number; timestamps: Date[]; email?: string }> = {};

  for (const event of loginEvents) {
    if (event.userId) {
      if (!userLogins[event.userId]) {
        userLogins[event.userId] = { count: 0, timestamps: [] };
      }
      userLogins[event.userId].count++;
      userLogins[event.userId].timestamps.push(event.timestamp);
    }
  }

  // Get user emails
  const userIds = Object.keys(userLogins);
  const users = await prisma.user.findMany({
    where: { id: { in: userIds } },
    select: { id: true, email: true }
  });

  for (const user of users) {
    if (userLogins[user.id]) {
      userLogins[user.id].email = user.email || 'No email';
    }
  }

  // Sort by login count descending
  const sortedUsers = Object.entries(userLogins)
    .sort((a, b) => b[1].count - a[1].count);

  // Summary stats
  const uniqueUsers = sortedUsers.length;
  const multipleLoginUsers = sortedUsers.filter(([_, data]) => data.count > 1);

  console.log('=== MULTIPLE LOGIN ANALYSIS ===\n');
  console.log(`Unique Users: ${uniqueUsers}`);
  console.log(`Avg Logins per User: ${(totalEvents / uniqueUsers).toFixed(2)}`);
  console.log(`Users with Multiple Logins: ${multipleLoginUsers.length} (${(multipleLoginUsers.length / uniqueUsers * 100).toFixed(1)}%)\n`);

  // Distribution
  const distribution: Record<number, number> = {};
  for (const [_, data] of sortedUsers) {
    distribution[data.count] = (distribution[data.count] || 0) + 1;
  }

  console.log('=== LOGIN FREQUENCY DISTRIBUTION ===\n');
  console.log('| Logins | Users | % |');
  console.log('|--------|-------|---|');
  for (const [count, users] of Object.entries(distribution).sort((a, b) => Number(a[0]) - Number(b[0]))) {
    console.log(`| ${count} | ${users} | ${(users / uniqueUsers * 100).toFixed(1)}% |`);
  }

  // Top 20 users with most logins
  console.log('\n=== TOP 20 USERS WITH MOST LOGINS ===\n');
  console.log('| # | Email | Logins | Login Dates |');
  console.log('|---|-------|--------|-------------|');

  for (let i = 0; i < Math.min(20, sortedUsers.length); i++) {
    const [userId, data] = sortedUsers[i];
    const dates = data.timestamps
      .map(d => d.toISOString().split('T')[0])
      .filter((v, i, a) => a.indexOf(v) === i) // unique dates
      .join(', ');
    console.log(`| ${i + 1} | ${data.email || userId.slice(0, 8)} | ${data.count} | ${dates} |`);
  }

  // Analyze WHY multiple logins
  console.log('\n=== WHY MULTIPLE LOGINS? ===\n');

  // Check for same-day multiple logins (session issues)
  let sameDayMultiple = 0;
  let differentDays = 0;

  for (const [_, data] of multipleLoginUsers) {
    const uniqueDates = new Set(data.timestamps.map(d => d.toISOString().split('T')[0]));
    if (uniqueDates.size < data.count) {
      sameDayMultiple++;
    }
    if (uniqueDates.size > 1) {
      differentDays++;
    }
  }

  console.log(`Users logging in multiple times SAME day: ${sameDayMultiple} (possible session/refresh issues)`);
  console.log(`Users logging in on DIFFERENT days: ${differentDays} (returning users - good!)`);

  await prisma.$disconnect();
}

analyzeMultipleLogins();

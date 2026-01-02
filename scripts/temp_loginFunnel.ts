import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function getLoginFunnel() {
  const startDate = new Date('2024-12-25T00:00:00.000Z');

  // Exclude test accounts
  const excludeEmails = ['mohit000pareek@gmail.com', 'mohit.pareek@scaler.com'];

  // 1. Login Page Views - count total events (can't track unique anonymous visitors)
  const loginPageEvents = await prisma.analyticsEvent.count({
    where: {
      eventType: 'we_page_load',
      page: '/login',
      timestamp: { gte: startDate }
    }
  });

  // 2. OTP Requested - unique emails (normalized, excluding test & typos)
  const otpRequested = await prisma.analyticsEvent.findMany({
    where: {
      eventType: 'auth_event',
      eventAction: 'otp_requested',
      timestamp: { gte: startDate }
    },
    select: { userEmail: true }
  });

  // Filter and normalize emails
  const isValidEmail = (email: string): boolean => {
    const hasTypo =
      email.includes('.con') ||
      email.includes('.comm') ||
      email.includes('gmial') ||
      email.includes('gmal') ||
      email.includes('gmil');
    return !hasTypo;
  };

  const otpEmails = new Set(
    otpRequested
      .map(e => e.userEmail?.toLowerCase().trim())
      .filter(email => email && !excludeEmails.includes(email) && isValidEmail(email))
  );

  // 3. Login Success - unique users (excluding test accounts)
  const testUsers = await prisma.user.findMany({
    where: { email: { in: excludeEmails } },
    select: { id: true }
  });
  const testUserIds = testUsers.map(u => u.id);

  const loginSuccess = await prisma.analyticsEvent.findMany({
    where: {
      eventType: 'auth_event',
      eventAction: 'login_success',
      timestamp: { gte: startDate },
      userId: { notIn: testUserIds }
    },
    select: { userId: true }
  });
  const uniqueLoginSuccess = new Set(loginSuccess.map(e => e.userId).filter(Boolean)).size;

  // 4. Dashboard Views - unique users (excluding test accounts)
  const dashboardViews = await prisma.analyticsEvent.findMany({
    where: {
      eventType: 'we_page_load',
      page: '/dashboard',
      timestamp: { gte: startDate },
      userId: { notIn: testUserIds }
    },
    select: { userId: true }
  });
  const uniqueDashboardUsers = new Set(dashboardViews.map(e => e.userId).filter(Boolean)).size;

  console.log('=== LOGIN FUNNEL (25th Dec onwards) ===');
  console.log('(Excluding test accounts, typos normalized)\n');

  console.log('```');
  console.log('Login Page Viewed');
  console.log(`    ↓ ${((otpEmails.size / loginPageEvents) * 100).toFixed(1)}%`);
  console.log('OTP Requested');
  console.log(`    ↓ ${((uniqueLoginSuccess / otpEmails.size) * 100).toFixed(1)}%`);
  console.log('Login Success');
  console.log(`    ↓ ${((uniqueDashboardUsers / uniqueLoginSuccess) * 100).toFixed(1)}%`);
  console.log('Dashboard Viewed');
  console.log('```\n');

  console.log('| # | Step | Count | % of Previous | Drop-off |');
  console.log('|---|------|-------|---------------|----------|');
  console.log(`| 1 | Login Page Viewed | ${loginPageEvents} events | - | - |`);
  console.log(`| 2 | OTP Requested | ${otpEmails.size} users | ${((otpEmails.size / loginPageEvents) * 100).toFixed(1)}% | ${loginPageEvents - otpEmails.size} |`);
  console.log(`| 3 | Login Success | ${uniqueLoginSuccess} users | ${((uniqueLoginSuccess / otpEmails.size) * 100).toFixed(1)}% | ${otpEmails.size - uniqueLoginSuccess} |`);
  console.log(`| 4 | Dashboard Viewed | ${uniqueDashboardUsers} users | ${((uniqueDashboardUsers / uniqueLoginSuccess) * 100).toFixed(1)}% | ${uniqueLoginSuccess - uniqueDashboardUsers} |`);

  console.log('\n=== KEY METRICS ===\n');
  console.log(`| Metric | Value |`);
  console.log(`|--------|-------|`);
  console.log(`| Login Page → OTP Request | ${((otpEmails.size / loginPageEvents) * 100).toFixed(1)}% |`);
  console.log(`| OTP → Login Success | ${((uniqueLoginSuccess / otpEmails.size) * 100).toFixed(1)}% |`);
  console.log(`| Login → Dashboard | ${((uniqueDashboardUsers / uniqueLoginSuccess) * 100).toFixed(1)}% |`);
  console.log(`| **Overall (Login Page → Dashboard)** | **${((uniqueDashboardUsers / loginPageEvents) * 100).toFixed(1)}%** |`);

  await prisma.$disconnect();
}

getLoginFunnel();

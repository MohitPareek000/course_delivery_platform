import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function analyzeOtpDropoff() {
  const startDate = new Date('2024-12-25T00:00:00.000Z');

  // Get all emails that requested OTP (normalize to lowercase)
  const otpRequested = await prisma.analyticsEvent.findMany({
    where: {
      eventType: 'auth_event',
      eventAction: 'otp_requested',
      timestamp: { gte: startDate }
    },
    select: { userEmail: true }
  });
  const otpEmails = new Set(
    otpRequested
      .map(e => e.userEmail?.toLowerCase().trim())
      .filter(Boolean)
  );

  // Get all emails that successfully logged in (normalize to lowercase)
  const loginSuccess = await prisma.analyticsEvent.findMany({
    where: {
      eventType: 'auth_event',
      eventAction: 'login_success',
      timestamp: { gte: startDate }
    },
    select: { userEmail: true }
  });
  const successEmails = new Set(
    loginSuccess
      .map(e => e.userEmail?.toLowerCase().trim())
      .filter(Boolean)
  );

  // Get all emails that had failed login (normalize to lowercase)
  const loginFailed = await prisma.analyticsEvent.findMany({
    where: {
      eventType: 'auth_event',
      eventAction: 'login_failed',
      timestamp: { gte: startDate }
    },
    select: { userEmail: true }
  });
  const failedEmails = new Set(
    loginFailed
      .map(e => e.userEmail?.toLowerCase().trim())
      .filter(Boolean)
  );

  // Filter out obvious typos (invalid email patterns)
  const isValidEmail = (email: string): boolean => {
    // Must end with valid domain
    const validDomains = ['.com', '.in', '.org', '.net', '.edu', '.co', '.io', '.ai'];
    const hasValidDomain = validDomains.some(d => email.endsWith(d));

    // Check for common typos
    const hasTypo =
      email.includes('.con') ||
      email.includes('.comm') ||
      email.includes('gmial') ||
      email.includes('gmal') ||
      email.includes('gmil') ||
      email.includes('gmaill') ||
      email.includes('yahooo') ||
      email.includes('outloo');

    return hasValidDomain && !hasTypo;
  };

  // Find emails that requested OTP but never logged in (excluding typos)
  const droppedEmails: string[] = [];
  const typoEmails: string[] = [];

  otpEmails.forEach(email => {
    if (email && !successEmails.has(email)) {
      if (isValidEmail(email)) {
        droppedEmails.push(email);
      } else {
        typoEmails.push(email);
      }
    }
  });

  // Exclude test accounts
  const excludeEmails = ['mohit000pareek@gmail.com', 'mohit.pareek@scaler.com'];
  const filteredOtpEmails = [...otpEmails].filter(e => !excludeEmails.includes(e || ''));
  const filteredSuccessEmails = [...successEmails].filter(e => !excludeEmails.includes(e || ''));
  const filteredDroppedEmails = droppedEmails.filter(e => !excludeEmails.includes(e));

  console.log('=== OTP DROP-OFF ANALYSIS (25th Dec onwards) ===');
  console.log('(Case-normalized, typos excluded, test accounts excluded)\n');

  console.log(`| Metric | Count |`);
  console.log(`|--------|-------|`);
  console.log(`| Unique emails requested OTP | ${filteredOtpEmails.length} |`);
  console.log(`| Unique emails logged in | ${filteredSuccessEmails.length} |`);
  console.log(`| Emails with typos (excluded) | ${typoEmails.length} |`);
  console.log(`| Emails that dropped off | ${filteredDroppedEmails.length} |`);
  console.log(`| Drop-off rate | ${((filteredDroppedEmails.length / filteredOtpEmails.length) * 100).toFixed(1)}% |`);
  console.log(`| **Success rate** | **${((filteredSuccessEmails.length / filteredOtpEmails.length) * 100).toFixed(1)}%** |`);

  if (typoEmails.length > 0) {
    console.log('\n=== TYPO EMAILS (excluded from funnel) ===\n');
    typoEmails.forEach((email, i) => {
      console.log(`${i + 1}. ${email}`);
    });
  }

  if (filteredDroppedEmails.length > 0) {
    console.log('\n=== VALID EMAILS THAT DROPPED OFF ===\n');
    console.log('| # | Email | Had Failed Attempt? |');
    console.log('|---|-------|---------------------|');

    for (let i = 0; i < filteredDroppedEmails.length; i++) {
      const email = filteredDroppedEmails[i];
      const hadFailed = failedEmails.has(email) ? 'Yes' : 'No';
      console.log(`| ${i + 1} | ${email} | ${hadFailed} |`);
    }
  }

  // Summary
  const droppedWithFailure = filteredDroppedEmails.filter(e => failedEmails.has(e)).length;
  const droppedWithoutFailure = filteredDroppedEmails.length - droppedWithFailure;

  console.log('\n=== DROP-OFF REASONS ===\n');
  console.log(`| Reason | Count | % |`);
  console.log(`|--------|-------|---|`);
  console.log(`| Failed OTP attempt (wrong OTP) | ${droppedWithFailure} | ${filteredDroppedEmails.length > 0 ? ((droppedWithFailure / filteredDroppedEmails.length) * 100).toFixed(1) : 0}% |`);
  console.log(`| Never attempted (abandoned/expired) | ${droppedWithoutFailure} | ${filteredDroppedEmails.length > 0 ? ((droppedWithoutFailure / filteredDroppedEmails.length) * 100).toFixed(1) : 0}% |`);

  await prisma.$disconnect();
}

analyzeOtpDropoff();

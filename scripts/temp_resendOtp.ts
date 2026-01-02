import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function analyzeResendOtp() {
  const startDate = new Date('2024-12-25T00:00:00.000Z');

  // Exclude test accounts
  const excludeEmails = ['mohit000pareek@gmail.com', 'mohit.pareek@scaler.com'];

  // Get all OTP requested events
  const otpRequested = await prisma.analyticsEvent.findMany({
    where: {
      eventType: 'auth_event',
      eventAction: 'otp_requested',
      timestamp: { gte: startDate }
    },
    select: { userEmail: true }
  });

  // Normalize emails and count per email
  const emailCounts: Record<string, number> = {};

  for (const event of otpRequested) {
    const email = event.userEmail?.toLowerCase().trim();
    if (email && !excludeEmails.includes(email)) {
      emailCounts[email] = (emailCounts[email] || 0) + 1;
    }
  }

  // Count stats
  const totalEmails = Object.keys(emailCounts).length;
  const totalOtpEvents = Object.values(emailCounts).reduce((a, b) => a + b, 0);
  const singleOtpUsers = Object.values(emailCounts).filter(c => c === 1).length;
  const multipleOtpUsers = Object.values(emailCounts).filter(c => c > 1).length;
  const resendEvents = totalOtpEvents - totalEmails; // Extra OTP requests beyond first

  console.log('=== RESEND OTP ANALYSIS (25th Dec onwards) ===');
  console.log('(Excluding test accounts)\n');

  console.log('| Metric | Count |');
  console.log('|--------|-------|');
  console.log(`| Total OTP Events | ${totalOtpEvents} |`);
  console.log(`| Unique Emails | ${totalEmails} |`);
  console.log(`| Users with 1 OTP request | ${singleOtpUsers} |`);
  console.log(`| Users who resent OTP (2+) | ${multipleOtpUsers} |`);
  console.log(`| Total Resend Events | ${resendEvents} |`);
  console.log(`| **Resend Rate** | **${((multipleOtpUsers / totalEmails) * 100).toFixed(1)}%** |`);
  console.log(`| Avg OTP per User | ${(totalOtpEvents / totalEmails).toFixed(2)} |`);

  // Distribution of OTP requests per user
  const distribution: Record<number, number> = {};
  for (const count of Object.values(emailCounts)) {
    distribution[count] = (distribution[count] || 0) + 1;
  }

  console.log('\n=== OTP REQUEST DISTRIBUTION ===\n');
  console.log('| OTP Requests | Users | % |');
  console.log('|--------------|-------|---|');

  for (const [count, users] of Object.entries(distribution).sort((a, b) => Number(a[0]) - Number(b[0]))) {
    console.log(`| ${count} | ${users} | ${((users / totalEmails) * 100).toFixed(1)}% |`);
  }

  // Show users who resent OTP multiple times
  const frequentResenders = Object.entries(emailCounts)
    .filter(([_, count]) => count >= 3)
    .sort((a, b) => b[1] - a[1]);

  if (frequentResenders.length > 0) {
    console.log('\n=== USERS WHO REQUESTED OTP 3+ TIMES ===\n');
    console.log('| Email | OTP Requests |');
    console.log('|-------|--------------|');

    for (const [email, count] of frequentResenders) {
      console.log(`| ${email} | ${count} |`);
    }
  }

  await prisma.$disconnect();
}

analyzeResendOtp();

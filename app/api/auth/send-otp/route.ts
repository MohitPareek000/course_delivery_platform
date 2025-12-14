import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { sendOTPEmail } from '@/lib/email/ses';

// Generate a 4-digit OTP
function generateOTP(): string {
  return Math.floor(1000 + Math.random() * 9000).toString();
}

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Check for resend throttle
    const throttleSeconds = parseInt(process.env.OTP_RESEND_THROTTLE_SECONDS || '60');
    const lastOTP = await prisma.oTP.findFirst({
      where: { email },
      orderBy: { createdAt: 'desc' },
    });

    if (lastOTP) {
      const timeSinceLastOTP = (Date.now() - lastOTP.createdAt.getTime()) / 1000;
      if (timeSinceLastOTP < throttleSeconds) {
        const waitTime = Math.ceil(throttleSeconds - timeSinceLastOTP);
        return NextResponse.json(
          {
            error: `Please wait ${waitTime} seconds before requesting a new OTP`,
            waitTime
          },
          { status: 429 } // 429 Too Many Requests
        );
      }
    }

    // Generate OTP
    const otp = generateOTP();

    // Store OTP in database (expires in configurable minutes)
    const expiryMinutes = parseInt(process.env.OTP_EXPIRY_MINUTES || '10');
    const expiresAt = new Date(Date.now() + expiryMinutes * 60 * 1000);

    await prisma.oTP.create({
      data: {
        email,
        otp,
        expiresAt,
      },
    });

    // Send OTP via AWS SES
    try {
      await sendOTPEmail({ to: email, otp });
    } catch (emailError) {
      console.error('Error sending OTP email via AWS SES:', emailError);
      // Continue anyway - for development, we'll return the OTP in response
    }

    // In development, return the OTP (remove this in production!)
    if (process.env.NODE_ENV === 'development') {
      return NextResponse.json({
        message: 'OTP sent successfully',
        otp, // Only for development
      });
    }

    return NextResponse.json({ message: 'OTP sent successfully' });
  } catch (error) {
    console.error('Error sending OTP:', error);
    return NextResponse.json(
      { error: 'Failed to send OTP' },
      { status: 500 }
    );
  }
}

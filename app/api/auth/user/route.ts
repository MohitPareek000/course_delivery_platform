import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { auth } from '@/lib/auth';

// GET - Get current user session
export async function GET() {
  try {
    const session = await auth();

    if (!session?.user) {
      return NextResponse.json(
        { error: 'Not authenticated' },
        { status: 401 }
      );
    }

    return NextResponse.json({ user: session.user }, { status: 200 });
  } catch (error: any) {
    console.error('Error getting user session:', error);
    return NextResponse.json(
      { error: 'Failed to get user session', details: error.message },
      { status: 500 }
    );
  }
}

// POST - Find or create user by email
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, name } = body;

    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      );
    }

    // Find or create user
    const user = await prisma.user.upsert({
      where: { email },
      update: {
        // Update name if provided
        ...(name && { name }),
      },
      create: {
        email,
        name: name || email.split('@')[0], // Use email prefix as default name
      },
    });

    return NextResponse.json({ user }, { status: 200 });
  } catch (error: any) {
    console.error('Error finding/creating user:', error);
    return NextResponse.json(
      { error: 'Failed to find/create user', details: error.message },
      { status: 500 }
    );
  }
}

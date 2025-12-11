import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// GET - Retrieve progress for a specific user and module
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const userId = searchParams.get('userId');
    const moduleId = searchParams.get('moduleId');

    if (!userId || !moduleId) {
      return NextResponse.json(
        { error: 'userId and moduleId are required' },
        { status: 400 }
      );
    }

    const progress = await prisma.userProgress.findUnique({
      where: {
        userId_moduleId: {
          userId,
          moduleId,
        },
      },
    });

    return NextResponse.json({ progress });
  } catch (error) {
    console.error('Error fetching progress:', error);
    return NextResponse.json(
      { error: 'Failed to fetch progress' },
      { status: 500 }
    );
  }
}

// POST - Create or update progress
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { userId, moduleId, watchedDuration, isCompleted } = body;

    if (!userId || !moduleId || typeof watchedDuration !== 'number') {
      return NextResponse.json(
        { error: 'userId, moduleId, and watchedDuration are required' },
        { status: 400 }
      );
    }

    const now = new Date();

    // Check if progress already exists and is completed
    const existingProgress = await prisma.userProgress.findUnique({
      where: {
        userId_moduleId: {
          userId,
          moduleId,
        },
      },
    });

    // IMPORTANT: Never set isCompleted back to false once it's true
    // This prevents video player progress updates from overwriting completion status
    const shouldBeCompleted = isCompleted || existingProgress?.isCompleted || false;

    // Prepare update data
    const updateData: any = {
      watchedDuration,
      isCompleted: shouldBeCompleted,
      lastWatchedAt: now,
    };

    // Only set completedAt if being marked complete for the first time
    if (shouldBeCompleted && !existingProgress?.completedAt) {
      updateData.completedAt = now;
    }

    // Prepare create data
    const createData: any = {
      userId,
      moduleId,
      watchedDuration,
      isCompleted: isCompleted || false,
      lastWatchedAt: now,
    };

    // Only set completedAt if completed
    if (isCompleted) {
      createData.completedAt = now;
    }

    // Upsert progress (create or update)
    const progress = await prisma.userProgress.upsert({
      where: {
        userId_moduleId: {
          userId,
          moduleId,
        },
      },
      update: updateData,
      create: createData,
    });

    return NextResponse.json({ progress }, { status: 200 });
  } catch (error: any) {
    console.error('Error saving progress:', error);
    console.error('Error code:', error.code);
    console.error('Error message:', error.message);
    console.error('Error meta:', error.meta);
    return NextResponse.json(
      { error: 'Failed to save progress', details: error.message },
      { status: 500 }
    );
  }
}

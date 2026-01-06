import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getISTDate } from '@/lib/dateUtils';

// GET - Retrieve progress for a specific user and class
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const userId = searchParams.get('userId');
    const classId = searchParams.get('classId');

    if (!userId || !classId) {
      return NextResponse.json(
        { error: 'userId and classId are required' },
        { status: 400 }
      );
    }

    const progress = await prisma.userProgress.findUnique({
      where: {
        userId_classId: {
          userId,
          classId,
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
    const { userId, classId, watchedDuration, lastPosition, isCompleted } = body;

    if (!userId || !classId || typeof watchedDuration !== 'number') {
      return NextResponse.json(
        { error: 'userId, classId, and watchedDuration are required' },
        { status: 400 }
      );
    }

    const now = getISTDate();

    // Check if progress already exists and is completed
    const existingProgress = await prisma.userProgress.findUnique({
      where: {
        userId_classId: {
          userId,
          classId,
        },
      },
    });

    // IMPORTANT: Never set isCompleted back to false once it's true
    // This prevents video player progress updates from overwriting completion status
    const shouldBeCompleted = isCompleted || existingProgress?.isCompleted || false;

    // Prepare update data
    const updateData: any = {
      watchedDuration,
      lastPosition: lastPosition !== undefined ? lastPosition : 0,
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
      classId,
      watchedDuration,
      lastPosition: lastPosition !== undefined ? lastPosition : 0,
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
        userId_classId: {
          userId,
          classId,
        },
      },
      update: updateData,
      create: createData,
    });

    return NextResponse.json({ progress }, { status: 200 });
  } catch (error: any) {
    console.error('Error saving progress:', error?.message);
    return NextResponse.json(
      { error: 'Failed to save progress', details: error.message },
      { status: 500 }
    );
  }
}

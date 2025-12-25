import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

// Use global singleton to prevent multiple instances in development
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

const prisma = globalForPrisma.prisma ?? new PrismaClient();

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;

// GET - Fetch rating for a user's module or course
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');
    const courseId = searchParams.get('courseId');
    const moduleId = searchParams.get('moduleId'); // null for course rating

    if (!userId || !courseId) {
      return NextResponse.json(
        { error: 'userId and courseId are required' },
        { status: 400 }
      );
    }

    const rating = await prisma.rating.findFirst({
      where: {
        userId,
        courseId,
        moduleId: moduleId || null,
      },
    });

    return NextResponse.json({ rating });
  } catch (error) {
    console.error('Error fetching rating:', error);
    return NextResponse.json(
      { error: 'Failed to fetch rating' },
      { status: 500 }
    );
  }
}

// POST - Create or update a rating
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { userId, courseId, moduleId, rating, feedback, ratingType } = body;


    if (!userId || !courseId || !rating || !ratingType) {
      return NextResponse.json(
        { error: 'userId, courseId, rating, and ratingType are required' },
        { status: 400 }
      );
    }

    if (rating < 1 || rating > 5) {
      return NextResponse.json(
        { error: 'Rating must be between 1 and 5' },
        { status: 400 }
      );
    }

    if (ratingType !== 'module' && ratingType !== 'course') {
      return NextResponse.json(
        { error: 'ratingType must be "module" or "course"' },
        { status: 400 }
      );
    }

    // Handle null moduleId specially since Prisma upsert doesn't work well with null in composite keys
    const normalizedModuleId = moduleId || null;

    // First, try to find existing rating
    const existingRating = await prisma.rating.findFirst({
      where: {
        userId,
        courseId,
        moduleId: normalizedModuleId,
      },
    });

    let savedRating;

    if (existingRating) {
      // Update existing rating
      savedRating = await prisma.rating.update({
        where: { id: existingRating.id },
        data: {
          rating,
          feedback: feedback || null,
          ratingType,
        },
      });
    } else {
      // Create new rating
      savedRating = await prisma.rating.create({
        data: {
          userId,
          courseId,
          moduleId: normalizedModuleId,
          rating,
          feedback: feedback || null,
          ratingType,
        },
      });
    }

    return NextResponse.json({ rating: savedRating });
  } catch (error: any) {
    console.error('Error saving rating:', error?.message);
    return NextResponse.json(
      { error: 'Failed to save rating', details: error?.message },
      { status: 500 }
    );
  }
}

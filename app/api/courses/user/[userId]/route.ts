import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// GET - Retrieve courses for a specific user
export async function GET(
  request: NextRequest,
  { params }: { params: { userId: string } }
) {
  try {
    const { userId } = params;

    if (!userId) {
      return NextResponse.json(
        { error: 'userId is required' },
        { status: 400 }
      );
    }

    // Get course access records for the user
    const courseAccess = await prisma.courseAccess.findMany({
      where: {
        userId,
      },
      include: {
        course: {
          include: {
            modules: {
              include: {
                topics: {
                  include: {
                    classes: {
                      orderBy: {
                        order: 'asc',
                      },
                    },
                  },
                  orderBy: {
                    order: 'asc',
                  },
                },
              },
              orderBy: {
                order: 'asc',
              },
            },
            topics: {
              include: {
                classes: {
                  orderBy: {
                    order: 'asc',
                  },
                },
              },
              orderBy: {
                order: 'asc',
              },
            },
          },
        },
      },
    });

    // Extract courses with full nested data
    const courses = courseAccess.map((access) => access.course);

    return NextResponse.json({ courses });
  } catch (error) {
    console.error('Error fetching user courses:', error);
    return NextResponse.json(
      { error: 'Failed to fetch courses' },
      { status: 500 }
    );
  }
}

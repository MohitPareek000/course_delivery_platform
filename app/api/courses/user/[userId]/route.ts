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
        course: true, // Include the full course details
      },
    });

    // Extract just the courses
    const courses = courseAccess.map((access) => ({
      id: access.course.id,
      title: access.course.title,
      description: access.course.description,
      type: access.course.type,
      role: access.course.role,
      skill: access.course.skill,
      companyName: access.course.companyName,
      thumbnailUrl: access.course.thumbnailUrl,
      createdAt: access.course.createdAt,
    }));

    return NextResponse.json({ courses });
  } catch (error) {
    console.error('Error fetching user courses:', error);
    return NextResponse.json(
      { error: 'Failed to fetch courses' },
      { status: 500 }
    );
  }
}

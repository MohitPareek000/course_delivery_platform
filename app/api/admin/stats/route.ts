import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const [totalCourses, totalUsers, totalClasses, totalAccess] = await Promise.all([
      prisma.course.count(),
      prisma.user.count(),
      prisma.class.count(),
      prisma.courseAccess.count(),
    ]);

    return NextResponse.json({
      totalCourses,
      totalUsers,
      totalClasses,
      totalAccess,
    });
  } catch (error) {
    console.error("Failed to fetch admin stats:", error);
    return NextResponse.json(
      { error: "Failed to fetch stats" },
      { status: 500 }
    );
  }
}

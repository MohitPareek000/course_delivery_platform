import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const courses = await prisma.course.findMany({
      include: {
        _count: {
          select: {
            modules: true,
            topics: true,
          },
        },
        modules: {
          orderBy: { order: "asc" },
          include: {
            topics: {
              orderBy: { order: "asc" },
              include: {
                classes: {
                  orderBy: { order: "asc" },
                },
              },
            },
          },
        },
      },
      orderBy: { createdAt: "desc" },
    });

    // Calculate total classes for each course
    const coursesWithStats = courses.map((course) => {
      let totalClasses = 0;
      course.modules.forEach((mod) => {
        mod.topics.forEach((topic) => {
          totalClasses += topic.classes.length;
        });
      });

      return {
        ...course,
        totalClasses,
        totalModules: course._count.modules,
        totalTopics: course._count.topics,
      };
    });

    return NextResponse.json(coursesWithStats);
  } catch (error) {
    console.error("Failed to fetch courses:", error);
    return NextResponse.json(
      { error: "Failed to fetch courses" },
      { status: 500 }
    );
  }
}

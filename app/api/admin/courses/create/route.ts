import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

interface ClassData {
  title: string;
  description?: string;
  contentType: "video" | "text" | "contest";
  videoUrl?: string;
  textContent?: string;
  contestUrl?: string;
  duration: number;
  order: number;
}

interface TopicData {
  title: string;
  order: number;
  classes: ClassData[];
}

interface ModuleData {
  title: string;
  description: string;
  order: number;
  learningOutcomes: string[];
  topics: TopicData[];
}

interface CourseData {
  id: string;
  title: string;
  description: string;
  type: string;
  role?: string;
  skill?: string;
  companyName?: string;
  thumbnailUrl?: string;
  modules: ModuleData[];
}

export async function POST(request: NextRequest) {
  try {
    const body: CourseData = await request.json();

    // Check if course with this ID already exists
    const existingCourse = await prisma.course.findUnique({
      where: { id: body.id },
    });

    if (existingCourse) {
      return NextResponse.json(
        { error: `Course with ID "${body.id}" already exists` },
        { status: 400 }
      );
    }

    // Create the course
    const course = await prisma.course.create({
      data: {
        id: body.id,
        title: body.title,
        description: body.description,
        type: body.type,
        role: body.role || null,
        skill: body.skill || null,
        companyName: body.companyName || null,
        thumbnailUrl: body.thumbnailUrl || null,
      },
    });

    // Create modules, topics, and classes
    for (const moduleData of body.modules) {
      const module = await prisma.module.create({
        data: {
          courseId: course.id,
          title: moduleData.title,
          description: moduleData.description,
          order: moduleData.order,
          learningOutcomes: moduleData.learningOutcomes,
        },
      });

      for (const topicData of moduleData.topics) {
        const topic = await prisma.topic.create({
          data: {
            moduleId: module.id,
            courseId: course.id,
            title: topicData.title,
            order: topicData.order,
          },
        });

        for (const classData of topicData.classes) {
          await prisma.class.create({
            data: {
              topicId: topic.id,
              title: classData.title,
              description: classData.description || null,
              contentType: classData.contentType,
              videoUrl: classData.videoUrl || null,
              textContent: classData.textContent || null,
              contestUrl: classData.contestUrl || null,
              duration: classData.duration,
              order: classData.order,
            },
          });
        }
      }
    }

    return NextResponse.json(course);
  } catch (error: any) {
    console.error("Failed to create course:", error);
    return NextResponse.json(
      { error: error.message || "Failed to create course" },
      { status: 500 }
    );
  }
}

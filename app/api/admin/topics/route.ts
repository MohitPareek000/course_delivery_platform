import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { moduleId, courseId, title, order } = body;

    const topic = await prisma.topic.create({
      data: {
        moduleId,
        courseId,
        title,
        order: order || 1,
      },
    });

    return NextResponse.json(topic);
  } catch (error) {
    console.error("Failed to create topic:", error);
    return NextResponse.json(
      { error: "Failed to create topic" },
      { status: 500 }
    );
  }
}

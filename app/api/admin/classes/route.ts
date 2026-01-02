import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      topicId,
      title,
      description,
      contentType,
      videoUrl,
      textContent,
      contestUrl,
      duration,
      order,
    } = body;

    const classItem = await prisma.class.create({
      data: {
        topicId,
        title,
        description: description || null,
        contentType: contentType || "text",
        videoUrl: videoUrl || null,
        textContent: textContent || null,
        contestUrl: contestUrl || null,
        duration: duration || 300,
        order: order || 1,
      },
    });

    return NextResponse.json(classItem);
  } catch (error) {
    console.error("Failed to create class:", error);
    return NextResponse.json(
      { error: "Failed to create class" },
      { status: 500 }
    );
  }
}

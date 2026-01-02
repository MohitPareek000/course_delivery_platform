import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { courseId, title, description, order, learningOutcomes } = body;

    const module = await prisma.module.create({
      data: {
        courseId,
        title,
        description: description || "",
        order: order || 1,
        learningOutcomes: learningOutcomes || [],
      },
    });

    return NextResponse.json(module);
  } catch (error) {
    console.error("Failed to create module:", error);
    return NextResponse.json(
      { error: "Failed to create module" },
      { status: 500 }
    );
  }
}

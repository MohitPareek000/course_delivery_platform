import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ moduleId: string }> }
) {
  try {
    const { moduleId } = await params;
    const body = await request.json();
    const { title, description, order, learningOutcomes } = body;

    const module = await prisma.module.update({
      where: { id: moduleId },
      data: {
        title,
        description,
        order,
        learningOutcomes,
      },
    });

    return NextResponse.json(module);
  } catch (error) {
    console.error("Failed to update module:", error);
    return NextResponse.json(
      { error: "Failed to update module" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ moduleId: string }> }
) {
  try {
    const { moduleId } = await params;

    // Delete all classes in topics of this module
    const topics = await prisma.topic.findMany({
      where: { moduleId },
      select: { id: true },
    });

    await prisma.class.deleteMany({
      where: { topicId: { in: topics.map((t) => t.id) } },
    });

    await prisma.topic.deleteMany({
      where: { moduleId },
    });

    await prisma.module.delete({
      where: { id: moduleId },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Failed to delete module:", error);
    return NextResponse.json(
      { error: "Failed to delete module" },
      { status: 500 }
    );
  }
}

import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ topicId: string }> }
) {
  try {
    const { topicId } = await params;
    const body = await request.json();
    const { title, order } = body;

    const topic = await prisma.topic.update({
      where: { id: topicId },
      data: {
        title,
        order,
      },
    });

    return NextResponse.json(topic);
  } catch (error) {
    console.error("Failed to update topic:", error);
    return NextResponse.json(
      { error: "Failed to update topic" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ topicId: string }> }
) {
  try {
    const { topicId } = await params;

    await prisma.class.deleteMany({
      where: { topicId },
    });

    await prisma.topic.delete({
      where: { id: topicId },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Failed to delete topic:", error);
    return NextResponse.json(
      { error: "Failed to delete topic" },
      { status: 500 }
    );
  }
}

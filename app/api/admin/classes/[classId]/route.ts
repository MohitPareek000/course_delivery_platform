import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ classId: string }> }
) {
  try {
    const { classId } = await params;
    const body = await request.json();
    const {
      title,
      description,
      contentType,
      videoUrl,
      textContent,
      contestUrl,
      duration,
      order,
    } = body;

    const classItem = await prisma.class.update({
      where: { id: classId },
      data: {
        title,
        description,
        contentType,
        videoUrl,
        textContent,
        contestUrl,
        duration,
        order,
      },
    });

    return NextResponse.json(classItem);
  } catch (error) {
    console.error("Failed to update class:", error);
    return NextResponse.json(
      { error: "Failed to update class" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ classId: string }> }
) {
  try {
    const { classId } = await params;

    await prisma.class.delete({
      where: { id: classId },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Failed to delete class:", error);
    return NextResponse.json(
      { error: "Failed to delete class" },
      { status: 500 }
    );
  }
}

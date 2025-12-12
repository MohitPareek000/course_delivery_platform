import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(
  request: Request,
  { params }: { params: { classId: string } }
) {
  try {
    const { classId } = params;

    // Fetch the class with its topic and course information
    const classItem = await prisma.class.findUnique({
      where: { id: classId },
      include: {
        topic: {
          include: {
            module: true,
            course: true,
          },
        },
      },
    });

    if (!classItem) {
      return NextResponse.json(
        { error: 'Class not found' },
        { status: 404 }
      );
    }

    // Get all classes in the same topic for navigation
    const topicClasses = await prisma.class.findMany({
      where: {
        topicId: classItem.topicId,
      },
      orderBy: {
        order: 'asc',
      },
    });

    // Find current class index
    const currentIndex = topicClasses.findIndex((c) => c.id === classId);

    // Determine next and previous classes
    let nextClass = null;
    let previousClass = null;

    // Next class in same topic
    if (currentIndex < topicClasses.length - 1) {
      nextClass = topicClasses[currentIndex + 1];
    } else {
      // Find next topic's first class
      const currentTopic = classItem.topic;
      const nextTopic = await prisma.topic.findFirst({
        where: {
          courseId: currentTopic.courseId,
          moduleId: currentTopic.moduleId,
          order: currentTopic.order + 1,
        },
        include: {
          classes: {
            orderBy: { order: 'asc' },
            take: 1,
          },
        },
      });

      if (nextTopic && nextTopic.classes.length > 0) {
        nextClass = nextTopic.classes[0];
      }
    }

    // Previous class in same topic
    if (currentIndex > 0) {
      previousClass = topicClasses[currentIndex - 1];
    } else {
      // Find previous topic's last class
      const currentTopic = classItem.topic;
      const previousTopic = await prisma.topic.findFirst({
        where: {
          courseId: currentTopic.courseId,
          moduleId: currentTopic.moduleId,
          order: currentTopic.order - 1,
        },
        include: {
          classes: {
            orderBy: { order: 'desc' },
            take: 1,
          },
        },
      });

      if (previousTopic && previousTopic.classes.length > 0) {
        previousClass = previousTopic.classes[0];
      }
    }

    return NextResponse.json({
      class: classItem,
      course: classItem.topic.course,
      nextClass,
      previousClass,
    });
  } catch (error) {
    console.error('Error fetching class:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

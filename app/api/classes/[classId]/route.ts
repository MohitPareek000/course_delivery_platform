import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(
  _request: Request,
  { params }: { params: { classId: string } }
) {
  try {
    const { classId } = params;

    // Fetch the class with its topic, course, and module information in a single query
    const classItem = await prisma.class.findUnique({
      where: { id: classId },
      include: {
        topic: {
          include: {
            module: true,
            course: {
              include: {
                // Get all modules and topics with classes in one query
                modules: {
                  orderBy: { order: 'asc' },
                  include: {
                    topics: {
                      orderBy: { order: 'asc' },
                      include: {
                        classes: {
                          orderBy: { order: 'asc' },
                          select: { id: true, title: true, order: true },
                        },
                      },
                    },
                  },
                },
                // For courses without modules
                topics: {
                  where: { moduleId: null },
                  orderBy: { order: 'asc' },
                  include: {
                    classes: {
                      orderBy: { order: 'asc' },
                      select: { id: true, title: true, order: true },
                    },
                  },
                },
              },
            },
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

    const currentTopic = classItem.topic;
    const course = currentTopic.course;
    const moduleId = currentTopic.moduleId;

    // Build a flat list of all classes in order for navigation
    let allClasses: { id: string; title: string; order: number; topicId?: string }[] = [];

    if (moduleId && course.modules.length > 0) {
      // Course with modules - get classes from current module only for navigation
      const currentModule = course.modules.find(m => m.id === moduleId);
      if (currentModule) {
        for (const topic of currentModule.topics) {
          for (const cls of topic.classes) {
            allClasses.push({ ...cls, topicId: topic.id });
          }
        }
      }
    } else if (course.topics.length > 0) {
      // Course without modules
      for (const topic of course.topics) {
        for (const cls of topic.classes) {
          allClasses.push({ ...cls, topicId: topic.id });
        }
      }
    }

    // Find current class index
    const currentIndex = allClasses.findIndex((c) => c.id === classId);

    // Determine next and previous classes
    const nextClass = currentIndex < allClasses.length - 1 ? allClasses[currentIndex + 1] : null;
    const previousClass = currentIndex > 0 ? allClasses[currentIndex - 1] : null;

    // Determine if this is the last class of the module/course
    let isLastClassOfModule = false;
    let isLastClassOfCourse = false;

    if (moduleId && course.modules.length > 0) {
      // Check if last class in module
      isLastClassOfModule = currentIndex === allClasses.length - 1;

      // Check if this is the last module
      const lastModule = course.modules[course.modules.length - 1];
      if (lastModule && lastModule.id === moduleId && isLastClassOfModule) {
        isLastClassOfCourse = true;
      }
    } else {
      // Course without modules
      isLastClassOfCourse = currentIndex === allClasses.length - 1;
    }

    // Clean up the response - don't send the full nested structure
    const { modules: _modules, topics: _topics, ...courseData } = course;

    return NextResponse.json({
      class: classItem,
      course: courseData,
      module: currentTopic.module,
      nextClass,
      previousClass,
      isLastClassOfModule,
      isLastClassOfCourse,
    });
  } catch (error) {
    console.error('Error fetching class:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

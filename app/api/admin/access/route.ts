import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

interface SingleAccessRequest {
  type: "single";
  courseId: string;
  name: string;
  email: string;
}

interface BulkAccessRequest {
  type: "bulk";
  courseId: string;
  users: { name: string; email: string }[];
}

type AccessRequest = SingleAccessRequest | BulkAccessRequest;

export async function POST(request: NextRequest) {
  try {
    const body: AccessRequest = await request.json();

    if (body.type === "single") {
      // Single user access
      const { courseId, name, email } = body;

      // Check if course exists
      const course = await prisma.course.findUnique({
        where: { id: courseId },
      });

      if (!course) {
        return NextResponse.json(
          { error: `Course with ID "${courseId}" not found` },
          { status: 404 }
        );
      }

      // Create or update user
      const user = await prisma.user.upsert({
        where: { email: email.toLowerCase().trim() },
        update: { name: name.trim() },
        create: {
          email: email.toLowerCase().trim(),
          name: name.trim(),
        },
      });

      // Check if access already exists
      const existingAccess = await prisma.courseAccess.findUnique({
        where: {
          userId_courseId: {
            userId: user.id,
            courseId: courseId,
          },
        },
      });

      if (existingAccess) {
        return NextResponse.json({
          success: true,
          message: `User "${email}" already has access to this course`,
          created: 0,
          skipped: 1,
          user: { id: user.id, email: user.email, name: user.name },
        });
      }

      // Grant access
      await prisma.courseAccess.create({
        data: {
          userId: user.id,
          courseId: courseId,
        },
      });

      return NextResponse.json({
        success: true,
        message: `Access granted to "${email}" for course "${course.title}"`,
        created: 1,
        skipped: 0,
        user: { id: user.id, email: user.email, name: user.name },
      });
    } else if (body.type === "bulk") {
      // Bulk user access
      const { courseId, users } = body;

      // Check if course exists
      const course = await prisma.course.findUnique({
        where: { id: courseId },
      });

      if (!course) {
        return NextResponse.json(
          { error: `Course with ID "${courseId}" not found` },
          { status: 404 }
        );
      }

      let created = 0;
      let skipped = 0;
      const results: { email: string; status: "created" | "skipped" | "error"; message?: string }[] = [];

      for (const userData of users) {
        try {
          const email = userData.email.toLowerCase().trim();
          const name = userData.name.trim();

          if (!email) {
            results.push({ email: userData.email, status: "error", message: "Invalid email" });
            continue;
          }

          // Create or update user
          const user = await prisma.user.upsert({
            where: { email },
            update: { name: name || undefined },
            create: {
              email,
              name: name || null,
            },
          });

          // Check if access already exists
          const existingAccess = await prisma.courseAccess.findUnique({
            where: {
              userId_courseId: {
                userId: user.id,
                courseId: courseId,
              },
            },
          });

          if (existingAccess) {
            skipped++;
            results.push({ email, status: "skipped", message: "Already has access" });
            continue;
          }

          // Grant access
          await prisma.courseAccess.create({
            data: {
              userId: user.id,
              courseId: courseId,
            },
          });

          created++;
          results.push({ email, status: "created" });
        } catch (err: any) {
          results.push({ email: userData.email, status: "error", message: err.message });
        }
      }

      return NextResponse.json({
        success: true,
        message: `Processed ${users.length} users: ${created} created, ${skipped} skipped`,
        created,
        skipped,
        total: users.length,
        results,
      });
    }

    return NextResponse.json({ error: "Invalid request type" }, { status: 400 });
  } catch (error: any) {
    console.error("Failed to grant course access:", error);
    return NextResponse.json(
      { error: error.message || "Failed to grant course access" },
      { status: 500 }
    );
  }
}

// GET - List course access records with optional filtering
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const courseId = searchParams.get("courseId");
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "50");
    const skip = (page - 1) * limit;

    const where = courseId ? { courseId } : {};

    const [accessRecords, total] = await Promise.all([
      prisma.courseAccess.findMany({
        where,
        include: {
          user: {
            select: {
              id: true,
              email: true,
              name: true,
            },
          },
          course: {
            select: {
              id: true,
              title: true,
            },
          },
        },
        orderBy: { assignedAt: "desc" },
        skip,
        take: limit,
      }),
      prisma.courseAccess.count({ where }),
    ]);

    return NextResponse.json({
      accessRecords,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error: any) {
    console.error("Failed to fetch course access:", error);
    return NextResponse.json(
      { error: error.message || "Failed to fetch course access" },
      { status: 500 }
    );
  }
}

"use client";

import * as React from "react";
import { Sidebar } from "@/components/dashboard/Sidebar";
import { CourseCard } from "@/components/dashboard/CourseCard";
import { getUserCourses, calculateCourseProgress } from "@/lib/db/queries";
import { useRouter } from "next/navigation";
import { TrendingUp, BookOpen, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";

export default function DashboardPage() {
  const [userEmail, setUserEmail] = React.useState("");
  const router = useRouter();

  React.useEffect(() => {
    // Check if user is logged in
    const session = sessionStorage.getItem("user-session");
    if (!session) {
      router.push("/login");
      return;
    }

    const sessionData = JSON.parse(session);
    setUserEmail(sessionData.email);
  }, [router]);

  // Mock user ID (in real app, this would come from session)
  const userId = "user-1";

  // Get user's courses and calculate progress
  const userCourses = getUserCourses(userId);
  const coursesWithProgress = userCourses.map((course) => ({
    course,
    progress: calculateCourseProgress(userId, course.id),
  }));

  // Calculate stats
  const totalCourses = userCourses.length;
  const completedCourses = coursesWithProgress.filter(
    (c) => c.progress.progressPercentage === 100
  ).length;
  const inProgressCourses = coursesWithProgress.filter(
    (c) => c.progress.progressPercentage > 0 && c.progress.progressPercentage < 100
  ).length;

  const totalModules = coursesWithProgress.reduce(
    (sum, c) => sum + c.progress.totalModules,
    0
  );
  const completedModules = coursesWithProgress.reduce(
    (sum, c) => sum + c.progress.completedModules,
    0
  );

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar userName="Mohit" userEmail={userEmail} />

      <main className="flex-1 p-4 lg:p-8 pt-16 lg:pt-8">
        {/* Welcome Section */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-1">
            Welcome back, Mohit! 👋
          </h1>
          <p className="text-sm text-gray-600">
            Continue your learning journey and ace your interviews
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-white rounded-lg p-4 border shadow-sm">
            <div className="flex items-center justify-between mb-1">
              <p className="text-xs font-medium text-gray-600">Total Courses</p>
              <BookOpen className="w-4 h-4 text-primary" />
            </div>
            <p className="text-2xl font-bold text-gray-900">{totalCourses}</p>
            <p className="text-xs text-gray-500 mt-0.5">
              {inProgressCourses} in progress
            </p>
          </div>

          <div className="bg-white rounded-lg p-4 border shadow-sm">
            <div className="flex items-center justify-between mb-1">
              <p className="text-xs font-medium text-gray-600">Completed Courses</p>
              <CheckCircle2 className="w-4 h-4 text-green-500" />
            </div>
            <p className="text-2xl font-bold text-gray-900">{completedCourses}</p>
            <p className="text-xs text-gray-500 mt-0.5">
              {totalCourses - completedCourses} remaining
            </p>
          </div>

          <div className="bg-white rounded-lg p-4 border shadow-sm">
            <div className="flex items-center justify-between mb-1">
              <p className="text-xs font-medium text-gray-600">Modules Completed</p>
              <TrendingUp className="w-4 h-4 text-secondary" />
            </div>
            <p className="text-2xl font-bold text-gray-900">
              {completedModules}/{totalModules}
            </p>
            <p className="text-xs text-gray-500 mt-0.5">
              {totalModules > 0
                ? Math.round((completedModules / totalModules) * 100)
                : 0}
              % overall progress
            </p>
          </div>
        </div>

        {/* Courses Section */}
        <div className="mb-4">
          <h2 className="text-xl font-bold text-gray-900 mb-3">
            {coursesWithProgress.length === 1 ? "Your Course" : "My Courses"}
          </h2>
        </div>

        {/* Course Grid - Dynamic Layout */}
        {coursesWithProgress.length > 0 ? (
          <>
            <div
              className={cn(
                "grid gap-4",
                coursesWithProgress.length === 1
                  ? "grid-cols-1 max-w-md"
                  : coursesWithProgress.length === 2
                  ? "grid-cols-1 md:grid-cols-2"
                  : "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
              )}
            >
              {coursesWithProgress.map(({ course, progress }) => (
                <CourseCard key={course.id} course={course} progress={progress} />
              ))}
            </div>
          </>
        ) : (
          <div className="bg-white rounded-lg p-12 text-center border max-w-md mx-auto">
            <BookOpen className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              No courses assigned yet
            </h3>
            <p className="text-gray-600">
              Contact your administrator to get courses assigned to your account.
            </p>
          </div>
        )}
      </main>
    </div>
  );
}

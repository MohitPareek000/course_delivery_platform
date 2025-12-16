"use client";

import * as React from "react";
import { Sidebar } from "@/components/dashboard/Sidebar";
import { CourseCard } from "@/components/dashboard/CourseCard";
import { getUserCoursesFromDB } from "@/lib/db/dbQueries";
import { useRouter } from "next/navigation";
import { TrendingUp, BookOpen, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { useUserProgress } from "@/hooks/useUserProgress";
import { getCurrentUserSession } from "@/lib/auth";
import { LoadingPage } from "@/components/ui/loading-spinner";
import { useSession } from "next-auth/react";

export default function DashboardPage() {
  const [userSession, setUserSession] = React.useState<{
    userId: string;
    email: string;
    name: string;
  } | null>(null);
  const [userCourses, setUserCourses] = React.useState<any[]>([]);
  const [coursesLoading, setCoursesLoading] = React.useState(true);
  const router = useRouter();
  const { data: nextAuthSession, status } = useSession();

  React.useEffect(() => {
    // If NextAuth is still loading, wait
    if (status === "loading") {
      return;
    }

    // Check for OTP session in sessionStorage FIRST (takes precedence)
    const otpSession = getCurrentUserSession();
    if (otpSession) {
      setUserSession(otpSession);
      return;
    }

    // Only then check for NextAuth session (Google OAuth)
    if (nextAuthSession?.user) {
      const session = {
        userId: (nextAuthSession.user as any).id || "",
        email: nextAuthSession.user.email || "",
        name: nextAuthSession.user.name || nextAuthSession.user.email?.split('@')[0] || "Guest",
        loggedIn: true,
      };

      // Store in sessionStorage for consistency
      sessionStorage.setItem("user-session", JSON.stringify(session));
      setUserSession(session);
      return;
    }

    // If no session found at all, redirect to login
    router.push("/login");
  }, [router, nextAuthSession, status]);

  // Get user ID from session
  const userId = userSession?.userId || "";

  // Fetch progress from database
  const { isClassCompleted, isLoading, refreshProgress } = useUserProgress(userId);

  // Fetch user's courses from database - always fetch fresh on mount
  React.useEffect(() => {
    async function fetchCourses() {
      if (!userId) return;

      setCoursesLoading(true);
      const courses = await getUserCoursesFromDB(userId);
      setUserCourses(courses);
      setCoursesLoading(false);
    }

    // Always fetch fresh data when dashboard mounts
    if (userId) {
      fetchCourses();
    }
  }, [userId]);

  // Refresh progress when returning to dashboard
  React.useEffect(() => {
    refreshProgress();
  }, []); // Refresh when dashboard is accessed
  const coursesWithProgress = userCourses.map((courseData) => {
    // Calculate total classes from database data
    // For role-specific and company-specific courses, classes are in modules.topics
    // For skill-based courses, classes are in topics directly
    const isRoleOrCompanySpecific = courseData.type === 'role-specific' || courseData.type === 'company-specific';

    let allClasses: any[] = [];

    if (isRoleOrCompanySpecific) {
      // Only count classes from modules (not from course-level topics to avoid duplicates)
      allClasses = courseData.modules
        ? courseData.modules.flatMap((m: any) =>
            (m.topics || []).flatMap((t: any) => t.classes || [])
          )
        : [];
    } else {
      // For skill-based courses, count from course-level topics only
      allClasses = courseData.topics
        ? courseData.topics.flatMap((t: any) => t.classes || [])
        : [];
    }

    const totalModules = allClasses.length;
    const completedModules = allClasses.filter((classItem: any) =>
      isClassCompleted(classItem.id)
    ).length;

    return {
      course: courseData,
      progress: {
        courseId: courseData.id,
        totalModules,
        completedModules,
        progressPercentage:
          totalModules > 0 ? Math.round((completedModules / totalModules) * 100) : 0,
      },
    };
  });

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

  // Show loading state while fetching initial data
  if (coursesLoading || isLoading) {
    return (
      <LoadingPage
        message="Loading your courses"
        showSidebar={true}
        sidebarProps={{
          userName: userSession?.name || "",
          userEmail: userSession?.email || ""
        }}
      />
    );
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar userName={userSession?.name || ""} userEmail={userSession?.email || ""} />

      <main className="flex-1 p-4 lg:p-8 pt-16 lg:pt-8">
        {/* Container with max-width */}
        <div className="max-w-6xl mx-auto">
        {/* Welcome Section */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-1">
            Hey, {userSession?.name || "Guest"}!
          </h1>
          <p className="text-sm text-gray-600">
            Explore courses designed for your Career Growth
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
              <p className="text-xs font-medium text-gray-600">Classes Completed</p>
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
        </div>
      </main>
    </div>
  );
}

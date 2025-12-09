"use client";

import * as React from "react";
import { useParams, useRouter } from "next/navigation";
import { Sidebar } from "@/components/dashboard/Sidebar";
import { VideoPlayer } from "@/components/video/VideoPlayer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tooltip } from "@/components/ui/tooltip";
import {
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
} from "lucide-react";
import {
  getModuleById,
  getNextModule,
  getPreviousModule,
  getUserModuleProgress,
  getCourseById,
} from "@/lib/db/queries";
import { mockUserProgress } from "@/lib/db/mockData";

export default function ModulePlayerPage() {
  const params = useParams();
  const router = useRouter();
  const courseId = params.courseId as string;
  const moduleId = params.moduleId as string;
  const userId = "user-1"; // Mock user ID

  const module = getModuleById(moduleId);
  const course = getCourseById(courseId);
  const initialProgress = getUserModuleProgress(userId, moduleId);
  const nextModule = getNextModule(moduleId);
  const previousModule = getPreviousModule(moduleId);

  const [isCompleted, setIsCompleted] = React.useState(
    initialProgress?.isCompleted || false
  );
  const [showCompletionMessage, setShowCompletionMessage] = React.useState(false);
  const hasShownCompletionRef = React.useRef(false);

  const handleProgressUpdate = (watchedDuration: number, totalDuration: number) => {
    const watchPercentage = (watchedDuration / totalDuration) * 100;

    // Find or create progress entry
    const existingProgressIndex = mockUserProgress.findIndex(
      (p) => p.userId === userId && p.moduleId === moduleId
    );

    const now = new Date();

    if (existingProgressIndex !== -1) {
      // Update existing progress
      const wasAlreadyCompleted = mockUserProgress[existingProgressIndex].isCompleted;
      const shouldMarkComplete = watchPercentage >= 90;

      mockUserProgress[existingProgressIndex] = {
        ...mockUserProgress[existingProgressIndex],
        watchedDuration,
        lastWatchedAt: now,
        // Once completed, always keep it completed
        isCompleted: wasAlreadyCompleted || shouldMarkComplete,
        completedAt:
          wasAlreadyCompleted
            ? mockUserProgress[existingProgressIndex].completedAt
            : (shouldMarkComplete ? now : undefined),
      };
    } else {
      // Create new progress entry
      const shouldMarkComplete = watchPercentage >= 90;
      mockUserProgress.push({
        id: `progress-${Date.now()}`,
        userId,
        moduleId,
        watchedDuration,
        isCompleted: shouldMarkComplete,
        lastWatchedAt: now,
        completedAt: shouldMarkComplete ? now : undefined,
      });
    }

    // Mark as completed if watch percentage >= 90% (only once)
    if (watchPercentage >= 90 && !isCompleted && !hasShownCompletionRef.current) {
      hasShownCompletionRef.current = true;
      setIsCompleted(true);
      setShowCompletionMessage(true);
    }
  };

  if (!module || !course) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Module not found
          </h1>
          <Button onClick={() => router.push("/dashboard")}>
            Back to Dashboard
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />

      <main className="flex-1 p-4 lg:p-8">
        {/* Back Button - Below hamburger menu on mobile, normal position on desktop */}
        <div className="pt-12 lg:pt-0">
          <Button
            variant="ghost"
            onClick={() => router.push(`/course/${courseId}`)}
            className="mb-6 text-sm px-3 py-2 h-auto lg:px-4 lg:py-2 lg:text-base"
          >
            <ArrowLeft className="w-3 h-3 mr-1.5 lg:w-4 lg:h-4 lg:mr-2" />
            Back to Course
          </Button>
        </div>

        {/* Module Title Bar */}
        <div className="bg-white rounded-lg p-4 mb-4 shadow-sm border">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div className="flex-1 min-w-0">
              <h1 className="text-xl font-bold text-gray-900">{module.title}</h1>
              <p className="text-sm text-gray-500">{course.title}</p>
            </div>
            <Badge
              variant="secondary"
              className={`${isCompleted ? "bg-green-500" : "bg-blue-500"} self-start sm:self-auto shrink-0`}
            >
              <CheckCircle2 className="w-3 h-3 mr-1" />
              {isCompleted ? "Completed" : "In Progress"}
            </Badge>
          </div>
        </div>

        {/* Completion Message - Fixed height to prevent flicker */}
        <div className="mb-4" style={{ minHeight: showCompletionMessage ? 'auto' : '0' }}>
          {showCompletionMessage && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex items-center gap-3">
              <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-green-900">Module Completed!</h3>
                <p className="text-sm text-green-700">
                  Great job! You've completed this module.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Video Player - Constrained */}
        <div className="mb-4">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-lg p-4 shadow-sm border">
              <VideoPlayer
                videoUrl={module.videoUrl}
                onProgressUpdate={handleProgressUpdate}
                initialProgress={initialProgress?.watchedDuration || 0}
                moduleId={moduleId}
              />
            </div>
          </div>
        </div>

        {/* Mark as Complete Button - Mobile only (below video) */}
        {module.videoUrl.includes('youtube.com') && !isCompleted && (
          <div className="mb-4 sm:hidden">
            <Button
              onClick={() => {
                const estimatedDuration = module.duration || 600;
                handleProgressUpdate(estimatedDuration, estimatedDuration);
              }}
              className="bg-green-600 hover:bg-green-700 w-full"
            >
              <CheckCircle2 className="w-4 h-4 mr-2" />
              Mark as Complete
            </Button>
          </div>
        )}

        {/* Navigation Buttons - Mobile: side by side, Desktop: Previous left, Mark Complete & Next right */}
        <div className="flex gap-3 items-center justify-between max-w-4xl mx-auto">
          {/* Previous Button */}
          {previousModule ? (
            <Button
              variant="outline"
              onClick={() =>
                router.push(`/course/${courseId}/module/${previousModule.id}`)
              }
              className="flex-1 sm:flex-none"
            >
              <ChevronLeft className="w-4 h-4 mr-2" />
              Previous Class
            </Button>
          ) : (
            <div className="flex-1 sm:flex-none"></div>
          )}

          {/* Right side button group - Desktop only */}
          <div className="hidden sm:flex gap-3 items-center">
            {/* Mark as Complete Button - Desktop only */}
            {module.videoUrl.includes('youtube.com') && !isCompleted && (
              <Button
                onClick={() => {
                  const estimatedDuration = module.duration || 600;
                  handleProgressUpdate(estimatedDuration, estimatedDuration);
                }}
                className="bg-green-600 hover:bg-green-700"
              >
                <CheckCircle2 className="w-4 h-4 mr-2" />
                Mark as Complete
              </Button>
            )}

            {/* Next/Back Button - Desktop */}
            {nextModule ? (
              isCompleted ? (
                <Button
                  onClick={() =>
                    router.push(`/course/${courseId}/module/${nextModule.id}`)
                  }
                >
                  Next Class
                  <ChevronRight className="w-4 h-4 ml-2" />
                </Button>
              ) : (
                <Tooltip content="Complete this Class to Unlock">
                  <Button disabled className="cursor-not-allowed">
                    Next Class
                    <ChevronRight className="w-4 h-4 ml-2" />
                  </Button>
                </Tooltip>
              )
            ) : (
              <Button onClick={() => router.push(`/course/${courseId}`)}>
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Course
              </Button>
            )}
          </div>

          {/* Next/Back Button - Mobile only */}
          <div className="flex-1 sm:hidden">
            {nextModule ? (
              isCompleted ? (
                <Button
                  onClick={() =>
                    router.push(`/course/${courseId}/module/${nextModule.id}`)
                  }
                  className="w-full"
                >
                  Next Class
                  <ChevronRight className="w-4 h-4 ml-2" />
                </Button>
              ) : (
                <Tooltip content="Complete this Class to Unlock">
                  <Button disabled className="cursor-not-allowed w-full">
                    Next Class
                    <ChevronRight className="w-4 h-4 ml-2" />
                  </Button>
                </Tooltip>
              )
            ) : (
              <Button
                onClick={() => router.push(`/course/${courseId}`)}
                className="w-full"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Course
              </Button>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

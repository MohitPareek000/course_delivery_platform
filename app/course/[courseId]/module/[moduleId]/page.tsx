"use client";

import * as React from "react";
import { useParams, useRouter } from "next/navigation";
import { Sidebar } from "@/components/dashboard/Sidebar";
import { VideoPlayer } from "@/components/video/VideoPlayer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  FileText,
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

  const handleProgressUpdate = (watchedDuration: number, totalDuration: number) => {
    const watchPercentage = (watchedDuration / totalDuration) * 100;

    // Find or create progress entry
    const existingProgressIndex = mockUserProgress.findIndex(
      (p) => p.userId === userId && p.moduleId === moduleId
    );

    const now = new Date();

    if (existingProgressIndex !== -1) {
      // Update existing progress
      mockUserProgress[existingProgressIndex] = {
        ...mockUserProgress[existingProgressIndex],
        watchedDuration,
        lastWatchedAt: now,
        isCompleted: watchPercentage >= 98,
        completedAt:
          watchPercentage >= 98
            ? mockUserProgress[existingProgressIndex].completedAt || now
            : undefined,
      };
    } else {
      // Create new progress entry
      mockUserProgress.push({
        id: `progress-${Date.now()}`,
        userId,
        moduleId,
        watchedDuration,
        isCompleted: watchPercentage >= 98,
        lastWatchedAt: now,
        completedAt: watchPercentage >= 98 ? now : undefined,
      });
    }

    // Mark as completed if watch percentage >= 98%
    if (watchPercentage >= 98 && !isCompleted) {
      setIsCompleted(true);
      setShowCompletionMessage(true);
      setTimeout(() => setShowCompletionMessage(false), 5000);
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
        {/* Back Button */}
        <Button
          variant="ghost"
          onClick={() => router.push(`/course/${courseId}`)}
          className="mb-6"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Course
        </Button>

        {/* Completion Message */}
        {showCompletionMessage && (
          <div className="mb-6 bg-green-50 border border-green-200 rounded-lg p-4 flex items-center gap-3">
            <CheckCircle2 className="w-6 h-6 text-green-500" />
            <div>
              <h3 className="font-semibold text-green-900">
                Module Completed!
              </h3>
              <p className="text-sm text-green-700">
                Great job! You've completed this module.
              </p>
            </div>
          </div>
        )}

        {/* Video Player Section */}
        <div className="bg-white rounded-lg p-6 mb-6 shadow-sm border">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 mb-1">
                {module.title}
              </h1>
              <p className="text-sm text-gray-500">{course.title}</p>
            </div>
            {isCompleted && (
              <Badge variant="secondary" className="bg-green-500">
                <CheckCircle2 className="w-3 h-3 mr-1" />
                Completed
              </Badge>
            )}
          </div>

          <VideoPlayer
            videoUrl={module.videoUrl}
            onProgressUpdate={handleProgressUpdate}
            initialProgress={initialProgress?.watchedDuration || 0}
            moduleId={moduleId}
          />
        </div>

        {/* Module Info Panel */}
        <div className="bg-white rounded-lg p-6 mb-6 shadow-sm border">
          <div className="flex items-center gap-2 mb-3">
            <FileText className="w-5 h-5 text-primary" />
            <h2 className="text-xl font-bold text-gray-900">Module Information</h2>
          </div>

          {module.description && (
            <div className="mb-4">
              <h3 className="font-semibold text-gray-900 mb-2">Description</h3>
              <p className="text-gray-700">{module.description}</p>
            </div>
          )}

          <div className="grid grid-cols-2 gap-4 p-4 bg-gray-50 rounded-lg">
            <div>
              <p className="text-sm text-gray-600">Duration</p>
              <p className="font-semibold text-gray-900">
                {Math.ceil(module.duration / 60)} minutes
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Status</p>
              <p className="font-semibold text-gray-900">
                {isCompleted ? "Completed" : "In Progress"}
              </p>
            </div>
          </div>
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-between items-center">
          <div>
            {previousModule ? (
              <Button
                variant="outline"
                onClick={() =>
                  router.push(`/course/${courseId}/module/${previousModule.id}`)
                }
              >
                <ChevronLeft className="w-4 h-4 mr-2" />
                Previous Module
              </Button>
            ) : (
              <div></div>
            )}
          </div>

          <div>
            {nextModule ? (
              <Button
                onClick={() =>
                  router.push(`/course/${courseId}/module/${nextModule.id}`)
                }
              >
                Next Module
                <ChevronRight className="w-4 h-4 ml-2" />
              </Button>
            ) : (
              <Button
                variant="secondary"
                onClick={() => router.push(`/course/${courseId}`)}
              >
                Back to Course
              </Button>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

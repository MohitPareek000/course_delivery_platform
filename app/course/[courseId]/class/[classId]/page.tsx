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
  FileText,
  Clock,
  Trophy,
  ExternalLink,
} from "lucide-react";
import {
  getClassById,
  getNextClass,
  getPreviousClass,
  getCourseById,
} from "@/lib/db/queries";
import { getUserModuleProgressFromDB } from "@/lib/db/dbQueries";
import { getCurrentUserSession } from "@/lib/auth";

export default function ClassPlayerPage() {
  const params = useParams();
  const router = useRouter();
  const courseId = params.courseId as string;
  const classId = params.classId as string;

  // Get user session
  const [userSession, setUserSession] = React.useState<{
    userId: string;
    email: string;
    name: string;
  } | null>(null);

  React.useEffect(() => {
    const session = getCurrentUserSession();
    if (!session) {
      router.push("/login");
      return;
    }
    setUserSession(session);
  }, [router]);

  const userId = userSession?.userId || "";

  const classItem = getClassById(classId);
  const course = getCourseById(courseId);
  const nextClass = getNextClass(classId);
  const previousClass = getPreviousClass(classId);

  const [initialProgress, setInitialProgress] = React.useState<number>(0);
  const [isCompleted, setIsCompleted] = React.useState(false);
  const [progressLoading, setProgressLoading] = React.useState(false);

  // Fetch progress from database on mount
  React.useEffect(() => {
    async function fetchProgress() {
      if (!userId) {
        return;
      }

      setProgressLoading(true);
      const progress = await getUserModuleProgressFromDB(userId, classId);
      if (progress) {
        setInitialProgress(progress.watchedDuration || 0);
        setIsCompleted(progress.isCompleted || false);
      }
      setProgressLoading(false);
    }
    fetchProgress();
  }, [userId, classId]);
  const [showCompletionMessage, setShowCompletionMessage] = React.useState(false);
  const [isMarkingComplete, setIsMarkingComplete] = React.useState(false);
  const hasShownCompletionRef = React.useRef(false);

  const handleProgressUpdate = async (watchedDuration: number, totalDuration: number) => {
    try {
      // Save progress to database via API (only watch time, not completion status)
      const response = await fetch('/api/progress', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId,
          classId,
          watchedDuration: Math.floor(watchedDuration),
          isCompleted: false, // Never auto-complete, only manual completion via button
        }),
      });

      if (!response.ok) {
        console.error('Failed to save progress');
        return;
      }

      const data = await response.json();
      console.log('Progress saved:', data);
    } catch (error) {
      console.error('Error saving progress:', error);
    }
  };

  if (!classItem || !course) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Class not found
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
              <h1 className="text-xl font-bold text-gray-900">{classItem.title}</h1>
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
                <h3 className="font-semibold text-green-900">Class Completed!</h3>
                <p className="text-sm text-green-700">
                  Great job! You've completed this class.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Content Area - Video or Text */}
        <div className="mb-4">
          <div className="max-w-4xl mx-auto">
            {classItem.contentType === 'text' ? (
              /* Text Content */
              <div className="bg-white rounded-lg shadow-sm border">
                <div className="p-6 border-b flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center">
                    <FileText className="w-5 h-5 text-amber-600" />
                  </div>
                  <div>
                    <span className="text-sm font-medium text-gray-500">Reading Material</span>
                    <div className="flex items-center gap-1.5 text-xs text-gray-400">
                      <Clock className="w-3 h-3" />
                      <span>{Math.ceil(classItem.duration / 60)} min read</span>
                    </div>
                  </div>
                </div>
                <div className="p-6 prose prose-gray max-w-none">
                  {classItem.textContent ? (
                    <div
                      className="text-gray-700 leading-relaxed"
                      dangerouslySetInnerHTML={{
                        __html: classItem.textContent
                          .replace(/\n\n/g, '</p><p class="mb-4">')
                          .replace(/\n/g, '<br />')
                          .replace(/^/, '<p class="mb-4">')
                          .replace(/$/, '</p>')
                          .replace(/## (.*?)(?=<|$)/g, '<h2 class="text-xl font-bold text-gray-900 mt-6 mb-3">$1</h2>')
                          .replace(/### (.*?)(?=<|$)/g, '<h3 class="text-lg font-semibold text-gray-900 mt-4 mb-2">$1</h3>')
                          .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                          .replace(/\*(.*?)\*/g, '<em>$1</em>')
                          .replace(/`(.*?)`/g, '<code class="bg-gray-100 px-1.5 py-0.5 rounded text-sm font-mono">$1</code>')
                      }}
                    />
                  ) : (
                    <p className="text-gray-500">No content available.</p>
                  )}
                </div>
              </div>
            ) : classItem.contentType === 'contest' ? (
              /* Contest/Assessment Content */
              <div className="bg-white rounded-lg shadow-sm border">
                <div className="p-6 border-b flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center">
                    <Trophy className="w-5 h-5 text-purple-600" />
                  </div>
                  <div>
                    <span className="text-sm font-medium text-gray-500">
                      Assessment
                    </span>
                    <div className="flex items-center gap-1.5 text-xs text-gray-400">
                      <Clock className="w-3 h-3" />
                      <span>{Math.ceil(classItem.duration / 60)} min</span>
                    </div>
                  </div>
                </div>
                <div className="p-8 text-center">
                  <div className="w-16 h-16 rounded-full bg-purple-100 flex items-center justify-center mx-auto mb-4">
                    <Trophy className="w-8 h-8 text-purple-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-6">
                    Ready to Test Your Skills?
                  </h3>
                  {classItem.contestUrl ? (
                    <a
                      href={classItem.contestUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white font-semibold px-6 py-3 rounded-lg transition-colors"
                    >
                      Start Assessment
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  ) : (
                    <p className="text-gray-500">Assessment link not available.</p>
                  )}
                  <p className="text-xs text-gray-400 mt-4">
                    Opens in a new tab • Come back here to mark as complete
                  </p>
                </div>
              </div>
            ) : (
              /* Video Content */
              <div className="bg-white rounded-lg p-4 shadow-sm border">
                {classItem.videoUrl ? (
                  <VideoPlayer
                    videoUrl={classItem.videoUrl}
                    onProgressUpdate={handleProgressUpdate}
                    initialProgress={initialProgress}
                    classId={classId}
                  />
                ) : (
                  <div className="w-full aspect-video flex items-center justify-center bg-gray-100 rounded-lg">
                    <p className="text-gray-500">No video available</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>


        {/* Navigation Buttons - Mobile: side by side, Desktop: Previous left, Mark Complete & Next right */}
        <div className="flex gap-3 items-center justify-between max-w-4xl mx-auto">
          {/* Previous Button */}
          {previousClass ? (
            <Button
              variant="outline"
              onClick={() =>
                router.push(`/course/${courseId}/class/${previousClass.id}`)
              }
              className="flex-1 sm:flex-none sm:min-w-[140px]"
            >
              <ChevronLeft className="w-4 h-4 mr-2" />
              Previous Class
            </Button>
          ) : (
            <div className="flex-1 sm:flex-none sm:min-w-[140px]"></div>
          )}

          {/* Right side button group - Desktop only */}
          <div className="hidden sm:flex gap-3 items-center">
            {/* Show Mark as Complete button only when not completed */}
            {!isCompleted && (
              <Button
                onClick={async () => {
                  setIsMarkingComplete(true);

                  try {
                    // Save progress to database via API
                    const response = await fetch('/api/progress', {
                      method: 'POST',
                      headers: {
                        'Content-Type': 'application/json',
                      },
                      body: JSON.stringify({
                        userId,
                        classId,
                        watchedDuration: classItem.duration || 600,
                        isCompleted: true,
                      }),
                    });

                    if (response.ok) {
                      // Only update state if API call was successful
                      setIsCompleted(true);
                      setShowCompletionMessage(true);
                      hasShownCompletionRef.current = true;
                    } else {
                      console.error('Failed to mark as complete');
                      alert('Failed to mark as complete. Please try again.');
                    }
                  } catch (error) {
                    console.error('Error marking as complete:', error);
                    alert('Failed to mark as complete. Please try again.');
                  } finally {
                    setIsMarkingComplete(false);
                  }
                }}
                disabled={isMarkingComplete}
                className={`bg-green-600 hover:bg-green-700 transition-all duration-300 ${
                  isMarkingComplete ? 'scale-95 opacity-90' : 'scale-100'
                }`}
              >
                <CheckCircle2
                  className={`w-4 h-4 mr-2 transition-all duration-500 ${
                    isMarkingComplete ? 'rotate-[360deg] scale-110' : 'rotate-0 scale-100'
                  }`}
                />
                {isMarkingComplete ? (
                  <span className="animate-pulse">Completing...</span>
                ) : (
                  'Mark as Complete'
                )}
              </Button>
            )}

            {/* Show Next Class button only when completed */}
            {isCompleted && nextClass && (
              <Button
                onClick={() =>
                  router.push(`/course/${courseId}/class/${nextClass.id}`)
                }
                className="min-w-[140px]"
              >
                Next Class
                <ChevronRight className="w-4 h-4 ml-2" />
              </Button>
            )}

            {/* Show Back to Course button when completed and no next module */}
            {isCompleted && !nextClass && (
              <Button onClick={() => router.push(`/course/${courseId}`)} className="min-w-[160px]">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Course
              </Button>
            )}
          </div>

          {/* Right Button - Mobile only */}
          <div className="flex-1 sm:hidden">
            {/* Show Mark as Complete button when not completed */}
            {!isCompleted && (
              <Button
                onClick={async () => {
                  setIsMarkingComplete(true);

                  try {
                    // Save progress to database via API
                    const response = await fetch('/api/progress', {
                      method: 'POST',
                      headers: {
                        'Content-Type': 'application/json',
                      },
                      body: JSON.stringify({
                        userId,
                        classId,
                        watchedDuration: classItem.duration || 600,
                        isCompleted: true,
                      }),
                    });

                    if (response.ok) {
                      // Only update state if API call was successful
                      setIsCompleted(true);
                      setShowCompletionMessage(true);
                      hasShownCompletionRef.current = true;
                    } else {
                      console.error('Failed to mark as complete');
                      alert('Failed to mark as complete. Please try again.');
                    }
                  } catch (error) {
                    console.error('Error marking as complete:', error);
                    alert('Failed to mark as complete. Please try again.');
                  } finally {
                    setIsMarkingComplete(false);
                  }
                }}
                disabled={isMarkingComplete}
                className={`bg-green-600 hover:bg-green-700 w-full transition-all duration-300 ${
                  isMarkingComplete ? 'scale-95 opacity-90' : 'scale-100'
                }`}
              >
                <CheckCircle2
                  className={`w-4 h-4 mr-2 transition-all duration-500 ${
                    isMarkingComplete ? 'rotate-[360deg] scale-110' : 'rotate-0 scale-100'
                  }`}
                />
                {isMarkingComplete ? (
                  <span className="animate-pulse">Completing...</span>
                ) : (
                  'Mark as Complete'
                )}
              </Button>
            )}

            {/* Show Next Class button when completed and next module exists */}
            {isCompleted && nextClass && (
              <Button
                onClick={() =>
                  router.push(`/course/${courseId}/class/${nextClass.id}`)
                }
                className="w-full text-sm px-3 py-2 h-auto sm:text-base sm:px-4 sm:py-2 sm:h-10"
              >
                Next Class
                <ChevronRight className="w-4 h-4 ml-2" />
              </Button>
            )}

            {/* Show Back to Course button when completed and no next module */}
            {isCompleted && !nextClass && (
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

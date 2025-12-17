"use client";

import * as React from "react";
import { useParams, useRouter } from "next/navigation";
import { Sidebar } from "@/components/dashboard/Sidebar";
import { VideoPlayer } from "@/components/video/VideoPlayer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tooltip } from "@/components/ui/tooltip";
import { MarkdownRenderer } from "@/components/content/MarkdownRenderer";
import {
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  FileText,
  Clock,
  Trophy,
  ExternalLink,
  Wifi,
  Smile,
} from "lucide-react";
import { getUserModuleProgressFromDB, getClassByIdFromDB } from "@/lib/db/dbQueries";
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
  const [sessionLoaded, setSessionLoaded] = React.useState(false);

  React.useEffect(() => {
    const session = getCurrentUserSession();
    if (!session) {
      router.push("/login");
      return;
    }
    setUserSession(session);
    setSessionLoaded(true);
  }, [router]);

  const userId = userSession?.userId || "";

  const [classData, setClassData] = React.useState<any>(null);
  const [dataLoading, setDataLoading] = React.useState(true);

  // Fetch class data from database
  React.useEffect(() => {
    async function fetchClassData() {
      setDataLoading(true);
      const data = await getClassByIdFromDB(classId);
      setClassData(data);
      setDataLoading(false);
    }
    fetchClassData();
  }, [classId]);

  const classItem = classData?.class;
  const course = classData?.course;
  const nextClass = classData?.nextClass;
  const previousClass = classData?.previousClass;

  const [initialProgress, setInitialProgress] = React.useState<number>(0);
  const [lastPosition, setLastPosition] = React.useState<number>(0);
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
        // Handle undefined/null lastPosition from existing records
        const resumePos = progress.lastPosition ?? 0;
        console.log('🔄 Loading progress from DB:', {
          watchedDuration: progress.watchedDuration,
          lastPosition: resumePos,
          isCompleted: progress.isCompleted
        });
        setInitialProgress(progress.watchedDuration || 0);
        setLastPosition(resumePos);
        setIsCompleted(progress.isCompleted || false);
      }
      setProgressLoading(false);
    }
    fetchProgress();
  }, [userId, classId]);
  const [showCompletionMessage, setShowCompletionMessage] = React.useState(false);
  const [isMarkingComplete, setIsMarkingComplete] = React.useState(false);
  const hasShownCompletionRef = React.useRef(false);

  const handleProgressUpdate = async (watchedDuration: number, currentPosition: number, totalDuration: number) => {
    try {
      // Don't save progress if userId is not available yet
      if (!userId) {
        console.log('⏸️ Skipping progress save - userId not available yet');
        return;
      }

      console.log('📊 handleProgressUpdate called with:', {
        watchedDuration,
        currentPosition,
        totalDuration,
        flooredWatchedDuration: Math.floor(watchedDuration),
        flooredCurrentPosition: Math.floor(currentPosition)
      });

      const progressData = {
        userId,
        classId,
        watchedDuration: Math.floor(watchedDuration),
        lastPosition: Math.floor(currentPosition),
        isCompleted: false, // Never auto-complete, only manual completion via button
      };

      console.log('💾 Saving progress to DB:', progressData);

      // Save progress to database via API (only watch time, not completion status)
      const response = await fetch('/api/progress', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(progressData),
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

  // Show loading state
  if (dataLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <p className="text-gray-700 text-sm font-medium">Loading class...</p>
          <div className="flex items-center justify-center gap-1">
            <span className="w-1.5 h-1.5 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
            <span className="w-1.5 h-1.5 bg-primary rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
            <span className="w-1.5 h-1.5 bg-primary rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
          </div>
        </div>
      </div>
    );
  }

  // Show not found if class doesn't exist
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
      <Sidebar userName={userSession?.name || ""} userEmail={userSession?.email || ""} />

      <main className="flex-1 p-4 lg:p-8">
        {/* Content Area - Video or Text */}
        <div className="mb-4 w-full px-4 sm:px-6 md:px-8">
          <div className="w-full max-w-4xl mx-auto">
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
            {classItem.contentType === 'text' ? (
              /* Text Content */
              <div className="bg-white rounded-lg shadow-sm border w-full overflow-hidden">
                <div className="p-4 sm:p-5 md:p-6 border-b flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center flex-shrink-0">
                    <FileText className="w-5 h-5 text-amber-600" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <span className="text-sm font-medium text-gray-500 block">Reading Material</span>
                    <div className="flex items-center gap-1.5 text-xs text-gray-400">
                      <Clock className="w-3 h-3" />
                      <span>{Math.ceil(classItem.duration / 60)} min read</span>
                    </div>
                  </div>
                </div>
                <div className="px-4 py-6 sm:px-6 sm:py-8 md:px-8 md:py-10">
                  {classItem.textContent ? (
                    <MarkdownRenderer content={classItem.textContent} />
                  ) : (
                    <p className="text-gray-500">No content available.</p>
                  )}
                </div>
              </div>
            ) : classItem.contentType === 'contest' ? (
              /* Contest Content */
              <div className="bg-white rounded-lg shadow-sm border">
                {/* Header Section */}
                <div className="p-4 sm:p-6 border-b">
                  <div className="flex items-center gap-3 mb-3 sm:mb-0">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-blue-100 flex items-center justify-center flex-shrink-0">
                      <Trophy className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" />
                    </div>
                    <div className="flex-1 sm:flex sm:items-center sm:justify-between sm:gap-4">
                      <div>
                        <h3 className="text-base sm:text-lg font-semibold text-gray-900">Ready to test your skills?</h3>
                      </div>
                      {classItem.contestUrl && (
                        <a
                          href={classItem.contestUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hidden sm:inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-medium px-4 py-2 rounded-lg transition-colors text-sm whitespace-nowrap"
                        >
                          Start Contest
                        </a>
                      )}
                    </div>
                  </div>
                  {classItem.contestUrl && (
                    <a
                      href={classItem.contestUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="sm:hidden inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-medium px-3 py-2 rounded-lg transition-colors text-sm whitespace-nowrap w-full"
                    >
                      Start Contest
                    </a>
                  )}
                </div>

                {/* Info Cards Section */}
                <div className="p-4 sm:p-6 space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
                    {/* Duration Card */}
                    <div className="bg-white rounded-lg border p-3 sm:p-4">
                      <div className="flex items-center gap-2 mb-1.5 sm:mb-2">
                        <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600 flex-shrink-0" />
                        <h4 className="text-sm font-semibold text-gray-900">{Math.ceil(classItem.duration / 60)} Minutes</h4>
                      </div>
                      <p className="text-xs text-gray-600">Complete the test in a focused time frame to gauge your skills.</p>
                    </div>

                    {/* Questions Card */}
                    <div className="bg-white rounded-lg border p-3 sm:p-4">
                      <div className="flex items-center gap-2 mb-1.5 sm:mb-2">
                        <FileText className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600 flex-shrink-0" />
                        <h4 className="text-sm font-semibold text-gray-900">10 Questions</h4>
                      </div>
                      <p className="text-xs text-gray-600">Challenge yourself with curated questions designed to test your skills.</p>
                    </div>

                    {/* Proctored Card */}
                    <div className="bg-white rounded-lg border p-3 sm:p-4">
                      <div className="flex items-center gap-2 mb-1.5 sm:mb-2">
                        <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600 flex-shrink-0" />
                        <h4 className="text-sm font-semibold text-gray-900">Proctored</h4>
                      </div>
                      <p className="text-xs text-gray-600">Test will be proctored to ensure integrity and fair assessment.</p>
                    </div>
                  </div>

                  {/* Syllabus Section */}
                  <div className="bg-white rounded-lg border p-4 sm:p-6">
                    <div className="flex items-start gap-2.5 sm:gap-3 mb-3 sm:mb-4">
                      <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-blue-100 flex items-center justify-center flex-shrink-0">
                        <FileText className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600" />
                      </div>
                      <div className="flex-1">
                        <h4 className="text-sm sm:text-base font-semibold text-gray-900 mb-0.5 sm:mb-1">Syllabus</h4>
                        <p className="text-xs sm:text-sm text-gray-600">Topics covered in the contest</p>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-1.5 sm:gap-2">
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1.5 sm:px-3 sm:py-2 bg-blue-50 text-blue-700 rounded-lg text-xs sm:text-sm font-medium border border-blue-100">
                        <span className="w-1.5 h-1.5 bg-blue-600 rounded-full flex-shrink-0"></span>
                        <span className="whitespace-nowrap">Logical Reasoning</span>
                      </span>
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1.5 sm:px-3 sm:py-2 bg-blue-50 text-blue-700 rounded-lg text-xs sm:text-sm font-medium border border-blue-100">
                        <span className="w-1.5 h-1.5 bg-blue-600 rounded-full flex-shrink-0"></span>
                        <span className="whitespace-nowrap">Aptitude</span>
                      </span>
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1.5 sm:px-3 sm:py-2 bg-blue-50 text-blue-700 rounded-lg text-xs sm:text-sm font-medium border border-blue-100">
                        <span className="w-1.5 h-1.5 bg-blue-600 rounded-full flex-shrink-0"></span>
                        <span className="whitespace-nowrap">Basic Maths</span>
                      </span>
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1.5 sm:px-3 sm:py-2 bg-blue-50 text-blue-700 rounded-lg text-xs sm:text-sm font-medium border border-blue-100">
                        <span className="w-1.5 h-1.5 bg-blue-600 rounded-full flex-shrink-0"></span>
                        <span className="whitespace-nowrap">Basic Coding</span>
                      </span>
                    </div>
                  </div>

                  {/* Before the Test Ensure Section */}
                  <div>
                    <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3 sm:mb-4">Before the Test Ensure</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
                      {/* Internet Connection */}
                      <div className="flex items-center gap-2.5 sm:gap-3 p-2.5 sm:p-3">
                        <Wifi className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600 flex-shrink-0" />
                        <p className="text-xs sm:text-sm text-gray-700">Have a stable internet connection.</p>
                      </div>

                      {/* Undisturbed */}
                      <div className="flex items-center gap-2.5 sm:gap-3 p-2.5 sm:p-3 sm:border-l sm:border-r border-gray-200">
                        <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600 flex-shrink-0" />
                        <p className="text-xs sm:text-sm text-gray-700">You're in a quiet, distraction-free environment</p>
                      </div>

                      {/* Comfortable */}
                      <div className="flex items-center gap-2.5 sm:gap-3 p-2.5 sm:p-3">
                        <Smile className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600 flex-shrink-0" />
                        <p className="text-xs sm:text-sm text-gray-700">You are comfortable and relaxed</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              /* Video Content */
              <div className="bg-white rounded-lg p-4 shadow-sm border">
                {classItem.videoUrl ? (
                  sessionLoaded && userId && !progressLoading ? (
                    <VideoPlayer
                      videoUrl={classItem.videoUrl}
                      onProgressUpdate={handleProgressUpdate}
                      initialProgress={initialProgress}
                      resumePosition={lastPosition}
                      classId={classId}
                    />
                  ) : (
                    <div className="w-full aspect-video flex items-center justify-center bg-gray-100 rounded-lg">
                      <div className="flex flex-col items-center gap-3">
                        <p className="text-gray-700 text-sm font-medium">Loading player...</p>
                        <div className="flex items-center justify-center gap-1">
                          <span className="w-1.5 h-1.5 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
                          <span className="w-1.5 h-1.5 bg-primary rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
                          <span className="w-1.5 h-1.5 bg-primary rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
                        </div>
                      </div>
                    </div>
                  )
                ) : (
                  <div className="w-full aspect-video flex items-center justify-center bg-gray-100 rounded-lg">
                    <p className="text-gray-500">No video available</p>
                  </div>
                )}
              </div>
            )}

            {/* Navigation Buttons - Mobile: side by side, Desktop: Previous left, Mark Complete & Next right */}
            <div className="flex gap-2 items-center justify-between mt-4">
              {/* Previous Button */}
              {previousClass ? (
                <Button
                  variant="outline"
                  onClick={() =>
                    router.push(`/course/${courseId}/class/${previousClass.id}`)
                  }
                  className="flex-1 sm:flex-none sm:min-w-[140px] text-xs px-2 py-2 sm:text-sm sm:px-4 sm:py-2 transition-all duration-200 hover:scale-105 hover:shadow-md whitespace-nowrap"
                >
                  <ChevronLeft className="w-3 h-3 mr-1 sm:w-4 sm:h-4 sm:mr-2" />
                  Previous Class
                </Button>
              ) : (
                <div className="flex-1 sm:flex-none sm:min-w-[140px]"></div>
              )}

              {/* Right side button group - Desktop only */}
              <div className="hidden sm:flex gap-3 items-center min-h-[40px]">
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
                            lastPosition: lastPosition || 0,
                            isCompleted: true,
                          }),
                        });

                        if (response.ok) {
                          // Only update state if API call was successful
                          setIsCompleted(true);
                          setShowCompletionMessage(true);
                          hasShownCompletionRef.current = true;

                          // Auto-dismiss after 3 seconds
                          setTimeout(() => {
                            setShowCompletionMessage(false);
                          }, 3000);
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
                    className={`min-w-[160px] bg-green-600 hover:bg-green-700 transition-all duration-200 hover:scale-105 hover:shadow-md ${
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
                    className="min-w-[140px] transition-all duration-200 hover:scale-105 hover:shadow-md"
                  >
                    Next Class
                    <ChevronRight className="w-4 h-4 ml-2" />
                  </Button>
                )}

                {/* Show Back to Course button when completed and no next module */}
                {isCompleted && !nextClass && (
                  <Button onClick={() => router.push(`/course/${courseId}`)} className="min-w-[160px] transition-all duration-200 hover:scale-105 hover:shadow-md">
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back to Course
                  </Button>
                )}
              </div>

              {/* Right Button - Mobile only */}
              <div className="flex-1 sm:hidden min-h-[40px]">
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
                            lastPosition: lastPosition || 0,
                            isCompleted: true,
                          }),
                        });

                        if (response.ok) {
                          // Only update state if API call was successful
                          setIsCompleted(true);
                          setShowCompletionMessage(true);
                          hasShownCompletionRef.current = true;

                          // Auto-dismiss after 3 seconds
                          setTimeout(() => {
                            setShowCompletionMessage(false);
                          }, 3000);
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
                    className={`bg-green-600 hover:bg-green-700 w-full text-xs px-2 py-2 sm:text-sm sm:px-4 sm:py-2 transition-all duration-200 hover:scale-105 hover:shadow-md whitespace-nowrap ${
                      isMarkingComplete ? 'scale-95 opacity-90' : 'scale-100'
                    }`}
                  >
                    <CheckCircle2
                      className={`w-3 h-3 mr-1 sm:w-4 sm:h-4 sm:mr-2 transition-all duration-500 ${
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
                    className="w-full text-xs px-2 py-2 sm:text-sm sm:px-4 sm:py-2 transition-all duration-200 hover:scale-105 hover:shadow-md whitespace-nowrap"
                  >
                    Next Class
                    <ChevronRight className="w-3 h-3 ml-1 sm:w-4 sm:h-4 sm:ml-2" />
                  </Button>
                )}

                {/* Show Back to Course button when completed and no next module */}
                {isCompleted && !nextClass && (
                  <Button
                    onClick={() => router.push(`/course/${courseId}`)}
                    className="w-full text-xs px-2 py-2 sm:text-sm sm:px-4 sm:py-2 transition-all duration-200 hover:scale-105 hover:shadow-md whitespace-nowrap"
                  >
                    <ArrowLeft className="w-3 h-3 mr-1 sm:w-4 sm:h-4 sm:mr-2" />
                    Back to Course
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Completion Message - Toast notification */}
        <div className={`fixed top-20 left-4 right-4 sm:left-auto sm:right-6 sm:max-w-sm z-50 transition-all duration-500 ${showCompletionMessage ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 -translate-y-4 scale-95 pointer-events-none'}`}>
          <div className="bg-white rounded-xl shadow-2xl overflow-hidden border border-green-100">
            {/* Progress bar at top */}
            <div className="h-1 bg-green-500 animate-[shrink_3s_linear_forwards] origin-left"></div>

            {/* Content */}
            <div className="p-3 sm:p-4 flex items-center gap-2.5 sm:gap-3">
              <div className="flex-shrink-0 relative">
                {/* Animated success icon with rings */}
                <div className="absolute inset-0 bg-green-500 rounded-full animate-ping opacity-20"></div>
                <div className="relative w-10 h-10 sm:w-12 sm:h-12 bg-green-500 rounded-full flex items-center justify-center shadow-lg">
                  <CheckCircle2 className="w-6 h-6 sm:w-7 sm:h-7 text-white animate-[bounce_0.6s_ease-in-out]" />
                </div>
              </div>

              <div className="flex-1 min-w-0">
                <h3 className="font-bold text-gray-900 mb-0.5 text-sm sm:text-base">Class completed!</h3>
                <p className="text-xs sm:text-sm text-gray-600">Great work! Keep it up! ✨</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

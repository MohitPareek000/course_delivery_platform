"use client";

import * as React from "react";
import { useParams, useRouter } from "next/navigation";
import { Sidebar } from "@/components/dashboard/Sidebar";
import { RoundCard } from "@/components/course/RoundCard";
import { TopicSection } from "@/components/course/TopicSection";
import { ModuleItem } from "@/components/course/ModuleItem";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Briefcase, BookOpen } from "lucide-react";
import {
  getCourseById,
  getCourseRounds,
  getTopics,
  getTopicModules,
  isRoundUnlocked,
  getRoundProgress,
  calculateCourseProgress,
  getUserModuleProgress,
} from "@/lib/db/queries";

export default function CourseDetailPage() {
  const params = useParams();
  const router = useRouter();
  const courseId = params.courseId as string;
  const userId = "user-1"; // Mock user ID

  const course = getCourseById(courseId);
  const isCompanySpecific = course?.type === "company-specific";

  if (!course) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Course not found
          </h1>
          <Button onClick={() => router.push("/dashboard")}>
            Back to Dashboard
          </Button>
        </div>
      </div>
    );
  }

  const courseProgress = calculateCourseProgress(userId, courseId);
  const rounds = isCompanySpecific ? getCourseRounds(courseId) : [];
  const skillTopics = !isCompanySpecific ? getTopics(courseId) : [];

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />

      <main className="flex-1 p-4 lg:p-8">
        {/* Back Button */}
        <Button
          variant="ghost"
          onClick={() => router.push("/dashboard")}
          className="mb-4 text-sm"
        >
          <ArrowLeft className="w-4 h-4 mr-1.5" />
          Back to Dashboard
        </Button>

        {/* Course Header */}
        <div className="bg-white rounded-lg p-5 mb-5 border shadow-sm">
          <div className="flex items-start justify-between mb-3">
            <div className="flex items-start gap-3">
              <div className="bg-gradient-to-br from-primary/10 to-secondary/10 rounded-lg p-2.5">
                {isCompanySpecific ? (
                  <Briefcase className="w-6 h-6 text-primary" />
                ) : (
                  <BookOpen className="w-6 h-6 text-secondary" />
                )}
              </div>
              <div>
                {course.companyName && (
                  <p className="text-xs font-semibold text-secondary uppercase tracking-wide mb-1">
                    {course.companyName}
                  </p>
                )}
                <h1 className="text-2xl font-bold text-gray-900 mb-1.5">
                  {course.title}
                </h1>
                <p className="text-sm text-gray-600">{course.description}</p>
              </div>
            </div>
            <Badge variant={isCompanySpecific ? "default" : "secondary"} className="text-xs">
              {isCompanySpecific ? "Company-Specific" : "Skill-Based"}
            </Badge>
          </div>

          {/* Overall Progress */}
          <div className="space-y-1.5">
            <div className="flex justify-between items-center text-xs">
              <span className="font-medium text-gray-700">Overall Progress</span>
              <span className="font-semibold text-secondary">
                {courseProgress.progressPercentage}%
              </span>
            </div>
            <Progress value={courseProgress.progressPercentage} max={100} className="h-2" />
            <p className="text-xs text-gray-500">
              {courseProgress.completedModules} of {courseProgress.totalModules}{" "}
              modules completed
            </p>
          </div>
        </div>

        {/* Company-Specific: Rounds Layout */}
        {isCompanySpecific && (
          <div className="space-y-4">
            {rounds.map((round) => {
              const unlocked = isRoundUnlocked(userId, courseId, round.order);
              const roundProgressData = getRoundProgress(userId, courseId, round.id);
              const roundTopics = getTopics(courseId, round.id);

              return (
                <RoundCard
                  key={round.id}
                  round={round}
                  isUnlocked={unlocked}
                  progress={roundProgressData}
                >
                  <div className="space-y-6 mt-4">
                    {roundTopics.map((topic) => {
                      const modules = getTopicModules(topic.id);
                      return (
                        <TopicSection key={topic.id} topic={topic}>
                          {modules.map((module) => {
                            const progress = getUserModuleProgress(userId, module.id);
                            return (
                              <ModuleItem
                                key={module.id}
                                module={module}
                                progress={progress}
                                courseId={courseId}
                                isLocked={false}
                              />
                            );
                          })}
                        </TopicSection>
                      );
                    })}
                  </div>
                </RoundCard>
              );
            })}
          </div>
        )}

        {/* Skill-Based: Simple Topics Layout */}
        {!isCompanySpecific && (
          <div className="bg-white rounded-lg p-6 border shadow-sm space-y-6">
            <h2 className="text-xl font-bold text-gray-900">Course Content</h2>
            {skillTopics.map((topic) => {
              const modules = getTopicModules(topic.id);
              return (
                <TopicSection key={topic.id} topic={topic}>
                  {modules.map((module) => {
                    const progress = getUserModuleProgress(userId, module.id);
                    return (
                      <ModuleItem
                        key={module.id}
                        module={module}
                        progress={progress}
                        courseId={courseId}
                        isLocked={false}
                      />
                    );
                  })}
                </TopicSection>
              );
            })}
          </div>
        )}
      </main>
    </div>
  );
}

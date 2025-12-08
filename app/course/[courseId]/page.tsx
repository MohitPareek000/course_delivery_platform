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
import { Tooltip } from "@/components/ui/tooltip";
import { ArrowLeft, Briefcase, BookOpen, Code, Database, Cloud, Smartphone, Palette, TrendingUp, CheckCircle2, Lock, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  getCourseById,
  getCourseRounds,
  getTopics,
  getTopicModules,
  isRoundUnlocked,
  getRoundProgress,
  calculateCourseProgress,
  getUserModuleProgress,
  isModuleLocked,
} from "@/lib/db/queries";

// Company logo mapping using Brandfetch CDN with client ID
const BRANDFETCH_CLIENT_ID = "1idHfSqccAbp2Vb4wMw";

const companyLogos: Record<string, { logo: string; bgColor: string }> = {
  "TCS": {
    logo: `https://cdn.brandfetch.io/tcs.com/w/400/h/400?c=${BRANDFETCH_CLIENT_ID}`,
    bgColor: "#0066B2"
  },
  "Infosys": {
    logo: `https://cdn.brandfetch.io/infosys.com/w/400/h/400?c=${BRANDFETCH_CLIENT_ID}`,
    bgColor: "#007CC3"
  },
  "Wipro": {
    logo: `https://cdn.brandfetch.io/wipro.com/w/400/h/400?c=${BRANDFETCH_CLIENT_ID}`,
    bgColor: "#7B2482"
  },
  "Accenture": {
    logo: `https://cdn.brandfetch.io/accenture.com/w/400/h/400?c=${BRANDFETCH_CLIENT_ID}`,
    bgColor: "#A100FF"
  },
  "Amazon": {
    logo: `https://cdn.brandfetch.io/amazon.com/w/400/h/400?c=${BRANDFETCH_CLIENT_ID}`,
    bgColor: "#FF9900"
  },
  "Google": {
    logo: `https://cdn.brandfetch.io/google.com/w/400/h/400?c=${BRANDFETCH_CLIENT_ID}`,
    bgColor: "#4285F4"
  },
  "Microsoft": {
    logo: `https://cdn.brandfetch.io/microsoft.com/w/400/h/400?c=${BRANDFETCH_CLIENT_ID}`,
    bgColor: "#00A4EF"
  },
};

// Skill-based course icons mapping
const skillIcons: Record<string, React.ElementType> = {
  "Java": Code,
  "Python": Code,
  "JavaScript": Code,
  "React": Code,
  "Node": Code,
  "Full Stack": Code,
  "Database": Database,
  "SQL": Database,
  "Cloud": Cloud,
  "AWS": Cloud,
  "Azure": Cloud,
  "Mobile": Smartphone,
  "Android": Smartphone,
  "iOS": Smartphone,
  "Design": Palette,
  "UI/UX": Palette,
  "Marketing": TrendingUp,
  "Business": TrendingUp,
};

// Function to get icon for skill-based course
const getSkillIcon = (title: string): React.ElementType => {
  const titleLower = title.toLowerCase();
  for (const [key, Icon] of Object.entries(skillIcons)) {
    if (titleLower.includes(key.toLowerCase())) {
      return Icon;
    }
  }
  return BookOpen; // Default icon
};

export default function CourseDetailPage() {
  const params = useParams();
  const router = useRouter();
  const courseId = params.courseId as string;
  const userId = "user-1"; // Mock user ID

  const course = getCourseById(courseId);
  const isCompanySpecific = course?.type === "company-specific";
  const [logoError, setLogoError] = React.useState(false);
  const [selectedRoundId, setSelectedRoundId] = React.useState<string | null>(null);

  const companyLogo = course?.companyName && companyLogos[course.companyName];
  const SkillIcon = course && !isCompanySpecific ? getSkillIcon(course.title) : BookOpen;

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

  // Set initial selected round to the first unlocked round
  React.useEffect(() => {
    if (isCompanySpecific && rounds.length > 0 && !selectedRoundId) {
      const firstUnlockedRound = rounds.find(round =>
        isRoundUnlocked(userId, courseId, round.order)
      );
      setSelectedRoundId(firstUnlockedRound?.id || rounds[0].id);
    }
  }, [isCompanySpecific, rounds, selectedRoundId, userId, courseId]);

  const selectedRound = rounds.find(r => r.id === selectedRoundId);

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />

      <main className="flex-1 p-4 lg:p-8 pt-16 lg:pt-8">
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
        <div className="bg-white rounded-lg p-4 sm:p-5 mb-5 border shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-3">
            <div className="flex items-start gap-3 flex-1 min-w-0">
              {isCompanySpecific && companyLogo && !logoError ? (
                <div className="w-12 h-12 sm:w-14 sm:h-14 bg-white rounded-xl shadow-md flex items-center justify-center p-2 flex-shrink-0">
                  <img
                    src={companyLogo.logo}
                    alt={`${course.companyName} logo`}
                    className="w-full h-full object-contain"
                    onError={() => setLogoError(true)}
                    loading="eager"
                  />
                </div>
              ) : isCompanySpecific ? (
                <div className="w-12 h-12 sm:w-14 sm:h-14 bg-white rounded-xl shadow-md flex items-center justify-center flex-shrink-0">
                  <Briefcase className="w-6 h-6 sm:w-7 sm:h-7 text-primary" />
                </div>
              ) : (
                <div className="w-12 h-12 sm:w-14 sm:h-14 bg-white rounded-xl shadow-md flex items-center justify-center flex-shrink-0">
                  <SkillIcon className="w-6 h-6 sm:w-7 sm:h-7 text-secondary" />
                </div>
              )}
              <div className="flex-1 min-w-0">
                {course.companyName && (
                  <p className="text-xs font-semibold text-secondary uppercase tracking-wide mb-1">
                    {course.companyName}
                  </p>
                )}
                <h1 className="text-xl sm:text-2xl font-bold text-gray-900 mb-1.5">
                  {course.title}
                </h1>
                <p className="text-sm text-gray-600">{course.description}</p>
              </div>
            </div>
            <Badge variant={isCompanySpecific ? "default" : "secondary"} className="text-xs self-start sm:self-auto flex-shrink-0">
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
            {/* Mobile: Vertical Accordion-style Cards */}
            <div className="md:hidden space-y-3">
              {rounds.map((round, index) => {
                const unlocked = isRoundUnlocked(userId, courseId, round.order);
                const roundProgressData = getRoundProgress(userId, courseId, round.id);
                const isSelected = selectedRoundId === round.id;
                const roundTopics = getTopics(courseId, round.id);

                return (
                  <div key={round.id}>
                    {/* Locked Round - Gray background with lock icon */}
                    {!unlocked ? (
                      <div className="bg-gray-50 rounded-lg border border-gray-200 p-4">
                        <div className="flex items-start gap-3">
                          {/* Lock Icon Circle */}
                          <div className="w-12 h-12 rounded-full bg-gray-300 flex items-center justify-center flex-shrink-0">
                            <Lock className="w-6 h-6 text-gray-500" />
                          </div>

                          {/* Round Info */}
                          <div className="flex-1 min-w-0">
                            <h3 className="font-bold text-base text-gray-400 mb-1">
                              {round.title}
                            </h3>
                            <p className="text-xs text-gray-500 mb-2">
                              {round.description}
                            </p>
                            <p className="text-xs text-gray-500 font-medium">
                              Complete Round {index} to unlock
                            </p>
                          </div>
                        </div>
                      </div>
                    ) : (
                      /* Active/Unlocked Round */
                      <div className={cn(
                        "rounded-lg border overflow-hidden transition-all duration-200",
                        isSelected && roundProgressData.progressPercentage === 100
                          ? "bg-green-50 border-green-200 shadow-md"
                          : isSelected
                          ? "bg-primary/5 border-primary shadow-md"
                          : roundProgressData.progressPercentage === 100
                          ? "bg-green-50 border-green-200 shadow-sm"
                          : "bg-white border-gray-200 shadow-sm"
                      )}>
                        {/* Round Header - Clickable */}
                        <button
                          onClick={() => setSelectedRoundId(isSelected ? null : round.id)}
                          className="w-full p-4 text-left active:bg-primary/10 transition-colors"
                        >
                          <div className="flex items-start gap-3">
                            {/* Round Icon/Status Circle */}
                            <div className={cn(
                              "w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0",
                              roundProgressData.progressPercentage === 100
                                ? "bg-green-500"
                                : "bg-primary"
                            )}>
                              {roundProgressData.progressPercentage === 100 ? (
                                <CheckCircle2 className="w-6 h-6 text-white" />
                              ) : (
                                <svg
                                  className="w-6 h-6"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <circle
                                    cx="12"
                                    cy="12"
                                    r="9"
                                    stroke="white"
                                    strokeWidth="2.5"
                                  />
                                  <circle
                                    cx="12"
                                    cy="12"
                                    r="4"
                                    fill="white"
                                  />
                                </svg>
                              )}
                            </div>

                            {/* Round Info */}
                            <div className="flex-1 min-w-0">
                              <h3 className={cn(
                                "font-bold text-base mb-1",
                                roundProgressData.progressPercentage === 100
                                  ? "text-green-700"
                                  : "text-gray-900"
                              )}>
                                {round.title}
                              </h3>
                              <p className="text-xs text-gray-600 mb-3 line-clamp-2">
                                {round.description}
                              </p>

                              {/* Progress Bar */}
                              <div className="space-y-1">
                                <div className="flex items-center justify-between text-xs">
                                  <span className="text-gray-500">Round Progress</span>
                                  <span className={cn(
                                    "font-semibold",
                                    roundProgressData.progressPercentage === 100
                                      ? "text-green-600"
                                      : "text-secondary"
                                  )}>
                                    {roundProgressData.completedModules}/{roundProgressData.totalModules} modules
                                  </span>
                                </div>
                                <div className="w-full bg-gray-200 rounded-full h-1.5">
                                  <div
                                    className={cn(
                                      "h-1.5 rounded-full transition-all",
                                      roundProgressData.progressPercentage === 100
                                        ? "bg-green-500"
                                        : "bg-secondary"
                                    )}
                                    style={{ width: `${roundProgressData.progressPercentage}%` }}
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                        </button>

                        {/* Expandable Content */}
                        {isSelected && (
                          <div className={cn(
                            "px-4 pb-4 border-t bg-white",
                            roundProgressData.progressPercentage === 100
                              ? "border-green-200"
                              : "border-primary/20"
                          )}>
                            <div className="pt-4">
                              {/* Learning Outcomes */}
                              {round.learningOutcomes && round.learningOutcomes.length > 0 && (
                                <div className="mb-4">
                                  <h4 className="font-bold text-sm text-gray-900 mb-3">
                                    What you'll learn:
                                  </h4>
                                  <ul className="space-y-2">
                                    {round.learningOutcomes.map((outcome, idx) => (
                                      <li key={idx} className="flex items-start gap-2 text-xs text-gray-600">
                                        <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                                        <span>{outcome}</span>
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              )}

                              {/* Topics and Modules */}
                              <div className="space-y-3">
                                {roundTopics.map((topic) => {
                                  const modules = getTopicModules(topic.id);
                                  return (
                                    <TopicSection key={topic.id} topic={topic}>
                                      {modules.map((module) => {
                                        const progress = getUserModuleProgress(userId, module.id);
                                        const locked = isModuleLocked(userId, module.id);
                                        return (
                                          <ModuleItem
                                            key={module.id}
                                            module={module}
                                            progress={progress}
                                            courseId={courseId}
                                            isLocked={locked}
                                          />
                                        );
                                      })}
                                    </TopicSection>
                                  );
                                })}
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Desktop: Horizontal Tabs */}
            <div className="hidden md:block bg-white rounded-lg border shadow-sm overflow-hidden">
              <div className="overflow-x-auto scrollbar-hide">
                <div className="flex min-w-max">
                  {rounds.map((round, index) => {
                    const unlocked = isRoundUnlocked(userId, courseId, round.order);
                    const roundProgressData = getRoundProgress(userId, courseId, round.id);
                    const isSelected = selectedRoundId === round.id;

                    const buttonContent = (
                      <button
                        key={round.id}
                        onClick={() => unlocked && setSelectedRoundId(round.id)}
                        disabled={!unlocked}
                        className={cn(
                          "w-full px-6 py-4 transition-all duration-200 text-left relative",
                          isSelected && roundProgressData.progressPercentage === 100
                            ? "bg-green-100 border-b-4 border-b-green-500"
                            : isSelected
                            ? "bg-primary/10 border-b-4 border-b-primary"
                            : unlocked && roundProgressData.progressPercentage === 100
                            ? "bg-green-50 hover:bg-green-100 border-b-2 border-b-transparent"
                            : unlocked
                            ? "bg-white hover:bg-gray-50 border-b-2 border-b-transparent"
                            : "bg-gray-100 cursor-not-allowed border-b-2 border-b-transparent"
                        )}
                      >
                        <div>
                          <div className="flex items-center gap-3 mb-2">
                            {unlocked ? (
                              roundProgressData.progressPercentage === 100 ? (
                                <div className="relative w-5 h-5 flex-shrink-0">
                                  <svg
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="w-5 h-5"
                                  >
                                    {/* Outer circle with gradient */}
                                    <circle
                                      cx="12"
                                      cy="12"
                                      r="10"
                                      className={cn(
                                        isSelected ? "fill-green-600" : "fill-green-500"
                                      )}
                                    />
                                    {/* Inner lighter circle for depth */}
                                    <circle
                                      cx="12"
                                      cy="12"
                                      r="8.5"
                                      className={cn(
                                        isSelected ? "fill-green-500" : "fill-green-400"
                                      )}
                                      opacity="0.9"
                                    />
                                    {/* Checkmark */}
                                    <path
                                      d="M7.5 12L10.5 15L16.5 9"
                                      stroke="white"
                                      strokeWidth="2.5"
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      fill="none"
                                    />
                                  </svg>
                                </div>
                              ) : (
                                <svg
                                  className={cn(
                                    "w-5 h-5 flex-shrink-0",
                                    isSelected ? "text-primary" : ""
                                  )}
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <circle
                                    cx="12"
                                    cy="12"
                                    r="9"
                                    stroke="currentColor"
                                    strokeWidth="2.5"
                                    className="text-primary"
                                  />
                                  <circle
                                    cx="12"
                                    cy="12"
                                    r="4"
                                    fill="currentColor"
                                    className="text-primary"
                                  />
                                </svg>
                              )
                            ) : (
                              <Lock className="w-5 h-5 text-gray-400 flex-shrink-0" />
                            )}
                            <h3
                              className={cn(
                                "font-semibold text-sm",
                                roundProgressData.progressPercentage === 100
                                  ? "text-green-700"
                                  : unlocked
                                  ? "text-gray-900"
                                  : "text-gray-400"
                              )}
                            >
                              {round.title}
                            </h3>
                          </div>
                          {unlocked ? (
                            <div className={cn(
                              "flex items-center gap-2 text-xs ml-8",
                              roundProgressData.progressPercentage === 100
                                ? "text-green-600"
                                : "text-gray-600"
                            )}>
                              <span>{roundProgressData.completedModules}/{roundProgressData.totalModules} modules</span>
                              <span>•</span>
                              <span className={cn(
                                "font-semibold",
                                roundProgressData.progressPercentage === 100
                                  ? "text-green-700"
                                  : "text-secondary"
                              )}>
                                {roundProgressData.progressPercentage}% completed
                              </span>
                            </div>
                          ) : (
                            <p className="text-xs text-gray-500 font-medium ml-8">
                              Complete Round {index} to unlock
                            </p>
                          )}
                        </div>
                      </button>
                    );

                    return (
                      <div
                        key={round.id}
                        className={cn(
                          "flex-1 min-w-[200px] border-r border-r-gray-300",
                          index === rounds.length - 1 && "border-r-0",
                          !unlocked && "bg-gray-100",
                          unlocked && roundProgressData.progressPercentage === 100 && "bg-green-50"
                        )}
                      >
                        {!unlocked ? (
                          <Tooltip content="Complete Previous Rounds to Unlock">
                            {buttonContent}
                          </Tooltip>
                        ) : (
                          buttonContent
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Selected Round Content - Desktop Only */}
            {selectedRound && (() => {
              const unlocked = isRoundUnlocked(userId, courseId, selectedRound.order);
              const roundProgressData = getRoundProgress(userId, courseId, selectedRound.id);
              const roundTopics = getTopics(courseId, selectedRound.id);

              return (
                <div className="hidden md:block bg-white rounded-lg p-4 sm:p-6 border shadow-sm">
                  {/* Round Info */}
                  <div className="mb-4 sm:mb-6 pb-4 sm:pb-6 border-b">
                    <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-2">
                      {selectedRound.title}
                    </h2>
                    <p className="text-sm text-gray-700 mb-4">
                      {selectedRound.description}
                    </p>

                    {/* Learning Outcomes */}
                    {selectedRound.learningOutcomes && selectedRound.learningOutcomes.length > 0 && (
                      <div>
                        <h4 className="font-semibold text-xs text-gray-900 mb-2">
                          What you'll learn:
                        </h4>
                        <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                          {selectedRound.learningOutcomes.map((outcome, index) => (
                            <li key={index} className="flex items-start gap-2 text-xs text-gray-600">
                              <CheckCircle2 className="w-3.5 h-3.5 text-green-500 mt-0.5 flex-shrink-0" />
                              <span>{outcome}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>

                  {/* Topics and Modules */}
                  {unlocked ? (
                    <div className="space-y-6">
                      {roundTopics.map((topic) => {
                        const modules = getTopicModules(topic.id);
                        return (
                          <TopicSection key={topic.id} topic={topic}>
                            {modules.map((module) => {
                              const progress = getUserModuleProgress(userId, module.id);
                              const locked = isModuleLocked(userId, module.id);
                              return (
                                <ModuleItem
                                  key={module.id}
                                  module={module}
                                  progress={progress}
                                  courseId={courseId}
                                  isLocked={locked}
                                />
                              );
                            })}
                          </TopicSection>
                        );
                      })}
                    </div>
                  ) : (
                    <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 text-center">
                      <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center mx-auto mb-3">
                        <div className="w-6 h-6 rounded-full bg-gray-400" />
                      </div>
                      <p className="text-sm text-gray-600">
                        Complete the previous round to unlock this round
                      </p>
                    </div>
                  )}
                </div>
              );
            })()}
          </div>
        )}

        {/* Skill-Based: Simple Topics Layout */}
        {!isCompanySpecific && (
          <div className="bg-white rounded-lg p-4 sm:p-6 border shadow-sm space-y-4 sm:space-y-6">
            <h2 className="text-lg sm:text-xl font-bold text-gray-900">Course Content</h2>
            {skillTopics.map((topic) => {
              const modules = getTopicModules(topic.id);
              return (
                <TopicSection key={topic.id} topic={topic}>
                  {modules.map((module) => {
                    const progress = getUserModuleProgress(userId, module.id);
                    const locked = isModuleLocked(userId, module.id);
                    return (
                      <ModuleItem
                        key={module.id}
                        module={module}
                        progress={progress}
                        courseId={courseId}
                        isLocked={locked}
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

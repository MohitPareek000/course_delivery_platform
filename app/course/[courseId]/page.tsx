"use client";

import * as React from "react";
import { useParams, useRouter } from "next/navigation";
import { Sidebar } from "@/components/dashboard/Sidebar";
import { RoundCard } from "@/components/course/RoundCard";
import { TopicSection } from "@/components/course/TopicSection";
import { ModuleItem } from "@/components/course/ModuleItem";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, BookOpen, Code, Database, Cloud, Smartphone, Palette, TrendingUp, CheckCircle2, Lock, ChevronRight, ChevronDown } from "lucide-react";
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
  const hasAutoOpened = React.useRef(false);

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

  // Auto-open the active round on page load (only once)
  React.useEffect(() => {
    if (isCompanySpecific && rounds.length > 0 && !hasAutoOpened.current) {
      // Find the first incomplete round
      const activeRound = rounds.find((round) => {
        const unlocked = isRoundUnlocked(userId, courseId, round.order);
        const roundProgress = getRoundProgress(userId, courseId, round.id);
        return unlocked && roundProgress.progressPercentage < 100;
      });

      // If no incomplete round found, open the last round (all completed)
      const roundToOpen = activeRound || rounds[rounds.length - 1];
      if (roundToOpen && isRoundUnlocked(userId, courseId, roundToOpen.order)) {
        setSelectedRoundId(roundToOpen.id);
        hasAutoOpened.current = true;
      }
    }
  }, [isCompanySpecific, rounds, userId, courseId]);

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
                  <BookOpen className="w-6 h-6 sm:w-7 sm:h-7 text-primary" />
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
            {/* Vertical Accordion-style Cards - Both Mobile and Desktop */}
            <div className="space-y-3">
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

                              {/* Progress Bar or Completion Badge */}
                              {roundProgressData.progressPercentage === 100 ? (
                                <div className="inline-flex items-center gap-1.5 bg-green-100 text-green-700 px-3 py-1.5 rounded-full">
                                  <CheckCircle2 className="w-3.5 h-3.5" />
                                  <span className="text-xs font-semibold">Completed</span>
                                </div>
                              ) : (
                                <div className="space-y-1">
                                  <div className="flex items-center justify-between text-xs">
                                    <span className="text-gray-500">Round Progress</span>
                                    <span className="font-semibold text-secondary">
                                      {roundProgressData.completedModules}/{roundProgressData.totalModules} modules
                                    </span>
                                  </div>
                                  <div className="w-full bg-gray-200 rounded-full h-1.5">
                                    <div
                                      className="h-1.5 rounded-full transition-all bg-secondary"
                                      style={{ width: `${roundProgressData.progressPercentage}%` }}
                                    />
                                  </div>
                                </div>
                              )}
                            </div>

                            {/* Expand/Collapse Icon */}
                            <div className="flex-shrink-0 ml-2">
                              <ChevronDown
                                className={cn(
                                  "w-5 h-5 transition-transform duration-200",
                                  isSelected ? "rotate-180" : "",
                                  roundProgressData.progressPercentage === 100
                                    ? "text-green-600"
                                    : "text-gray-500"
                                )}
                              />
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

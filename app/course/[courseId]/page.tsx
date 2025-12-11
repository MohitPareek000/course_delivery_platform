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
import { useUserProgress } from "@/hooks/useUserProgress";
import { useCourseData } from "@/hooks/useCourseData";
import { getCurrentUserSession } from "@/lib/auth";

// Additional icons
import { Briefcase, BarChart3, PenTool, Megaphone, Users, Settings, Building2 } from "lucide-react";

// Company logo mapping using Brandfetch CDN
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
  "Google": {
    logo: `https://cdn.brandfetch.io/google.com/w/400/h/400?c=${BRANDFETCH_CLIENT_ID}`,
    bgColor: "#4285F4"
  },
  "Amazon": {
    logo: `https://cdn.brandfetch.io/amazon.com/w/400/h/400?c=${BRANDFETCH_CLIENT_ID}`,
    bgColor: "#FF9900"
  },
  "Microsoft": {
    logo: `https://cdn.brandfetch.io/microsoft.com/w/400/h/400?c=${BRANDFETCH_CLIENT_ID}`,
    bgColor: "#00A4EF"
  },
};

// Role icons mapping
const roleIcons: Record<string, { icon: React.ElementType; bgColor: string }> = {
  "Software Engineer": {
    icon: Code,
    bgColor: "#4285F4"
  },
  "Data Analyst": {
    icon: BarChart3,
    bgColor: "#34A853"
  },
  "Data Scientist": {
    icon: Database,
    bgColor: "#9333EA"
  },
  "Product Manager": {
    icon: Briefcase,
    bgColor: "#EA4335"
  },
  "UX Designer": {
    icon: PenTool,
    bgColor: "#FF6D00"
  },
  "Marketing Manager": {
    icon: Megaphone,
    bgColor: "#00BCD4"
  },
  "HR Manager": {
    icon: Users,
    bgColor: "#E91E63"
  },
  "DevOps Engineer": {
    icon: Settings,
    bgColor: "#607D8B"
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

  // Fetch course data from database
  const { course, isLoading: courseLoading, error: courseError } = useCourseData(courseId);

  const isRoleSpecific = course?.type === "role-specific";
  const isCompanySpecific = course?.type === "company-specific";
  const isSkillBased = course?.type === "skill-based";
  const [selectedRoundId, setSelectedRoundId] = React.useState<string | null>(null);
  const [logoError, setLogoError] = React.useState(false);
  const hasAutoOpened = React.useRef(false);

  // Fetch user progress from database
  const { progress, isLoading: progressLoading, getModuleProgress, isModuleCompleted, refreshProgress } = useUserProgress(userId);

  const isLoading = courseLoading || progressLoading;

  // Refresh progress when returning to this page
  React.useEffect(() => {
    if (userId) {
      refreshProgress();
    }
  }, [courseId, userId, refreshProgress]); // Refresh when course page is accessed

  const roleIcon = course?.role ? roleIcons[course.role] : null;
  const RoleIcon = roleIcon?.icon || Briefcase;
  const companyLogo = course?.companyName ? companyLogos[course.companyName] : null;
  const SkillIcon = isSkillBased && course ? getSkillIcon(course.title) : BookOpen;

  // Badge and category helpers
  const getBadgeText = () => {
    if (isRoleSpecific) return "Role-Specific";
    if (isCompanySpecific) return "Company-Specific";
    return "Skill-Based";
  };

  const getCategoryLabel = () => {
    if (course?.role) return course.role;
    if (course?.companyName) return course.companyName;
    if (course?.skill) return course.skill;
    return "";
  };

  // Calculate course progress from database data (must be after all hooks)
  const allModules = course ? course.rounds.flatMap(r => r.topics.flatMap(t => t.modules))
    .concat(course.topics.flatMap(t => t.modules)) : [];
  const totalModules = allModules.length;
  const completedModules = allModules.filter((module) =>
    isModuleCompleted(module.id)
  ).length;
  const courseProgress = {
    courseId,
    totalModules,
    completedModules,
    progressPercentage:
      totalModules > 0 ? Math.round((completedModules / totalModules) * 100) : 0,
  };

  const rounds = isRoleSpecific && course ? course.rounds : [];
  const skillTopics = !isRoleSpecific && course ? course.topics : [];

  // Helper: Check if a round is unlocked
  const isRoundUnlockedFn = (roundOrder: number) => {
    if (roundOrder === 1) return true;
    const previousRound = rounds.find((r) => r.order === roundOrder - 1);
    if (!previousRound) return false;
    const previousModules = previousRound.topics.flatMap((topic) => topic.modules);
    return previousModules.every((module) => isModuleCompleted(module.id));
  };

  // Helper: Get round progress
  const getRoundProgressFn = (roundId: string) => {
    const round = rounds.find((r) => r.id === roundId);
    if (!round) return { totalModules: 0, completedModules: 0, progressPercentage: 0 };
    const roundModules = round.topics.flatMap((topic) => topic.modules);
    const totalModules = roundModules.length;
    const completedModules = roundModules.filter((module) =>
      isModuleCompleted(module.id)
    ).length;
    return {
      totalModules,
      completedModules,
      progressPercentage:
        totalModules > 0 ? Math.round((completedModules / totalModules) * 100) : 0,
    };
  };

  // Helper: Check if module is locked
  const isModuleLockedFn = (moduleId: string) => {
    const currentModule = allModules.find((m) => m.id === moduleId);
    if (!currentModule) return true;

    // Find the current module's position in all modules
    const currentIndex = allModules.findIndex((m) => m.id === moduleId);

    // First module in the course is always unlocked
    if (currentIndex === 0) return false;

    // Check if the previous module (in the entire course) is completed
    const previousModule = allModules[currentIndex - 1];
    return !isModuleCompleted(previousModule.id);
  };

  // Auto-open the active round on page load (only once)
  React.useEffect(() => {
    if ((isRoleSpecific || isCompanySpecific) && rounds.length > 0 && !hasAutoOpened.current && !isLoading) {
      // Find the first incomplete round
      const activeRound = rounds.find((round) => {
        const unlocked = isRoundUnlockedFn(round.order);
        const roundProgress = getRoundProgressFn(round.id);
        return unlocked && roundProgress.progressPercentage < 100;
      });

      // If no incomplete round found, open the last round (all completed)
      const roundToOpen = activeRound || rounds[rounds.length - 1];
      if (roundToOpen && isRoundUnlockedFn(roundToOpen.order)) {
        setSelectedRoundId(roundToOpen.id);
        hasAutoOpened.current = true;
      }
    }
  }, [isRoleSpecific, rounds, isLoading]);

  // Loading state
  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600">Loading course...</p>
        </div>
      </div>
    );
  }

  // Course not found
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
                  <Building2 className="w-6 h-6 sm:w-7 sm:h-7 text-primary" />
                </div>
              ) : isRoleSpecific ? (
                <div
                  className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl shadow-md flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: roleIcon?.bgColor || "#4285F4" }}
                >
                  <RoleIcon className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
                </div>
              ) : (
                <div className="w-12 h-12 sm:w-14 sm:h-14 bg-white rounded-xl shadow-md flex items-center justify-center flex-shrink-0">
                  <SkillIcon className="w-6 h-6 sm:w-7 sm:h-7 text-secondary" />
                </div>
              )}
              <div className="flex-1 min-w-0">
                {getCategoryLabel() && (
                  <p className="text-xs font-semibold text-secondary uppercase tracking-wide mb-1">
                    {getCategoryLabel()}
                  </p>
                )}
                <h1 className="text-xl sm:text-2xl font-bold text-gray-900 mb-1.5">
                  {course.title}
                </h1>
                <p className="text-sm text-gray-600">{course.description}</p>
              </div>
            </div>
            <Badge variant={isCompanySpecific || isRoleSpecific ? "default" : "secondary"} className="text-xs self-start sm:self-auto flex-shrink-0">
              {getBadgeText()}
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
              classes completed
            </p>
          </div>
        </div>

        {/* Role/Company-Specific: Modules Layout */}
        {(isRoleSpecific || isCompanySpecific) && (
          <div className="space-y-4">
            {/* Vertical Accordion-style Cards - Both Mobile and Desktop */}
            <div className="space-y-3">
              {rounds.map((round, index) => {
                const unlocked = isRoundUnlockedFn(round.order);
                const roundProgressData = getRoundProgressFn(round.id);
                const isSelected = selectedRoundId === round.id;
                const roundTopics = round.topics;

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
                              Complete Module {index} to unlock
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
                                    <span className="text-gray-500">Module Progress</span>
                                    <span className="font-semibold text-secondary">
                                      {roundProgressData.completedModules}/{roundProgressData.totalModules} classes
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
                                    Why it is Important:
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
                                  return (
                                    <TopicSection key={topic.id} topic={topic}>
                                      {topic.modules.map((module) => {
                                        const progress = getModuleProgress(module.id);
                                        const locked = isModuleLockedFn(module.id);
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
        {isSkillBased && (
          <div className="bg-white rounded-lg p-4 sm:p-6 border shadow-sm space-y-4 sm:space-y-6">
            <h2 className="text-lg sm:text-xl font-bold text-gray-900">Course Content</h2>
            {skillTopics.map((topic) => {
              return (
                <TopicSection key={topic.id} topic={topic}>
                  {topic.modules.map((module) => {
                    const progress = getModuleProgress(module.id);
                    const locked = isModuleLockedFn(module.id);
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

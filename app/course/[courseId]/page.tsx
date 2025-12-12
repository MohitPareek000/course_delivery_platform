"use client";

import * as React from "react";
import { useParams, useRouter } from "next/navigation";
import { Sidebar } from "@/components/dashboard/Sidebar";
import { ModuleCard } from "@/components/course/ModuleCard";
import { TopicSection } from "@/components/course/TopicSection";
import { ClassItem } from "@/components/course/ClassItem";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, BookOpen, Code, Database, Cloud, Smartphone, Palette, TrendingUp, CheckCircle2, Lock, ChevronRight, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { useUserProgress } from "@/hooks/useUserProgress";
import { useCourseData } from "@/hooks/useCourseData";
import { getCurrentUserSession } from "@/lib/auth";
import { LoadingPage } from "@/components/ui/loading-spinner";

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
  const [selectedModuleId, setSelectedModuleId] = React.useState<string | null>(null);
  const [logoError, setLogoError] = React.useState(false);
  const hasAutoOpened = React.useRef(false);
  const highlightTimeoutRef = React.useRef<NodeJS.Timeout | null>(null);
  const lastHighlightedClassRef = React.useRef<string | null>(null);

  // Fetch user progress from database
  const { progress, isLoading: progressLoading, getClassProgress, isClassCompleted, refreshProgress } = useUserProgress(userId);

  const isLoading = courseLoading || progressLoading;

  // Refresh progress when returning to this page and reset scroll flag
  React.useEffect(() => {
    if (userId) {
      refreshProgress();
      // Reset the auto-open flag so scrolling happens again when returning to the course page
      hasAutoOpened.current = false;
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
  const allClasses = course ? course.modules.flatMap(m => m.topics.flatMap(t => t.classes))
    .concat(course.topics.flatMap(t => t.classes)) : [];
  const totalClasses = allClasses.length;
  const completedClasses = allClasses.filter((classItem) =>
    isClassCompleted(classItem.id)
  ).length;
  const courseProgress = {
    courseId,
    totalClasses,
    completedClasses,
    progressPercentage:
      totalClasses > 0 ? Math.round((completedClasses / totalClasses) * 100) : 0,
  };

  const modules = (isRoleSpecific || isCompanySpecific) && course ? course.modules : [];
  const skillTopics = isSkillBased && course ? course.topics : [];

  // Helper: Check if a module is unlocked
  const isModuleUnlockedFn = (moduleOrder: number) => {
    if (moduleOrder === 1) return true;
    const previousModule = modules.find((m) => m.order === moduleOrder - 1);
    if (!previousModule) return false;
    const previousClasses = previousModule.topics.flatMap((topic) => topic.classes);
    return previousClasses.every((classItem) => isClassCompleted(classItem.id));
  };

  // Helper: Get module progress
  const getModuleProgressFn = (moduleId: string) => {
    const module = modules.find((m) => m.id === moduleId);
    if (!module) return { totalClasses: 0, completedClasses: 0, progressPercentage: 0 };
    const moduleClasses = module.topics.flatMap((topic) => topic.classes);
    const totalClasses = moduleClasses.length;
    const completedClasses = moduleClasses.filter((classItem) =>
      isClassCompleted(classItem.id)
    ).length;
    return {
      totalClasses,
      completedClasses,
      progressPercentage:
        totalClasses > 0 ? Math.round((completedClasses / totalClasses) * 100) : 0,
    };
  };

  // Helper: Check if class is locked
  const isClassLockedFn = (classId: string) => {
    const currentClass = allClasses.find((c) => c.id === classId);
    if (!currentClass) return true;

    // Find the current class's position in all classes
    const currentIndex = allClasses.findIndex((c) => c.id === classId);

    // First class in the course is always unlocked
    if (currentIndex === 0) return false;

    // Check if the previous class (in the entire course) is completed
    const previousClass = allClasses[currentIndex - 1];
    return !isClassCompleted(previousClass.id);
  };

  // Auto-open the active module and scroll to current class on page load (only once)
  React.useEffect(() => {
    if ((isRoleSpecific || isCompanySpecific) && modules.length > 0 && !hasAutoOpened.current && !isLoading) {
      // Find the first incomplete class in the entire course
      let currentClassId: string | null = null;
      let moduleWithCurrentClass: typeof modules[0] | null = null;

      for (const module of modules) {
        const unlocked = isModuleUnlockedFn(module.order);
        if (!unlocked) continue;

        const moduleClasses = module.topics.flatMap(t => t.classes);
        const firstIncompleteClass = moduleClasses.find(c => !isClassCompleted(c.id));

        if (firstIncompleteClass) {
          currentClassId = firstIncompleteClass.id;
          moduleWithCurrentClass = module;
          break;
        }
      }

      // If no incomplete class found, use the last class of the last module
      if (!currentClassId) {
        const lastModule = modules[modules.length - 1];
        const lastModuleClasses = lastModule.topics.flatMap(t => t.classes);
        if (lastModuleClasses.length > 0) {
          currentClassId = lastModuleClasses[lastModuleClasses.length - 1].id;
          moduleWithCurrentClass = lastModule;
        }
      }

      // Open the module containing the current class
      if (moduleWithCurrentClass && isModuleUnlockedFn(moduleWithCurrentClass.order)) {
        setSelectedModuleId(moduleWithCurrentClass.id);
        hasAutoOpened.current = true;

        // Scroll to the current class after a short delay to ensure DOM is ready
        if (currentClassId) {
          setTimeout(() => {
            // Clean up previous highlight if it exists
            if (lastHighlightedClassRef.current) {
              const prevElement = document.getElementById(`class-${lastHighlightedClassRef.current}`);
              if (prevElement) {
                prevElement.classList.remove('ring-2', 'ring-primary', 'ring-offset-2');
              }
            }

            // Clear any existing highlight timeout
            if (highlightTimeoutRef.current) {
              clearTimeout(highlightTimeoutRef.current);
            }

            const classElement = document.getElementById(`class-${currentClassId}`);
            if (classElement) {
              classElement.scrollIntoView({
                behavior: 'smooth',
                block: 'center'
              });

              // Add a brief highlight animation
              classElement.classList.add('ring-2', 'ring-primary', 'ring-offset-2');
              lastHighlightedClassRef.current = currentClassId;

              // Remove highlight after 2 seconds
              highlightTimeoutRef.current = setTimeout(() => {
                classElement.classList.remove('ring-2', 'ring-primary', 'ring-offset-2');
                lastHighlightedClassRef.current = null;
              }, 2000);
            }
          }, 500);
        }
      }
    }
  }, [isRoleSpecific, modules, isLoading]);

  // Loading state
  if (isLoading) {
    return <LoadingPage message="Loading course..." />;
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
              {courseProgress.completedClasses} of {courseProgress.totalClasses}{" "}
              classes completed
            </p>
          </div>
        </div>

        {/* Role/Company-Specific: Modules Layout */}
        {(isRoleSpecific || isCompanySpecific) && (
          <div className="space-y-4">
            {/* Vertical Accordion-style Cards - Both Mobile and Desktop */}
            <div className="space-y-3">
              {modules.map((module, index) => {
                const unlocked = isModuleUnlockedFn(module.order);
                const moduleProgressData = getModuleProgressFn(module.id);
                const isSelected = selectedModuleId === module.id;
                const moduleTopics = module.topics;

                return (
                  <div key={module.id}>
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
                              {module.title}
                            </h3>
                            <p className="text-xs text-gray-500 mb-2">
                              {module.description}
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
                        isSelected && moduleProgressData.progressPercentage === 100
                          ? "bg-green-50 border-green-200 shadow-md"
                          : isSelected
                          ? "bg-primary/5 border-primary shadow-md"
                          : moduleProgressData.progressPercentage === 100
                          ? "bg-green-50 border-green-200 shadow-sm"
                          : "bg-white border-gray-200 shadow-sm"
                      )}>
                        {/* Round Header - Clickable */}
                        <button
                          onClick={() => setSelectedModuleId(isSelected ? null : module.id)}
                          className="w-full p-4 text-left active:bg-primary/10 transition-colors"
                        >
                          <div className="flex items-start gap-3">
                            {/* Round Icon/Status Circle */}
                            <div className={cn(
                              "w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0",
                              moduleProgressData.progressPercentage === 100
                                ? "bg-green-500"
                                : "bg-primary"
                            )}>
                              {moduleProgressData.progressPercentage === 100 ? (
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
                                moduleProgressData.progressPercentage === 100
                                  ? "text-green-700"
                                  : "text-gray-900"
                              )}>
                                {module.title}
                              </h3>
                              <p className="text-xs text-gray-600 mb-3 line-clamp-2">
                                {module.description}
                              </p>

                              {/* Progress Bar or Completion Badge */}
                              {moduleProgressData.progressPercentage === 100 ? (
                                <div className="inline-flex items-center gap-1.5 bg-green-100 text-green-700 px-3 py-1.5 rounded-full">
                                  <CheckCircle2 className="w-3.5 h-3.5" />
                                  <span className="text-xs font-semibold">Completed</span>
                                </div>
                              ) : (
                                <div className="space-y-1">
                                  <div className="flex items-center justify-between text-xs">
                                    <span className="text-gray-500">Module Progress</span>
                                    <span className="font-semibold text-secondary">
                                      {moduleProgressData.completedClasses}/{moduleProgressData.totalClasses} classes
                                    </span>
                                  </div>
                                  <div className="w-full bg-gray-200 rounded-full h-1.5">
                                    <div
                                      className="h-1.5 rounded-full transition-all bg-secondary"
                                      style={{ width: `${moduleProgressData.progressPercentage}%` }}
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
                                  moduleProgressData.progressPercentage === 100
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
                            moduleProgressData.progressPercentage === 100
                              ? "border-green-200"
                              : "border-primary/20"
                          )}>
                            <div className="pt-4">
                              {/* Learning Outcomes */}
                              {module.learningOutcomes && module.learningOutcomes.length > 0 && (
                                <div className="mb-4">
                                  <h4 className="font-bold text-sm text-gray-900 mb-3">
                                    Why it is Important:
                                  </h4>
                                  <ul className="space-y-2">
                                    {module.learningOutcomes.map((outcome, idx) => (
                                      <li key={idx} className="flex items-start gap-2 text-xs text-gray-600">
                                        <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                                        <span>{outcome}</span>
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              )}

                              {/* Topics and Classes */}
                              <div className="space-y-3">
                                {moduleTopics.map((topic) => {
                                  return (
                                    <TopicSection key={topic.id} topic={topic}>
                                      {topic.classes.map((classItem) => {
                                        const progress = getClassProgress(classItem.id);
                                        const locked = isClassLockedFn(classItem.id);
                                        return (
                                          <ClassItem
                                            key={classItem.id}
                                            class={classItem}
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
                  {topic.classes.map((classItem) => {
                    const progress = getClassProgress(classItem.id);
                    const locked = isClassLockedFn(classItem.id);
                    return (
                      <ClassItem
                        key={classItem.id}
                        class={classItem}
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

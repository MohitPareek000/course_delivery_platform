"use client";

import * as React from "react";
import {
  ChevronDown,
  FileText,
  Video,
  Trophy,
  BookOpen,
  CheckCircle2,
  PlayCircle,
  Settings,
  Briefcase,
  BarChart3,
  Database,
  Code,
  X,
  Clock,
  Wifi,
  Smile,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { MarkdownRenderer } from "@/components/content/MarkdownRenderer";

interface ClassData {
  id: string;
  title: string;
  description?: string;
  contentType: "video" | "text" | "contest";
  textContent?: string;
  contestQuestions?: number;
  contestSyllabus?: string[];
  duration: number;
  order: number;
}

interface TopicData {
  id: string;
  title: string;
  order: number;
  classes: ClassData[];
}

interface ModuleData {
  id: string;
  title: string;
  description: string;
  order: number;
  learningOutcomes?: string[];
  topics: TopicData[];
}

interface CourseData {
  id: string;
  title: string;
  description: string;
  type: string;
  role?: string;
  skill?: string;
  companyName?: string;
  modules: ModuleData[];
}

interface CoursePreviewProps {
  course: CourseData;
}

// Role icons mapping
const roleIcons: Record<string, { icon: React.ElementType; bgColor: string }> = {
  "Software Engineer": { icon: Code, bgColor: "#4285F4" },
  "Data Analyst": { icon: BarChart3, bgColor: "#34A853" },
  "Data Scientist": { icon: Database, bgColor: "#9333EA" },
  "Product Manager": { icon: Briefcase, bgColor: "#EA4335" },
  "DevOps Engineer": { icon: Settings, bgColor: "#607D8B" },
};

export function CoursePreview({ course }: CoursePreviewProps) {
  const [selectedModuleId, setSelectedModuleId] = React.useState<string | null>(
    course.modules.length > 0 ? course.modules[0].id : null
  );
  const [selectedClass, setSelectedClass] = React.useState<ClassData | null>(null);

  const isRoleSpecific = course.type === "role-specific";
  const isCompanySpecific = course.type === "company-specific";
  const isSkillBased = course.type === "skill-based";
  const isCustomType = !isRoleSpecific && !isCompanySpecific && !isSkillBased && course.type;

  const roleIcon = course.role ? roleIcons[course.role] : null;
  const RoleIcon = roleIcon?.icon || Briefcase;

  const getBadgeText = () => {
    if (isRoleSpecific) return "Role-Specific";
    if (isCompanySpecific) return "Company-Specific";
    if (isSkillBased) return "Skill-Based";
    // Custom type - format the type name nicely (capitalize first letter of each word)
    if (isCustomType) {
      return course.type
        .split(/[-_\s]+/)
        .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
        .join(' ');
    }
    return "Skill-Based";
  };

  const getCategoryLabel = () => {
    if (course.role) return course.role;
    if (course.companyName) return course.companyName;
    if (course.skill) return course.skill;
    return "";
  };

  const totalClasses = course.modules.reduce(
    (sum, m) => sum + m.topics.reduce((s, t) => s + t.classes.length, 0),
    0
  );

  const getModuleProgress = (moduleId: string) => {
    const module = course.modules.find((m) => m.id === moduleId);
    if (!module) return { totalClasses: 0, completedClasses: 0, progressPercentage: 0 };
    const moduleClasses = module.topics.flatMap((t) => t.classes);
    return {
      totalClasses: moduleClasses.length,
      completedClasses: 0,
      progressPercentage: 0,
    };
  };

  const formatDuration = (seconds: number) => {
    const mins = Math.ceil(seconds / 60);
    return `${mins} min`;
  };

  return (
    <div className="min-h-full bg-gray-50">
      {/* Course Header - Matching actual UI */}
      <div className="bg-white rounded-lg p-4 sm:p-5 mb-5 border shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-3">
          <div className="flex items-start gap-3 flex-1 min-w-0">
            <div className="w-12 h-12 sm:w-14 sm:h-14 bg-white rounded-xl shadow-md flex items-center justify-center flex-shrink-0">
              <RoleIcon
                className="w-6 h-6 sm:w-7 sm:h-7"
                style={{ color: roleIcon?.bgColor || "#4285F4" }}
              />
            </div>
            <div className="flex-1 min-w-0">
              {getCategoryLabel() && (
                <p className="text-xs font-semibold text-secondary uppercase tracking-wide mb-1">
                  {getCategoryLabel()}
                </p>
              )}
              <h1 className="text-xl sm:text-2xl font-bold text-gray-900 mb-1.5">
                {course.title}
              </h1>
              <p className="text-sm text-gray-600 line-clamp-2">{course.description}</p>
            </div>
          </div>
          <Badge variant="default" className="text-xs self-start sm:self-auto flex-shrink-0">
            {getBadgeText()}
          </Badge>
        </div>

        {/* Overall Progress */}
        <div className="space-y-1.5">
          <div className="flex justify-between items-center text-xs">
            <span className="font-medium text-gray-700">Overall Progress</span>
            <span className="font-semibold text-secondary">0%</span>
          </div>
          <Progress value={0} max={100} className="h-2" />
          <p className="text-xs text-gray-500">
            0 of {totalClasses} classes completed
          </p>
        </div>
      </div>

      {/* Modules Layout - Matching actual UI */}
      <div className="space-y-3">
        {course.modules.map((module) => {
          const isSelected = selectedModuleId === module.id;
          const moduleProgress = getModuleProgress(module.id);

          return (
            <div key={module.id}>
              <div
                className={`rounded-lg border overflow-hidden transition-all duration-200 ${
                  isSelected
                    ? "bg-primary/5 border-primary shadow-md"
                    : "bg-white border-gray-200 shadow-sm"
                }`}
              >
                {/* Module Header */}
                <button
                  onClick={() => setSelectedModuleId(isSelected ? null : module.id)}
                  className="w-full p-4 text-left active:bg-primary/10 transition-colors"
                >
                  <div className="flex items-start gap-3">
                    {/* Module Icon */}
                    <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
                      <svg
                        className="w-6 h-6"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <circle cx="12" cy="12" r="9" stroke="white" strokeWidth="2.5" />
                        <circle cx="12" cy="12" r="4" fill="white" />
                      </svg>
                    </div>

                    {/* Module Info */}
                    <div className="flex-1 min-w-0">
                      <h3 className="font-bold text-base text-gray-900 mb-1">
                        {module.title}
                      </h3>
                      <p className="text-xs text-gray-600 mb-3 line-clamp-2">
                        {module.description}
                      </p>

                      {/* Progress Bar */}
                      <div className="space-y-1">
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-gray-500">Module Progress</span>
                          <span className="font-semibold text-secondary">
                            0/{moduleProgress.totalClasses} classes
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-1.5">
                          <div
                            className="h-1.5 rounded-full transition-all bg-secondary"
                            style={{ width: "0%" }}
                          />
                        </div>
                      </div>
                    </div>

                    {/* Expand Icon */}
                    <div className="flex-shrink-0 ml-2">
                      <ChevronDown
                        className={`w-5 h-5 transition-transform duration-200 text-gray-500 ${
                          isSelected ? "rotate-180" : ""
                        }`}
                      />
                    </div>
                  </div>
                </button>

                {/* Expanded Content */}
                {isSelected && (
                  <div className="px-4 pb-4 border-t border-primary/20 bg-white">
                    <div className="pt-4">
                      {/* Learning Outcomes */}
                      {module.learningOutcomes && module.learningOutcomes.length > 0 && (
                        <div className="mb-4">
                          <h4 className="font-bold text-sm text-gray-900 mb-3">
                            Why it is Important:
                          </h4>
                          <ul className="space-y-2">
                            {module.learningOutcomes.map((outcome, idx) => (
                              <li
                                key={idx}
                                className="flex items-start gap-2 text-xs text-gray-600"
                              >
                                <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                                <span>{outcome}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {/* Topics and Classes */}
                      <div className="space-y-3">
                        {module.topics.map((topic) => (
                          <div key={topic.id} className="space-y-2">
                            <div className="flex items-center gap-1.5">
                              <BookOpen className="w-4 h-4 text-primary" />
                              <h4 className="font-semibold text-sm text-gray-900">
                                {topic.title}
                              </h4>
                            </div>
                            <div className="ml-5 space-y-3">
                              {topic.classes.map((cls) => (
                                <button
                                  key={cls.id}
                                  onClick={() => setSelectedClass(cls)}
                                  className={`w-full flex items-center gap-4 p-4 rounded-lg border transition-all ${
                                    selectedClass?.id === cls.id
                                      ? "bg-primary/10 border-primary"
                                      : "bg-white border-gray-200 hover:shadow-sm hover:border-primary"
                                  }`}
                                >
                                  {/* Status Icon */}
                                  <div className="flex-shrink-0">
                                    {cls.contentType === "text" ? (
                                      <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center">
                                        <FileText className="w-4 h-4 text-amber-600" />
                                      </div>
                                    ) : cls.contentType === "contest" ? (
                                      <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center">
                                        <Trophy className="w-4 h-4 text-purple-600" />
                                      </div>
                                    ) : (
                                      <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                                        <PlayCircle className="w-4 h-4 text-primary" />
                                      </div>
                                    )}
                                  </div>

                                  {/* Class Info */}
                                  <div className="flex-1 min-w-0 text-left">
                                    <h5 className="font-medium text-sm text-gray-900 mb-0.5">
                                      {cls.title}
                                    </h5>
                                    {cls.description && (
                                      <p className="text-xs text-gray-600 line-clamp-1">
                                        {cls.description}
                                      </p>
                                    )}
                                  </div>

                                  {/* Type Badge */}
                                  <div className="flex-shrink-0 ml-3">
                                    {cls.contentType === "text" ? (
                                      <div className="flex flex-col items-end gap-0.5">
                                        <div className="flex items-center gap-1 px-2 py-0.5 bg-amber-100 rounded">
                                          <FileText className="w-3 h-3 text-amber-700" />
                                          <span className="text-[9px] font-bold text-amber-700 uppercase tracking-wider">
                                            Reading
                                          </span>
                                        </div>
                                        <span className="text-[11px] font-medium text-gray-600">
                                          {formatDuration(cls.duration)}
                                        </span>
                                      </div>
                                    ) : cls.contentType === "contest" ? (
                                      <div className="flex flex-col items-end gap-0.5">
                                        <div className="flex items-center gap-1 px-2 py-0.5 bg-purple-100 rounded">
                                          <Trophy className="w-3 h-3 text-purple-700" />
                                          <span className="text-[9px] font-bold text-purple-700 uppercase tracking-wider">
                                            Contest
                                          </span>
                                        </div>
                                        <span className="text-[11px] font-medium text-gray-600">
                                          {formatDuration(cls.duration)}
                                        </span>
                                      </div>
                                    ) : (
                                      <div className="flex flex-col items-end gap-0.5">
                                        <div className="flex items-center gap-1 px-2 py-0.5 bg-blue-100 rounded">
                                          <Video className="w-3 h-3 text-blue-700" />
                                          <span className="text-[9px] font-bold text-blue-700 uppercase tracking-wider">
                                            Video
                                          </span>
                                        </div>
                                        <span className="text-[11px] font-medium text-gray-600">
                                          {formatDuration(cls.duration)}
                                        </span>
                                      </div>
                                    )}
                                  </div>
                                </button>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Full Page Class Preview - Matches actual class page layout */}
      {selectedClass && (
        <div className="fixed inset-0 bg-gray-50 z-50 overflow-auto">
          {/* Full Page Content */}
          <div className="min-h-screen p-4 lg:p-8">
            <div className="w-full max-w-4xl mx-auto">
              {/* Back Button */}
              <button
                onClick={() => setSelectedClass(null)}
                className="mb-6 text-sm px-3 py-2 h-auto lg:px-4 lg:py-2 lg:text-base inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 hover:bg-white rounded-lg transition-colors"
              >
                <ChevronDown className="w-4 h-4 rotate-90" />
                Back to Course
              </button>

              {/* Title Bar - Matching actual class page */}
              <div className="bg-white rounded-lg p-4 mb-4 shadow-sm border">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                  <div className="flex-1 min-w-0">
                    <h1 className="text-xl font-bold text-gray-900">{selectedClass.title}</h1>
                    <p className="text-sm text-gray-500">{course.title}</p>
                  </div>
                  <Badge
                    variant="secondary"
                    className="bg-blue-500 self-start sm:self-auto shrink-0"
                  >
                    <CheckCircle2 className="w-3 h-3 mr-1" />
                    Preview Mode
                  </Badge>
                </div>
              </div>

              {/* Content Area */}
              {selectedClass.contentType === "text" ? (
                /* Text Content - Matching actual class page */
                <div className="bg-white rounded-lg shadow-sm border w-full overflow-hidden">
                  <div className="p-4 sm:p-5 md:p-6 border-b flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center flex-shrink-0">
                      <FileText className="w-5 h-5 text-amber-600" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <span className="text-sm font-medium text-gray-500 block">Reading Material</span>
                      <div className="flex items-center gap-1.5 text-xs text-gray-400">
                        <Clock className="w-3 h-3" />
                        <span>{Math.ceil(selectedClass.duration / 60)} min read</span>
                      </div>
                    </div>
                  </div>
                  <div className="px-4 py-6 sm:px-6 sm:py-8 md:px-8 md:py-10">
                    {selectedClass.textContent ? (
                      <MarkdownRenderer content={selectedClass.textContent} />
                    ) : (
                      <p className="text-gray-500 text-center py-8">Content will be available soon.</p>
                    )}
                  </div>
                </div>
              ) : selectedClass.contentType === "contest" ? (
                /* Contest Content - Matching actual class page */
                <div className="bg-white rounded-lg shadow-sm border">
                  {/* Header Section */}
                  <div className="p-4 sm:p-6 border-b">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-blue-100 flex items-center justify-center flex-shrink-0">
                          <Trophy className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" />
                        </div>
                        <h3 className="text-base sm:text-lg font-semibold text-gray-900">Ready to test your skills?</h3>
                      </div>
                      <div className="flex flex-col items-stretch sm:items-end gap-1.5">
                        <button className="inline-flex items-center justify-center gap-2 bg-blue-600 text-white font-medium px-4 py-2 rounded-lg transition-colors text-sm whitespace-nowrap cursor-not-allowed opacity-75">
                          Start Contest
                        </button>
                        <p className="text-[10px] text-gray-400 text-center sm:text-right">
                          Preview mode - Contest link not active
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Info Cards Section */}
                  <div className="p-4 sm:p-6 space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
                      {/* Duration Card */}
                      <div className="bg-white rounded-lg border p-3 sm:p-4">
                        <div className="flex items-center gap-2 mb-1.5 sm:mb-2">
                          <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600 flex-shrink-0" />
                          <h4 className="text-sm font-semibold text-gray-900">{Math.ceil(selectedClass.duration / 60)} Minutes</h4>
                        </div>
                        <p className="text-xs text-gray-600">Complete the test in a focused time frame to gauge your skills.</p>
                      </div>

                      {/* Questions Card */}
                      <div className="bg-white rounded-lg border p-3 sm:p-4">
                        <div className="flex items-center gap-2 mb-1.5 sm:mb-2">
                          <FileText className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600 flex-shrink-0" />
                          <h4 className="text-sm font-semibold text-gray-900">{selectedClass.contestQuestions || 10} Questions</h4>
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
                        {(selectedClass.contestSyllabus && selectedClass.contestSyllabus.length > 0
                          ? selectedClass.contestSyllabus
                          : ['Logical Reasoning', 'Aptitude', 'Basic Maths', 'Basic Coding']
                        ).map((topic, index) => (
                          <span key={index} className="inline-flex items-center gap-1.5 px-2.5 py-1.5 sm:px-3 sm:py-2 bg-blue-50 text-blue-700 rounded-lg text-xs sm:text-sm font-medium border border-blue-100">
                            <span className="w-1.5 h-1.5 bg-blue-600 rounded-full flex-shrink-0"></span>
                            <span className="whitespace-nowrap">{topic}</span>
                          </span>
                        ))}
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
                /* Video Content - Matching actual class page */
                <div className="bg-white rounded-lg p-4 shadow-sm border">
                  <div className="bg-gray-900 rounded-lg aspect-video flex items-center justify-center">
                    <div className="text-center">
                      <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center mx-auto mb-3">
                        <PlayCircle className="w-10 h-10 text-white/60" />
                      </div>
                      <p className="text-white/60 text-sm">Video preview not available</p>
                      <p className="text-white/40 text-xs mt-1">Video will play in the actual class page</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Navigation Buttons - Matching actual class page */}
              <div className="flex gap-2 items-center justify-between mt-4">
                <button
                  onClick={() => setSelectedClass(null)}
                  className="flex-1 sm:flex-none sm:min-w-[140px] text-xs px-2 py-2 sm:text-sm sm:px-4 sm:py-2 border rounded-lg hover:bg-gray-50 transition-all inline-flex items-center justify-center gap-2"
                >
                  <ChevronDown className="w-3 h-3 sm:w-4 sm:h-4 rotate-90" />
                  Back to Course
                </button>

                <button
                  className="flex-1 sm:flex-none sm:min-w-[160px] text-xs px-2 py-2 sm:text-sm sm:px-4 sm:py-2 bg-green-600 text-white rounded-lg cursor-not-allowed opacity-75 inline-flex items-center justify-center gap-2"
                  disabled
                >
                  <CheckCircle2 className="w-3 h-3 sm:w-4 sm:h-4" />
                  Mark as Complete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

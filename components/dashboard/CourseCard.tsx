import { Course, CourseProgress } from "@/types";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Briefcase, BookOpen, ArrowRight, PlayCircle, Code, Database, Cloud, Smartphone, Palette, TrendingUp } from "lucide-react";
import Link from "next/link";
import * as React from "react";

// Company logo mapping
const companyLogos: Record<string, { logo: string; bgColor: string }> = {
  "TCS": {
    logo: "https://logo.clearbit.com/tcs.com",
    bgColor: "#0066B2"
  },
  "Infosys": {
    logo: "https://logo.clearbit.com/infosys.com",
    bgColor: "#007CC3"
  },
  "Wipro": {
    logo: "https://logo.clearbit.com/wipro.com",
    bgColor: "#7B2482"
  },
  "Accenture": {
    logo: "https://logo.clearbit.com/accenture.com",
    bgColor: "#A100FF"
  },
  "Amazon": {
    logo: "https://logo.clearbit.com/amazon.com",
    bgColor: "#FF9900"
  },
  "Google": {
    logo: "https://logo.clearbit.com/google.com",
    bgColor: "#4285F4"
  },
  "Microsoft": {
    logo: "https://logo.clearbit.com/microsoft.com",
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

interface CourseCardProps {
  course: Course;
  progress: CourseProgress;
}

export function CourseCard({ course, progress }: CourseCardProps) {
  const isCompanySpecific = course.type === "company-specific";
  const [logoError, setLogoError] = React.useState(false);
  const companyLogo = course.companyName && companyLogos[course.companyName];
  const SkillIcon = !isCompanySpecific ? getSkillIcon(course.title) : BookOpen;

  return (
    <Link href={`/course/${course.id}`}>
      <Card className="overflow-hidden hover:shadow-lg transition-all duration-200 hover:-translate-y-0.5 cursor-pointer border border-gray-100">
        {/* Card Header with Icon/Logo */}
        <div className="h-32 bg-gradient-to-br from-primary/5 via-primary/10 to-secondary/5 flex items-center justify-center relative">
          {isCompanySpecific && companyLogo && !logoError ? (
            <div className="w-20 h-20 bg-white rounded-2xl shadow-lg flex items-center justify-center p-3">
              <img
                src={companyLogo.logo}
                alt={`${course.companyName} logo`}
                className="w-full h-full object-contain"
                onError={() => setLogoError(true)}
                loading="eager"
              />
            </div>
          ) : isCompanySpecific ? (
            <div className="w-20 h-20 bg-white rounded-2xl shadow-lg flex items-center justify-center">
              <Briefcase className="w-10 h-10 text-primary" />
            </div>
          ) : (
            <div className="w-20 h-20 bg-white rounded-2xl shadow-lg flex items-center justify-center">
              <SkillIcon className="w-10 h-10 text-secondary" />
            </div>
          )}
          <div className="absolute top-3 right-3">
            <Badge
              variant={isCompanySpecific ? "default" : "secondary"}
              className="text-xs px-2 py-0.5 font-medium"
            >
              {isCompanySpecific ? "Company-Specific" : "Skill-Based"}
            </Badge>
          </div>
        </div>

        {/* Card Content */}
        <div className="p-4 space-y-3">
          {/* Company Name */}
          {course.companyName && (
            <p className="text-xs font-bold text-secondary uppercase tracking-wide">
              {course.companyName}
            </p>
          )}

          {/* Course Title */}
          <h3 className="text-base font-bold text-gray-900 line-clamp-2 leading-snug">
            {course.title}
          </h3>

          {/* Description */}
          <p className="text-sm text-gray-600 line-clamp-2 leading-relaxed">
            {course.description}
          </p>

          {/* Progress Section */}
          <div className="space-y-2 pt-1">
            <div className="flex justify-between items-center">
              <span className="text-xs font-semibold text-gray-700">Progress</span>
              <span className="text-sm font-bold text-secondary">
                {progress.progressPercentage}%
              </span>
            </div>
            <Progress value={progress.progressPercentage} max={100} className="h-2" />
            <p className="text-xs text-gray-500 font-medium">
              {progress.completedModules} of {progress.totalModules} modules completed
            </p>
          </div>

          {/* Action Button */}
          <Button className="w-full h-9 text-sm font-semibold group mt-3">
            {progress.progressPercentage > 0 ? (
              <>
                <PlayCircle className="w-4 h-4 mr-1.5" />
                Continue Learning
              </>
            ) : (
              <>
                Start Course
              </>
            )}
            <ArrowRight className="w-4 h-4 ml-1.5 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>
      </Card>
    </Link>
  );
}

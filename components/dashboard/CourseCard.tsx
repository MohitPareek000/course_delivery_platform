import { Course, CourseProgress } from "@/types";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Briefcase, BookOpen, ArrowRight, PlayCircle, Code, Database, Cloud, Smartphone, Palette, TrendingUp, BarChart3, PenTool, Megaphone, Users, Settings, Building2 } from "lucide-react";
import Link from "next/link";
import * as React from "react";

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
  "Stack": Code,
  "Bootcamp": Code,
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

// Function to extract skill category from course title
const getSkillCategory = (title: string): string => {
  const titleLower = title.toLowerCase();
  for (const key of Object.keys(skillIcons)) {
    if (titleLower.includes(key.toLowerCase())) {
      return key.toUpperCase();
    }
  }
  return "SKILL"; // Default category
};

interface CourseCardProps {
  course: Course;
  progress: CourseProgress;
}

export function CourseCard({ course, progress }: CourseCardProps) {
  const isRoleSpecific = course.type === "role-specific";
  const isCompanySpecific = course.type === "company-specific";
  const isSkillBased = course.type === "skill-based";

  const [logoError, setLogoError] = React.useState(false);

  // Get icons/logos based on course type
  const roleIcon = course.role ? roleIcons[course.role] : null;
  const RoleIcon = roleIcon?.icon || Briefcase;
  const companyLogo = course.companyName ? companyLogos[course.companyName] : null;
  const SkillIcon = isSkillBased ? getSkillIcon(course.title) : BookOpen;

  // Get badge text
  const getBadgeText = () => {
    if (isRoleSpecific) return "Role-Specific";
    if (isCompanySpecific) return "Company-Specific";
    return "Skill-Based";
  };

  // Get category label
  const getCategoryLabel = () => {
    if (course.role) return course.role;
    if (course.companyName) return course.companyName;
    if (course.skill) return course.skill;
    return getSkillCategory(course.title);
  };

  return (
    <Link href={`/course/${course.id}`}>
      <Card className="h-full overflow-hidden hover:shadow-lg transition-all duration-200 hover:-translate-y-0.5 cursor-pointer border border-gray-100 flex flex-col">
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
              <Building2 className="w-10 h-10 text-primary" />
            </div>
          ) : isRoleSpecific ? (
            <div className="w-20 h-20 bg-white rounded-2xl shadow-lg flex items-center justify-center">
              <RoleIcon className="w-10 h-10" style={{ color: roleIcon?.bgColor || "#4285F4" }} />
            </div>
          ) : (
            <div className="w-20 h-20 bg-white rounded-2xl shadow-lg flex items-center justify-center">
              <SkillIcon className="w-10 h-10 text-secondary" />
            </div>
          )}
          <div className="absolute top-3 right-3">
            <Badge
              variant={isCompanySpecific ? "default" : isRoleSpecific ? "default" : "secondary"}
              className="text-xs px-2 py-0.5 font-medium"
            >
              {getBadgeText()}
            </Badge>
          </div>
        </div>

        {/* Card Content */}
        <div className="p-4 space-y-3 flex-1 flex flex-col">
          {/* Category Label */}
          <p className="text-xs font-bold text-secondary uppercase tracking-wide">
            {getCategoryLabel()}
          </p>

          {/* Course Title */}
          <h3 className="text-base font-bold text-gray-900 line-clamp-2 leading-snug">
            {course.title}
          </h3>

          {/* Description */}
          <p className="text-sm text-gray-600 line-clamp-2 leading-relaxed flex-1">
            {course.description}
          </p>

          {/* Progress Section and Button - Pinned to bottom */}
          <div className="space-y-3 mt-auto">
            <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-xs font-semibold text-gray-700">Progress</span>
              <span className="text-sm font-bold text-secondary">
                {progress.progressPercentage}%
              </span>
            </div>
            <Progress value={progress.progressPercentage} max={100} className="h-2" />
            <p className="text-xs text-gray-500 font-medium">
              {progress.completedModules} of {progress.totalModules} classes completed
            </p>
            </div>

            {/* Action Button */}
            <Button className="w-full h-9 text-sm font-semibold group">
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
        </div>
      </Card>
    </Link>
  );
}

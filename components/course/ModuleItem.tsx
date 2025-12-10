import { Module, UserProgress } from "@/types";
import { PlayCircle, CheckCircle2, Lock, Clock } from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { Tooltip } from "@/components/ui/tooltip";

interface ModuleItemProps {
  module: Module;
  progress?: UserProgress;
  courseId: string;
  isLocked?: boolean;
}

export function ModuleItem({ module, progress, courseId, isLocked = false }: ModuleItemProps) {
  const isCompleted = progress?.isCompleted || false;

  // Format duration (seconds to minutes)
  const durationMinutes = Math.ceil(module.duration / 60);

  const content = (
    <div
      className={cn(
        "flex items-center gap-3 p-3 rounded-lg border transition-all",
        isLocked
          ? "bg-gray-50 border-gray-200 cursor-not-allowed"
          : isCompleted
          ? "bg-green-50 border-green-200 hover:shadow-sm cursor-pointer"
          : "bg-white border-gray-200 hover:shadow-sm hover:border-primary cursor-pointer"
      )}
    >
      {/* Status Icon */}
      <div className="flex-shrink-0">
        {isLocked ? (
          <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
            <Lock className="w-4 h-4 text-gray-400" />
          </div>
        ) : isCompleted ? (
          <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center">
            <CheckCircle2 className="w-4 h-4 text-white" />
          </div>
        ) : (
          <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
            <PlayCircle className="w-4 h-4 text-primary" />
          </div>
        )}
      </div>

      {/* Module Info */}
      <div className="flex-1 min-w-0">
        <h5
          className={cn(
            "font-medium text-sm mb-0.5",
            isLocked ? "text-gray-400" : "text-gray-900"
          )}
        >
          {module.title}
        </h5>
        {module.description && (
          <p
            className={cn(
              "text-xs line-clamp-1",
              isLocked ? "text-gray-400" : "text-gray-600"
            )}
          >
            {module.description}
          </p>
        )}
        <div className="flex items-center gap-1.5 mt-0.5">
          <Clock className="w-3 h-3 text-gray-400" />
          <span className="text-xs text-gray-500">{durationMinutes} min</span>
        </div>
      </div>
    </div>
  );

  if (isLocked) {
    return (
      <Tooltip content="Complete the previous module to unlock">
        {content}
      </Tooltip>
    );
  }

  return <Link href={`/course/${courseId}/module/${module.id}`}>{content}</Link>;
}

import { Class, UserProgress } from "@/types";
import { PlayCircle, CheckCircle2, Lock, Clock, FileText, Trophy } from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { Tooltip } from "@/components/ui/tooltip";

interface ClassItemProps {
  class: Class;
  progress?: UserProgress;
  courseId: string;
  isLocked?: boolean;
}

export function ClassItem({ class: classItem, progress, courseId, isLocked = false }: ClassItemProps) {
  const isCompleted = progress?.isCompleted || false;
  const isTextContent = classItem.contentType === 'text';
  const isContest = classItem.contentType === 'contest';

  // Format duration (seconds to minutes)
  const durationMinutes = Math.ceil(classItem.duration / 60);
  const durationLabel = isTextContent
    ? `${durationMinutes} min read`
    : isContest
    ? `${durationMinutes} min assessment`
    : `${durationMinutes} min`;

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
        ) : isTextContent ? (
          <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center">
            <FileText className="w-4 h-4 text-amber-600" />
          </div>
        ) : isContest ? (
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
      <div className="flex-1 min-w-0">
        <h5
          className={cn(
            "font-medium text-sm mb-0.5",
            isLocked ? "text-gray-400" : "text-gray-900"
          )}
        >
          {classItem.title}
        </h5>
        {classItem.description && (
          <p
            className={cn(
              "text-xs line-clamp-1",
              isLocked ? "text-gray-400" : "text-gray-600"
            )}
          >
            {classItem.description}
          </p>
        )}
        <div className="flex items-center gap-1.5 mt-0.5">
          <Clock className="w-3 h-3 text-gray-400" />
          <span className="text-xs text-gray-500">{durationLabel}</span>
        </div>
      </div>
    </div>
  );

  if (isLocked) {
    return (
      <Tooltip content="Complete the previous class to unlock">
        {content}
      </Tooltip>
    );
  }

  return <Link href={`/course/${courseId}/class/${classItem.id}`}>{content}</Link>;
}

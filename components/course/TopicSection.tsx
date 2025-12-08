import { Topic } from "@/types";
import { BookOpen } from "lucide-react";

interface TopicSectionProps {
  topic: Topic;
  children: React.ReactNode;
}

export function TopicSection({ topic, children }: TopicSectionProps) {
  return (
    <div className="space-y-2">
      <div className="flex items-center gap-1.5">
        <BookOpen className="w-4 h-4 text-primary" />
        <h4 className="font-semibold text-sm text-gray-900">{topic.title}</h4>
      </div>
      <div className="ml-5 space-y-3">{children}</div>
    </div>
  );
}

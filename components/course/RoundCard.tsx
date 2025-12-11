import { Round } from "@/types";
import { AccordionItem } from "@/components/ui/accordion";
import { Lock, CheckCircle2, Circle } from "lucide-react";

interface RoundCardProps {
  round: Round;
  isUnlocked: boolean;
  progress: {
    totalModules: number;
    completedModules: number;
    progressPercentage: number;
  };
  children: React.ReactNode;
}

export function RoundCard({ round, isUnlocked, progress, children }: RoundCardProps) {
  return (
    <AccordionItem
      title={round.title}
      disabled={!isUnlocked}
      defaultOpen={isUnlocked && round.order === 1}
      icon={
        isUnlocked ? (
          progress.progressPercentage === 100 ? (
            <CheckCircle2 className="w-5 h-5 text-green-500" />
          ) : (
            <Circle className="w-5 h-5 text-primary" />
          )
        ) : (
          <Lock className="w-5 h-5 text-gray-400" />
        )
      }
    >
      <div className="space-y-3 pt-3">
        {/* Round Description */}
        <p className="text-sm text-gray-700">{round.description}</p>

        {/* Learning Outcomes */}
        {round.learningOutcomes && round.learningOutcomes.length > 0 && (
          <div>
            <h4 className="font-semibold text-xs text-gray-900 mb-1.5">
              Why it is Important:
            </h4>
            <ul className="space-y-1">
              {round.learningOutcomes.map((outcome, index) => (
                <li key={index} className="flex items-start gap-1.5 text-xs text-gray-600">
                  <CheckCircle2 className="w-3.5 h-3.5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>{outcome}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Lock Message */}
        {!isUnlocked && (
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-3 flex items-center gap-2.5">
            <Lock className="w-4 h-4 text-gray-400" />
            <p className="text-xs text-gray-600">
              Complete the previous module to unlock this module
            </p>
          </div>
        )}

        {/* Topics and Modules */}
        {isUnlocked && children}
      </div>
    </AccordionItem>
  );
}

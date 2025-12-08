"use client";

import * as React from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface AccordionItemProps {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
  disabled?: boolean;
  icon?: React.ReactNode;
}

export function AccordionItem({
  title,
  children,
  defaultOpen = false,
  disabled = false,
  icon,
}: AccordionItemProps) {
  const [isOpen, setIsOpen] = React.useState(defaultOpen);

  return (
    <div className="border rounded-lg overflow-hidden bg-white">
      <button
        onClick={() => !disabled && setIsOpen(!isOpen)}
        disabled={disabled}
        className={cn(
          "w-full flex items-center justify-between p-4 text-left transition-colors",
          disabled
            ? "bg-gray-50 cursor-not-allowed"
            : "hover:bg-gray-50 cursor-pointer"
        )}
      >
        <div className="flex items-center gap-3">
          {icon}
          <span className={cn("font-semibold", disabled && "text-gray-400")}>
            {title}
          </span>
        </div>
        <ChevronDown
          className={cn(
            "w-5 h-5 transition-transform",
            isOpen && "transform rotate-180",
            disabled ? "text-gray-400" : "text-gray-600"
          )}
        />
      </button>
      {isOpen && <div className="p-4 pt-0 border-t">{children}</div>}
    </div>
  );
}

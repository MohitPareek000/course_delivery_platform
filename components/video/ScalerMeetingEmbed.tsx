"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Play } from "lucide-react";

interface ScalerMeetingEmbedProps {
  meetingUrl: string;
  classId: string;
  className?: string;
  onMarkComplete?: () => void;
}

export function ScalerMeetingEmbed({
  meetingUrl,
  className,
}: ScalerMeetingEmbedProps) {
  const handleOpenMeeting = () => {
    window.open(meetingUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <div
      className={cn(
        "relative bg-black overflow-hidden w-full aspect-video cursor-pointer group",
        className
      )}
      onClick={handleOpenMeeting}
    >
      {/* Center play button */}
      <div className="absolute inset-0 flex items-center justify-center">
        {/* Outer pulse ring */}
        <div className="absolute w-14 h-14 sm:w-20 sm:h-20 rounded-full border border-white/20 opacity-0 group-hover:opacity-100 group-hover:scale-[2] transition-all duration-700 ease-out" />

        {/* Inner pulse ring */}
        <div className="absolute w-14 h-14 sm:w-20 sm:h-20 rounded-full border border-white/30 opacity-0 group-hover:opacity-100 group-hover:scale-150 transition-all duration-500 ease-out delay-100" />

        {/* Glow effect */}
        <div className="absolute w-20 h-20 sm:w-28 sm:h-28 rounded-full bg-white/10 blur-2xl opacity-0 group-hover:opacity-100 transition-all duration-500" />

        {/* Play button */}
        <div className="relative w-14 h-14 sm:w-20 sm:h-20 rounded-full bg-white/90 flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:bg-white group-hover:shadow-[0_0_40px_rgba(255,255,255,0.4)] transition-all duration-300 ease-out">
          <Play className="w-6 h-6 sm:w-8 sm:h-8 text-slate-800 ml-1 group-hover:text-blue-600 group-hover:scale-110 transition-all duration-300" fill="currentColor" />
        </div>
      </div>

      {/* Bottom text */}
      <div className="absolute bottom-2 sm:bottom-4 left-0 right-0 text-center px-2 sm:px-4">
        <span className="text-white/60 text-[10px] sm:text-sm leading-tight">Video opens in new tab · Return to mark complete</span>
      </div>
    </div>
  );
}

"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { ExternalLink, Video } from "lucide-react";

interface ScalerMeetingEmbedProps {
  meetingUrl: string;
  classId: string;
  className?: string;
  onMarkComplete?: () => void;
}

export function ScalerMeetingEmbed({
  meetingUrl,
  classId,
  className,
  onMarkComplete,
}: ScalerMeetingEmbedProps) {
  // Detect if URL is a Scaler Meeting URL
  const isScalerMeeting = meetingUrl.includes('scaler.com/meetings');

  const handleOpenMeeting = () => {
    window.open(meetingUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <div
      className={cn(
        "relative bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg overflow-hidden w-full aspect-video flex flex-col items-center justify-center p-8",
        className
      )}
    >
      {/* Scaler Meeting Badge */}
      {isScalerMeeting && (
        <div className="absolute top-4 left-4 px-3 py-1.5 bg-blue-600 text-white text-sm font-medium rounded-md shadow-lg">
          Scaler Meeting
        </div>
      )}

      {/* Content */}
      <div className="flex flex-col items-center justify-center gap-6 max-w-2xl text-center">
        {/* Icon */}
        <div className="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center shadow-xl">
          <Video className="w-10 h-10 text-white" />
        </div>

        {/* Title */}
        <div>
          <h3 className="text-2xl font-bold text-gray-900 mb-2">
            Join Scaler Meeting
          </h3>
          <p className="text-gray-600 text-base">
            This class is a live Scaler Meeting. Click the button below to open it in a new tab.
          </p>
        </div>

        {/* Open Button */}
        <button
          onClick={handleOpenMeeting}
          className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-4 rounded-lg transition-all shadow-lg hover:shadow-xl hover:scale-105"
        >
          <ExternalLink className="w-5 h-5" />
          Open Scaler Meeting
        </button>

        {/* Additional Info */}
        <div className="mt-4 p-4 bg-white rounded-lg border border-blue-100 shadow-sm">
          <p className="text-sm text-gray-600">
            <strong className="text-gray-900">Note:</strong> The meeting will open in a new tab.
            After attending, come back here to mark this class as complete.
          </p>
        </div>
      </div>
    </div>
  );
}

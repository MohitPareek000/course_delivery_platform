"use client";

import * as React from "react";
import { X, Star } from "lucide-react";
import { analytics } from "@/lib/analytics";

interface RatingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (rating: number, feedback?: string) => void;
  title: string;
  subtitle?: string;
  type: 'module' | 'course';
  isSubmitting?: boolean;
  moduleId?: string;
  courseId?: string;
}

export function RatingModal({
  isOpen,
  onClose,
  onSubmit,
  title,
  subtitle,
  type,
  isSubmitting = false,
  moduleId,
  courseId,
}: RatingModalProps) {
  const [rating, setRating] = React.useState(0);
  const [hoveredRating, setHoveredRating] = React.useState(0);
  const [feedback, setFeedback] = React.useState("");

  // Reset state when modal opens
  React.useEffect(() => {
    if (isOpen) {
      setRating(0);
      setHoveredRating(0);
      setFeedback("");
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSubmit = () => {
    if (rating === 0) return;
    onSubmit(rating, feedback.trim() || undefined);
  };

  const handleSkip = (action: 'skip_button' | 'close_button' | 'overlay_click') => {
    analytics.button.clicked(`Rating Modal ${action}`, '/rating-modal', {
      ratingType: type,
      moduleId: moduleId || null,
      courseId: courseId || null,
      action,
    });
    onClose();
  };

  const getRatingLabel = (value: number) => {
    switch (value) {
      case 1: return "Poor";
      case 2: return "Fair";
      case 3: return "Good";
      case 4: return "Very Good";
      case 5: return "Excellent";
      default: return "Select a rating";
    }
  };

  const displayRating = hoveredRating || rating;

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black/50 z-50 transition-opacity backdrop-blur-sm"
        onClick={() => handleSkip('overlay_click')}
      />

      {/* Modal */}
      <div className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-xl p-6 mx-4 animate-in fade-in zoom-in-95 duration-200">
          {/* Header */}
          <div className="flex items-center justify-between mb-2">
            <div className="flex-1" />
            <button
              onClick={() => handleSkip('close_button')}
              className="p-1 rounded-lg hover:bg-gray-100 transition-colors"
              disabled={isSubmitting}
            >
              <X className="w-5 h-5 text-gray-400" />
            </button>
          </div>

          {/* Content */}
          <div className="text-center">
            {/* Icon */}
            <div className="mb-4">
              <div className="w-16 h-16 mx-auto rounded-full bg-primary/10 flex items-center justify-center">
                <Star className="w-8 h-8 text-primary fill-primary" />
              </div>
            </div>

            {/* Title */}
            <h2 className="text-xl font-bold text-gray-900 mb-1">{title}</h2>
            {subtitle && (
              <p className="text-sm text-gray-500 mb-6">{subtitle}</p>
            )}

            {/* Star Rating */}
            <div className="flex justify-center gap-2 mb-3">
              {[1, 2, 3, 4, 5].map((value) => (
                <button
                  key={value}
                  type="button"
                  onClick={() => setRating(value)}
                  onMouseEnter={() => setHoveredRating(value)}
                  onMouseLeave={() => setHoveredRating(0)}
                  disabled={isSubmitting}
                  className="p-1 transition-transform hover:scale-110 disabled:opacity-50"
                >
                  <Star
                    className={`w-10 h-10 transition-colors ${
                      value <= displayRating
                        ? "text-yellow-400 fill-yellow-400"
                        : "text-gray-300"
                    }`}
                  />
                </button>
              ))}
            </div>

            {/* Rating Label */}
            <p className={`text-sm font-medium mb-6 h-5 ${
              displayRating > 0 ? "text-gray-700" : "text-gray-400"
            }`}>
              {getRatingLabel(displayRating)}
            </p>

            {/* Feedback Textarea (optional) */}
            <div className="mb-6">
              <textarea
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                placeholder="Share your feedback (optional)"
                disabled={isSubmitting}
                className="w-full p-3 border border-gray-200 rounded-lg text-sm resize-none focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary disabled:opacity-50"
                rows={3}
              />
            </div>

            {/* Buttons */}
            <div className="flex gap-3">
              <button
                onClick={() => handleSkip('skip_button')}
                disabled={isSubmitting}
                className="flex-1 px-4 py-2.5 text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors font-medium disabled:opacity-50"
              >
                Skip
              </button>
              <button
                onClick={handleSubmit}
                disabled={rating === 0 || isSubmitting}
                className="flex-1 px-4 py-2.5 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? "Submitting..." : "Submit"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

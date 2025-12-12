"use client";

import * as React from "react";
import { X, User, Mail } from "lucide-react";

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  userName: string;
  userEmail?: string;
}

export function ProfileModal({ isOpen, onClose, userName, userEmail }: ProfileModalProps) {
  if (!isOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black/50 z-50 transition-opacity"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-md">
        <div className="bg-white rounded-lg shadow-xl p-6 mx-4">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900">Profile Details</h2>
            <button
              onClick={onClose}
              className="p-1 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <X className="w-5 h-5 text-gray-500" />
            </button>
          </div>

          {/* Profile Content */}
          <div className="space-y-4">
            {/* Profile Icon */}
            <div className="flex justify-center mb-6">
              <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center ring-4 ring-primary/20">
                <User className="w-10 h-10 text-primary" />
              </div>
            </div>

            {/* Name */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-600 flex items-center gap-2">
                <User className="w-4 h-4" />
                Name
              </label>
              <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                <p className="text-gray-900 font-medium">{userName}</p>
              </div>
            </div>

            {/* Email */}
            {userEmail && (
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-600 flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  Email
                </label>
                <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                  <p className="text-gray-900">{userEmail}</p>
                </div>
              </div>
            )}
          </div>

          {/* Close Button */}
          <div className="mt-6">
            <button
              onClick={onClose}
              className="w-full px-4 py-2.5 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors font-medium"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

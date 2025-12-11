import { useState, useEffect, useRef } from "react";
import { UserProgress } from "@/types";
import { getAllUserProgressFromDB } from "@/lib/db/dbQueries";

export function useUserProgress(userId: string) {
  const [progress, setProgress] = useState<UserProgress[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const hasFetchedOnce = useRef(false);

  const fetchProgress = async () => {
    try {
      // Only show loading on initial fetch, not on refresh
      // This prevents progress from "fading" when navigating back
      if (!hasFetchedOnce.current) {
        setIsLoading(true);
      }
      const data = await getAllUserProgressFromDB(userId);
      setProgress(data);
      hasFetchedOnce.current = true;
    } catch (err) {
      setError(err as Error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProgress();
  }, [userId]);

  // Refetch progress when page becomes visible (user returns from another page)
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        fetchProgress();
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    // Also refetch when window gains focus
    window.addEventListener('focus', fetchProgress);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('focus', fetchProgress);
    };
  }, [userId]);

  // Helper function to get progress for a specific module
  const getModuleProgress = (moduleId: string) => {
    return progress.find((p) => p.moduleId === moduleId);
  };

  // Helper function to check if module is completed
  const isModuleCompleted = (moduleId: string) => {
    return getModuleProgress(moduleId)?.isCompleted || false;
  };

  // Helper function to get all completed module IDs
  const getCompletedModuleIds = () => {
    return progress.filter((p) => p.isCompleted).map((p) => p.moduleId);
  };

  // Refresh progress
  const refreshProgress = async () => {
    try {
      const data = await getAllUserProgressFromDB(userId);
      setProgress(data);
    } catch (err) {
      setError(err as Error);
    }
  };

  return {
    progress,
    isLoading,
    error,
    getModuleProgress,
    isModuleCompleted,
    getCompletedModuleIds,
    refreshProgress,
  };
}

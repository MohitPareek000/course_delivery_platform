import { useState, useEffect, useRef } from "react";
import { UserProgress } from "@/types";
import { getAllUserProgressFromDB } from "@/lib/db/dbQueries";

export function useUserProgress(userId: string) {
  const [progress, setProgress] = useState<UserProgress[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const hasFetchedOnce = useRef(false);

  const fetchProgress = async () => {
    if (!userId) {
      setIsLoading(false);
      return;
    }

    try {
      // Always show loading briefly to indicate refresh
      setIsLoading(true);
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
    // Always fetch fresh data when userId changes or component mounts
    fetchProgress();
  }, [userId]);

  // Helper function to get progress for a specific class
  const getClassProgress = (classId: string) => {
    return progress.find((p) => p.classId === classId);
  };

  // Helper function to check if class is completed
  const isClassCompleted = (classId: string) => {
    return getClassProgress(classId)?.isCompleted || false;
  };

  // Helper function to get all completed class IDs
  const getCompletedClassIds = () => {
    return progress.filter((p) => p.isCompleted).map((p) => p.classId);
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
    getClassProgress,
    isClassCompleted,
    getCompletedClassIds,
    refreshProgress,
  };
}

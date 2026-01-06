import { useState, useEffect, useRef, useCallback } from "react";
import { UserProgress } from "@/types";
import { getAllUserProgressFromDB } from "@/lib/db/dbQueries";

// Cache for progress data
const progressCache = new Map<string, { data: UserProgress[]; timestamp: number }>();
const CACHE_DURATION = 30000; // 30 seconds

// Track in-flight requests to prevent duplicates
const inFlightProgressRequests = new Map<string, Promise<UserProgress[]>>();

export function useUserProgress(userId: string) {
  const [progress, setProgress] = useState<UserProgress[]>(() => {
    // Try to load from cache on initial render
    if (userId) {
      const cached = progressCache.get(userId);
      if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
        return cached.data;
      }
    }
    return [];
  });
  const [isLoading, setIsLoading] = useState(() => {
    // If we have cached data, don't show loading
    if (userId) {
      const cached = progressCache.get(userId);
      if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
        return false;
      }
    }
    return true;
  });
  const [error, setError] = useState<Error | null>(null);
  const hasFetchedOnce = useRef(false);

  useEffect(() => {
    if (!userId) {
      setIsLoading(false);
      return;
    }

    // Check cache first - if valid, use it and skip fetch
    const cached = progressCache.get(userId);
    if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
      setProgress(cached.data);
      setIsLoading(false);
      return;
    }

    // Prevent duplicate fetches in Strict Mode
    if (hasFetchedOnce.current) return;
    hasFetchedOnce.current = true;

    const fetchProgress = async () => {
      try {
        setIsLoading(true);

        // Check if there's already a request in flight for this user
        let requestPromise = inFlightProgressRequests.get(userId);

        if (!requestPromise) {
          // Create new request
          requestPromise = getAllUserProgressFromDB(userId)
            .then(data => {
              // Store in cache
              progressCache.set(userId, { data, timestamp: Date.now() });
              return data;
            })
            .finally(() => {
              // Remove from in-flight requests
              inFlightProgressRequests.delete(userId);
            });

          inFlightProgressRequests.set(userId, requestPromise);
        }

        const data = await requestPromise;
        setProgress(data);
      } catch (err) {
        setError(err as Error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProgress();

    // Cleanup for Strict Mode
    return () => {
      hasFetchedOnce.current = false;
    };
  }, [userId]);

  // Helper function to get progress for a specific class
  const getClassProgress = useCallback((classId: string) => {
    return progress.find((p) => p.classId === classId);
  }, [progress]);

  // Helper function to check if class is completed
  const isClassCompleted = useCallback((classId: string) => {
    const classProgress = progress.find((p) => p.classId === classId);
    return classProgress?.isCompleted || false;
  }, [progress]);

  // Helper function to get all completed class IDs
  const getCompletedClassIds = useCallback(() => {
    return progress.filter((p) => p.isCompleted).map((p) => p.classId);
  }, [progress]);

  // Refresh progress - memoized to prevent infinite loops
  const refreshProgress = useCallback(async () => {
    if (!userId) return;
    try {
      const data = await getAllUserProgressFromDB(userId);
      // Update cache
      progressCache.set(userId, { data, timestamp: Date.now() });
      setProgress(data);
    } catch (err) {
      setError(err as Error);
    }
  }, [userId]);

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

import { useState, useEffect, useRef } from 'react';
import { Course, Module, Topic, Class } from '@/types';

interface CourseWithStructure extends Course {
  modules: (Module & {
    topics: (Topic & {
      classes: Class[];
    })[];
  })[];
  topics: (Topic & {
    classes: Class[];
  })[];
}

// Cache for course data
const courseCache = new Map<string, { data: CourseWithStructure; timestamp: number }>();
const CACHE_DURATION = 60000; // 60 seconds (courses change less frequently)

// Track in-flight requests to prevent duplicates
const inFlightRequests = new Map<string, Promise<CourseWithStructure>>();

export function useCourseData(courseId: string) {
  const [course, setCourse] = useState<CourseWithStructure | null>(() => {
    // Try to load from cache on initial render
    if (courseId) {
      const cached = courseCache.get(courseId);
      if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
        return cached.data;
      }
    }
    return null;
  });
  const [isLoading, setIsLoading] = useState(() => {
    // If we have cached data, don't show loading
    if (courseId) {
      const cached = courseCache.get(courseId);
      if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
        return false;
      }
    }
    return true;
  });
  const [error, setError] = useState<string | null>(null);
  const hasFetched = useRef(false);

  useEffect(() => {
    if (!courseId) return;

    // Check cache first - if valid, use it and skip fetch
    const cached = courseCache.get(courseId);
    if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
      setCourse(cached.data);
      setIsLoading(false);
      return;
    }

    // Prevent duplicate fetches in Strict Mode
    if (hasFetched.current) return;
    hasFetched.current = true;

    const fetchCourse = async () => {
      try {
        setIsLoading(true);

        // Check if there's already a request in flight for this course
        let requestPromise = inFlightRequests.get(courseId);

        if (!requestPromise) {
          // Create new request
          requestPromise = fetch(`/api/courses/${courseId}`)
            .then(response => {
              if (!response.ok) {
                throw new Error('Failed to fetch course');
              }
              return response.json();
            })
            .then(data => {
              // Store in cache
              courseCache.set(courseId, { data: data.course, timestamp: Date.now() });
              return data.course;
            })
            .finally(() => {
              // Remove from in-flight requests
              inFlightRequests.delete(courseId);
            });

          inFlightRequests.set(courseId, requestPromise);
        }

        const courseData = await requestPromise;
        setCourse(courseData);
        setError(null);
      } catch (err) {
        console.error('Error fetching course:', err);
        setError('Failed to load course data');
        setCourse(null);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCourse();

    // Cleanup for Strict Mode
    return () => {
      hasFetched.current = false;
    };
  }, [courseId]);

  return { course, isLoading, error };
}

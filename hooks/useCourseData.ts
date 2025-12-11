import { useState, useEffect } from 'react';
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

  useEffect(() => {
    if (!courseId) return;

    const fetchCourse = async () => {
      // Check cache first
      const cached = courseCache.get(courseId);
      if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
        setCourse(cached.data);
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        const response = await fetch(`/api/courses/${courseId}`);

        if (!response.ok) {
          throw new Error('Failed to fetch course');
        }

        const data = await response.json();
        setCourse(data.course);

        // Store in cache
        courseCache.set(courseId, { data: data.course, timestamp: Date.now() });

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
  }, [courseId]);

  return { course, isLoading, error };
}

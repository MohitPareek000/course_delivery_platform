import { useState, useEffect } from 'react';
import { Course, Round, Topic, Module } from '@/types';

interface CourseWithStructure extends Course {
  rounds: (Round & {
    topics: (Topic & {
      modules: Module[];
    })[];
  })[];
  topics: (Topic & {
    modules: Module[];
  })[];
}

export function useCourseData(courseId: string) {
  const [course, setCourse] = useState<CourseWithStructure | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!courseId) return;

    const fetchCourse = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(`/api/courses/${courseId}`);

        if (!response.ok) {
          throw new Error('Failed to fetch course');
        }

        const data = await response.json();
        setCourse(data.course);
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

export interface User {
  id: string;
  email: string;
  name?: string;
  createdAt: Date;
}

export interface Course {
  id: string;
  title: string;
  description: string;
  role?: string;           // For role-specific courses (e.g., "Software Engineer")
  skill?: string;          // For skill-based courses (e.g., "Java", "React")
  companyName?: string;    // For company-specific courses (e.g., "Google", "Amazon")
  type: 'role-specific' | 'skill-based' | 'company-specific';
  thumbnailUrl?: string;
  createdAt: Date;
}

export interface CourseAccess {
  id: string;
  userId: string;
  courseId: string;
  assignedAt: Date;
}

export interface Round {
  id: string;
  courseId: string;
  title: string;
  description: string;
  order: number;
  learningOutcomes: string[];
}

// Alias for Round - more generic naming for all course types
export type Section = Round;

export interface Topic {
  id: string;
  roundId?: string; // Can also be called sectionId
  courseId: string;
  title: string;
  order: number;
}

export interface Module {
  id: string;
  topicId: string;
  title: string;
  description?: string;
  contentType?: 'video' | 'text' | 'contest'; // Type of content (defaults to 'video' if not specified)
  videoUrl?: string;              // For video content
  textContent?: string;           // For text-based content (supports markdown)
  contestUrl?: string;            // For contest/assessment (e.g., Hiretest link)
  duration: number;               // For video: seconds, for text: read time, for contest: estimated time
  order: number;
}

export interface UserProgress {
  id: string;
  userId: string;
  moduleId: string;
  watchedDuration: number;
  isCompleted: boolean;
  lastWatchedAt: Date;
  completedAt?: Date;
}

export interface CourseProgress {
  courseId: string;
  totalModules: number;
  completedModules: number;
  progressPercentage: number;
}

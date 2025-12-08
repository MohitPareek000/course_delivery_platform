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
  companyName?: string;
  type: 'company-specific' | 'skill-based';
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

export interface Topic {
  id: string;
  roundId?: string;
  courseId: string;
  title: string;
  order: number;
}

export interface Module {
  id: string;
  topicId: string;
  title: string;
  description?: string;
  videoUrl: string;
  duration: number;
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

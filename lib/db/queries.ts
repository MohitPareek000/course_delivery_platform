import {
  mockCourses,
  mockCourseAccess,
  mockRounds,
  mockTopics,
  mockModules,
  mockUserProgress,
} from "./mockData";
import { CourseProgress } from "@/types";

// Get courses assigned to a user
export function getUserCourses(userId: string) {
  const accessList = mockCourseAccess.filter((access) => access.userId === userId);
  const courseIds = accessList.map((access) => access.courseId);
  return mockCourses.filter((course) => courseIds.includes(course.id));
}

// Get course by ID
export function getCourseById(courseId: string) {
  return mockCourses.find((course) => course.id === courseId);
}

// Get rounds for a course
export function getCourseRounds(courseId: string) {
  return mockRounds
    .filter((round) => round.courseId === courseId)
    .sort((a, b) => a.order - b.order);
}

// Get topics for a round or course
export function getTopics(courseId: string, roundId?: string) {
  if (roundId) {
    return mockTopics
      .filter((topic) => topic.roundId === roundId)
      .sort((a, b) => a.order - b.order);
  }
  // For skill-based courses (no round)
  return mockTopics
    .filter((topic) => topic.courseId === courseId && !topic.roundId)
    .sort((a, b) => a.order - b.order);
}

// Get modules for a topic
export function getTopicModules(topicId: string) {
  return mockModules
    .filter((module) => module.topicId === topicId)
    .sort((a, b) => a.order - b.order);
}

// Get module by ID
export function getModuleById(moduleId: string) {
  return mockModules.find((module) => module.id === moduleId);
}

// Get all modules for a course
export function getCourseModules(courseId: string) {
  const topics = mockTopics.filter((topic) => topic.courseId === courseId);
  const topicIds = topics.map((topic) => topic.id);
  return mockModules.filter((module) => topicIds.includes(module.topicId));
}

// Get user progress for a module
export function getUserModuleProgress(userId: string, moduleId: string) {
  return mockUserProgress.find(
    (progress) => progress.userId === userId && progress.moduleId === moduleId
  );
}

// Get all user progress
export function getAllUserProgress(userId: string) {
  return mockUserProgress.filter((progress) => progress.userId === userId);
}

// Calculate course progress for a user
export function calculateCourseProgress(
  userId: string,
  courseId: string
): CourseProgress {
  const allModules = getCourseModules(courseId);
  const totalModules = allModules.length;

  const completedModules = allModules.filter((module) => {
    const progress = getUserModuleProgress(userId, module.id);
    return progress?.isCompleted || false;
  }).length;

  const progressPercentage =
    totalModules > 0 ? Math.round((completedModules / totalModules) * 100) : 0;

  return {
    courseId,
    totalModules,
    completedModules,
    progressPercentage,
  };
}

// Check if a round is unlocked for a user
export function isRoundUnlocked(userId: string, courseId: string, roundOrder: number): boolean {
  // Round 1 is always unlocked
  if (roundOrder === 1) return true;

  // Get previous round
  const previousRound = mockRounds.find(
    (round) => round.courseId === courseId && round.order === roundOrder - 1
  );

  if (!previousRound) return false;

  // Get all topics in previous round
  const previousTopics = getTopics(courseId, previousRound.id);
  const topicIds = previousTopics.map((topic) => topic.id);

  // Get all modules in previous round
  const previousModules = mockModules.filter((module) =>
    topicIds.includes(module.topicId)
  );

  // Check if all modules are completed
  const allCompleted = previousModules.every((module) => {
    const progress = getUserModuleProgress(userId, module.id);
    return progress?.isCompleted || false;
  });

  return allCompleted;
}

// Get round progress
export function getRoundProgress(userId: string, courseId: string, roundId: string) {
  const topics = getTopics(courseId, roundId);
  const topicIds = topics.map((topic) => topic.id);
  const roundModules = mockModules.filter((module) =>
    topicIds.includes(module.topicId)
  );

  const totalModules = roundModules.length;
  const completedModules = roundModules.filter((module) => {
    const progress = getUserModuleProgress(userId, module.id);
    return progress?.isCompleted || false;
  }).length;

  return {
    totalModules,
    completedModules,
    progressPercentage:
      totalModules > 0 ? Math.round((completedModules / totalModules) * 100) : 0,
  };
}

// Get next module in sequence
export function getNextModule(currentModuleId: string) {
  const currentModule = getModuleById(currentModuleId);
  if (!currentModule) return null;

  const topicModules = getTopicModules(currentModule.topicId);
  const currentIndex = topicModules.findIndex((m) => m.id === currentModuleId);

  // If there's a next module in the same topic
  if (currentIndex < topicModules.length - 1) {
    return topicModules[currentIndex + 1];
  }

  // Otherwise, find the next topic's first module
  const currentTopic = mockTopics.find((t) => t.id === currentModule.topicId);
  if (!currentTopic) return null;

  const nextTopic = mockTopics.find(
    (t) =>
      t.courseId === currentTopic.courseId &&
      t.roundId === currentTopic.roundId &&
      t.order === currentTopic.order + 1
  );

  if (nextTopic) {
    const nextTopicModules = getTopicModules(nextTopic.id);
    return nextTopicModules[0] || null;
  }

  return null;
}

// Get previous module in sequence
export function getPreviousModule(currentModuleId: string) {
  const currentModule = getModuleById(currentModuleId);
  if (!currentModule) return null;

  const topicModules = getTopicModules(currentModule.topicId);
  const currentIndex = topicModules.findIndex((m) => m.id === currentModuleId);

  // If there's a previous module in the same topic
  if (currentIndex > 0) {
    return topicModules[currentIndex - 1];
  }

  // Otherwise, find the previous topic's last module
  const currentTopic = mockTopics.find((t) => t.id === currentModule.topicId);
  if (!currentTopic) return null;

  const previousTopic = mockTopics.find(
    (t) =>
      t.courseId === currentTopic.courseId &&
      t.roundId === currentTopic.roundId &&
      t.order === currentTopic.order - 1
  );

  if (previousTopic) {
    const prevTopicModules = getTopicModules(previousTopic.id);
    return prevTopicModules[prevTopicModules.length - 1] || null;
  }

  return null;
}

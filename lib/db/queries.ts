import {
  mockCourses,
  mockCourseAccess,
  mockModules,
  mockTopics,
  mockClasses,
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

// Get modules for a course (renamed from rounds)
export function getCourseRounds(courseId: string) {
  return mockModules
    .filter((module) => module.courseId === courseId)
    .sort((a, b) => a.order - b.order);
}

// Get topics for a module or course
export function getTopics(courseId: string, moduleId?: string) {
  if (moduleId) {
    return mockTopics
      .filter((topic) => topic.moduleId === moduleId)
      .sort((a, b) => a.order - b.order);
  }
  // For skill-based courses (no module)
  return mockTopics
    .filter((topic) => topic.courseId === courseId && !topic.moduleId)
    .sort((a, b) => a.order - b.order);
}

// Get classes for a topic (classes are lessons, previously called modules)
export function getTopicModules(topicId: string) {
  return mockClasses
    .filter((classItem) => classItem.topicId === topicId)
    .sort((a, b) => a.order - b.order);
}

// Get class by ID (class = lesson, previously called module)
export function getModuleById(moduleId: string) {
  return mockClasses.find((classItem) => classItem.id === moduleId);
}

// Get all classes for a course (classes = lessons)
export function getCourseModules(courseId: string) {
  const topics = mockTopics.filter((topic) => topic.courseId === courseId);
  const topicIds = topics.map((topic) => topic.id);
  return mockClasses.filter((classItem) => topicIds.includes(classItem.topicId));
}

// Get user progress for a class (class = lesson, moduleId param kept for backward compatibility)
export function getUserModuleProgress(userId: string, moduleId: string) {
  return mockUserProgress.find(
    (progress) => progress.userId === userId && progress.classId === moduleId
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

// Check if a module is unlocked for a user (module = course section, previously called round)
export function isRoundUnlocked(userId: string, courseId: string, moduleOrder: number): boolean {
  // Module 1 is always unlocked
  if (moduleOrder === 1) return true;

  // Get previous module
  const previousModule = mockModules.find(
    (module) => module.courseId === courseId && module.order === moduleOrder - 1
  );

  if (!previousModule) return false;

  // Get all topics in previous module
  const previousTopics = getTopics(courseId, previousModule.id);
  const topicIds = previousTopics.map((topic) => topic.id);

  // Get all classes in previous module
  const previousClasses = mockClasses.filter((classItem) =>
    topicIds.includes(classItem.topicId)
  );

  // Check if all classes are completed
  const allCompleted = previousClasses.every((classItem) => {
    const progress = getUserModuleProgress(userId, classItem.id);
    return progress?.isCompleted || false;
  });

  return allCompleted;
}

// Get module progress (module = course section, previously called round)
export function getRoundProgress(userId: string, courseId: string, moduleId: string) {
  const topics = getTopics(courseId, moduleId);
  const topicIds = topics.map((topic) => topic.id);
  const moduleClasses = mockClasses.filter((classItem) =>
    topicIds.includes(classItem.topicId)
  );

  const totalModules = moduleClasses.length;
  const completedModules = moduleClasses.filter((classItem) => {
    const progress = getUserModuleProgress(userId, classItem.id);
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
      t.moduleId === currentTopic.moduleId &&
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
      t.moduleId === currentTopic.moduleId &&
      t.order === currentTopic.order - 1
  );

  if (previousTopic) {
    const prevTopicModules = getTopicModules(previousTopic.id);
    return prevTopicModules[prevTopicModules.length - 1] || null;
  }

  return null;
}

// Aliases for new naming convention (Class = Module in code)
export const getClassById = getModuleById;
export const getNextClass = getNextModule;
export const getPreviousClass = getPreviousModule;

// Check if a module is locked for a user
export function isModuleLocked(userId: string, moduleId: string): boolean {
  const currentModule = getModuleById(moduleId);
  if (!currentModule) return true;

  // Get all modules in the same topic
  const topicModules = getTopicModules(currentModule.topicId);
  const currentIndex = topicModules.findIndex((m) => m.id === moduleId);

  // First module in a topic is always unlocked (unless round is locked)
  if (currentIndex === 0) {
    const currentTopic = mockTopics.find((t) => t.id === currentModule.topicId);
    if (!currentTopic) return false;

    // If it's the first topic in a course/round, it's unlocked
    if (currentTopic.order === 1) return false;

    // Check if previous topic's last module is completed
    const previousTopic = mockTopics.find(
      (t) =>
        t.courseId === currentTopic.courseId &&
        t.moduleId === currentTopic.moduleId &&
        t.order === currentTopic.order - 1
    );

    if (previousTopic) {
      const prevTopicModules = getTopicModules(previousTopic.id);
      const lastModule = prevTopicModules[prevTopicModules.length - 1];
      if (lastModule) {
        const progress = getUserModuleProgress(userId, lastModule.id);
        return !(progress?.isCompleted || false);
      }
    }
    return false;
  }

  // For other modules, check if the previous module is completed
  const previousModule = topicModules[currentIndex - 1];
  const progress = getUserModuleProgress(userId, previousModule.id);
  return !(progress?.isCompleted || false);
}

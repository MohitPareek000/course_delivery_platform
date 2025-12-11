// Database queries that fetch from API instead of mock data
import { UserProgress } from "@/types";

// Get courses assigned to a user from database
export async function getUserCoursesFromDB(userId: string) {
  try {
    const response = await fetch(`/api/courses/user/${userId}`);

    if (!response.ok) {
      return [];
    }

    const data = await response.json();
    return data.courses || [];
  } catch (error) {
    console.error("Error fetching user courses:", error);
    return [];
  }
}

// Get user progress for a class from database
export async function getUserModuleProgressFromDB(
  userId: string,
  classId: string
): Promise<UserProgress | null> {
  try {
    const response = await fetch(
      `/api/progress?userId=${userId}&classId=${classId}`
    );

    if (!response.ok) {
      return null;
    }

    const data = await response.json();
    return data.progress || null;
  } catch (error) {
    console.error("Error fetching class progress:", error);
    return null;
  }
}

// Get all user progress from database
export async function getAllUserProgressFromDB(
  userId: string
): Promise<UserProgress[]> {
  try {
    const response = await fetch(`/api/progress/user/${userId}`);

    if (!response.ok) {
      return [];
    }

    const data = await response.json();
    return data.progress || [];
  } catch (error) {
    console.error("Error fetching user progress:", error);
    return [];
  }
}

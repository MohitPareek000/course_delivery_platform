import NextAuth from "next-auth";
import { authConfig } from "./auth.config";

export const { handlers, auth, signIn, signOut } = NextAuth(authConfig);

/**
 * Get the current logged-in user's ID from local storage (persists across tabs)
 * @returns User ID or null if not logged in
 */
export function getCurrentUserId(): string | null {
  if (typeof window === 'undefined') {
    return null;
  }

  try {
    const session = localStorage.getItem('user-session');
    if (!session) {
      return null;
    }

    const sessionData = JSON.parse(session);
    return sessionData.userId || null;
  } catch (error) {
    console.error('Error getting user ID from session:', error);
    return null;
  }
}

// Session expires after 30 days (matches NextAuth config)
const SESSION_MAX_AGE_MS = 30 * 24 * 60 * 60 * 1000;

/**
 * Get the current user session data (persists across tabs)
 * @returns User session data or null if not logged in or session expired
 */
export function getCurrentUserSession(): {
  userId: string;
  email: string;
  name: string;
  loggedIn: boolean;
} | null {
  if (typeof window === 'undefined') {
    return null;
  }

  try {
    const session = localStorage.getItem('user-session');
    if (!session) {
      return null;
    }

    const sessionData = JSON.parse(session);
    if (!sessionData.loggedIn || !sessionData.userId) {
      return null;
    }

    // Check if session has expired (30 days)
    if (sessionData.createdAt) {
      const sessionAge = Date.now() - sessionData.createdAt;
      if (sessionAge > SESSION_MAX_AGE_MS) {
        // Session expired, clear it
        localStorage.removeItem('user-session');
        return null;
      }
    }

    return sessionData;
  } catch (error) {
    console.error('Error getting user session:', error);
    return null;
  }
}

/**
 * Check if a user is logged in
 * @returns true if user is logged in, false otherwise
 */
export function isUserLoggedIn(): boolean {
  return getCurrentUserId() !== null;
}

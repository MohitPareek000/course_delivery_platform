import mixpanel, { Dict } from 'mixpanel-browser';
import { gtm } from './gtm';

// Initialize Mixpanel
const MIXPANEL_TOKEN = process.env.NEXT_PUBLIC_MIXPANEL_TOKEN;

let isInitialized = false;

export const initAnalytics = () => {
  // Debug logging
  console.log('🔍 Analytics Init - Token:', MIXPANEL_TOKEN ? 'Present' : 'Missing');
  console.log('🔍 Analytics Init - Window:', typeof window !== 'undefined' ? 'Available' : 'Not available');
  console.log('🔍 Analytics Init - Already Initialized:', isInitialized);

  if (typeof window === 'undefined' || isInitialized || !MIXPANEL_TOKEN) {
    console.log('⚠️ Analytics Init - Skipping initialization');
    return;
  }

  console.log('✅ Analytics Init - Initializing Mixpanel with token:', MIXPANEL_TOKEN);

  mixpanel.init(MIXPANEL_TOKEN, {
    debug: process.env.NODE_ENV === 'development',
    track_pageview: true,
    persistence: 'localStorage',
    ignore_dnt: true, // Ignore "Do Not Track" for development/testing
  });

  isInitialized = true;
  console.log('✅ Analytics Init - Mixpanel initialized successfully');
};

// User identification
export const identifyUser = (userId: string, properties?: Dict) => {
  if (!isInitialized) return;

  mixpanel.identify(userId);

  if (properties) {
    mixpanel.people.set(properties);
  }
};

export const setUserProperties = (properties: Dict) => {
  if (!isInitialized) return;
  mixpanel.people.set(properties);
};

// Track events
export const trackEvent = (eventName: string, properties?: Dict) => {
  if (!isInitialized) {
    console.log('⚠️ Analytics - Event not tracked (not initialized):', eventName);
    return;
  }
  console.log('📊 Analytics - Tracking event:', eventName, properties);
  mixpanel.track(eventName, properties);
};

// Authentication Events
export const analytics = {
  // Auth Flow
  auth: {
    loginButtonClicked: () => {
      trackEvent('Login Button Clicked');
      gtm.auth.loginButtonClicked();
    },
    emailEntered: (email: string) => {
      trackEvent('Email Entered', { email });
      gtm.auth.emailEntered(email);
    },
    otpRequested: (email: string) => {
      trackEvent('OTP Requested', { email });
      gtm.auth.otpRequested(email);
    },
    otpEntered: (success: boolean) => {
      trackEvent('OTP Entered', { success });
      gtm.auth.otpEntered(success);
    },
    loginSuccess: (userId: string, email: string) => {
      identifyUser(userId, { email, $email: email });
      trackEvent('Login Success', { userId, email });
      gtm.auth.loginSuccess(userId, email);
    },
    loginFailed: (reason: string) => {
      trackEvent('Login Failed', { reason });
      gtm.auth.loginFailed(reason);
    },
    dashboardReached: () => {
      trackEvent('Dashboard Reached');
      gtm.auth.dashboardReached();
    },
    logoutClicked: () => {
      trackEvent('Logout Clicked');
      gtm.auth.logoutClicked();
    },
  },

  // Page Views
  page: {
    view: (pageName: string, properties?: Dict) => {
      trackEvent('Page View', { page: pageName, ...properties });
      gtm.pageview({ page_name: pageName, ...properties });
    },
  },

  // Course Events
  course: {
    viewed: (courseId: string, courseName: string) => {
      trackEvent('Course Viewed', { courseId, courseName });
      gtm.course.viewed(courseId, courseName);
    },
    moduleStarted: (courseId: string, moduleId: string, moduleName: string) => {
      trackEvent('Module Started', { courseId, moduleId, moduleName });
      gtm.course.moduleStarted(courseId, moduleId, moduleName);
    },
    moduleCompleted: (courseId: string, moduleId: string, moduleName: string) => {
      trackEvent('Module Completed', { courseId, moduleId, moduleName });
      gtm.course.moduleCompleted(courseId, moduleId, moduleName);
    },
  },

  // Class/Lesson Events
  class: {
    started: (classId: string, className: string, contentType: string, courseId: string) => {
      trackEvent('Class Started', { classId, className, contentType, courseId });
      gtm.class.started(classId, className, contentType, courseId);
    },
    videoProgress: (classId: string, className: string, progress: number, courseId: string) => {
      trackEvent('Video Progress', { classId, className, progress, courseId });
      gtm.class.videoProgress(classId, className, progress, courseId);
    },
    completed: (classId: string, className: string, contentType: string, courseId: string, duration: number) => {
      trackEvent('Class Completed', {
        classId,
        className,
        contentType,
        courseId,
        watchDuration: duration
      });
      gtm.class.completed(classId, className, contentType, courseId, duration);
    },
    textRead: (classId: string, className: string, courseId: string) => {
      trackEvent('Text Content Read', { classId, className, courseId });
      gtm.class.textRead(classId, className, courseId);
    },
  },

  // Contest Events
  contest: {
    started: (classId: string, contestName: string, courseId: string) => {
      trackEvent('Contest Started', { classId, contestName, courseId });
      gtm.contest.started(classId, contestName, courseId);
    },
    completed: (classId: string, contestName: string, courseId: string) => {
      trackEvent('Contest Completed', { classId, contestName, courseId });
      gtm.contest.completed(classId, contestName, courseId);
    },
    externalLinkClicked: (classId: string, contestName: string, url: string) => {
      trackEvent('Contest External Link Clicked', { classId, contestName, url });
      gtm.contest.externalLinkClicked(classId, contestName, url);
    },
  },

  // Button Clicks
  button: {
    clicked: (buttonName: string, page: string, properties?: Dict) => {
      trackEvent('Button Clicked', { buttonName, page, ...properties });
      gtm.button.clicked(buttonName, page, properties);
    },
  },

  // Navigation
  navigation: {
    clicked: (destination: string, source: string) => {
      trackEvent('Navigation Clicked', { destination, source });
      gtm.navigation.clicked(destination, source);
    },
    backClicked: (from: string) => {
      trackEvent('Back Button Clicked', { from });
      gtm.navigation.backClicked(from);
    },
  },

  // Search & Filters
  search: {
    performed: (query: string, resultsCount: number) => {
      trackEvent('Search Performed', { query, resultsCount });
      gtm.search.performed(query, resultsCount);
    },
    filterApplied: (filterType: string, filterValue: string) => {
      trackEvent('Filter Applied', { filterType, filterValue });
      gtm.search.filterApplied(filterType, filterValue);
    },
  },

  // User Actions
  user: {
    profileViewed: () => {
      trackEvent('Profile Viewed');
      gtm.user.profileViewed();
    },
    settingsChanged: (setting: string, value: string) => {
      trackEvent('Settings Changed', { setting, value });
      gtm.user.settingsChanged(setting, value);
    },
  },

  // Errors
  error: {
    occurred: (errorType: string, errorMessage: string, page: string) => {
      trackEvent('Error Occurred', { errorType, errorMessage, page });
      gtm.error.occurred(errorType, errorMessage, page);
    },
  },
};

// Reset user (for logout)
export const resetUser = () => {
  if (!isInitialized) return;
  mixpanel.reset();
};

export default analytics;

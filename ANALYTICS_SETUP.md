# Mixpanel Analytics Implementation Guide

## Overview
This document explains the Mixpanel analytics implementation for comprehensive tracking across the platform.

## Setup

### 1. Get Your Mixpanel Token

1. **Create Mixpanel Account**: Go to [mixpanel.com](https://mixpanel.com) and create a free account
2. **Create Project**: Create a new project for your course platform
3. **Get Project Token**: Navigate to Project Settings → Project Token
4. **Add to Environment**:
   ```bash
   # In your .env file (NOT .env.example)
   NEXT_PUBLIC_MIXPANEL_TOKEN="your_actual_mixpanel_token_here"
   ```

### 2. Installation Complete
The Mixpanel package is already installed and configured.

## What's Already Implemented

### ✅ Core Setup
- **Mixpanel SDK**: Installed (`mixpanel-browser`)
- **Analytics Utility**: Created at [lib/analytics.ts](lib/analytics.ts)
- **Provider Component**: Created at [components/providers/AnalyticsProvider.tsx](components/providers/AnalyticsProvider.tsx)
- **Global Integration**: Added to [app/layout.tsx](app/layout.tsx)
- **Auto Page Tracking**: Every page view is automatically tracked

### ✅ Available Event Categories

The analytics utility (`lib/analytics.ts`) provides organized event tracking:

1. **Authentication** (`analytics.auth.*`)
2. **Page Views** (`analytics.page.*`)
3. **Course Events** (`analytics.course.*`)
4. **Class/Lesson Events** (`analytics.class.*`)
5. **Contest Events** (`analytics.contest.*`)
6. **Button Clicks** (`analytics.button.*`)
7. **Navigation** (`analytics.navigation.*`)
8. **Search & Filters** (`analytics.search.*`)
9. **User Actions** (`analytics.user.*`)
10. **Errors** (`analytics.error.*`)

## How to Add Tracking to Your Pages

### Example 1: Track Button Clicks

```typescript
'use client';

import { analytics } from '@/lib/analytics';

export default function MyPage() {
  const handleStartCourse = () => {
    // Track the button click
    analytics.button.clicked('Start Course', 'Dashboard', {
      courseId: 'course-123',
      courseName: 'React Basics'
    });

    // Your existing logic
    router.push(`/course/${courseId}`);
  };

  return (
    <button onClick={handleStartCourse}>
      Start Course
    </button>
  );
}
```

### Example 2: Track Auth Flow

```typescript
// On login page
import { analytics } from '@/lib/analytics';

const handleLogin = async (email: string) => {
  // Track email entered
  analytics.auth.emailEntered(email);

  // Request OTP
  analytics.auth.otpRequested(email);

  // Send OTP...
};

const handleOTPSubmit = async (otp: string) => {
  const result = await verifyOTP(otp);

  if (result.success) {
    analytics.auth.otpEntered(true);
    analytics.auth.loginSuccess(result.userId, result.email);
    analytics.auth.dashboardReached();
  } else {
    analytics.auth.otpEntered(false);
    analytics.auth.loginFailed('Invalid OTP');
  }
};
```

### Example 3: Track Course Progress

```typescript
import { analytics } from '@/lib/analytics';

// When user starts a class
useEffect(() => {
  if (classItem) {
    analytics.class.started(
      classItem.id,
      classItem.title,
      classItem.contentType || 'video',
      courseId
    );
  }
}, [classItem]);

// When video reaches milestones
const handleVideoProgress = (progress: number) => {
  if ([25, 50, 75, 100].includes(progress)) {
    analytics.class.videoProgress(
      classItem.id,
      classItem.title,
      progress,
      courseId
    );
  }
};

// When class is completed
const handleClassComplete = () => {
  analytics.class.completed(
    classItem.id,
    classItem.title,
    classItem.contentType || 'video',
    courseId,
    watchedDuration
  );
};
```

### Example 4: Track Contest Events

```typescript
import { analytics } from '@/lib/analytics';

const handleStartContest = () => {
  analytics.contest.externalLinkClicked(
    classItem.id,
    classItem.title,
    classItem.contestUrl!
  );

  analytics.contest.started(
    classItem.id,
    classItem.title,
    courseId
  );

  // Open contest URL
  window.open(classItem.contestUrl, '_blank');
};

const handleContestComplete = () => {
  analytics.contest.completed(
    classItem.id,
    classItem.title,
    courseId
  );
};
```

### Example 5: Track Navigation

```typescript
import { analytics } from '@/lib/analytics';

const handleBackClick = () => {
  analytics.navigation.backClicked(`/course/${courseId}/class/${classId}`);
  router.back();
};

const handleModuleClick = (moduleId: string) => {
  analytics.navigation.clicked(
    `/course/${courseId}/module/${moduleId}`,
    `/course/${courseId}`
  );
  router.push(`/course/${courseId}/module/${moduleId}`);
};
```

## Pages That Need Tracking

### High Priority
1. **Login/OTP Flow** (`app/login`, `app/verify-otp`)
   - Login button click
   - Email entered
   - OTP sent
   - OTP entered (success/fail)
   - Dashboard reached

2. **Dashboard** (`app/dashboard`)
   - Course card clicks
   - Filter usage
   - Search functionality

3. **Course Page** (`app/course/[courseId]`)
   - Module clicks
   - Class clicks
   - Progress tracking

4. **Class Player** (`app/course/[courseId]/class/[classId]`)
   - Class started
   - Video progress (25%, 50%, 75%, 100%)
   - Class completed
   - Contest started
   - Text content read
   - Mark as complete clicks

### Medium Priority
5. **Profile/Settings**
   - Settings changes
   - Profile views

6. **Navigation**
   - Back button clicks
   - Menu clicks

## Testing Your Implementation

### 1. Development Debug Panel (NEW! ⭐)
**A beautiful, real-time analytics debug panel is automatically enabled in development mode!**

Features:
- ✅ **Real-time Event Tracking**: See every event as it fires
- ✅ **Event Properties**: View all properties sent with each event
- ✅ **User Identification Status**: See when users are identified
- ✅ **Color-Coded Events**: Different colors for auth, errors, buttons, etc.
- ✅ **Filter Events**: Search events by name or properties
- ✅ **Event History**: Keep last 100 events
- ✅ **Minimize/Expand**: Toggle between compact and detailed view
- ✅ **Clear Events**: Reset the event list anytime

**How to Use:**
1. Run your app in development mode (`npm run dev`)
2. Look for the blue "Analytics Debug" button in the bottom-right corner
3. Click to open the debug panel
4. Navigate your app - watch events appear in real-time!
5. Click on "Properties (N)" to expand and see event data
6. Use the filter to search specific events
7. Minimize when not needed

**Color Coding:**
- 🟢 Green: Authentication events
- 🔴 Red: Error events
- 🔵 Blue: Button clicks
- 🟣 Purple: Course/Module/Class events
- ⚪ Gray: Page views
- 🟡 Yellow: Other events

### 2. Browser Console (Legacy Method)
```typescript
// The analytics utility has debug mode enabled in development
// Open browser console to see tracked events
console.log('Mixpanel event sent:', eventName, properties);
```

### 3. Verify in Mixpanel Dashboard
1. Go to your Mixpanel project
2. Navigate to "Events" → "Live View"
3. Perform actions in your app
4. See events appear in real-time

### 4. Check User Identification
1. In Mixpanel, go to "Users" → "User Profiles"
2. Find your test user by email
3. Verify user properties are set correctly

## Event Properties Reference

### User Properties (Set on login)
```typescript
{
  email: string,
  $email: string,  // Mixpanel reserved property
  userId: string
}
```

### Common Event Properties
```typescript
{
  page: string,           // Current page path
  courseId: string,       // Course identifier
  courseName: string,     // Course title
  moduleId: string,       // Module identifier
  moduleName: string,     // Module title
  classId: string,        // Class identifier
  className: string,      // Class title
  contentType: string,    // 'video' | 'text' | 'contest'
  progress: number,       // 0-100 for video progress
  watchDuration: number,  // Seconds watched
  buttonName: string,     // Button identifier
  source: string,         // Where action originated
  destination: string,    // Where action leads to
}
```

## Advanced Usage

### Track Custom Events
```typescript
import { trackEvent } from '@/lib/analytics';

trackEvent('Custom Event Name', {
  customProperty1: 'value1',
  customProperty2: 123,
  customProperty3: true
});
```

### Update User Properties
```typescript
import { setUserProperties } from '@/lib/analytics';

setUserProperties({
  plan: 'premium',
  coursesEnrolled: 5,
  lastActive: new Date().toISOString()
});
```

### Track Errors
```typescript
import { analytics } from '@/lib/analytics';

try {
  // Some operation
} catch (error) {
  analytics.error.occurred(
    'API Error',
    error.message,
    '/api/courses'
  );
}
```

## Best Practices

1. **Be Specific**: Use descriptive event names and properties
2. **Be Consistent**: Follow naming conventions across pages
3. **Don't Over-Track**: Only track meaningful user interactions
4. **Include Context**: Always include relevant IDs and names in properties
5. **Test Events**: Verify events appear in Mixpanel dashboard
6. **Privacy**: Never track sensitive data (passwords, credit cards, etc.)

## Common Tracking Patterns

### Track All Buttons on a Page
```typescript
const handleButtonClick = (buttonName: string, additionalProps = {}) => {
  analytics.button.clicked(buttonName, pathname, additionalProps);
};

// Usage
<button onClick={() => handleButtonClick('Download Certificate', { courseId })}>
  Download
</button>
```

### Track Form Submissions
```typescript
const handleSubmit = async (formData) => {
  analytics.button.clicked('Form Submit', 'Contact Page', {
    formType: 'contact',
    fields: Object.keys(formData)
  });

  // Submit form...
};
```

### Track Video Milestones
```typescript
const milestones = [25, 50, 75, 100];
let trackedMilestones: number[] = [];

const onProgress = (currentTime: number, duration: number) => {
  const progress = Math.floor((currentTime / duration) * 100);

  milestones.forEach(milestone => {
    if (progress >= milestone && !trackedMilestones.includes(milestone)) {
      analytics.class.videoProgress(classId, className, milestone, courseId);
      trackedMilestones.push(milestone);
    }
  });
};
```

## Dashboards & Reports in Mixpanel

### Suggested Reports to Create

1. **Login Funnel**
   - Login Button Clicked → Email Entered → OTP Requested → OTP Entered → Login Success → Dashboard Reached

2. **Course Completion Funnel**
   - Course Viewed → Module Started → Class Started → Video Progress 25% → 50% → 75% → 100% → Class Completed

3. **User Engagement**
   - Daily Active Users
   - Sessions per user
   - Time spent on platform

4. **Feature Usage**
   - Most clicked buttons
   - Most viewed courses
   - Most completed classes

5. **Contest Engagement**
   - Contest Started vs Completed ratio
   - Time spent on contests
   - Contest completion rate

## Troubleshooting

### Events Not Appearing
1. Check Mixpanel token is set in `.env`
2. Verify token starts with correct project identifier
3. Check browser console for errors
4. Ensure `initAnalytics()` is called

### User Not Identified
1. Verify `identifyUser()` is called after login
2. Check userId is valid
3. Ensure email is passed correctly

### Wrong Event Data
1. Check property names match documentation
2. Verify data types (string, number, boolean)
3. Test with Mixpanel Live View

## Next Steps

1. **Get Mixpanel Token**: Sign up and get your project token
2. **Add Token to .env**: `NEXT_PUBLIC_MIXPANEL_TOKEN="your-token"`
3. **Start Tracking**: Add tracking to login page first
4. **Test in Live View**: Verify events appear in Mixpanel
5. **Roll Out**: Gradually add tracking to other pages
6. **Create Dashboards**: Build reports for key metrics

## Support

- **Mixpanel Docs**: https://docs.mixpanel.com/
- **Mixpanel Support**: https://mixpanel.com/get-support/
- **Implementation File**: [lib/analytics.ts](lib/analytics.ts)

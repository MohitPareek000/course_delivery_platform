# Cursor AI - Copy & Paste Prompts

## 🚀 Quick Setup Prompt (Copy This to Cursor)

```
I'm working on an Interview Preparation Course Platform built with Next.js 14, TypeScript, and Tailwind CSS.

Current Status: V0 (MVP) is complete with:
- Email OTP authentication (4-digit OTP)
- Learner dashboard with course cards
- Company-specific courses (round-based) and skill-based courses
- Video player with watch time tracking (auto-complete at 98%)
- Progress tracking system
- Mock data (3 sample courses)

The application is running at http://localhost:3000
Demo login: Any email + OTP: 1234

Key Files:
- /app/dashboard/page.tsx - Main dashboard
- /app/course/[courseId]/page.tsx - Course detail
- /components/video/VideoPlayer.tsx - Video player with tracking
- /lib/db/mockData.ts - Sample data
- /lib/db/queries.ts - Data fetching functions
- /types/index.ts - TypeScript interfaces

Please read CURSOR_PROMPT.md for detailed documentation about the project structure, design system, and implementation guidelines.

What would you like me to help you with?
```

---

## 📋 Common Task Prompts

### 1. Understanding the Codebase

```
I need to understand how the course platform works. Can you:
1. Explain the overall architecture
2. Show me the data flow from dashboard → course → video player
3. Explain how round unlocking works
4. Explain how video watch time tracking works
```

### 2. Adding a New Feature

```
I want to add a bookmark feature to the video player that lets users:
1. Click a bookmark button during video playback
2. Save the current timestamp
3. Show a list of bookmarks below the video
4. Jump to bookmarked timestamps when clicked

Please implement this feature following the existing code patterns.
```

### 3. Integrating Supabase

```
I need to migrate from mock data to Supabase. Please:
1. Create the Supabase schema (SQL) based on the TypeScript interfaces in types/index.ts
2. Set up the Supabase client in /lib/db/supabase.ts
3. Update /lib/db/queries.ts to use Supabase instead of mockData
4. Keep the same function signatures so components don't need changes

Start with the users, courses, and user_progress tables.
```

### 4. Building Admin Dashboard

```
I need to create an admin dashboard with the following features:
1. Course management (create, edit, delete courses)
2. Add/edit rounds, topics, and modules to courses
3. Upload learner list (CSV with emails)
4. Assign courses to learners
5. View learner progress table

Please create:
- /app/admin/page.tsx - Admin dashboard
- /app/admin/courses/page.tsx - Course list
- /app/admin/courses/new/page.tsx - Create course form
- /components/admin/CourseForm.tsx - Reusable course form
```

### 5. Adding Assignment System

```
I want to add an assignment system to each round with:
1. Multiple choice questions
2. Each assignment has 5-10 questions
3. Learner submits answers
4. Auto-grading for MCQs
5. Round unlocks only if assignment score >= 70%

Please:
1. Add Assignment and Submission interfaces to types/index.ts
2. Add mock assignment data
3. Create /components/assignment/AssignmentCard.tsx
4. Create /app/course/[courseId]/assignment/[assignmentId]/page.tsx
5. Update round unlock logic to check assignment completion
```

### 6. Implementing Real OTP Email

```
I want to replace the demo OTP (1234) with real email OTP using Resend.

Please:
1. Set up Resend client with API key from env
2. Create /lib/email/sendOTP.ts that sends OTP via email
3. Update /app/login/page.tsx to generate and send real OTP
4. Store OTP with expiry in database/sessionStorage
5. Update /app/verify-otp/page.tsx to validate OTP

Keep the UI exactly the same, just make the backend real.
```

### 7. Adding Dark Mode

```
I want to add dark mode support with:
1. Toggle button in the sidebar
2. Persist preference in localStorage
3. Smooth transition between themes
4. Update all components to support dark mode

Please implement dark mode using Tailwind's dark: prefix and a context provider.
```

### 8. Improving Video Player

```
I want to enhance the video player with:
1. Keyboard shortcuts (Space = play/pause, ← → = seek 10s, ↑ ↓ = volume)
2. Double-tap left/right to seek ±10s on mobile
3. Picture-in-picture mode
4. Remember playback speed preference
5. Show video chapters if available

Maintain existing functionality and design.
```

### 9. Adding Analytics Dashboard

```
I need an analytics page for admins showing:
1. Total learners, active learners (last 7 days)
2. Course completion rates (bar chart)
3. Average time spent per course
4. Most popular courses
5. Learner engagement over time (line chart)

Use recharts library for charts.
Create /app/admin/analytics/page.tsx
```

### 10. Building Certificate System

```
I want to add a certificate generation feature:
1. Generate PDF certificate when course is 100% complete
2. Include learner name, course name, completion date
3. Add certificate download button on dashboard
4. Store certificate URL in database
5. Show "Certificate Earned" badge on completed courses

Use jsPDF or similar library for PDF generation.
```

---

## 🐛 Debugging Prompts

### Video Player Not Tracking Progress

```
The video player is not saving progress correctly. The watched duration doesn't update.

Current code is in /components/video/VideoPlayer.tsx

Can you:
1. Review the onProgressUpdate callback logic
2. Check if the progress is being saved to mockData
3. Add console.logs to debug
4. Fix any issues you find
```

### Round Not Unlocking

```
Round 2 is not unlocking even though I completed all modules in Round 1.

The unlock logic is in /lib/db/queries.ts - isRoundUnlocked()

Can you:
1. Debug the isRoundUnlocked function
2. Check if module completion status is correct
3. Add logging to see what's happening
4. Fix the issue
```

### Progress Bar Not Updating

```
The progress bar on the course card doesn't update when I complete a module.

Related files:
- /components/dashboard/CourseCard.tsx
- /lib/db/queries.ts - calculateCourseProgress()

Please investigate and fix.
```

---

## 🎨 Styling Prompts

### Redesign Login Page

```
I want to redesign the login page with a more modern look:
1. Add animated gradient background
2. Floating glass-morphism card for the form
3. Smooth fade-in animations
4. Add company logos carousel on the right side

Keep the same functionality, just improve the design.
File: /app/login/page.tsx
```

### Improve Dashboard Layout

```
I want to improve the dashboard layout:
1. Add a "Continue Learning" section at the top showing last accessed course
2. Add tabs to filter courses (All, In Progress, Completed)
3. Add search/filter functionality
4. Make course cards more visually appealing with hover effects

File: /app/dashboard/page.tsx
```

### Enhance Video Player UI

```
Make the video player look more modern:
1. Netflix-style controls that fade out
2. Hover thumbnails on seek bar
3. Better button styling with tooltips
4. Add a theater mode (wider player)
5. Smooth animations for all interactions

File: /components/video/VideoPlayer.tsx
```

---

## 📱 Mobile Optimization Prompts

### Fix Mobile Navigation

```
The sidebar navigation has issues on mobile:
1. Improve hamburger menu animation
2. Add swipe-to-close gesture
3. Fix overlay click area
4. Ensure all buttons are touch-friendly (44px minimum)

File: /components/dashboard/Sidebar.tsx
```

### Optimize Video Player for Mobile

```
The video player needs mobile optimization:
1. Larger touch targets for controls
2. Hide controls faster on mobile (2s instead of 3s)
3. Add double-tap to seek gesture
4. Optimize for vertical video playback
5. Add mobile-specific speed controls

File: /components/video/VideoPlayer.tsx
```

---

## 🔒 Security Prompts

### Add Route Protection

```
I need to add authentication middleware to protect routes:
1. Create middleware.ts to check authentication
2. Redirect unauthenticated users to /login
3. Allow only /login and /verify-otp for unauthenticated users
4. Add admin role check for admin routes (when we add them)

Implement Next.js middleware for this.
```

### Secure API Routes

```
When we add API routes for database operations, we need:
1. Authentication verification on all API routes
2. Rate limiting for OTP requests
3. Input validation using Zod
4. CSRF protection
5. Proper error handling without exposing internals

Please create a template for secure API routes.
```

---

## 🧪 Testing Prompts

### Add Unit Tests

```
I want to add Jest tests for key components:
1. CourseCard component (rendering, progress calculation)
2. OTPInput component (input handling, paste support)
3. Video player (progress tracking logic)
4. Round unlock logic (isRoundUnlocked function)

Set up Jest + React Testing Library and write tests.
```

### Add E2E Tests

```
Set up Playwright for end-to-end testing:
1. Login flow test
2. Course navigation test
3. Video player test (play, seek, complete)
4. Round unlock test

Create tests in /tests/e2e/
```

---

## 💡 Pro Tips for Cursor

### When Working on a Feature
```
I'm working on [feature name]. Before we start:
1. Show me the relevant files
2. Explain how this feature fits into the existing architecture
3. List any potential issues or edge cases
4. Then let's implement it step by step
```

### When Debugging
```
I'm getting [error message]. Can you:
1. Locate the file causing the error
2. Explain what's going wrong
3. Show me the fix with clear explanation
4. Test it to make sure it works
```

### When Refactoring
```
I want to refactor [file/component] to:
1. Improve performance
2. Make it more reusable
3. Better TypeScript types
4. Follow best practices

Review the current code first, suggest improvements, then implement.
```

---

## 📚 Documentation Requests

### Generate API Documentation

```
Create API documentation for all functions in /lib/db/queries.ts:
1. List all exported functions
2. Describe parameters and return types
3. Add usage examples
4. Note any side effects

Format as JSDoc comments.
```

### Component Documentation

```
Generate Storybook stories for all UI components in /components/ui/:
1. Show all variants
2. Add controls for props
3. Include usage examples

Set up Storybook first if not installed.
```

---

## 🚀 Deployment Prompts

### Deploy to Vercel

```
I want to deploy this application to Vercel:
1. Show me what environment variables I need
2. Create vercel.json configuration if needed
3. List any build settings I should configure
4. Explain how to set up preview deployments
```

### Set Up CI/CD

```
Set up GitHub Actions for:
1. Run tests on every PR
2. Build and deploy to Vercel on merge to main
3. Run linting and type checking
4. Send notifications on failure

Create .github/workflows/ci.yml
```

---

## ✅ Remember

- Always mention you're working on the **Interview Prep Course Platform**
- Reference the **CURSOR_PROMPT.md** for detailed context
- Keep the existing **design system** (colors, fonts, component styles)
- Maintain **TypeScript** type safety
- Follow the established **file structure**
- Test changes in the **browser** before marking complete

---

**Copy any of these prompts to Cursor and customize for your specific needs!**

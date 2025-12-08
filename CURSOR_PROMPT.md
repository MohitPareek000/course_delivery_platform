# Cursor AI Development Prompt - Interview Prep Course Platform

## Project Overview
You are working on a **Company-Specific Interview Preparation Course Platform** built with Next.js 14, TypeScript, and Tailwind CSS. The platform enables learners to access structured learning content with sequential round-wise progression, video modules, and assignments.

---

## Current Implementation Status (V0)

### ✅ Completed Features

1. **Authentication System**
   - Email OTP login (4-digit OTP)
   - OTP verification page
   - Session management using sessionStorage
   - Demo OTP: `1234`

2. **Learner Dashboard**
   - Course cards with progress tracking
   - Statistics display (total/completed courses, modules)
   - Responsive sidebar navigation
   - User profile section with logout

3. **Course Structure**
   - Two types: Company-Specific (round-based) and Skill-Based (topic-based)
   - Round unlocking logic (sequential)
   - Topic and module organization
   - Progress visualization

4. **Video Player**
   - Custom video controls (play, pause, seek, volume, speed)
   - Watch time tracking (saves every 5 seconds)
   - Auto-completion at 98-100% watched
   - Module navigation (previous/next)

5. **Mock Data**
   - 3 sample courses (TCS, Infosys, Java Bootcamp)
   - Sample modules with video URLs
   - User progress tracking

---

## Tech Stack

```typescript
Framework: Next.js 14.2.5 (App Router)
Language: TypeScript
Styling: Tailwind CSS
UI Library: shadcn/ui (custom implementation)
Icons: Lucide React
State: React Hooks + sessionStorage (temporary)
```

---

## File Structure

```
/app
  /login/page.tsx              # Login with email
  /verify-otp/page.tsx         # OTP verification
  /dashboard/page.tsx          # Learner dashboard
  /course/[courseId]/page.tsx  # Course detail
    /module/[moduleId]/page.tsx # Video player

/components
  /auth
    LoginForm.tsx              # Email login form
    OTPInput.tsx               # 4-digit OTP input
  /dashboard
    Sidebar.tsx                # Navigation sidebar
    CourseCard.tsx             # Course card with progress
  /course
    RoundCard.tsx              # Round accordion
    TopicSection.tsx           # Topic grouping
    ModuleItem.tsx             # Module list item
  /video
    VideoPlayer.tsx            # Custom video player
  /ui
    button.tsx, card.tsx, etc. # Reusable UI components

/lib
  /db
    mockData.ts                # Sample data
    queries.ts                 # Data fetching functions
  /utils.ts                    # Utility functions

/types/index.ts                # TypeScript interfaces
```

---

## Design System

### Colors
```css
Primary: #4169E1 (Royal Blue)
Secondary: #FB7124 (Orange)
Success: #10B981 (Green)
Background: #F8F9FA (Light Gray)
```

### Components
- Buttons: Primary, Secondary, Outline, Ghost variants
- Cards: Shadow-sm, border, rounded-lg
- Progress bars: Orange (#FB7124) indicator
- Badges: Round-based pills

### Typography
- Font: Inter (Google Fonts)
- Headings: 600-700 weight
- Body: 400-500 weight

---

## Key Business Logic

### 1. Round Unlocking (Company-Specific Courses)
```typescript
// Location: lib/db/queries.ts - isRoundUnlocked()
// Logic:
// - Round 1 is always unlocked
// - Round N unlocks when ALL modules in Round N-1 are completed
// - Module completion = watchedDuration >= 98% of total duration
```

### 2. Watch Time Tracking
```typescript
// Location: components/video/VideoPlayer.tsx
// Logic:
// - Track currentTime and watchedDuration separately
// - watchedDuration = max time user has reached
// - Save progress every 5 seconds via onProgressUpdate callback
// - Mark complete when watchedDuration >= 98% of duration
```

### 3. Progress Calculation
```typescript
// Location: lib/db/queries.ts - calculateCourseProgress()
// Course Progress = (completedModules / totalModules) * 100
// Round Progress = (completedModulesInRound / totalModulesInRound) * 100
```

---

## V1 Features (Next Phase)

### Assignment System
**Priority**: HIGH

**Requirements**:
1. Add assignments to each round (company-specific) or topic (skill-based)
2. Assignment types:
   - Multiple choice questions
   - Coding problems
   - Text-based answers
3. Submission interface
4. Auto-grading for MCQs
5. Manual review option for text/code answers

**Implementation Guide**:
```typescript
// 1. Update types/index.ts
interface Assignment {
  id: string;
  roundId?: string;
  topicId?: string;
  title: string;
  description: string;
  type: 'mcq' | 'coding' | 'text';
  questions: Question[];
  passingScore?: number;
}

interface Question {
  id: string;
  questionText: string;
  type: 'mcq' | 'coding' | 'text';
  options?: string[]; // for MCQ
  correctAnswer?: string; // for MCQ
  testCases?: TestCase[]; // for coding
}

interface Submission {
  id: string;
  userId: string;
  assignmentId: string;
  answers: Answer[];
  score?: number;
  isPass: boolean;
  submittedAt: Date;
}
```

```typescript
// 2. Create new components
// /components/assignment/AssignmentCard.tsx
// /components/assignment/QuestionForm.tsx
// /components/assignment/SubmissionReview.tsx
```

```typescript
// 3. Add new route
// /app/course/[courseId]/assignment/[assignmentId]/page.tsx
```

```typescript
// 4. Update round unlock logic to include assignment completion
// lib/db/queries.ts - isRoundUnlocked()
// Check: All modules completed AND assignment submitted with passing score
```

### Admin Dashboard
**Priority**: HIGH

**Requirements**:
1. **Course Management**
   - Create/Edit/Delete courses
   - Add rounds, topics, modules
   - Upload video links
   - Set course type (company-specific/skill-based)

2. **Learner Management**
   - Upload learner list (CSV/Excel)
   - Map courses to learners
   - View learner progress
   - Remove learner access

3. **Assignment Management**
   - Create assignment questions
   - Set passing scores
   - Review submissions
   - Grade text/coding answers

4. **Analytics**
   - Course completion rates
   - Average time per module
   - Learner engagement metrics

**Implementation Guide**:
```typescript
// 1. Create admin routes
// /app/admin/page.tsx                    # Admin dashboard
// /app/admin/courses/page.tsx            # Course list
// /app/admin/courses/[id]/page.tsx       # Edit course
// /app/admin/learners/page.tsx           # Learner list
// /app/admin/assignments/page.tsx        # Assignment list
```

```typescript
// 2. Add role-based authentication
interface User {
  id: string;
  email: string;
  role: 'learner' | 'admin' | 'content-creator';
}

// Update session storage to include role
// Add middleware to protect admin routes
```

```typescript
// 3. Create admin components
// /components/admin/CourseForm.tsx
// /components/admin/LearnerUpload.tsx
// /components/admin/ProgressTable.tsx
// /components/admin/AnalyticsChart.tsx
```

---

## Database Migration (V1)

**Current**: Mock data in `/lib/db/mockData.ts`
**Target**: Supabase (PostgreSQL) or Firebase

### Supabase Schema
```sql
-- Users table
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email TEXT UNIQUE NOT NULL,
  name TEXT,
  role TEXT DEFAULT 'learner',
  created_at TIMESTAMP DEFAULT NOW()
);

-- Courses table
CREATE TABLE courses (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  description TEXT,
  company_name TEXT,
  type TEXT NOT NULL, -- 'company-specific' or 'skill-based'
  thumbnail_url TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Rounds table
CREATE TABLE rounds (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  course_id UUID REFERENCES courses(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  order_num INTEGER NOT NULL,
  learning_outcomes JSONB
);

-- Topics table
CREATE TABLE topics (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  round_id UUID REFERENCES rounds(id) ON DELETE CASCADE,
  course_id UUID REFERENCES courses(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  order_num INTEGER NOT NULL
);

-- Modules table
CREATE TABLE modules (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  topic_id UUID REFERENCES topics(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  video_url TEXT NOT NULL,
  duration INTEGER NOT NULL, -- in seconds
  order_num INTEGER NOT NULL
);

-- User Progress table
CREATE TABLE user_progress (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  module_id UUID REFERENCES modules(id) ON DELETE CASCADE,
  watched_duration INTEGER DEFAULT 0,
  is_completed BOOLEAN DEFAULT FALSE,
  last_watched_at TIMESTAMP,
  completed_at TIMESTAMP,
  UNIQUE(user_id, module_id)
);

-- Course Access table
CREATE TABLE course_access (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  course_id UUID REFERENCES courses(id) ON DELETE CASCADE,
  assigned_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(user_id, course_id)
);
```

### Migration Steps
```typescript
// 1. Install Supabase client
npm install @supabase/supabase-js

// 2. Create /lib/db/supabase.ts
import { createClient } from '@supabase/supabase-js';

export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

// 3. Update queries.ts to use Supabase instead of mockData
// Example:
export async function getUserCourses(userId: string) {
  const { data, error } = await supabase
    .from('course_access')
    .select('course_id, courses(*)')
    .eq('user_id', userId);

  return data?.map(ca => ca.courses) || [];
}
```

---

## Authentication Enhancement (V1)

### Real OTP Email Sending

**Option 1: Resend (Recommended)**
```bash
npm install resend
```

```typescript
// /lib/email/sendOTP.ts
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendOTP(email: string, otp: string) {
  await resend.emails.send({
    from: 'noreply@yourplatform.com',
    to: email,
    subject: 'Your Login OTP',
    html: `
      <h2>Your OTP is: <strong>${otp}</strong></h2>
      <p>This OTP will expire in 5 minutes.</p>
    `
  });
}
```

**Option 2: Supabase Auth**
```typescript
// Use Supabase built-in OTP
import { supabase } from '@/lib/db/supabase';

// Send OTP
await supabase.auth.signInWithOtp({ email });

// Verify OTP
await supabase.auth.verifyOtp({ email, token, type: 'email' });
```

---

## Coding Environment (V2)

### Requirements
- In-browser code editor
- Multiple language support (Python, Java, JavaScript, C++)
- Code execution and testing
- Test case validation

### Recommended Libraries
```bash
npm install @monaco-editor/react  # VS Code editor
npm install judge0-api            # Code execution API
```

### Implementation
```typescript
// /components/coding/CodeEditor.tsx
import Editor from '@monaco-editor/react';

export function CodeEditor({ language, initialCode, onSubmit }) {
  const [code, setCode] = useState(initialCode);

  const handleRun = async () => {
    // Submit to Judge0 or custom backend
    const result = await executeCode(code, language);
    // Display output
  };

  return (
    <div>
      <Editor
        height="500px"
        language={language}
        value={code}
        onChange={setCode}
        theme="vs-dark"
      />
      <Button onClick={handleRun}>Run Code</Button>
    </div>
  );
}
```

---

## Performance Optimization

### Image Optimization
```typescript
// Use Next.js Image component
import Image from 'next/image';

<Image
  src="/company-logo.png"
  alt="Company Logo"
  width={100}
  height={100}
  priority // for above-the-fold images
/>
```

### Code Splitting
```typescript
// Lazy load heavy components
import dynamic from 'next/dynamic';

const VideoPlayer = dynamic(() => import('@/components/video/VideoPlayer'), {
  loading: () => <p>Loading player...</p>,
  ssr: false
});
```

### API Routes
```typescript
// /app/api/progress/route.ts
export async function POST(request: Request) {
  const { userId, moduleId, watchedDuration } = await request.json();

  // Save to database
  await updateUserProgress(userId, moduleId, watchedDuration);

  return Response.json({ success: true });
}
```

---

## Testing Guidelines

### Unit Tests (Jest + React Testing Library)
```bash
npm install -D jest @testing-library/react @testing-library/jest-dom
```

```typescript
// __tests__/components/CourseCard.test.tsx
import { render, screen } from '@testing-library/react';
import { CourseCard } from '@/components/dashboard/CourseCard';

test('renders course card with progress', () => {
  const mockCourse = { /* ... */ };
  const mockProgress = { /* ... */ };

  render(<CourseCard course={mockCourse} progress={mockProgress} />);

  expect(screen.getByText(mockCourse.title)).toBeInTheDocument();
});
```

---

## Deployment

### Vercel (Recommended)
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Environment Variables (add in Vercel dashboard)
NEXT_PUBLIC_SUPABASE_URL=your-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-key
```

### Environment Variables
```bash
# .env.local (gitignored)
NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_KEY=your-service-key
RESEND_API_KEY=your-resend-key
```

---

## Common Tasks for Cursor AI

### Task 1: Add a New Course Type
```
Add support for "Project-Based" course type:
1. Update Course type in types/index.ts to include 'project-based'
2. Create ProjectCard component similar to RoundCard
3. Update course detail page to handle project-based layout
4. Add mock data for one project-based course
```

### Task 2: Enhance Video Player
```
Add video bookmarking feature:
1. Add bookmark button to video player controls
2. Store bookmarks with timestamp in user progress
3. Show bookmark list below video
4. Allow jumping to bookmarked timestamps
```

### Task 3: Add Dark Mode
```
Implement dark mode toggle:
1. Add dark mode state using useContext
2. Update tailwind.config.ts with dark mode colors
3. Add toggle button in sidebar
4. Persist preference in localStorage
```

---

## Debugging Tips

### Common Issues

**1. Video not playing**
- Check videoUrl format (should be direct video file or proper embed URL)
- Ensure CORS headers are set if video is from external source
- Test with a known working video URL first

**2. Progress not saving**
- Verify onProgressUpdate callback is firing (add console.log)
- Check mockUserProgress array is being updated
- For real DB: verify database connection and write permissions

**3. Round not unlocking**
- Console.log the isRoundUnlocked function output
- Check all previous round modules have isCompleted = true
- Verify watched percentage >= 98%

---

## Best Practices

1. **Type Safety**: Always define TypeScript interfaces before implementing features
2. **Component Reusability**: Extract repeated UI patterns into reusable components
3. **Error Handling**: Add try-catch blocks for async operations
4. **Loading States**: Show spinners/skeletons during data fetching
5. **Responsive Design**: Test on mobile, tablet, and desktop breakpoints
6. **Accessibility**: Use semantic HTML, proper ARIA labels, keyboard navigation
7. **Performance**: Lazy load heavy components, optimize images, minimize re-renders

---

## Getting Help

**Documentation**:
- Next.js: https://nextjs.org/docs
- Tailwind CSS: https://tailwindcss.com/docs
- shadcn/ui: https://ui.shadcn.com
- Lucide Icons: https://lucide.dev

**Debug Mode**:
Add `console.log` statements in:
- `/lib/db/queries.ts` for data fetching issues
- `/components/video/VideoPlayer.tsx` for video tracking issues
- `/app/course/[courseId]/page.tsx` for round unlocking issues

---

## Quick Start for New Features

1. **Plan**: Define the feature requirements and data model
2. **Types**: Add TypeScript interfaces in `/types/index.ts`
3. **Mock Data**: Add sample data in `/lib/db/mockData.ts`
4. **Queries**: Add data fetching functions in `/lib/db/queries.ts`
5. **Components**: Create UI components in `/components/[feature]/`
6. **Pages**: Add routes in `/app/[feature]/page.tsx`
7. **Test**: Verify functionality, responsiveness, and edge cases

---

**Remember**: This is V0 with mock data. Priority for V1 is real database integration and assignment system. Focus on clean, maintainable code that can easily be extended.

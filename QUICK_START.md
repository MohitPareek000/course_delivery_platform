# Quick Start Guide - Interview Prep Platform

## 🚀 Getting Started in 2 Minutes

### Step 1: Install Dependencies
```bash
npm install
```

### Step 2: Start Development Server
```bash
npm run dev
```

### Step 3: Open Application
Navigate to [http://localhost:3000](http://localhost:3000)

---

## 🔐 Demo Login Credentials

**Email**: Any valid email (e.g., `learner@example.com`)
**OTP**: `1234`

---

## 📱 User Journey

### 1. Login Flow
1. Go to `/login`
2. Enter any valid email address
3. Click "Log in" button
4. You'll be redirected to `/verify-otp`
5. Enter OTP: `1234`
6. Redirected to dashboard

### 2. Dashboard
- View 3 assigned courses:
  - **TCS Interview Preparation** (Company-Specific)
  - **Infosys Interview Preparation** (Company-Specific)
  - **Java Full Stack Bootcamp** (Skill-Based)
- See progress statistics
- Click "Continue Learning" or "Start Course" on any course card

### 3. Course Detail Page
- **Company-Specific Courses**: Shows rounds (Round 1, 2, 3, etc.)
  - Round 1 is unlocked by default
  - Expand round to see topics and modules
  - Click on any module to start watching

- **Skill-Based Courses**: Shows all topics directly
  - No round-based locking
  - Access all modules immediately

### 4. Video Player
- Click on any unlocked module
- Custom video player with controls:
  - Play/Pause
  - Volume control
  - Playback speed (0.5x to 2x)
  - Fullscreen mode
  - Seek bar with progress tracking
- **Auto-completion**: Module marked complete when watched 98-100%
- Navigate to next/previous module using buttons

### 5. Round Unlocking (Company-Specific)
- Round 2 unlocks only when ALL modules in Round 1 are completed
- "Completed" = watched 98-100% of video duration
- Locked rounds show lock icon and message

---

## 📂 Project Structure Overview

```
/app
  ├── /login              → Email login page
  ├── /verify-otp         → OTP verification
  ├── /dashboard          → Learner dashboard with courses
  └── /course
      └── [courseId]      → Course detail (rounds/topics/modules)
          └── /module
              └── [moduleId] → Video player

/components
  ├── /auth               → Login & OTP components
  ├── /dashboard          → Sidebar, CourseCard
  ├── /course             → RoundCard, TopicSection, ModuleItem
  └── /video              → VideoPlayer

/lib/db
  ├── mockData.ts         → Sample courses, modules, progress
  └── queries.ts          → Data fetching functions
```

---

## 🎨 Design System Quick Reference

### Colors
- **Primary (Blue)**: `#4169E1` - Main buttons, headers
- **Secondary (Orange)**: `#FB7124` - Progress bars, highlights
- **Success (Green)**: `#10B981` - Completion states

### Key Components
- **Button**: `<Button>` with variants: default, outline, ghost, secondary
- **Card**: `<Card>` for containers
- **Progress**: `<Progress value={50} max={100} />` for progress bars
- **Badge**: `<Badge>` for status labels

---

## 🔍 Testing Different Scenarios

### Test Module Completion
1. Go to dashboard → Click on TCS course
2. Expand Round 1 → Click on first module
3. Scrub video to near the end (98%+)
4. Module will auto-mark as complete
5. Return to course page → Module shows green checkmark

### Test Round Unlocking
1. Complete all modules in Round 1 (watch each to 98%+)
2. Return to course detail page
3. Round 2 should now be unlocked and expandable
4. Click to expand Round 2 and access its modules

### Test Skill-Based Course
1. Go to dashboard → Click on "Java Full Stack Bootcamp"
2. All topics are accessible immediately (no rounds)
3. Click any module to start learning

---

## 🛠️ Development Tips

### Hot Reload
- Save any file → Changes appear automatically
- No need to restart server

### View Console Logs
- Open browser DevTools (F12)
- Check Console tab for debug logs
- Video player logs progress updates

### Mock Data Location
- `/lib/db/mockData.ts` - Edit to add/modify courses
- Changes require page refresh

### Add New Course
```typescript
// In /lib/db/mockData.ts
export const mockCourses: Course[] = [
  // Add new course
  {
    id: "course-4",
    title: "Your New Course",
    description: "Course description",
    type: "skill-based",
    createdAt: new Date(),
  }
];

// Add to course access
export const mockCourseAccess: CourseAccess[] = [
  {
    id: "access-4",
    userId: "user-1",
    courseId: "course-4",
    assignedAt: new Date(),
  }
];
```

---

## 🐛 Troubleshooting

### Server won't start
```bash
# Clear cache and reinstall
rm -rf node_modules .next
npm install
npm run dev
```

### Page not loading
1. Check console for errors (F12 → Console)
2. Verify you're logged in (go to /login)
3. Hard refresh: Ctrl+Shift+R (or Cmd+Shift+R on Mac)

### Video not playing
- Mock data uses YouTube embed URLs as placeholders
- Replace `videoUrl` in mockData.ts with actual video URLs for testing
- Or use a sample MP4 URL: `https://www.w3schools.com/html/mov_bbb.mp4`

### Progress not saving
- Progress saves to mockData array in memory
- Restarting server will reset progress
- For persistence, integrate a real database (see CURSOR_PROMPT.md)

---

## 📚 Next Steps

### For Development (V1)
1. **Replace Mock Data**: Integrate Supabase or Firebase
2. **Add Assignments**: Implement assignment system per round
3. **Admin Dashboard**: Build course and learner management interface
4. **Real OTP**: Set up email service (Resend or Supabase Auth)

See `CURSOR_PROMPT.md` for detailed implementation guides.

### For Production
1. Set up real database (Supabase recommended)
2. Configure authentication service
3. Add environment variables
4. Deploy to Vercel or similar platform

---

## 🎯 Feature Highlights

### ✨ What's Working
- ✅ Email OTP login (demo mode with 1234)
- ✅ Learner dashboard with course cards
- ✅ Company-specific courses with round-based learning
- ✅ Skill-based courses with direct topic access
- ✅ Video player with custom controls
- ✅ Watch time tracking and auto-completion
- ✅ Round unlocking based on completion
- ✅ Progress visualization (bars, percentages)
- ✅ Module navigation (previous/next)
- ✅ Responsive design (mobile-friendly)

### 🚧 Coming in V1
- Assignment system
- Admin dashboard
- Real database integration
- Email OTP service
- CSV learner upload
- Analytics and reporting

---

## 💡 Pro Tips

1. **Demo OTP**: Remember it's `1234` - save time typing!
2. **Quick Navigation**: Use browser back button to return to dashboard
3. **Fast Testing**: Seek to 98% of video instead of watching fully
4. **Mock Data**: All data resets on server restart - it's in memory only
5. **Sidebar**: Click hamburger menu on mobile to access navigation

---

## 📞 Need Help?

- **Documentation**: See `README.md` for full feature list
- **Development Guide**: See `CURSOR_PROMPT.md` for Cursor AI prompts
- **Code Issues**: Check browser console (F12) for error messages

---

**Happy Coding! 🚀**

Built with Next.js 14, TypeScript, and Tailwind CSS

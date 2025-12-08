# Interview Prep Platform - Course Platform

A comprehensive company-specific interview preparation course platform built with Next.js, TypeScript, and Tailwind CSS.

## Features (V0)

### Authentication
- **Email OTP Login**: 4-digit OTP verification system
- Clean, split-screen login design
- Session management with sessionStorage

### Learner Dashboard
- **Course Overview**: View all assigned courses
- **Progress Tracking**: Real-time progress bars for each course
- **Statistics**: Total courses, completed courses, and module completion stats
- **Responsive Design**: Mobile-friendly sidebar navigation

### Course Structure
Two types of courses supported:

#### 1. Company-Specific Courses
- **Round-Based Learning**: Sequential rounds (e.g., Round 1: Aptitude, Round 2: Technical, Round 3: Coding)
- **Round Unlocking**: Next round unlocks only after completing all modules in previous round
- **Learning Outcomes**: Clear objectives for each round
- **Progress Tracking**: Per-round and overall progress visualization

#### 2. Skill-Based Courses
- **Topic-Based Structure**: Direct access to all topics
- **Module Organization**: Organized by topics without round restrictions
- **Linear Learning**: Flexible learning path

### Video Player
- **Custom Controls**: Play/pause, volume, seek, playback speed (0.5x to 2x)
- **Watch Time Tracking**: Tracks actual watched duration
- **Auto-completion**: Module marked complete at 98-100% watched
- **Progress Persistence**: Saves progress every 5 seconds
- **Responsive Design**: Fullscreen support, mobile-friendly controls

### Navigation
- **Module Navigation**: Previous/Next module buttons
- **Breadcrumb Navigation**: Easy return to course or dashboard
- **Smart Routing**: Automatic redirection for unauthenticated users

## Tech Stack

- **Framework**: Next.js 14.2.5 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui (Radix UI + Tailwind)
- **Icons**: Lucide React
- **State Management**: React hooks + sessionStorage (mock)

## Project Structure

```
/app
  /login                    # Login page
  /verify-otp              # OTP verification page
  /dashboard               # Learner dashboard
  /course/[courseId]       # Course detail page
    /module/[moduleId]     # Video player page

/components
  /auth                    # Authentication components
  /dashboard              # Dashboard components
  /course                 # Course-related components
  /video                  # Video player component
  /ui                     # Reusable UI components

/lib
  /db                     # Mock data and queries
  /utils                  # Utility functions

/types                    # TypeScript interfaces
```

## Getting Started

### Prerequisites
- Node.js 18.x or higher
- npm or yarn

### Installation

1. Clone the repository:
```bash
cd CoursePlatform
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Demo Credentials

**Email**: Any valid email (e.g., learner@example.com)
**OTP**: `1234`

## Mock Data

The application currently uses mock data stored in `/lib/db/mockData.ts`:

- **3 Sample Courses**:
  - TCS Interview Preparation (Company-Specific)
  - Infosys Interview Preparation (Company-Specific)
  - Java Full Stack Bootcamp (Skill-Based)

- **Sample User**: user-1 (learner@example.com)
- **Progress Data**: Some modules marked as completed for demo

## Key Features Explained

### Round Unlocking Logic
```typescript
// Round 1 is always unlocked
// Round N unlocks when all modules in Round N-1 are completed (98-100% watched)
```

### Watch Time Tracking
```typescript
// Video progress tracked in real-time
// Saved to state every 5 seconds
// Module completion at 98-100% watched
// Progress persists across sessions (in mock data)
```

### Progress Calculation
```typescript
// Course Progress = (Completed Modules / Total Modules) * 100
// Round Progress = (Completed Modules in Round / Total Modules in Round) * 100
```

## Design System

### Colors
- **Primary**: #4169E1 (Royal Blue) - Main actions, headers
- **Secondary**: #FB7124 (Orange) - Progress indicators, accents
- **Success**: Green - Completion states
- **Neutral**: Gray scale - Text, borders, backgrounds

### Typography
- **Font**: Inter (Google Fonts)
- **Headings**: 600-700 weight
- **Body**: 400-500 weight

### Components
All UI components follow shadcn/ui patterns:
- Buttons with variants (default, outline, ghost, etc.)
- Cards with consistent padding and borders
- Progress bars with smooth animations
- Badges for status indicators
- Responsive accordion for rounds

## Future Enhancements (V1+)

### V1 Features
- **Assignments**: Add assignment questions for each round
- **Submission System**: Enable learners to submit answers
- **Assignment Completion**: Round unlocks only after assignment completion
- **Admin Dashboard**: Course and learner management interface

### V2 Features
- **Coding Environment**: Built-in code editor
- **Real Database**: Replace mock data with Supabase/Firebase
- **User Authentication**: Real OTP email sending
- **Discussion Forums**: Peer learning and Q&A
- **Certificates**: Auto-generated certificates on completion
- **Analytics**: Detailed learner analytics and insights

## Available Scripts

```bash
# Development server
npm run dev

# Production build
npm run build

# Start production server
npm start

# Linting
npm run lint
```

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

Private - All rights reserved

## Support

For issues or questions, please contact the development team.

---

Built with ❤️ using Next.js and Tailwind CSS

# Interview Prep Platform - Course Platform

A comprehensive company-specific interview preparation course platform built with Next.js, TypeScript, and Tailwind CSS.

## Features (V0)

### Authentication
- **Email OTP Login**: 4-digit OTP verification system with AWS SES email delivery
- **Google OAuth**: Sign in with Google support
- **NextAuth.js Integration**: Secure authentication with database sessions
- Clean, split-screen login design
- Session management with database persistence (30-day sessions)

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
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: NextAuth.js v5 (with Google OAuth & OTP)
- **Email Service**: AWS SES (SMTP for OTP delivery)
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui (Radix UI + Tailwind)
- **Icons**: Lucide React
- **Deployment**: Railway (Database)

## Project Structure

```
/app
  /api
    /auth                  # NextAuth API routes + OTP endpoints
    /courses               # Course API endpoints
    /progress              # Progress tracking endpoints
  /login                   # Login page
  /verify-otp             # OTP verification page
  /dashboard              # Learner dashboard
  /course/[courseId]      # Course detail page
    /class/[classId]      # Video player page (individual lesson)

/components
  /auth                    # Authentication components
  /dashboard              # Dashboard components
  /course                 # Course-related components
  /video                  # Video player component
  /ui                     # Reusable UI components

/lib
  /db                     # Database queries & seed data
  /email                  # AWS SES email service
  /utils                  # Utility functions
  auth.ts                 # NextAuth configuration
  prisma.ts               # Prisma client

/prisma
  schema.prisma           # Database schema
  /migrations             # Database migrations

/scripts                  # Utility scripts (CSV import, etc.)
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

3. Set up environment variables:
```bash
cp .env.example .env
```

Then update `.env` with your credentials:
- Database URL (PostgreSQL on Railway)
- NextAuth secret
- Google OAuth credentials
- AWS SES SMTP credentials (see [AWS_SES_SETUP.md](AWS_SES_SETUP.md))

4. Set up the database:
```bash
npx prisma generate
npx prisma db push
npx prisma db seed  # Optional: seed with sample data
```

5. Run the development server:
```bash
npm run dev
```

6. Open [http://localhost:3000](http://localhost:3000) in your browser

## Environment Variables

Required environment variables in `.env`:

```bash
# Database
DATABASE_URL="postgresql://..."

# NextAuth
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key"

# Google OAuth
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"

# AWS SES SMTP (for OTP emails)
SES_SMTP_HOST="email-smtp.us-east-1.amazonaws.com"
SES_SMTP_PORT=587
SES_SMTP_USER="your-smtp-username"
SES_SMTP_PASSWORD="your-smtp-password"
SES_FROM_EMAIL="hello@scaler.com"
SES_FROM_NAME="Scaler Career Day"
```

See [AWS_SES_SETUP.md](AWS_SES_SETUP.md) for detailed AWS SES configuration instructions.

## Database Schema

The application uses PostgreSQL with Prisma ORM. Key models:

- **User**: Learner accounts with authentication
- **Course**: Learning courses (company-specific or skill-based)
- **Module**: Rounds/sections within courses
- **Topic**: Subject areas within modules
- **Class**: Individual lessons (video, text, or contest)
- **UserProgress**: Tracks watch time and completion
- **CourseAccess**: Manages course assignments to users
- **OTP**: Stores one-time passwords for email verification

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
- **Discussion Forums**: Peer learning and Q&A
- **Certificates**: Auto-generated certificates on completion
- **Analytics Dashboard**: Detailed learner analytics and insights
- **Admin Panel**: Course management and learner administration
- **Mobile App**: Native mobile applications

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

# Database commands
npx prisma studio          # Open Prisma Studio (database GUI)
npx prisma generate        # Generate Prisma Client
npx prisma db push         # Push schema changes to database
npx prisma db seed         # Seed database with sample data
npx prisma migrate dev     # Create and apply migrations

# Utility scripts
npm run seed               # Seed database
npm run assign-courses     # Assign courses from CSV
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

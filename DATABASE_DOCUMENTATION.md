# Course Platform Database Documentation

**Last Updated:** December 19, 2024
**Database Type:** PostgreSQL (Railway)
**Database Name:** railway
**Host:** gondola.proxy.rlwy.net:21027

---

## Table of Contents
1. [Database Overview](#database-overview)
2. [Tables Structure](#tables-structure)
3. [Data Models](#data-models)
4. [Analytics Tables](#analytics-tables)
5. [Relationships & Foreign Keys](#relationships--foreign-keys)
6. [Common Queries for Analytics](#common-queries-for-analytics)
7. [Metabase Integration](#metabase-integration)

---

## Database Overview

This database powers a course learning platform with the following capabilities:
- **User Management**: User authentication and profiles
- **Course Management**: Multi-level course structure (Courses → Modules → Topics → Classes)
- **Progress Tracking**: User progress and completion tracking
- **Analytics**: Comprehensive event tracking for Metabase analysis
- **Access Control**: Course access management

### Total Tables: 8

1. `users` - User accounts and authentication
2. `courses` - Course catalog
3. `modules` - Course modules (formerly "rounds")
4. `topics` - Module topics
5. `classes` - Individual lessons/classes
6. `user_progress` - Learning progress tracking
7. `course_access` - User-course enrollment
8. `analytics_events` - Event tracking for analytics

---

## Tables Structure

### 1. **users** (User Accounts)

**Purpose:** Stores user authentication and profile information

| Column | Type | Description | Nullable | Default |
|--------|------|-------------|----------|---------|
| id | String (CUID) | Primary key | No | Auto-generated |
| email | String | Unique user email | No | - |
| name | String | User's full name | Yes | null |
| emailVerified | DateTime | Email verification timestamp | Yes | null |
| image | String | Profile image URL | Yes | null |
| createdAt | DateTime | Account creation date | No | now() |
| updatedAt | DateTime | Last update timestamp | No | auto-updated |

**Indexes:**
- Primary: `id`
- Unique: `email`

**Relations:**
- Has many: `user_progress`, `course_access`

---

### 2. **courses** (Course Catalog)

**Purpose:** Main course catalog with metadata

| Column | Type | Description | Nullable | Default |
|--------|------|-------------|----------|---------|
| id | String (CUID) | Primary key | No | Auto-generated |
| title | String | Course title | No | - |
| description | String | Course description | No | - |
| thumbnail | String | Course thumbnail URL | Yes | null |
| instructor | String | Instructor name | Yes | null |
| duration | Int | Total duration (minutes) | No | - |
| level | String | Difficulty level | No | - |
| type | String | Course type/category | No | - |
| createdAt | DateTime | Creation date | No | now() |
| updatedAt | DateTime | Last update | No | auto-updated |

**Table Name:** `courses`

**Relations:**
- Has many: `modules`, `topics`, `course_access`

---

### 3. **modules** (Course Modules)

**Purpose:** Course modules containing grouped topics

| Column | Type | Description | Nullable | Default |
|--------|------|-------------|----------|---------|
| id | String (CUID) | Primary key | No | Auto-generated |
| courseId | String | Foreign key to courses | No | - |
| title | String | Module title | No | - |
| description | String | Module description | No | - |
| order | Int | Display order | No | - |
| learningOutcomes | String[] | Learning outcomes array | No | [] |

**Table Name:** `modules`

**Indexes:**
- Primary: `id`
- Foreign key: `courseId` → `courses.id`

**Relations:**
- Belongs to: `courses`
- Has many: `topics`

---

### 4. **topics** (Module Topics)

**Purpose:** Topics within modules

| Column | Type | Description | Nullable | Default |
|--------|------|-------------|----------|---------|
| id | String (CUID) | Primary key | No | Auto-generated |
| moduleId | String | Foreign key to modules | Yes | null |
| courseId | String | Foreign key to courses | No | - |
| title | String | Topic title | No | - |
| order | Int | Display order | No | - |

**Table Name:** `topics`

**Relations:**
- Belongs to: `modules`, `courses`
- Has many: `classes`

---

### 5. **classes** (Lessons/Classes)

**Purpose:** Individual lesson content (videos, text, contests)

| Column | Type | Description | Nullable | Default |
|--------|------|-------------|----------|---------|
| id | String (CUID) | Primary key | No | Auto-generated |
| topicId | String | Foreign key to topics | No | - |
| title | String | Class title | No | - |
| description | String | Class description | Yes | null |
| contentType | String | Type: video/text/contest | Yes | "video" |
| videoUrl | String | Video/meeting URL | Yes | null |
| textContent | String (Text) | Markdown content | Yes | null |
| contestUrl | String | Contest URL | Yes | null |
| duration | Int | Duration in seconds | No | - |
| order | Int | Display order | No | - |

**Table Name:** `classes`

**Content Types:**
- `video` - Video lessons (YouTube, Vimeo, Scaler Meetings)
- `text` - Text-based lessons (Markdown)
- `contest` - Assessment/contest links

**Relations:**
- Belongs to: `topics`
- Has many: `user_progress`

---

### 6. **user_progress** (Learning Progress)

**Purpose:** Tracks user progress through classes

| Column | Type | Description | Nullable | Default |
|--------|------|-------------|----------|---------|
| id | String (CUID) | Primary key | No | Auto-generated |
| userId | String | Foreign key to users | No | - |
| classId | String | Foreign key to classes | No | - |
| watchedDuration | Int | Seconds watched | No | - |
| lastPosition | Int | Last playback position | Yes | null |
| isCompleted | Boolean | Completion status | No | false |
| lastWatchedAt | DateTime | Last activity timestamp | No | now() |
| completedAt | DateTime | Completion timestamp | Yes | null |

**Table Name:** `user_progress`

**Indexes:**
- Primary: `id`
- Unique: `[userId, classId]`

**Relations:**
- Belongs to: `users`, `classes`

**Key Metrics:**
- `watchedDuration` - Total time user spent on the class
- `lastPosition` - Resume point for videos
- `isCompleted` - Whether user completed the class

---

### 7. **course_access** (Enrollment)

**Purpose:** Manages user access to courses

| Column | Type | Description | Nullable | Default |
|--------|------|-------------|----------|---------|
| id | String (CUID) | Primary key | No | Auto-generated |
| userId | String | Foreign key to users | No | - |
| courseId | String | Foreign key to courses | No | - |
| grantedAt | DateTime | Access grant date | No | now() |

**Table Name:** `course_access`

**Indexes:**
- Primary: `id`
- Unique: `[userId, courseId]`

**Relations:**
- Belongs to: `users`, `courses`

---

### 8. **analytics_events** (Event Tracking) ⭐

**Purpose:** Comprehensive event tracking for analytics and Metabase queries

| Column | Type | Description | Nullable | Default |
|--------|------|-------------|----------|---------|
| id | String (CUID) | Primary key | No | Auto-generated |
| userId | String | User ID (nullable for anonymous) | Yes | null |
| sessionId | String | Browser session ID | Yes | null |
| eventType | String | Event type | No | - |
| eventAction | String | Specific action | Yes | null |
| buttonName | String | Button clicked | Yes | null |
| page | String | Page/path | Yes | null |
| destination | String | Navigation destination | Yes | null |
| courseId | String | Related course | Yes | null |
| classId | String | Related class | Yes | null |
| utmSource | String | UTM source | Yes | null |
| utmMedium | String | UTM medium | Yes | null |
| utmCampaign | String | UTM campaign | Yes | null |
| utmTerm | String | UTM term | Yes | null |
| utmContent | String | UTM content | Yes | null |
| platform | String | Platform (web/mobile) | Yes | "web" |
| isLoggedIn | Boolean | Login status | No | false |
| userEmail | String | User email | Yes | null |
| customData | JSON | Additional attributes | Yes | null |
| timestamp | DateTime | Event timestamp | No | now() |
| createdAt | DateTime | Record creation | No | now() |

**Table Name:** `analytics_events`

**Indexes:**
- Primary: `id`
- Index: `userId`
- Index: `eventType`
- Index: `eventAction`
- Index: `timestamp`
- Composite Index: `[utmSource, utmMedium, utmCampaign]`

---

## Data Models

### Course Hierarchy

```
Course
├── Module 1
│   ├── Topic 1.1
│   │   ├── Class 1.1.1 (Video)
│   │   ├── Class 1.1.2 (Text)
│   │   └── Class 1.1.3 (Contest)
│   └── Topic 1.2
│       └── Class 1.2.1 (Video)
└── Module 2
    └── Topic 2.1
        └── Class 2.1.1 (Video)
```

### User Journey Flow

```
1. User Registration → users table
2. Course Assignment → course_access table
3. Course Access → courses, modules, topics, classes
4. Learning Progress → user_progress table
5. Event Tracking → analytics_events table
```

---

## Analytics Tables

### Event Types in `analytics_events`

| Event Type | Description | Example Use Case |
|------------|-------------|------------------|
| `we_page_load` | Page view events | Track which pages users visit |
| `gtm_custom_click` | Button/link clicks | Track user interactions |
| `auth_event` | Authentication events | Login, logout, OTP events |
| `course_event` | Course interactions | Course viewed, module started |
| `class_event` | Class interactions | Class started, completed |
| `video_event` | Video playback | Progress milestones (25%, 50%, 75%) |
| `contest_event` | Contest activities | Contest started, completed |
| `error_event` | Error occurrences | Track errors and issues |

### Event Actions

| Action | Description |
|--------|-------------|
| `login_success` | User logged in successfully |
| `login_failed` | Login attempt failed |
| `otp_requested` | OTP sent to user |
| `course_viewed` | User viewed a course |
| `module_started` | User started a module |
| `module_completed` | User completed a module |
| `class_started` | User started a class |
| `class_completed` | User completed a class |
| `video_progress` | Video progress milestone |
| `contest_started` | User started a contest |
| `contest_completed` | User completed a contest |

---

## Relationships & Foreign Keys

### Entity Relationship Diagram (Text)

```
users (1) ──────< (N) user_progress (N) >────── (1) classes
  │                                                   │
  │                                                   │
  └──────< (N) course_access (N) >──────┐           │
                                          │           │
courses (1) ────< (N) modules (1) ───< (N) topics ──┘
  │
  └──────< (N) topics
```

### Foreign Key Constraints

| Table | Column | References | On Delete |
|-------|--------|------------|-----------|
| modules | courseId | courses(id) | CASCADE |
| topics | moduleId | modules(id) | CASCADE |
| topics | courseId | courses(id) | CASCADE |
| classes | topicId | topics(id) | CASCADE |
| user_progress | userId | users(id) | CASCADE |
| user_progress | classId | classes(id) | CASCADE |
| course_access | userId | users(id) | CASCADE |
| course_access | courseId | courses(id) | CASCADE |

---

## Common Queries for Analytics

### 1. User Engagement Metrics

```sql
-- Active users in last 7 days
SELECT COUNT(DISTINCT user_id) as active_users
FROM analytics_events
WHERE timestamp >= NOW() - INTERVAL '7 days'
  AND is_logged_in = true;
```

### 2. Course Completion Rate

```sql
-- Completion rate by course
SELECT
  c.title as course_name,
  COUNT(DISTINCT ca.user_id) as enrolled_users,
  COUNT(DISTINCT CASE WHEN up.is_completed THEN up.user_id END) as completed_users,
  ROUND(100.0 * COUNT(DISTINCT CASE WHEN up.is_completed THEN up.user_id END) /
    NULLIF(COUNT(DISTINCT ca.user_id), 0), 2) as completion_rate
FROM courses c
LEFT JOIN course_access ca ON c.id = ca.course_id
LEFT JOIN classes cl ON cl.topic_id IN (
  SELECT id FROM topics WHERE course_id = c.id
)
LEFT JOIN user_progress up ON up.class_id = cl.id AND up.user_id = ca.user_id
GROUP BY c.id, c.title;
```

### 3. UTM Campaign Performance

```sql
-- Campaign performance by UTM parameters
SELECT
  utm_source,
  utm_medium,
  utm_campaign,
  COUNT(DISTINCT user_id) as unique_users,
  COUNT(*) as total_events,
  COUNT(DISTINCT CASE WHEN event_action = 'login_success' THEN user_id END) as conversions
FROM analytics_events
WHERE utm_source IS NOT NULL
  AND timestamp >= NOW() - INTERVAL '30 days'
GROUP BY utm_source, utm_medium, utm_campaign
ORDER BY unique_users DESC;
```

### 4. User Progress Analytics

```sql
-- Average completion rate per user
SELECT
  u.email,
  COUNT(DISTINCT up.class_id) as classes_started,
  COUNT(DISTINCT CASE WHEN up.is_completed THEN up.class_id END) as classes_completed,
  ROUND(AVG(up.watched_duration / NULLIF(cl.duration, 0) * 100), 2) as avg_watch_percentage
FROM users u
JOIN user_progress up ON u.id = up.user_id
JOIN classes cl ON up.class_id = cl.id
GROUP BY u.id, u.email
ORDER BY classes_completed DESC;
```

### 5. Popular Content

```sql
-- Most viewed classes
SELECT
  c.title as class_title,
  t.title as topic_title,
  COUNT(DISTINCT up.user_id) as unique_viewers,
  AVG(up.watched_duration) as avg_watch_time,
  COUNT(CASE WHEN up.is_completed THEN 1 END) as completions
FROM classes c
JOIN topics t ON c.topic_id = t.id
LEFT JOIN user_progress up ON c.id = up.class_id
GROUP BY c.id, c.title, t.title
ORDER BY unique_viewers DESC
LIMIT 10;
```

### 6. Login Funnel Analysis

```sql
-- Complete login funnel (7 steps)
WITH funnel_events AS (
  SELECT
    session_id,
    user_id,
    user_email,
    MIN(CASE WHEN event_type = 'we_page_load' AND page LIKE '%/login%' THEN timestamp END) as visited_login_page,
    MIN(CASE WHEN event_action = 'login_button_clicked' THEN timestamp END) as clicked_login,
    MIN(CASE WHEN event_action = 'email_entered' THEN timestamp END) as entered_email,
    MIN(CASE WHEN event_action = 'otp_requested' THEN timestamp END) as requested_otp,
    MIN(CASE WHEN event_action = 'otp_entered' THEN timestamp END) as entered_otp,
    MIN(CASE WHEN event_action = 'login_success' THEN timestamp END) as login_successful,
    MIN(CASE WHEN event_type = 'we_page_load' AND page LIKE '%/dashboard%' THEN timestamp END) as reached_dashboard
  FROM analytics_events
  WHERE timestamp >= NOW() - INTERVAL '30 days'
  GROUP BY session_id, user_id, user_email
)
SELECT
  'Step 1: Visited Login Page' as funnel_step,
  COUNT(DISTINCT session_id) as users,
  100.0 as conversion_rate
FROM funnel_events WHERE visited_login_page IS NOT NULL
UNION ALL
SELECT 'Step 2: Clicked Login', COUNT(DISTINCT session_id),
  ROUND(100.0 * COUNT(DISTINCT session_id) / NULLIF((SELECT COUNT(DISTINCT session_id) FROM funnel_events WHERE visited_login_page IS NOT NULL), 0), 2)
FROM funnel_events WHERE clicked_login IS NOT NULL
UNION ALL
SELECT 'Step 3: Entered Email', COUNT(DISTINCT session_id),
  ROUND(100.0 * COUNT(DISTINCT session_id) / NULLIF((SELECT COUNT(DISTINCT session_id) FROM funnel_events WHERE visited_login_page IS NOT NULL), 0), 2)
FROM funnel_events WHERE entered_email IS NOT NULL
UNION ALL
SELECT 'Step 4: Requested OTP', COUNT(DISTINCT session_id),
  ROUND(100.0 * COUNT(DISTINCT session_id) / NULLIF((SELECT COUNT(DISTINCT session_id) FROM funnel_events WHERE visited_login_page IS NOT NULL), 0), 2)
FROM funnel_events WHERE requested_otp IS NOT NULL
UNION ALL
SELECT 'Step 5: Entered OTP', COUNT(DISTINCT session_id),
  ROUND(100.0 * COUNT(DISTINCT session_id) / NULLIF((SELECT COUNT(DISTINCT session_id) FROM funnel_events WHERE visited_login_page IS NOT NULL), 0), 2)
FROM funnel_events WHERE entered_otp IS NOT NULL
UNION ALL
SELECT 'Step 6: Login Successful', COUNT(DISTINCT session_id),
  ROUND(100.0 * COUNT(DISTINCT session_id) / NULLIF((SELECT COUNT(DISTINCT session_id) FROM funnel_events WHERE visited_login_page IS NOT NULL), 0), 2)
FROM funnel_events WHERE login_successful IS NOT NULL
UNION ALL
SELECT 'Step 7: Reached Dashboard', COUNT(DISTINCT session_id),
  ROUND(100.0 * COUNT(DISTINCT session_id) / NULLIF((SELECT COUNT(DISTINCT session_id) FROM funnel_events WHERE visited_login_page IS NOT NULL), 0), 2)
FROM funnel_events WHERE reached_dashboard IS NOT NULL;
```

---

## Metabase Integration

### Connection Details

**Database Type:** PostgreSQL
**Host:** gondola.proxy.rlwy.net
**Port:** 21027
**Database:** railway
**Username:** postgres
**Password:** (Get from `.env` file or Railway dashboard)

### Recommended Metabase Dashboards

#### 1. **User Engagement Dashboard**
- Active users (daily, weekly, monthly)
- New user registrations over time
- Session duration distribution
- Page views by page type

#### 2. **Course Performance Dashboard**
- Course enrollment trends
- Completion rates by course
- Average time to complete
- Drop-off points analysis

#### 3. **Marketing Attribution Dashboard**
- UTM source performance
- Campaign conversion rates
- Traffic sources breakdown
- Landing page effectiveness

#### 4. **Content Analytics Dashboard**
- Most viewed classes
- Video completion rates
- Contest participation rates
- Average watch time by content type

#### 5. **User Journey Dashboard**
- Login funnel visualization
- Course discovery to enrollment
- Module progression rates
- Time between milestones

### Sample Metabase Questions

1. **Daily Active Users (Line Chart)**
   ```sql
   SELECT
     DATE(timestamp) as date,
     COUNT(DISTINCT user_id) as active_users
   FROM analytics_events
   WHERE is_logged_in = true
   GROUP BY DATE(timestamp)
   ORDER BY date DESC;
   ```

2. **Top Traffic Sources (Pie Chart)**
   ```sql
   SELECT
     COALESCE(utm_source, 'Direct') as source,
     COUNT(DISTINCT session_id) as sessions
   FROM analytics_events
   WHERE event_type = 'we_page_load'
   GROUP BY utm_source
   ORDER BY sessions DESC
   LIMIT 10;
   ```

3. **Course Completion Funnel (Funnel Chart)**
   ```sql
   SELECT
     'Enrolled' as stage, COUNT(DISTINCT user_id) as users FROM course_access
   UNION ALL
   SELECT 'Started First Class', COUNT(DISTINCT user_id) FROM user_progress
   UNION ALL
   SELECT 'Completed First Class', COUNT(DISTINCT user_id) FROM user_progress WHERE is_completed = true;
   ```

---

## Data Dictionary

### Enums and Constants

#### Course Levels
- `beginner`
- `intermediate`
- `advanced`

#### Course Types
- `role-specific`
- `skill-based`
- `certification`

#### Content Types
- `video` - Video lessons
- `text` - Text-based lessons
- `contest` - Assessments/contests

#### Platform Types
- `web` - Web browser
- `mobile` - Mobile app (future)

---

## Notes for Analytics Team

### Important Considerations

1. **Time Zones:** All timestamps are stored in UTC
2. **Session Tracking:** Browser session IDs are used to track user journeys
3. **Anonymous Users:** Some events may have null `userId` for non-logged-in visitors
4. **UTM Parameters:** Captured on all events for marketing attribution
5. **Custom Data:** The `customData` JSON field contains additional event-specific attributes

### Data Quality

- **Foreign Keys:** All relationships enforced with CASCADE delete
- **Unique Constraints:** Prevent duplicate enrollments and progress records
- **Indexes:** Optimized for common query patterns
- **Nullable Fields:** Appropriately used for optional data

### Best Practices

1. **Query Performance:** Use indexed columns in WHERE clauses
2. **Date Ranges:** Always specify date ranges for large tables
3. **Distinct Counts:** Use DISTINCT when counting unique users/sessions
4. **NULL Handling:** Use COALESCE or NULLIF for safer aggregations

---

## Support & Maintenance

### For Questions or Issues

- **Database Schema:** Check `prisma/schema.prisma` in the codebase
- **Metabase Queries:** See `METABASE_QUERIES.md` for pre-built queries
- **API Documentation:** Contact development team

### Regular Maintenance

- **Backups:** Automated daily backups via Railway
- **Schema Updates:** Managed via Prisma migrations
- **Analytics Events:** Retention policy TBD (recommend 90 days for raw events)

---

**Document Version:** 1.0
**Last Updated:** December 19, 2024
**Maintained By:** Development Team

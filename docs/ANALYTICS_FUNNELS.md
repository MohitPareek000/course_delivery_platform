# Analytics Funnels & Metrics Guide

## Course Platform - Data Analyst Interview Mastery

---

## Table of Contents

1. [Overview](#overview)
2. [Key Funnels](#key-funnels)
3. [Metrics to Track](#metrics-to-track)
4. [SQL Queries for Metabase](#sql-queries-for-metabase)
5. [Alerts & Thresholds](#alerts--thresholds)

---

## Overview

This document outlines the key funnels and metrics to track for the Course Platform. All data is stored in PostgreSQL and can be visualized in Metabase.

### Data Sources

| Table | Purpose |
|-------|---------|
| `AnalyticsEvent` | All user interactions (page views, clicks, events) |
| `User` | Registered users |
| `Session` | Login sessions |
| `UserProgress` | Class completion & watch time |
| `Rating` | Course/module ratings |
| `CourseAccess` | User-course assignments |

### Event Types

| Event Type | Description |
|------------|-------------|
| `we_page_load` | Page view events |
| `gtm_custom_click` | Button click events |
| `auth_event` | Login/logout events |
| `class_event` | Video play/complete events |
| `course_event` | Course-level interactions |
| `form_input` | Form interactions |

---

## Key Funnels

### 1. User Acquisition Funnel

**Purpose:** Track how users move from landing page to successful login

```
Landing Page (/)
    ↓
Login Page (/login)
    ↓
OTP Requested
    ↓
Verify OTP Page (/verify-otp)
    ↓
Login Success
    ↓
Dashboard (/dashboard)
```

**Key Drop-off Points:**
- Landing → Login: Are users finding the login?
- Login → OTP Request: Are users entering valid emails?
- OTP Request → Login Success: Are OTPs being delivered and entered correctly?

**Events to Track:**

| Step | Event Type | Filter |
|------|------------|--------|
| Landing Page | `we_page_load` | page = '/' |
| Login Page | `we_page_load` | page = '/login' |
| OTP Requested | `auth_event` | eventAction = 'otp_requested' |
| Verify Page | `we_page_load` | page = '/verify-otp' |
| Login Success | `auth_event` | eventAction = 'login_success' |
| Login Failed | `auth_event` | eventAction = 'login_failed' |
| Dashboard | `we_page_load` | page = '/dashboard' |

---

### 2. Course Consumption Funnel (Primary)

**Purpose:** Track how users consume course content from login to completion

```
Login Success
    ↓ 100%
Dashboard Viewed
    ↓ 88.8%
Start Course Clicked
    ↓ 65.2%
Class Page Viewed
    ↓ 71.0%
Has Completed Class (DB)
    ↓ 87.2%
Next Class Clicked
    ↓ 23.9%
Completed 5+ Classes
```

**Current Benchmark (25th Dec onwards):**

| # | Step | Users | % of Login | % of Previous | Drop-off |
|---|------|-------|------------|---------------|----------|
| 1 | 🔐 Login Success | 304 | 100.0% | - | - |
| 2 | 📊 Dashboard Viewed | 304 | 100.0% | 100.0% | 0 |
| 3 | ▶️ Start Course Clicked | 270 | 88.8% | 88.8% | 34 |
| 4 | 🎬 Class Page Viewed | 176 | 57.9% | 65.2% | 94 |
| 5 | ✅ Mark Complete Clicked | 113 | 37.2% | 64.2% | 63 |
| 6 | 💾 Has Completed Class (DB) | 125 | 41.1% | - | - |
| 7 | ⏭️ Next Class Clicked | 109 | 35.9% | 87.2% | 16 |
| 8 | 🏆 Completed 5+ Classes | 26 | 8.6% | 23.9% | 83 |

**Key Conversion Rates:**

| Conversion | Rate | Target |
|------------|------|--------|
| Login → Dashboard | 100.0% | >95% |
| Dashboard → Start Course | 88.8% | >80% |
| Start Course → Class View | 65.2% | >70% |
| Class View → Complete | 71.0% | >60% |
| Complete → 5+ Classes | 20.8% | >30% |
| **Overall (Login → Complete)** | **41.1%** | >50% |

**Key Drop-off Points:**

| From → To | Users Lost | Priority | Action |
|-----------|------------|----------|--------|
| Start Course → Class View | 94 | 🔴 High | Check navigation, page load speed |
| Completed 1 → Completed 5+ | 99 | 🔴 High | Add engagement hooks, reminders |
| Class View → Complete | 51 | 🟡 Medium | Check video player, content quality |
| Dashboard → Start Course | 34 | 🟢 Low | Improve CTA visibility |

**Events to Track:**

| Step | Event Type | Filter |
|------|------------|--------|
| Dashboard | `we_page_load` | page = '/dashboard' |
| Start Course | `gtm_custom_click` | buttonName = 'Start Course' |
| Class Page | `we_page_load` | page LIKE '%/class/%' AND classId IN DA001 |
| Mark Complete | `gtm_custom_click` | buttonName = 'Mark as Complete' |
| Completed (DB) | `UserProgress` table | isCompleted = true |
| Next Class | `gtm_custom_click` | buttonName = 'Next Class' |
| 5+ Classes | `UserProgress` table | COUNT(isCompleted) >= 5 |

---

### 3. Learning Progress Funnel

**Purpose:** Track module-by-module completion

```
Module 1: Data Analyst Interviews Introduction (4 classes)
    ↓
Module 2: Technical & Coding Challenges (22 classes)
    ↓
Module 3: SQL Interviews (33 classes)
    ↓
Module 4: Analytical Problem Solving (6 classes)
    ↓
Module 5: Take-home Case Studies (5 classes)
    ↓
Module 6: Behavioral Questions (7 classes)
    ↓
Course Complete (77 classes)
```

**Key Drop-off Points:**
- Module 1 → Module 2: Biggest expected drop-off
- Within SQL module: Longest module, watch for mid-module drop-off

**Data Source:** `UserProgress` table with `isCompleted = true`

---

### 4. Engagement Funnel

**Purpose:** Track depth of engagement per session

```
Login
    ↓
View 1 Class
    ↓
Complete 1 Class
    ↓
View 2+ Classes
    ↓
Complete 2+ Classes
    ↓
Next Class Click
```

**Events to Track:**

| Step | Event Type | Filter |
|------|------------|--------|
| Continue Learning | `gtm_custom_click` | buttonName = 'Continue Learning' |
| Next Class | `gtm_custom_click` | buttonName = 'Next Class' |
| Previous Class | `gtm_custom_click` | buttonName = 'Previous Class' |

---

### 5. Rating & Feedback Funnel

**Purpose:** Track rating collection success

```
Class/Module Complete
    ↓
Rating Modal Shown
    ↓
    ├── Rating Submitted (success)
    ├── Skip Button Clicked
    ├── Close Button Clicked
    └── Overlay Clicked (dismissed)
```

**Events to Track:**

| Step | Event Type | Filter |
|------|------------|--------|
| Rating Submitted | Check `Rating` table | - |
| Skip | `gtm_custom_click` | buttonName = 'Rating Modal skip_button' |
| Close | `gtm_custom_click` | buttonName = 'Rating Modal close_button' |
| Overlay Dismiss | `gtm_custom_click` | buttonName = 'Rating Modal overlay_click' |

---

### 6. Retention Funnel

**Purpose:** Track user return behavior

```
Day 0: First Login
    ↓
Day 1: Return Visit
    ↓
Day 7: Weekly Active
    ↓
Day 30: Monthly Active
```

**Data Source:** `Session` table, `AnalyticsEvent` timestamps

---

## Metrics to Track

### Primary Metrics (North Star)

| Metric | Formula | Target |
|--------|---------|--------|
| **Activation Rate** | Users with ≥1 class complete / Total logged in | >50% |
| **Completion Rate** | Users 100% complete / Users started | >10% |
| **Avg Classes/User** | Total classes completed / Active users | >10 |
| **Total Watch Time** | Sum of watchedDuration / 3600 | Track trend |

### Acquisition Metrics

| Metric | Formula | Target |
|--------|---------|--------|
| OTP Success Rate | login_success / otp_requested | >90% |
| Login Failure Rate | login_failed / (login_success + login_failed) | <5% |
| Time to First Login | Avg time from OTP request to login success | <2 min |

### Engagement Metrics

| Metric | Formula | Target |
|--------|---------|--------|
| Start Rate | Users clicked Start / Users viewed dashboard | >80% |
| Class View Rate | Users viewed class / Users clicked Start | >70% |
| Completion Rate (per class) | Mark Complete clicks / Class views | >60% |
| Avg Session Duration | Total watch time / Number of sessions | >15 min |
| Classes per Session | Classes completed / Number of sessions | >2 |

### Progress Metrics

| Metric | Formula | Target |
|--------|---------|--------|
| Module 1 Completion | Users completed M1 / Users started | >70% |
| Module 2 Completion | Users completed M2 / Users completed M1 | >40% |
| Overall Completion | Users 100% / Users started | >10% |
| Avg Completion % | Avg of (classesCompleted/77) for active users | >25% |

### Retention Metrics

| Metric | Formula | Target |
|--------|---------|--------|
| D1 Retention | Users active Day 1 / Users Day 0 | >30% |
| D7 Retention | Users active Day 7 / Users Day 0 | >20% |
| D30 Retention | Users active Day 30 / Users Day 0 | >10% |
| Weekly Active Users (WAU) | Unique users with activity in last 7 days | Track trend |

### Quality Metrics

| Metric | Formula | Target |
|--------|---------|--------|
| Avg Rating | Sum of ratings / Count of ratings | >4.0 |
| Rating Submission Rate | Ratings submitted / Rating modals shown | >30% |
| NPS (if collected) | % Promoters - % Detractors | >50 |

---

## SQL Queries for Metabase

### 1. Daily Active Users (DAU)

```sql
SELECT
  DATE(timestamp AT TIME ZONE 'Asia/Kolkata') as date,
  COUNT(DISTINCT "userEmail") as dau
FROM "AnalyticsEvent"
WHERE "eventType" = 'we_page_load'
  AND timestamp >= NOW() - INTERVAL '30 days'
GROUP BY DATE(timestamp AT TIME ZONE 'Asia/Kolkata')
ORDER BY date DESC;
```

### 2. Login Funnel (Daily)

```sql
SELECT
  DATE(timestamp AT TIME ZONE 'Asia/Kolkata') as date,
  COUNT(CASE WHEN "eventAction" = 'otp_requested' THEN 1 END) as otp_requested,
  COUNT(CASE WHEN "eventAction" = 'login_success' THEN 1 END) as login_success,
  COUNT(CASE WHEN "eventAction" = 'login_failed' THEN 1 END) as login_failed,
  ROUND(
    COUNT(CASE WHEN "eventAction" = 'login_success' THEN 1 END)::numeric /
    NULLIF(COUNT(CASE WHEN "eventAction" = 'otp_requested' THEN 1 END), 0) * 100,
    1
  ) as success_rate
FROM "AnalyticsEvent"
WHERE "eventType" = 'auth_event'
  AND timestamp >= NOW() - INTERVAL '30 days'
GROUP BY DATE(timestamp AT TIME ZONE 'Asia/Kolkata')
ORDER BY date DESC;
```

### 3. Course Activation Funnel

```sql
WITH funnel AS (
  SELECT
    COUNT(DISTINCT CASE WHEN page = '/dashboard' THEN "userEmail" END) as dashboard_users,
    COUNT(DISTINCT CASE WHEN "buttonName" = 'Start Course' THEN "userEmail" END) as start_course,
    COUNT(DISTINCT CASE WHEN page LIKE '%/class/%' THEN "userEmail" END) as class_view,
    COUNT(DISTINCT CASE WHEN "buttonName" = 'Mark as Complete' THEN "userEmail" END) as mark_complete
  FROM "AnalyticsEvent"
  WHERE timestamp >= NOW() - INTERVAL '7 days'
)
SELECT
  dashboard_users,
  start_course,
  ROUND(start_course::numeric / NULLIF(dashboard_users, 0) * 100, 1) as start_rate,
  class_view,
  ROUND(class_view::numeric / NULLIF(start_course, 0) * 100, 1) as view_rate,
  mark_complete,
  ROUND(mark_complete::numeric / NULLIF(class_view, 0) * 100, 1) as complete_rate
FROM funnel;
```

### 4. User Progress Summary

```sql
SELECT
  u.email,
  COUNT(DISTINCT up."classId") as classes_started,
  COUNT(DISTINCT CASE WHEN up."isCompleted" = true THEN up."classId" END) as classes_completed,
  ROUND(COUNT(DISTINCT CASE WHEN up."isCompleted" = true THEN up."classId" END)::numeric / 77 * 100, 1) as completion_percent,
  ROUND(SUM(up."watchedDuration")::numeric / 3600, 2) as watch_hours,
  MAX(up."lastWatchedAt") as last_activity
FROM "User" u
LEFT JOIN "UserProgress" up ON u.id = up."userId"
WHERE up."classId" IN (
  SELECT c.id FROM "Class" c
  JOIN "Topic" t ON c."topicId" = t.id
  JOIN "Module" m ON t."moduleId" = m.id
  WHERE m."courseId" = 'DA001'
)
GROUP BY u.email
ORDER BY classes_completed DESC;
```

### 5. Module Completion Rates

```sql
WITH module_classes AS (
  SELECT m.id as module_id, m.title as module_name, c.id as class_id
  FROM "Module" m
  JOIN "Topic" t ON t."moduleId" = m.id
  JOIN "Class" c ON c."topicId" = t.id
  WHERE m."courseId" = 'DA001'
),
user_completions AS (
  SELECT
    mc.module_name,
    COUNT(DISTINCT up."userId") as users_completed_any,
    COUNT(CASE WHEN up."isCompleted" = true THEN 1 END) as total_completions
  FROM module_classes mc
  LEFT JOIN "UserProgress" up ON up."classId" = mc.class_id
  GROUP BY mc.module_name
)
SELECT * FROM user_completions;
```

### 6. Rating Distribution

```sql
SELECT
  rating,
  COUNT(*) as count,
  ROUND(COUNT(*)::numeric / SUM(COUNT(*)) OVER () * 100, 1) as percentage
FROM "Rating"
GROUP BY rating
ORDER BY rating DESC;
```

### 7. Button Click Analysis

```sql
SELECT
  "buttonName",
  COUNT(*) as clicks,
  COUNT(DISTINCT "userEmail") as unique_users
FROM "AnalyticsEvent"
WHERE "eventType" = 'gtm_custom_click'
  AND timestamp >= NOW() - INTERVAL '7 days'
GROUP BY "buttonName"
ORDER BY clicks DESC;
```

### 8. Cohort Retention (Weekly)

```sql
WITH user_first_login AS (
  SELECT
    "userEmail",
    DATE_TRUNC('week', MIN(timestamp)) as cohort_week
  FROM "AnalyticsEvent"
  WHERE "eventType" = 'auth_event' AND "eventAction" = 'login_success'
  GROUP BY "userEmail"
),
user_activity AS (
  SELECT DISTINCT
    "userEmail",
    DATE_TRUNC('week', timestamp) as activity_week
  FROM "AnalyticsEvent"
  WHERE "eventType" = 'we_page_load'
)
SELECT
  ufl.cohort_week,
  COUNT(DISTINCT ufl."userEmail") as cohort_size,
  COUNT(DISTINCT CASE WHEN ua.activity_week = ufl.cohort_week THEN ufl."userEmail" END) as week_0,
  COUNT(DISTINCT CASE WHEN ua.activity_week = ufl.cohort_week + INTERVAL '1 week' THEN ufl."userEmail" END) as week_1,
  COUNT(DISTINCT CASE WHEN ua.activity_week = ufl.cohort_week + INTERVAL '2 weeks' THEN ufl."userEmail" END) as week_2
FROM user_first_login ufl
LEFT JOIN user_activity ua ON ufl."userEmail" = ua."userEmail"
GROUP BY ufl.cohort_week
ORDER BY ufl.cohort_week DESC;
```

---

## Alerts & Thresholds

### Critical Alerts (Immediate Action)

| Metric | Threshold | Action |
|--------|-----------|--------|
| Login Success Rate | <80% | Check OTP delivery, verify-otp API |
| Login Failures (hourly) | >10 | Check for brute force, API issues |
| Zero Progress Users (daily) | >70% of logins | Check video player, progress API |

### Warning Alerts (Monitor)

| Metric | Threshold | Action |
|--------|-----------|--------|
| Avg Rating | <3.5 | Review recent feedback, content quality |
| Activation Rate | <30% | Review onboarding, course discovery |
| D7 Retention | <10% | Review engagement features, notifications |

### Weekly Review Metrics

| Metric | Benchmark |
|--------|-----------|
| New Users | Track trend |
| WAU | Track trend |
| Avg Completion % | >25% |
| Total Watch Hours | Track trend |
| NPS (if collected) | >50 |

---

## Dashboard Recommendations

### Executive Dashboard

1. **North Star Metrics Card**
   - Total Users
   - Active Users (WAU)
   - Activation Rate
   - Avg Completion %

2. **Funnel Visualization**
   - Login → Dashboard → Start → Complete

3. **Trend Charts**
   - DAU over time
   - Completions over time
   - Watch hours over time

### Operational Dashboard

1. **Real-time Metrics**
   - Users online now
   - Classes being watched
   - Recent completions

2. **Error Monitoring**
   - Login failures
   - API errors
   - Page load times

3. **Content Performance**
   - Module completion rates
   - Class-level drop-offs
   - Rating by module

---

## Implementation Checklist

- [ ] Set up Metabase connection to PostgreSQL
- [ ] Create saved questions for each SQL query
- [ ] Build Executive Dashboard
- [ ] Build Operational Dashboard
- [ ] Configure email alerts for critical metrics
- [ ] Set up weekly report automation
- [ ] Document any custom event tracking needed

---

*Last Updated: December 26, 2025*

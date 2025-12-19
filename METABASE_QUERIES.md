# Metabase Queries for Login Funnel & Analytics

## Setup Instructions

1. **Connect Metabase to PostgreSQL**:
   - Go to Metabase → Settings → Admin → Databases → Add Database
   - Type: PostgreSQL
   - Host: `gondola.proxy.rlwy.net`
   - Port: `21027`
   - Database name: `railway`
   - Username: `postgres`
   - Password: (from your .env)

2. **Before Running Queries**: You need to store GTM events in PostgreSQL.
   - Currently, GTM events only go to `window.dataLayer` (browser only)
   - Create an API endpoint to save events to the `analytics_events` table
   - See "Event Tracking Implementation" section below

---

## 1. Complete Login Funnel Query

This query tracks users through the entire login flow from landing to dashboard:

```sql
-- Login Funnel Analysis
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
FROM funnel_events
WHERE visited_login_page IS NOT NULL

UNION ALL

SELECT
  'Step 2: Clicked Login Button' as funnel_step,
  COUNT(DISTINCT session_id) as users,
  ROUND(100.0 * COUNT(DISTINCT session_id) /
        NULLIF((SELECT COUNT(DISTINCT session_id) FROM funnel_events WHERE visited_login_page IS NOT NULL), 0), 2) as conversion_rate
FROM funnel_events
WHERE clicked_login IS NOT NULL

UNION ALL

SELECT
  'Step 3: Entered Email' as funnel_step,
  COUNT(DISTINCT session_id) as users,
  ROUND(100.0 * COUNT(DISTINCT session_id) /
        NULLIF((SELECT COUNT(DISTINCT session_id) FROM funnel_events WHERE visited_login_page IS NOT NULL), 0), 2) as conversion_rate
FROM funnel_events
WHERE entered_email IS NOT NULL

UNION ALL

SELECT
  'Step 4: Requested OTP' as funnel_step,
  COUNT(DISTINCT session_id) as users,
  ROUND(100.0 * COUNT(DISTINCT session_id) /
        NULLIF((SELECT COUNT(DISTINCT session_id) FROM funnel_events WHERE visited_login_page IS NOT NULL), 0), 2) as conversion_rate
FROM funnel_events
WHERE requested_otp IS NOT NULL

UNION ALL

SELECT
  'Step 5: Entered OTP' as funnel_step,
  COUNT(DISTINCT session_id) as users,
  ROUND(100.0 * COUNT(DISTINCT session_id) /
        NULLIF((SELECT COUNT(DISTINCT session_id) FROM funnel_events WHERE visited_login_page IS NOT NULL), 0), 2) as conversion_rate
FROM funnel_events
WHERE entered_otp IS NOT NULL

UNION ALL

SELECT
  'Step 6: Login Success' as funnel_step,
  COUNT(DISTINCT session_id) as users,
  ROUND(100.0 * COUNT(DISTINCT session_id) /
        NULLIF((SELECT COUNT(DISTINCT session_id) FROM funnel_events WHERE visited_login_page IS NOT NULL), 0), 2) as conversion_rate
FROM funnel_events
WHERE login_successful IS NOT NULL

UNION ALL

SELECT
  'Step 7: Reached Dashboard' as funnel_step,
  COUNT(DISTINCT session_id) as users,
  ROUND(100.0 * COUNT(DISTINCT session_id) /
        NULLIF((SELECT COUNT(DISTINCT session_id) FROM funnel_events WHERE visited_login_page IS NOT NULL), 0), 2) as conversion_rate
FROM funnel_events
WHERE reached_dashboard IS NOT NULL

ORDER BY funnel_step;
```

**Visualization in Metabase**: Use "Funnel" chart type

---

## 2. Login Funnel Drop-off Analysis

Find where users are dropping off in the login process:

```sql
-- Login Drop-off Analysis
WITH funnel_events AS (
  SELECT
    session_id,
    MAX(CASE WHEN event_type = 'we_page_load' AND page LIKE '%/login%' THEN 1 ELSE 0 END) as visited_login,
    MAX(CASE WHEN event_action = 'email_entered' THEN 1 ELSE 0 END) as entered_email,
    MAX(CASE WHEN event_action = 'otp_requested' THEN 1 ELSE 0 END) as requested_otp,
    MAX(CASE WHEN event_action = 'otp_entered' THEN 1 ELSE 0 END) as entered_otp,
    MAX(CASE WHEN event_action = 'login_success' THEN 1 ELSE 0 END) as login_successful,
    MAX(CASE WHEN event_type = 'we_page_load' AND page LIKE '%/dashboard%' THEN 1 ELSE 0 END) as reached_dashboard
  FROM analytics_events
  WHERE timestamp >= NOW() - INTERVAL '30 days'
  GROUP BY session_id
)

SELECT
  'Visited Login but never entered email' as drop_off_point,
  COUNT(*) as dropped_users
FROM funnel_events
WHERE visited_login = 1 AND entered_email = 0

UNION ALL

SELECT
  'Entered Email but never requested OTP' as drop_off_point,
  COUNT(*) as dropped_users
FROM funnel_events
WHERE entered_email = 1 AND requested_otp = 0

UNION ALL

SELECT
  'Requested OTP but never entered it' as drop_off_point,
  COUNT(*) as dropped_users
FROM funnel_events
WHERE requested_otp = 1 AND entered_otp = 0

UNION ALL

SELECT
  'Entered OTP but login failed' as drop_off_point,
  COUNT(*) as dropped_users
FROM funnel_events
WHERE entered_otp = 1 AND login_successful = 0

UNION ALL

SELECT
  'Login Successful but never reached dashboard' as drop_off_point,
  COUNT(*) as dropped_users
FROM funnel_events
WHERE login_successful = 1 AND reached_dashboard = 0;
```

---

## 3. Login Funnel by UTM Campaign

Track which campaigns drive the most successful logins:

```sql
-- Login Funnel by UTM Campaign
SELECT
  COALESCE(utm_source, 'Direct') as source,
  COALESCE(utm_medium, 'None') as medium,
  COALESCE(utm_campaign, 'None') as campaign,
  COUNT(DISTINCT CASE WHEN event_type = 'we_page_load' AND page LIKE '%/login%' THEN session_id END) as visited_login,
  COUNT(DISTINCT CASE WHEN event_action = 'login_success' THEN session_id END) as successful_logins,
  ROUND(100.0 * COUNT(DISTINCT CASE WHEN event_action = 'login_success' THEN session_id END) /
        NULLIF(COUNT(DISTINCT CASE WHEN event_type = 'we_page_load' AND page LIKE '%/login%' THEN session_id END), 0), 2) as conversion_rate
FROM analytics_events
WHERE timestamp >= NOW() - INTERVAL '30 days'
GROUP BY utm_source, utm_medium, utm_campaign
HAVING COUNT(DISTINCT CASE WHEN event_type = 'we_page_load' AND page LIKE '%/login%' THEN session_id END) > 0
ORDER BY successful_logins DESC;
```

---

## 4. Average Time to Login

Calculate how long it takes users to complete the login process:

```sql
-- Average Time from Login Page to Dashboard
WITH user_journey AS (
  SELECT
    session_id,
    MIN(CASE WHEN event_type = 'we_page_load' AND page LIKE '%/login%' THEN timestamp END) as started_login,
    MIN(CASE WHEN event_action = 'login_success' THEN timestamp END) as completed_login
  FROM analytics_events
  WHERE timestamp >= NOW() - INTERVAL '30 days'
  GROUP BY session_id
  HAVING MIN(CASE WHEN event_type = 'we_page_load' AND page LIKE '%/login%' THEN timestamp END) IS NOT NULL
     AND MIN(CASE WHEN event_action = 'login_success' THEN timestamp END) IS NOT NULL
)

SELECT
  COUNT(*) as successful_logins,
  ROUND(AVG(EXTRACT(EPOCH FROM (completed_login - started_login))), 2) as avg_seconds_to_login,
  ROUND(MIN(EXTRACT(EPOCH FROM (completed_login - started_login))), 2) as min_seconds,
  ROUND(MAX(EXTRACT(EPOCH FROM (completed_login - started_login))), 2) as max_seconds,
  ROUND(PERCENTILE_CONT(0.5) WITHIN GROUP (ORDER BY EXTRACT(EPOCH FROM (completed_login - started_login))), 2) as median_seconds
FROM user_journey;
```

---

## 5. Login Success Rate Over Time

Track login success rate daily:

```sql
-- Daily Login Success Rate
SELECT
  DATE(timestamp) as date,
  COUNT(DISTINCT CASE WHEN event_action = 'otp_requested' THEN session_id END) as otp_requests,
  COUNT(DISTINCT CASE WHEN event_action = 'login_success' THEN session_id END) as successful_logins,
  ROUND(100.0 * COUNT(DISTINCT CASE WHEN event_action = 'login_success' THEN session_id END) /
        NULLIF(COUNT(DISTINCT CASE WHEN event_action = 'otp_requested' THEN session_id END), 0), 2) as success_rate
FROM analytics_events
WHERE timestamp >= NOW() - INTERVAL '30 days'
GROUP BY DATE(timestamp)
ORDER BY date DESC;
```

**Visualization**: Use "Line" chart with date on X-axis and success_rate on Y-axis

---

## 6. Failed Login Attempts

Track failed OTP entries and login failures:

```sql
-- Failed Login Analysis
SELECT
  DATE(timestamp) as date,
  user_email,
  COUNT(*) as failed_attempts,
  MAX(timestamp) as last_failure
FROM analytics_events
WHERE event_action = 'login_failed'
  AND timestamp >= NOW() - INTERVAL '7 days'
GROUP BY DATE(timestamp), user_email
HAVING COUNT(*) >= 3  -- Show users with 3+ failures
ORDER BY failed_attempts DESC, date DESC;
```

---

## 7. Complete User Journey Analysis

See the entire user journey from first visit to course completion:

```sql
-- End-to-End User Journey
WITH user_events AS (
  SELECT
    user_id,
    user_email,
    MIN(timestamp) as first_visit,
    MIN(CASE WHEN event_action = 'login_success' THEN timestamp END) as first_login,
    MIN(CASE WHEN event_action = 'course_viewed' THEN timestamp END) as first_course_view,
    MIN(CASE WHEN event_action = 'class_started' THEN timestamp END) as first_class_started,
    MIN(CASE WHEN event_action = 'class_completed' THEN timestamp END) as first_completion
  FROM analytics_events
  WHERE user_id IS NOT NULL
  GROUP BY user_id, user_email
)

SELECT
  'Total Registered Users' as metric,
  COUNT(*) as count
FROM user_events
WHERE first_login IS NOT NULL

UNION ALL

SELECT
  'Users Who Viewed a Course' as metric,
  COUNT(*) as count
FROM user_events
WHERE first_course_view IS NOT NULL

UNION ALL

SELECT
  'Users Who Started a Class' as metric,
  COUNT(*) as count
FROM user_events
WHERE first_class_started IS NOT NULL

UNION ALL

SELECT
  'Users Who Completed a Class' as metric,
  COUNT(*) as count
FROM user_events
WHERE first_completion IS NOT NULL;
```

---

## Event Tracking Implementation

### Step 1: Create API Endpoint to Store Events

Create file: `app/api/analytics/track/route.ts`

```typescript
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(req: NextRequest) {
  try {
    const eventData = await req.json();

    // Extract data from GTM event payload
    const {
      event,
      attributes = {},
      custom_attributes = {},
    } = eventData;

    // Create analytics event in database
    await prisma.analyticsEvent.create({
      data: {
        eventType: event,
        eventAction: attributes.action || custom_attributes.action || null,
        userId: attributes.user_id || null,
        sessionId: attributes.session_id || null,
        buttonName: attributes.button_name || null,
        page: attributes.page || attributes.page_path || null,
        destination: attributes.destination || null,
        courseId: attributes.course_id || null,
        classId: attributes.class_id || null,
        utmSource: attributes.utm_source || null,
        utmMedium: attributes.utm_medium || null,
        utmCampaign: attributes.utm_campaign || null,
        utmTerm: attributes.utm_term || null,
        utmContent: attributes.utm_content || null,
        platform: attributes.platform || 'web',
        isLoggedIn: attributes.is_logged_in || false,
        userEmail: custom_attributes.email || attributes.user_email || null,
        customData: custom_attributes,
        timestamp: attributes.timestamp ? new Date(attributes.timestamp) : new Date(),
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Analytics tracking error:', error);
    return NextResponse.json({ success: false, error: 'Failed to track event' }, { status: 500 });
  }
}
```

### Step 2: Update GTM Tracker to Send Events to API

Update `lib/gtm.ts` - add this method to the Tracker class:

```typescript
private async _saveToDatabase(eventPayload: any): Promise<void> {
  try {
    await fetch('/api/analytics/track', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(eventPayload),
    });
  } catch (error) {
    console.error('Failed to save analytics to database:', error);
  }
}
```

Then update `_trackEvent` method:

```typescript
private _trackEvent(event: string, _attributes: any = {}): void {
  if (!this.isEnabled) return;

  if (this._pushToPendingList) {
    this._pendingList.push({ event: String(event), attributes: _attributes });
    return;
  }

  const attributes = removeEmptyKeys(_attributes);
  const eventPayload = this._createEventPayload(String(event), attributes);

  if (this.shouldTrack) {
    this._pushToDataLayer(eventPayload);
    this._saveToDatabase(eventPayload);  // ADD THIS LINE
  } else {
    this._logEvent(eventPayload);
  }
}
```

---

## How to Use These Queries in Metabase

1. **Create a New Question**:
   - Go to Metabase → New → SQL Query
   - Paste any query above
   - Click "Visualize"

2. **Create a Dashboard**:
   - Create multiple questions using different queries
   - Add them all to a dashboard called "Login Funnel Analytics"

3. **Set Up Alerts**:
   - Create alerts for low conversion rates
   - Get notified when success rate drops below 80%

4. **Schedule Reports**:
   - Email daily/weekly reports to your team
   - Track performance over time

---

## Next Steps

1. ✅ Analytics events table created in PostgreSQL
2. ⏳ Create API endpoint (`app/api/analytics/track/route.ts`)
3. ⏳ Update GTM tracker to save events to database
4. ⏳ Connect Metabase to PostgreSQL
5. ⏳ Create queries and dashboards in Metabase
6. ⏳ Set up automated reports and alerts

Your login funnel tracking is almost ready! Let me know when you want to implement the API endpoint and update the GTM tracker.

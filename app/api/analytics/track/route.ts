import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getISTDate } from '@/lib/dateUtils';

export async function POST(req: NextRequest) {
  try {
    const eventData = await req.json();

    // Extract data from GTM event payload
    const {
      event,
      attributes = {},
      custom_attributes = {},
    } = eventData;

    const istNow = getISTDate();

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
        timestamp: attributes.timestamp ? new Date(attributes.timestamp) : istNow,
        createdAt: istNow,
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Analytics tracking error:', error);
    return NextResponse.json({ success: false, error: 'Failed to track event' }, { status: 500 });
  }
}

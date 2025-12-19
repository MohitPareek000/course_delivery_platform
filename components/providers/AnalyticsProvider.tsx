'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { initAnalytics, analytics } from '@/lib/analytics';
import { AnalyticsDebugPanel } from '@/components/debug/AnalyticsDebugPanel';

export function AnalyticsProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  useEffect(() => {
    // Initialize analytics on mount
    initAnalytics();
  }, []);

  useEffect(() => {
    // Track page views on route change
    if (pathname) {
      analytics.page.view(pathname);
    }
  }, [pathname]);

  return (
    <>
      {children}
      <AnalyticsDebugPanel />
    </>
  );
}

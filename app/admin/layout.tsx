"use client";

import * as React from "react";
import { AdminSidebar } from "@/components/admin/AdminSidebar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isCollapsed, setIsCollapsed] = React.useState(false);
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    // Load saved state
    const savedState = localStorage.getItem("admin-sidebar-collapsed");
    if (savedState === "true") {
      setIsCollapsed(true);
    }
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      <AdminSidebar
        isCollapsed={isCollapsed}
        onCollapse={setIsCollapsed}
      />
      {/* Main content - flex-1 takes remaining space after sticky sidebar */}
      <main className="flex-1 p-4 lg:p-8 pt-16 lg:pt-8 min-w-0">
        <div className="max-w-7xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}

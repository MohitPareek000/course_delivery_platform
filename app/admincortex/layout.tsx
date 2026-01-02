"use client";

import * as React from "react";
import { usePathname, useRouter } from "next/navigation";
import { AdminSidebar } from "@/components/admin/AdminSidebar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isCollapsed, setIsCollapsed] = React.useState(false);
  const [mounted, setMounted] = React.useState(false);
  const [isAuthenticated, setIsAuthenticated] = React.useState<boolean | null>(null);
  const pathname = usePathname();
  const router = useRouter();

  // Check authentication
  React.useEffect(() => {
    // Skip auth check for login page
    if (pathname === "/admincortex/login") {
      setIsAuthenticated(true);
      setMounted(true);
      return;
    }

    async function checkAuth() {
      try {
        const response = await fetch("/api/admin/auth");
        if (response.ok) {
          setIsAuthenticated(true);
        } else {
          setIsAuthenticated(false);
          router.push("/admincortex/login");
        }
      } catch {
        setIsAuthenticated(false);
        router.push("/admin/login");
      }
    }

    checkAuth();
  }, [pathname, router]);

  React.useEffect(() => {
    // Load saved state
    const savedState = localStorage.getItem("admin-sidebar-collapsed");
    if (savedState === "true") {
      setIsCollapsed(true);
    }
    setMounted(true);
  }, []);

  // Show loading state while checking auth
  if (isAuthenticated === null && pathname !== "/admin/login") {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-500">Checking authentication...</p>
        </div>
      </div>
    );
  }

  // Don't show layout for login page
  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  if (!mounted || !isAuthenticated) {
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

"use client";

import * as React from "react";
import {
  LayoutDashboard,
  BookOpen,
  PlusCircle,
  Users,
  ChevronLeft,
  ChevronRight,
  Menu,
  X,
  Settings,
  LogOut,
  Home,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useRouter, usePathname } from "next/navigation";

interface AdminSidebarProps {
  isCollapsed?: boolean;
  onCollapse?: (collapsed: boolean) => void;
}

export function AdminSidebar({ isCollapsed: externalCollapsed, onCollapse }: AdminSidebarProps) {
  const [isMobileOpen, setIsMobileOpen] = React.useState(false);
  const [isCollapsed, setIsCollapsed] = React.useState(false);
  const [mounted, setMounted] = React.useState(false);
  const router = useRouter();
  const pathname = usePathname();

  React.useEffect(() => {
    const savedState = localStorage.getItem("admin-sidebar-collapsed");
    if (savedState === "true") {
      setIsCollapsed(true);
    }
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        setMounted(true);
      });
    });
  }, []);

  const collapsed = externalCollapsed !== undefined ? externalCollapsed : isCollapsed;

  const handleNavigation = (href: string) => {
    router.push(href);
    setIsMobileOpen(false);
  };

  const toggleCollapse = () => {
    const newCollapsed = !collapsed;
    setIsCollapsed(newCollapsed);
    localStorage.setItem("admin-sidebar-collapsed", String(newCollapsed));
    onCollapse?.(newCollapsed);
  };

  const menuItems = [
    {
      icon: LayoutDashboard,
      label: "Dashboard",
      href: "/admincortex",
    },
    {
      icon: BookOpen,
      label: "Edit Courses",
      href: "/admincortex/courses",
    },
    {
      icon: PlusCircle,
      label: "Create Course",
      href: "/admincortex/courses/create",
    },
    {
      icon: Users,
      label: "Course Access",
      href: "/admincortex/access",
    },
  ];

  return (
    <>
      {/* Mobile Menu Toggle */}
      <button
        onClick={() => setIsMobileOpen(!isMobileOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2.5 rounded-lg bg-white border shadow-md hover:shadow-lg transition-all"
      >
        {isMobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
      </button>

      {/* Mobile Overlay */}
      {isMobileOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        suppressHydrationWarning
        style={{
          width: collapsed ? (typeof window !== 'undefined' && window.innerWidth >= 1024 ? '5rem' : '16rem') : '16rem'
        }}
        className={cn(
          "fixed lg:sticky top-0 left-0 h-screen bg-white border-r border-gray-200 flex flex-col z-40",
          "lg:translate-x-0",
          isMobileOpen ? "translate-x-0" : "-translate-x-full",
          mounted && "transition-[width] duration-300"
        )}
      >
        {/* Logo Section */}
        <div
          suppressHydrationWarning
          className={cn(
            "p-5 pt-16 lg:pt-5 border-b border-gray-100",
            mounted && "lg:transition-all lg:duration-300",
            collapsed && "lg:p-2 lg:pt-2"
          )}
        >
          <div
            suppressHydrationWarning
            className={cn(
              "flex items-center gap-2.5",
              mounted && "lg:transition-all lg:duration-300",
              collapsed && "lg:justify-center"
            )}
          >
            <div className={cn(
              "w-9 h-9 rounded-lg bg-primary flex items-center justify-center flex-shrink-0",
              collapsed && "lg:w-10 lg:h-10"
            )}>
              <Settings className="w-5 h-5 text-white" />
            </div>

            <div className={cn(
              "flex-1 flex flex-col",
              collapsed && "lg:hidden"
            )}>
              <span className="font-bold text-gray-900" style={{ fontSize: '20px' }}>
                Admin Panel
              </span>
              <span className="text-xs text-gray-500">
                Cortex Management
              </span>
            </div>

            <button
              onClick={toggleCollapse}
              className={cn(
                "hidden lg:flex items-center justify-center p-1.5 rounded-lg hover:bg-gray-100 transition-colors group relative",
                collapsed && "lg:w-10 lg:h-10 lg:p-0"
              )}
            >
              {collapsed ? (
                <ChevronRight className="w-4 h-4 text-gray-600" />
              ) : (
                <ChevronLeft className="w-4 h-4 text-gray-600" />
              )}
              <div className="hidden lg:block absolute left-full ml-2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-50">
                {collapsed ? "Expand sidebar" : "Collapse sidebar"}
              </div>
            </button>
          </div>
        </div>

        {/* Navigation */}
        <nav className={cn(
          "flex-1 p-4 space-y-1.5",
          mounted && "lg:transition-all lg:duration-300",
          collapsed && "lg:p-2"
        )}>
          {menuItems.map((item) => {
            // Check for exact match first
            let isActive = pathname === item.href;

            // For non-exact matches, check if pathname starts with href
            // but exclude cases where a more specific route exists
            if (!isActive && item.href !== "/admincortex") {
              // Special case: /admincortex/courses should NOT be active when on /admincortex/courses/create
              if (item.href === "/admincortex/courses") {
                isActive = pathname.startsWith(item.href) && !pathname.startsWith("/admincortex/courses/create");
              } else {
                isActive = pathname.startsWith(item.href);
              }
            }

            return (
              <button
                key={item.label}
                onClick={() => handleNavigation(item.href)}
                className={cn(
                  "group w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium relative",
                  mounted && "lg:transition-all lg:duration-200",
                  isActive
                    ? "bg-primary text-white shadow-sm"
                    : "text-gray-700 hover:bg-gray-50",
                  collapsed && "lg:w-10 lg:h-10 lg:mx-auto lg:justify-center lg:p-0 lg:px-0"
                )}
                title={collapsed ? item.label : undefined}
              >
                <item.icon className={cn(
                  "flex-shrink-0",
                  collapsed ? "lg:w-4 lg:h-4" : "w-5 h-5"
                )} />
                <span className={cn(collapsed && "lg:hidden")}>
                  {item.label}
                </span>

                {collapsed && (
                  <div className="hidden lg:block absolute left-full ml-2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                    {item.label}
                  </div>
                )}
              </button>
            );
          })}
        </nav>

        {/* Footer Actions */}
        <div className={cn(
          "p-4 border-t border-gray-100 space-y-2",
          mounted && "lg:transition-all lg:duration-300",
          collapsed && "lg:p-2 lg:space-y-2"
        )}>
          {/* Back to Dashboard */}
          <button
            onClick={() => router.push("/dashboard")}
            className={cn(
              "w-full flex items-center gap-2.5 p-2 rounded-lg hover:bg-gray-50 text-sm font-medium group relative",
              mounted && "lg:transition-all lg:duration-200",
              collapsed && "lg:justify-center lg:p-2"
            )}
            title={collapsed ? "Back to Dashboard" : undefined}
          >
            <div className="w-9 h-9 rounded-full bg-blue-50 flex items-center justify-center flex-shrink-0">
              <Home className="w-4 h-4 text-blue-600" />
            </div>
            <span className={cn(
              "text-gray-600",
              collapsed && "lg:hidden"
            )}>
              Back to Dashboard
            </span>

            {collapsed && (
              <div className="hidden lg:block absolute left-full ml-2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                Back to Dashboard
              </div>
            )}
          </button>

          {/* Logout */}
          <button
            onClick={async () => {
              try {
                await fetch("/api/admin/auth", { method: "DELETE" });
                router.push("/admincortex/login");
                router.refresh();
              } catch (err) {
                console.error("Logout failed:", err);
              }
            }}
            className={cn(
              "w-full flex items-center gap-2.5 p-2 rounded-lg hover:bg-red-50 text-sm font-medium group relative",
              mounted && "lg:transition-all lg:duration-200",
              collapsed && "lg:justify-center lg:p-2"
            )}
            title={collapsed ? "Logout" : undefined}
          >
            <div className="w-9 h-9 rounded-full bg-red-50 flex items-center justify-center flex-shrink-0">
              <LogOut className="w-4 h-4 text-red-600" />
            </div>
            <span className={cn(
              "text-red-600",
              collapsed && "lg:hidden"
            )}>
              Logout
            </span>

            {collapsed && (
              <div className="hidden lg:block absolute left-full ml-2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                Logout
              </div>
            )}
          </button>
        </div>
      </aside>
    </>
  );
}

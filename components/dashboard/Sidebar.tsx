"use client";

import * as React from "react";
import { Home, BookOpen, LogOut, Menu, X, User, ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { useRouter, usePathname } from "next/navigation";
import { ProfileModal } from "./ProfileModal";

interface SidebarProps {
  userName?: string;
  userEmail?: string;
  isCollapsed?: boolean;
  onCollapse?: (collapsed: boolean) => void;
}

export function Sidebar({ userName = "Mohit", userEmail, isCollapsed: externalCollapsed, onCollapse }: SidebarProps) {
  const [isMobileOpen, setIsMobileOpen] = React.useState(false);
  const [isCollapsed, setIsCollapsed] = React.useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = React.useState(false);
  const [mounted, setMounted] = React.useState(false);
  const router = useRouter();
  const pathname = usePathname();

  // Load from localStorage and enable transitions after mount
  React.useEffect(() => {
    // Load saved state synchronously before first paint
    const savedState = localStorage.getItem("sidebar-collapsed");
    if (savedState === "true") {
      setIsCollapsed(true);
    }

    // Mark as mounted immediately to prevent flicker
    setMounted(true);
  }, []);

  // Use external collapse state if provided
  const collapsed = externalCollapsed !== undefined ? externalCollapsed : isCollapsed;

  const handleLogout = () => {
    sessionStorage.removeItem("user-session");
    router.push("/login");
  };

  const handleNavigation = (href: string) => {
    router.push(href);
    setIsMobileOpen(false);
  };

  const toggleCollapse = () => {
    const newCollapsed = !collapsed;
    setIsCollapsed(newCollapsed);
    // Persist collapsed state to localStorage
    localStorage.setItem("sidebar-collapsed", String(newCollapsed));
    onCollapse?.(newCollapsed);
  };

  const menuItems = [
    {
      icon: Home,
      label: "Home",
      href: "/dashboard",
      active: true,
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
        className={cn(
          "fixed lg:sticky top-0 left-0 h-screen bg-white border-r border-gray-200 flex flex-col z-40",
          // Mobile behavior - always full width, slide in/out
          "w-64",
          "lg:translate-x-0",
          isMobileOpen ? "translate-x-0" : "-translate-x-full",
          // Desktop collapse behavior only
          collapsed && "lg:w-20",
          // Only enable transitions after mount to prevent animation on load
          mounted && "transition-all duration-300",
          // Hide until mounted to prevent flicker
          !mounted && "lg:opacity-0"
        )}
      >
        {/* Logo Section */}
        <div
          suppressHydrationWarning
          className={cn(
            "p-5 pt-16 lg:pt-5 border-b border-gray-100",
            mounted && "lg:transition-all lg:duration-300",
            collapsed && "lg:p-2 lg:pt-2"
          )}>
          <div
            suppressHydrationWarning
            className={cn(
              "flex items-center gap-2.5",
              mounted && "lg:transition-all lg:duration-300",
              collapsed && "lg:justify-center"
            )}>
            {/* Logo icon - hidden when collapsed */}
            <div className={cn(
              "bg-primary rounded-lg shadow-sm flex-shrink-0 flex items-center justify-center p-2",
              collapsed && "lg:hidden"
            )}>
              <BookOpen className="w-5 h-5 text-white" />
            </div>

            {/* Platform name - hidden when collapsed */}
            <span className={cn(
              "text-lg font-bold text-gray-900 flex-1",
              collapsed && "lg:hidden"
            )}>
              InterviewPrep
            </span>

            {/* Collapse/Expand Toggle Button */}
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

              {/* Tooltip */}
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
          {menuItems.map((item) => (
            <button
              key={item.label}
              onClick={() => handleNavigation(item.href)}
              className={cn(
                "group w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium relative",
                mounted && "lg:transition-all lg:duration-200",
                item.active
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
              <span className={cn(
                collapsed && "lg:hidden"
              )}>
                {item.label}
              </span>

              {/* Tooltip for collapsed state - desktop only */}
              {collapsed && (
                <div className="hidden lg:block absolute left-full ml-2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                  {item.label}
                </div>
              )}
            </button>
          ))}
        </nav>

        {/* User Section */}
        <div className={cn(
          "p-4 border-t border-gray-100",
          mounted && "lg:transition-all lg:duration-300",
          collapsed && "lg:p-2"
        )}>
          <div
            onClick={() => setIsProfileModalOpen(true)}
            className={cn(
              "flex items-center gap-2.5 mb-3 p-2 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer group relative",
              collapsed && "lg:justify-center lg:p-2"
            )}
            title={collapsed ? userName : undefined}
          >
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center ring-2 ring-primary/20 flex-shrink-0">
              <User className="w-5 h-5 text-primary" />
            </div>
            <div className={cn(
              "flex-1 min-w-0",
              collapsed && "lg:hidden"
            )}>
              <p className="font-semibold text-sm text-gray-900 truncate">
                {userName}
              </p>
              {userEmail && (
                <p className="text-xs text-gray-500 truncate">{userEmail}</p>
              )}
            </div>

            {/* Tooltip for collapsed state - desktop only */}
            {collapsed && (
              <div className="hidden lg:block absolute left-full ml-2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                {userName}
              </div>
            )}
          </div>

          <button
            onClick={handleLogout}
            className={cn(
              "w-full flex items-center gap-2.5 px-4 py-2.5 rounded-lg text-red-600 hover:bg-red-50 text-sm font-medium group relative",
              mounted && "lg:transition-all lg:duration-200",
              collapsed && "lg:justify-center lg:px-0"
            )}
            title={collapsed ? "Logout" : undefined}
          >
            <LogOut className="w-4 h-4 flex-shrink-0" />
            <span className={cn(
              collapsed && "lg:hidden"
            )}>
              Logout
            </span>

            {/* Tooltip for collapsed state - desktop only */}
            {collapsed && (
              <div className="hidden lg:block absolute left-full ml-2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                Logout
              </div>
            )}
          </button>
        </div>
      </aside>

      {/* Profile Modal */}
      <ProfileModal
        isOpen={isProfileModalOpen}
        onClose={() => setIsProfileModalOpen(false)}
        userName={userName}
        userEmail={userEmail}
      />
    </>
  );
}

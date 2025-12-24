"use client";

import * as React from "react";
import { Home, BookOpen, LogOut, Menu, X, User, ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { useRouter, usePathname } from "next/navigation";
import { ProfileModal } from "./ProfileModal";
import { analytics } from "@/lib/analytics";

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

    // Small delay to prevent animation on initial load
    // This ensures the width change happens before transitions are enabled
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        setMounted(true);
      });
    });
  }, []);

  // Use external collapse state if provided
  const collapsed = externalCollapsed !== undefined ? externalCollapsed : isCollapsed;

  const handleLogout = () => {
    localStorage.removeItem("user-session");
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
        onClick={() => {
          const newState = !isMobileOpen;
          setIsMobileOpen(newState);
          analytics.button.clicked(
            newState ? 'Close Mobile Menu' : 'Open Mobile Menu',
            pathname,
            { action: newState ? 'close' : 'open' }
          );
        }}
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
          // Mobile behavior - slide in/out
          "lg:translate-x-0",
          isMobileOpen ? "translate-x-0" : "-translate-x-full",
          // Only enable width transition after mount (for user interactions)
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
              "rounded-lg shadow-sm flex-shrink-0 flex items-center justify-center overflow-hidden",
              collapsed && "lg:hidden"
            )}>
              <img
                src="https://lh3.googleusercontent.com/d/1NFXV17i1OF2BsdGjyaTc2Dh13H-GdXjl"
                alt="Cortex Logo"
                className="w-9 h-9 object-cover rounded-lg"
              />
            </div>

            {/* Platform name - hidden when collapsed */}
            <div className={cn(
              "flex-1 flex flex-col",
              collapsed && "lg:hidden"
            )}>
              <span className="font-bold text-gray-900" style={{ fontSize: '22px' }}>
                Cortex
              </span>
              <span className="text-xs text-gray-500">
                By Scaler
              </span>
            </div>

            {/* Collapse/Expand Toggle Button */}
            <button
              onClick={() => {
                const newCollapsed = !collapsed;
                toggleCollapse();
                analytics.button.clicked(
                  newCollapsed ? 'Collapse Sidebar' : 'Expand Sidebar',
                  pathname,
                  { action: newCollapsed ? 'collapse' : 'expand' }
                );
              }}
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
              onClick={() => {
                analytics.navigation.clicked(item.href, pathname);
                handleNavigation(item.href);
              }}
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
            onClick={() => {
              analytics.user.profileViewed();
              setIsProfileModalOpen(true);
            }}
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
            onClick={() => {
              analytics.auth.logoutClicked();
              handleLogout();
            }}
            className={cn(
              "w-full flex items-center gap-2.5 p-2 rounded-lg hover:bg-red-50 text-sm font-medium group relative",
              mounted && "lg:transition-all lg:duration-200",
              collapsed && "lg:justify-center lg:p-2"
            )}
            title={collapsed ? "Logout" : undefined}
          >
            <div className="w-10 h-10 rounded-full bg-red-50 flex items-center justify-center ring-2 ring-red-100 flex-shrink-0">
              <LogOut className="w-5 h-5 text-red-600" />
            </div>
            <span className={cn(
              "text-red-600",
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

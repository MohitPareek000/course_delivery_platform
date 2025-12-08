"use client";

import * as React from "react";
import { Home, BookOpen, User, LogOut, Menu, X, Briefcase } from "lucide-react";
import { cn } from "@/lib/utils";
import { useRouter, usePathname } from "next/navigation";

interface SidebarProps {
  userName?: string;
  userEmail?: string;
}

export function Sidebar({ userName = "Mohit", userEmail }: SidebarProps) {
  const [isOpen, setIsOpen] = React.useState(false);
  const router = useRouter();
  const pathname = usePathname();

  const handleLogout = () => {
    sessionStorage.removeItem("user-session");
    router.push("/login");
  };

  const handleNavigation = (href: string) => {
    router.push(href);
    setIsOpen(false);
  };

  // Determine which menu item is active based on pathname
  const isCoursePage = pathname?.startsWith("/course");
  const isDashboard = pathname === "/dashboard";

  const menuItems = [
    { icon: Home, label: "Home", href: "/dashboard", active: isDashboard },
    { icon: BookOpen, label: "My Courses", href: "/dashboard", active: isCoursePage },
    { icon: User, label: "Profile", href: "/dashboard", active: false },
  ];

  return (
    <>
      {/* Mobile Menu Toggle */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 rounded-lg bg-white border shadow-sm"
      >
        {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {/* Overlay */}
      {isOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed lg:sticky top-0 left-0 h-screen w-64 bg-white border-r flex flex-col z-40 transition-transform duration-300",
          isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        )}
      >
        {/* Logo */}
        <div className="p-5 border-b border-gray-100">
          <div className="flex items-center gap-2.5">
            <div className="bg-primary rounded-lg p-2 shadow-sm">
              <Briefcase className="w-5 h-5 text-white" />
            </div>
            <span className="text-lg font-bold text-gray-900">InterviewPrep</span>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-1">
          {menuItems.map((item) => (
            <button
              key={item.label}
              onClick={() => handleNavigation(item.href)}
              className={cn(
                "w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 text-sm font-medium",
                item.active
                  ? "bg-primary text-white shadow-sm"
                  : "text-gray-700 hover:bg-gray-50"
              )}
            >
              <item.icon className="w-5 h-5" />
              <span>{item.label}</span>
            </button>
          ))}
        </nav>

        {/* User Section */}
        <div className="p-4 border-t border-gray-100">
          <div className="flex items-center gap-2.5 mb-3 p-2 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center ring-2 ring-primary/20">
              <User className="w-5 h-5 text-primary" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-sm text-gray-900 truncate">
                {userName}
              </p>
              {userEmail && (
                <p className="text-xs text-gray-500 truncate">{userEmail}</p>
              )}
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-2.5 px-4 py-2.5 rounded-lg text-red-600 hover:bg-red-50 transition-all duration-200 text-sm font-medium"
          >
            <LogOut className="w-4 h-4" />
            <span>Logout</span>
          </button>
        </div>
      </aside>
    </>
  );
}

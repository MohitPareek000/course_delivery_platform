"use client";

import * as React from "react";
import { BookOpen, Users, PlusCircle, TrendingUp } from "lucide-react";
import { useRouter } from "next/navigation";

interface StatCardProps {
  icon: React.ElementType;
  label: string;
  value: string | number;
  description?: string;
  color: "primary" | "secondary" | "green" | "purple";
}

function StatCard({ icon: Icon, label, value, description, color }: StatCardProps) {
  const colorClasses = {
    primary: "bg-primary/10 text-primary",
    secondary: "bg-secondary/10 text-secondary",
    green: "bg-green-100 text-green-600",
    purple: "bg-purple-100 text-purple-600",
  };

  return (
    <div className="bg-white rounded-lg p-6 border shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-center gap-4">
        <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${colorClasses[color]}`}>
          <Icon className="w-6 h-6" />
        </div>
        <div>
          <p className="text-sm text-gray-500 font-medium">{label}</p>
          <p className="text-2xl font-bold text-gray-900">{value}</p>
          {description && (
            <p className="text-xs text-gray-400 mt-0.5">{description}</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default function AdminDashboard() {
  const router = useRouter();
  const [stats, setStats] = React.useState({
    totalCourses: 0,
    totalUsers: 0,
    totalClasses: 0,
    totalAccess: 0,
  });
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    async function fetchStats() {
      try {
        const response = await fetch("/api/admin/stats");
        if (response.ok) {
          const data = await response.json();
          setStats(data);
        }
      } catch (error) {
        console.error("Failed to fetch stats:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchStats();
  }, []);

  const quickActions = [
    {
      icon: BookOpen,
      label: "Edit Courses",
      description: "Modify existing course content",
      href: "/admin/courses",
      color: "bg-primary",
    },
    {
      icon: PlusCircle,
      label: "Create Course",
      description: "Add a new course to the platform",
      href: "/admin/courses/create",
      color: "bg-secondary",
    },
    {
      icon: Users,
      label: "Manage Access",
      description: "Grant or revoke course access",
      href: "/admin/access",
      color: "bg-green-500",
    },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
        <p className="text-gray-500 mt-1">Manage courses, content, and user access</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          icon={BookOpen}
          label="Total Courses"
          value={loading ? "..." : stats.totalCourses}
          color="primary"
        />
        <StatCard
          icon={Users}
          label="Total Users"
          value={loading ? "..." : stats.totalUsers}
          color="secondary"
        />
        <StatCard
          icon={TrendingUp}
          label="Total Classes"
          value={loading ? "..." : stats.totalClasses}
          color="green"
        />
        <StatCard
          icon={Users}
          label="Course Assignments"
          value={loading ? "..." : stats.totalAccess}
          color="purple"
        />
      </div>

      {/* Quick Actions */}
      <div>
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {quickActions.map((action) => (
            <button
              key={action.label}
              onClick={() => router.push(action.href)}
              className="bg-white rounded-lg p-6 border shadow-sm hover:shadow-md transition-all hover:-translate-y-0.5 text-left group"
            >
              <div className={`w-12 h-12 rounded-lg ${action.color} flex items-center justify-center mb-4`}>
                <action.icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-semibold text-gray-900 group-hover:text-primary transition-colors">
                {action.label}
              </h3>
              <p className="text-sm text-gray-500 mt-1">{action.description}</p>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

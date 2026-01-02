"use client";

import * as React from "react";
import { BookOpen, Edit, Trash2, Eye, Search, Plus, AlertTriangle, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

interface CourseData {
  id: string;
  title: string;
  description: string;
  type: string;
  role?: string;
  skill?: string;
  companyName?: string;
  totalModules: number;
  totalTopics: number;
  totalClasses: number;
  createdAt: string;
}

export default function CoursesListPage() {
  const router = useRouter();
  const [courses, setCourses] = React.useState<CourseData[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [search, setSearch] = React.useState("");
  const [deleteModal, setDeleteModal] = React.useState<CourseData | null>(null);
  const [deleteConfirmText, setDeleteConfirmText] = React.useState("");
  const [deleting, setDeleting] = React.useState(false);

  React.useEffect(() => {
    fetchCourses();
  }, []);

  async function fetchCourses() {
    try {
      const response = await fetch("/api/admin/courses");
      if (response.ok) {
        const data = await response.json();
        setCourses(data);
      }
    } catch (error) {
      console.error("Failed to fetch courses:", error);
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete() {
    if (!deleteModal || deleteConfirmText !== "DELETE") return;

    setDeleting(true);
    try {
      const response = await fetch(`/api/admin/courses/${deleteModal.id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        setCourses(courses.filter((c) => c.id !== deleteModal.id));
        closeDeleteModal();
      }
    } catch (error) {
      console.error("Failed to delete course:", error);
    } finally {
      setDeleting(false);
    }
  }

  function openDeleteModal(course: CourseData) {
    setDeleteModal(course);
    setDeleteConfirmText("");
  }

  function closeDeleteModal() {
    setDeleteModal(null);
    setDeleteConfirmText("");
  }

  const filteredCourses = courses.filter(
    (course) =>
      course.title.toLowerCase().includes(search.toLowerCase()) ||
      course.id.toLowerCase().includes(search.toLowerCase())
  );

  const getTypeLabel = (course: CourseData) => {
    if (course.type === "role-specific" && course.role) return course.role;
    if (course.type === "skill-based" && course.skill) return course.skill;
    if (course.type === "company-specific" && course.companyName) return course.companyName;
    return course.type;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Courses</h1>
          <p className="text-gray-500 mt-1">Manage and edit your courses</p>
        </div>
        <Button onClick={() => router.push("/admin/courses/create")}>
          <Plus className="w-4 h-4 mr-2" />
          Create Course
        </Button>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        <Input
          placeholder="Search courses by title or ID..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Courses List */}
      {loading ? (
        <div className="text-center py-12 text-gray-500">Loading courses...</div>
      ) : filteredCourses.length === 0 ? (
        <div className="text-center py-12">
          <BookOpen className="w-12 h-12 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500">No courses found</p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredCourses.map((course) => (
            <div
              key={course.id}
              className="bg-white rounded-lg border shadow-sm p-6 hover:shadow-md transition-shadow"
            >
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="font-semibold text-gray-900 truncate">
                      {course.title}
                    </h3>
                    <Badge variant="secondary" className="flex-shrink-0">
                      {getTypeLabel(course)}
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-500 line-clamp-2 mb-3">
                    {course.description}
                  </p>
                  <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                    <span className="flex items-center gap-1">
                      <span className="font-medium">{course.totalModules}</span> Modules
                    </span>
                    <span className="flex items-center gap-1">
                      <span className="font-medium">{course.totalTopics}</span> Topics
                    </span>
                    <span className="flex items-center gap-1">
                      <span className="font-medium">{course.totalClasses}</span> Classes
                    </span>
                    <span className="text-gray-400">ID: {course.id}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => window.open(`/course/${course.id}`, "_blank")}
                  >
                    <Eye className="w-4 h-4 mr-1" />
                    Preview
                  </Button>
                  <Button
                    size="sm"
                    onClick={() => router.push(`/admin/courses/${course.id}`)}
                  >
                    <Edit className="w-4 h-4 mr-1" />
                    Edit
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => openDeleteModal(course)}
                    className="text-red-600 hover:text-red-700 hover:bg-red-50"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full overflow-hidden">
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b bg-red-50">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center">
                  <AlertTriangle className="w-5 h-5 text-red-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900">Delete Course</h3>
              </div>
              <button
                onClick={closeDeleteModal}
                className="p-2 hover:bg-red-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>

            {/* Content */}
            <div className="p-6">
              <p className="text-gray-600 mb-4">
                You are about to delete the course:
              </p>
              <div className="bg-gray-50 rounded-lg p-4 mb-4">
                <p className="font-semibold text-gray-900">{deleteModal.title}</p>
                <p className="text-sm text-gray-500 mt-1">ID: {deleteModal.id}</p>
                <div className="flex gap-3 mt-2 text-xs text-gray-500">
                  <span>{deleteModal.totalModules} modules</span>
                  <span>{deleteModal.totalTopics} topics</span>
                  <span>{deleteModal.totalClasses} classes</span>
                </div>
              </div>

              <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 mb-4">
                <p className="text-sm text-amber-800">
                  <strong>Warning:</strong> This action cannot be undone. All course data, modules, topics, and classes will be permanently deleted.
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Type <span className="font-mono bg-gray-100 px-1.5 py-0.5 rounded text-red-600">DELETE</span> to confirm
                </label>
                <Input
                  type="text"
                  value={deleteConfirmText}
                  onChange={(e) => setDeleteConfirmText(e.target.value)}
                  placeholder="Type DELETE here"
                  className="font-mono"
                  autoFocus
                />
              </div>
            </div>

            {/* Footer */}
            <div className="flex items-center justify-end gap-3 p-4 border-t bg-gray-50">
              <Button
                variant="outline"
                onClick={closeDeleteModal}
                disabled={deleting}
              >
                Cancel
              </Button>
              <Button
                variant="destructive"
                onClick={handleDelete}
                disabled={deleteConfirmText !== "DELETE" || deleting}
              >
                {deleting ? "Deleting..." : "Delete Course"}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

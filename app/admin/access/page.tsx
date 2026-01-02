"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import {
  Users,
  Upload,
  UserPlus,
  FileSpreadsheet,
  CheckCircle,
  XCircle,
  AlertCircle,
  Loader2,
  ChevronDown,
  ArrowLeft,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

interface Course {
  id: string;
  title: string;
  type: string;
}

interface ProcessResult {
  email: string;
  status: "created" | "skipped" | "error";
  message?: string;
}

type AccessMethod = "single" | "bulk" | null;

export default function CourseAccessPage() {
  const router = useRouter();
  const [courses, setCourses] = React.useState<Course[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [accessMethod, setAccessMethod] = React.useState<AccessMethod>(null);

  // Single access state
  const [selectedCourse, setSelectedCourse] = React.useState<string>("");
  const [userName, setUserName] = React.useState("");
  const [userEmail, setUserEmail] = React.useState("");
  const [singleSubmitting, setSingleSubmitting] = React.useState(false);
  const [singleResult, setSingleResult] = React.useState<{
    success: boolean;
    message: string;
  } | null>(null);

  // Bulk access state
  const [bulkCourse, setBulkCourse] = React.useState<string>("");
  const [csvFile, setCsvFile] = React.useState<File | null>(null);
  const [csvPreview, setCsvPreview] = React.useState<{ name: string; email: string }[]>([]);
  const [bulkSubmitting, setBulkSubmitting] = React.useState(false);
  const [bulkResults, setBulkResults] = React.useState<{
    success: boolean;
    created: number;
    skipped: number;
    total: number;
    results: ProcessResult[];
  } | null>(null);

  // Recent access records
  const [recentAccess, setRecentAccess] = React.useState<any[]>([]);
  const [loadingRecent, setLoadingRecent] = React.useState(false);

  React.useEffect(() => {
    fetchCourses();
    fetchRecentAccess();
  }, []);

  const fetchCourses = async () => {
    try {
      const response = await fetch("/api/admin/courses");
      const data = await response.json();
      // API returns array directly, not { courses: [...] }
      setCourses(Array.isArray(data) ? data : data.courses || []);
    } catch (error) {
      console.error("Failed to fetch courses:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchRecentAccess = async () => {
    setLoadingRecent(true);
    try {
      const response = await fetch("/api/admin/access?limit=10");
      const data = await response.json();
      setRecentAccess(data.accessRecords || []);
    } catch (error) {
      console.error("Failed to fetch recent access:", error);
    } finally {
      setLoadingRecent(false);
    }
  };

  const handleSingleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedCourse || !userEmail.trim()) return;

    setSingleSubmitting(true);
    setSingleResult(null);

    try {
      const response = await fetch("/api/admin/access", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "single",
          courseId: selectedCourse,
          name: userName.trim(),
          email: userEmail.trim(),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to grant access");
      }

      setSingleResult({ success: true, message: data.message });
      setUserName("");
      setUserEmail("");
      fetchRecentAccess();
    } catch (error: any) {
      setSingleResult({ success: false, message: error.message });
    } finally {
      setSingleSubmitting(false);
    }
  };

  const handleCsvUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setCsvFile(file);
    setBulkResults(null);

    const reader = new FileReader();
    reader.onload = (event) => {
      const text = event.target?.result as string;
      const lines = text.split("\n").filter((line) => line.trim());

      // Parse CSV (expect email,name or name,email format)
      const users: { name: string; email: string }[] = [];
      const headerLine = lines[0].toLowerCase();
      const hasHeader = headerLine.includes("email") || headerLine.includes("name");
      const startIndex = hasHeader ? 1 : 0;

      // Detect column order from header or first data row
      let emailFirst = true;
      if (hasHeader) {
        const headers = headerLine.split(",").map((h) => h.trim());
        emailFirst = headers[0].includes("email");
      }

      for (let i = startIndex; i < lines.length; i++) {
        const parts = lines[i].split(",").map((p) => p.trim().replace(/^["']|["']$/g, ""));
        if (parts.length >= 1) {
          const email = emailFirst ? parts[0] : parts[1] || "";
          const name = emailFirst ? parts[1] || "" : parts[0];

          if (email && email.includes("@")) {
            users.push({ email, name });
          }
        }
      }

      setCsvPreview(users.slice(0, 5));
      // Store all users in a data attribute
      (e.target as any).parsedUsers = users;
    };
    reader.readAsText(file);
  };

  const handleBulkSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!bulkCourse || !csvFile) return;

    setBulkSubmitting(true);
    setBulkResults(null);

    try {
      // Read the file again to get all users
      const text = await csvFile.text();
      const lines = text.split("\n").filter((line) => line.trim());

      const headerLine = lines[0].toLowerCase();
      const hasHeader = headerLine.includes("email") || headerLine.includes("name");
      const startIndex = hasHeader ? 1 : 0;

      let emailFirst = true;
      if (hasHeader) {
        const headers = headerLine.split(",").map((h) => h.trim());
        emailFirst = headers[0].includes("email");
      }

      const users: { name: string; email: string }[] = [];
      for (let i = startIndex; i < lines.length; i++) {
        const parts = lines[i].split(",").map((p) => p.trim().replace(/^["']|["']$/g, ""));
        if (parts.length >= 1) {
          const email = emailFirst ? parts[0] : parts[1] || "";
          const name = emailFirst ? parts[1] || "" : parts[0];

          if (email && email.includes("@")) {
            users.push({ email, name });
          }
        }
      }

      const response = await fetch("/api/admin/access", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "bulk",
          courseId: bulkCourse,
          users,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to process bulk access");
      }

      setBulkResults({
        success: true,
        created: data.created,
        skipped: data.skipped,
        total: data.total,
        results: data.results,
      });
      setCsvFile(null);
      setCsvPreview([]);
      fetchRecentAccess();
    } catch (error: any) {
      setBulkResults({
        success: false,
        created: 0,
        skipped: 0,
        total: 0,
        results: [{ email: "Error", status: "error", message: error.message }],
      });
    } finally {
      setBulkSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={() => router.push("/admin")}>
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Course Access Manager</h1>
          <p className="text-gray-600">Grant course access to users individually or in bulk</p>
        </div>
      </div>

      {/* Method Selection */}
      {!accessMethod && (
        <div className="grid md:grid-cols-2 gap-6">
          <button
            onClick={() => setAccessMethod("single")}
            className="bg-white rounded-xl shadow-sm border p-6 hover:border-primary hover:shadow-md transition-all text-left"
          >
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
              <UserPlus className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Single User Access</h3>
            <p className="text-gray-600 text-sm">
              Grant access to one user at a time. Enter their name and email, select a course,
              and they&apos;ll be added immediately.
            </p>
          </button>

          <button
            onClick={() => setAccessMethod("bulk")}
            className="bg-white rounded-xl shadow-sm border p-6 hover:border-primary hover:shadow-md transition-all text-left"
          >
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
              <FileSpreadsheet className="w-6 h-6 text-green-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Bulk CSV Upload</h3>
            <p className="text-gray-600 text-sm">
              Upload a CSV file with multiple users. The file should contain email and name
              columns. Grant access to many users at once.
            </p>
          </button>
        </div>
      )}

      {/* Single User Access Form */}
      {accessMethod === "single" && (
        <div className="bg-white rounded-xl shadow-sm border">
          <div className="p-4 border-b flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <UserPlus className="w-5 h-5 text-blue-600" />
              </div>
              <h2 className="text-lg font-semibold">Grant Single User Access</h2>
            </div>
            <Button variant="ghost" size="sm" onClick={() => setAccessMethod(null)}>
              Change Method
            </Button>
          </div>

          <form onSubmit={handleSingleSubmit} className="p-6 space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label htmlFor="course" className="text-sm font-medium text-gray-700">
                  Select Course *
                </label>
                <select
                  id="course"
                  value={selectedCourse}
                  onChange={(e) => setSelectedCourse(e.target.value)}
                  className="w-full h-10 px-3 rounded-md border border-gray-300 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  required
                >
                  <option value="">Choose a course</option>
                  {courses.map((course) => (
                    <option key={course.id} value={course.id}>
                      {course.title}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium text-gray-700">
                  Email Address *
                </label>
                <Input
                  id="email"
                  type="email"
                  placeholder="user@example.com"
                  value={userEmail}
                  onChange={(e) => setUserEmail(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2 md:col-span-2">
                <label htmlFor="name" className="text-sm font-medium text-gray-700">
                  User Name
                </label>
                <Input
                  id="name"
                  placeholder="John Doe"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                />
              </div>
            </div>

            {singleResult && (
              <div
                className={`p-4 rounded-lg flex items-center gap-3 ${
                  singleResult.success
                    ? "bg-green-50 text-green-800"
                    : "bg-red-50 text-red-800"
                }`}
              >
                {singleResult.success ? (
                  <CheckCircle className="w-5 h-5" />
                ) : (
                  <XCircle className="w-5 h-5" />
                )}
                <span>{singleResult.message}</span>
              </div>
            )}

            <div className="flex justify-end">
              <Button type="submit" disabled={singleSubmitting || !selectedCourse || !userEmail}>
                {singleSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Granting Access...
                  </>
                ) : (
                  <>
                    <UserPlus className="w-4 h-4 mr-2" />
                    Grant Access
                  </>
                )}
              </Button>
            </div>
          </form>
        </div>
      )}

      {/* Bulk CSV Upload Form */}
      {accessMethod === "bulk" && (
        <div className="bg-white rounded-xl shadow-sm border">
          <div className="p-4 border-b flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                <FileSpreadsheet className="w-5 h-5 text-green-600" />
              </div>
              <h2 className="text-lg font-semibold">Bulk CSV Upload</h2>
            </div>
            <Button variant="ghost" size="sm" onClick={() => setAccessMethod(null)}>
              Change Method
            </Button>
          </div>

          <form onSubmit={handleBulkSubmit} className="p-6 space-y-4">
            <div className="space-y-2">
              <label htmlFor="bulkCourse" className="text-sm font-medium text-gray-700">
                Select Course *
              </label>
              <select
                id="bulkCourse"
                value={bulkCourse}
                onChange={(e) => setBulkCourse(e.target.value)}
                className="w-full h-10 px-3 rounded-md border border-gray-300 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                required
              >
                <option value="">Choose a course</option>
                {courses.map((course) => (
                  <option key={course.id} value={course.id}>
                    {course.title}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Upload CSV File *</label>
              <div className="border-2 border-dashed rounded-lg p-6 text-center">
                <input
                  type="file"
                  accept=".csv"
                  onChange={handleCsvUpload}
                  className="hidden"
                  id="csvUpload"
                />
                <label
                  htmlFor="csvUpload"
                  className="cursor-pointer flex flex-col items-center gap-2"
                >
                  <Upload className="w-8 h-8 text-gray-400" />
                  <span className="text-sm text-gray-600">
                    {csvFile ? csvFile.name : "Click to upload or drag and drop"}
                  </span>
                  <span className="text-xs text-gray-400">
                    CSV format: email,name (header optional)
                  </span>
                </label>
              </div>
            </div>

            {csvPreview.length > 0 && (
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Preview (first 5 rows)</label>
                <div className="bg-gray-50 rounded-lg p-3">
                  <div className="grid grid-cols-2 gap-2 text-xs font-medium text-gray-500 pb-2 border-b">
                    <span>Email</span>
                    <span>Name</span>
                  </div>
                  {csvPreview.map((user, i) => (
                    <div key={i} className="grid grid-cols-2 gap-2 py-2 text-sm border-b last:border-0">
                      <span className="truncate">{user.email}</span>
                      <span className="truncate text-gray-600">{user.name || "-"}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {bulkResults && (
              <div className="space-y-3">
                <div
                  className={`p-4 rounded-lg ${
                    bulkResults.success ? "bg-green-50" : "bg-red-50"
                  }`}
                >
                  <div className="flex items-center gap-4">
                    {bulkResults.success ? (
                      <CheckCircle className="w-6 h-6 text-green-600" />
                    ) : (
                      <XCircle className="w-6 h-6 text-red-600" />
                    )}
                    <div>
                      <p className="font-medium">
                        Processed {bulkResults.total} users
                      </p>
                      <p className="text-sm text-gray-600">
                        {bulkResults.created} created, {bulkResults.skipped} skipped
                      </p>
                    </div>
                  </div>
                </div>

                {bulkResults.results.length > 0 && (
                  <div className="max-h-48 overflow-auto bg-gray-50 rounded-lg p-3">
                    {bulkResults.results.slice(0, 20).map((result, i) => (
                      <div
                        key={i}
                        className="flex items-center gap-2 py-1 text-sm"
                      >
                        {result.status === "created" && (
                          <CheckCircle className="w-4 h-4 text-green-500" />
                        )}
                        {result.status === "skipped" && (
                          <AlertCircle className="w-4 h-4 text-yellow-500" />
                        )}
                        {result.status === "error" && (
                          <XCircle className="w-4 h-4 text-red-500" />
                        )}
                        <span className="truncate">{result.email}</span>
                        {result.message && (
                          <span className="text-gray-500 text-xs">
                            ({result.message})
                          </span>
                        )}
                      </div>
                    ))}
                    {bulkResults.results.length > 20 && (
                      <p className="text-xs text-gray-500 pt-2">
                        And {bulkResults.results.length - 20} more...
                      </p>
                    )}
                  </div>
                )}
              </div>
            )}

            <div className="flex justify-end">
              <Button type="submit" disabled={bulkSubmitting || !bulkCourse || !csvFile}>
                {bulkSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Processing...
                  </>
                ) : (
                  <>
                    <Upload className="w-4 h-4 mr-2" />
                    Grant Access to All
                  </>
                )}
              </Button>
            </div>
          </form>
        </div>
      )}

      {/* Recent Access Records */}
      <div className="bg-white rounded-xl shadow-sm border">
        <div className="p-4 border-b flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
              <Users className="w-5 h-5 text-gray-600" />
            </div>
            <h2 className="text-lg font-semibold">Recent Access Grants</h2>
          </div>
          <Button variant="ghost" size="sm" onClick={fetchRecentAccess}>
            Refresh
          </Button>
        </div>

        <div className="divide-y">
          {loadingRecent ? (
            <div className="p-8 text-center">
              <Loader2 className="w-6 h-6 animate-spin mx-auto text-gray-400" />
            </div>
          ) : recentAccess.length === 0 ? (
            <div className="p-8 text-center text-gray-500">
              No access records found
            </div>
          ) : (
            recentAccess.map((record) => (
              <div key={record.id} className="p-4 flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-900">
                    {record.user?.name || record.user?.email}
                  </p>
                  <p className="text-sm text-gray-500">{record.user?.email}</p>
                </div>
                <div className="text-right">
                  <Badge variant="outline">{record.course?.title}</Badge>
                  <p className="text-xs text-gray-400 mt-1">
                    {new Date(record.assignedAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

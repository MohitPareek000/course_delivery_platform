"use client";

import * as React from "react";
import {
  FileText,
  Upload,
  ArrowLeft,
  Eye,
  Save,
  Plus,
  Trash2,
  ChevronDown,
  ChevronRight,
  Video,
  Trophy,
  AlertCircle,
  Check,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { CoursePreview } from "@/components/admin/CoursePreview";

type CreationMethod = "markdown" | "manual" | null;

interface ClassData {
  id: string;
  title: string;
  description?: string;
  contentType: "video" | "text" | "contest";
  videoUrl?: string;
  textContent?: string;
  contestUrl?: string;
  duration: number;
  order: number;
}

interface TopicData {
  id: string;
  title: string;
  order: number;
  classes: ClassData[];
}

interface ModuleData {
  id: string;
  title: string;
  description: string;
  order: number;
  learningOutcomes: string[];
  topics: TopicData[];
}

interface CourseData {
  id: string;
  title: string;
  description: string;
  type: string;
  role?: string;
  skill?: string;
  companyName?: string;
  modules: ModuleData[];
}

export default function CreateCoursePage() {
  const router = useRouter();
  const [method, setMethod] = React.useState<CreationMethod>(null);
  const [course, setCourse] = React.useState<CourseData>({
    id: "",
    title: "",
    description: "",
    type: "role-specific",
    role: "",
    modules: [],
  });
  const [markdownContent, setMarkdownContent] = React.useState("");
  const [parseError, setParseError] = React.useState<string | null>(null);
  const [showPreview, setShowPreview] = React.useState(false);
  const [saving, setSaving] = React.useState(false);
  const [expandedModules, setExpandedModules] = React.useState<Set<string>>(new Set());
  const [expandedTopics, setExpandedTopics] = React.useState<Set<string>>(new Set());

  // Parse markdown content
  const parseMarkdown = (content: string) => {
    setParseError(null);
    try {
      const lines = content.split("\n");
      const parsedCourse: CourseData = {
        id: "",
        title: "",
        description: "",
        type: "role-specific",
        modules: [],
      };

      let currentModule: ModuleData | null = null;
      let currentTopic: TopicData | null = null;
      let currentClass: ClassData | null = null;
      let collectingTextContent = false;
      let textContentBuffer: string[] = [];
      let collectingLearningOutcomes = false;
      let learningOutcomesBuffer: string[] = [];

      for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        const trimmedLine = line.trim();

        // Course metadata
        if (trimmedLine.startsWith("Course Type:")) {
          parsedCourse.type = trimmedLine.replace("Course Type:", "").trim();
        } else if (trimmedLine.startsWith("Role:")) {
          parsedCourse.role = trimmedLine.replace("Role:", "").trim();
        } else if (trimmedLine.startsWith("Skill:")) {
          parsedCourse.skill = trimmedLine.replace("Skill:", "").trim();
        } else if (trimmedLine.startsWith("Company:")) {
          parsedCourse.companyName = trimmedLine.replace("Company:", "").trim();
        } else if (trimmedLine.startsWith("Course Title:")) {
          parsedCourse.title = trimmedLine.replace("Course Title:", "").trim();
        } else if (trimmedLine.startsWith("Course Description:")) {
          parsedCourse.description = trimmedLine.replace("Course Description:", "").trim();
        } else if (trimmedLine.startsWith("Course ID:")) {
          parsedCourse.id = trimmedLine.replace("Course ID:", "").trim();
        }

        // Module detection
        const moduleMatch = trimmedLine.match(/^Module (\d+):$/);
        if (moduleMatch) {
          if (currentClass && textContentBuffer.length > 0) {
            currentClass.textContent = textContentBuffer.join("\n").trim();
            textContentBuffer = [];
          }
          collectingTextContent = false;

          if (currentModule) {
            if (currentTopic && currentClass) {
              currentTopic.classes.push(currentClass);
            }
            if (currentTopic) {
              currentModule.topics.push(currentTopic);
            }
            parsedCourse.modules.push(currentModule);
          }

          currentModule = {
            id: `mod-${Date.now()}-${moduleMatch[1]}`,
            title: "",
            description: "",
            order: parseInt(moduleMatch[1]),
            learningOutcomes: [],
            topics: [],
          };
          currentTopic = null;
          currentClass = null;
          continue;
        }

        // Module title
        if (currentModule && trimmedLine.startsWith("Title:") && !currentTopic) {
          currentModule.title = trimmedLine.replace("Title:", "").trim();
          continue;
        }

        // Module description
        if (currentModule && trimmedLine.startsWith("Description:") && !currentTopic) {
          currentModule.description = trimmedLine.replace("Description:", "").trim();
          continue;
        }

        // Learning outcomes
        if (currentModule && trimmedLine === "Learning Outcomes:") {
          collectingLearningOutcomes = true;
          learningOutcomesBuffer = [];
          continue;
        }

        if (collectingLearningOutcomes && currentModule) {
          if (trimmedLine.match(/^Topic \d+\.\d+:$/)) {
            currentModule.learningOutcomes = learningOutcomesBuffer.filter((o) => o.length > 0);
            collectingLearningOutcomes = false;
          } else if (trimmedLine.length > 0 && !trimmedLine.startsWith("Order:")) {
            learningOutcomesBuffer.push(trimmedLine);
            continue;
          }
        }

        // Topic detection
        const topicMatch = trimmedLine.match(/^Topic (\d+)\.(\d+):$/);
        if (topicMatch && currentModule) {
          if (currentClass && textContentBuffer.length > 0) {
            currentClass.textContent = textContentBuffer.join("\n").trim();
            textContentBuffer = [];
          }
          collectingTextContent = false;

          if (currentTopic) {
            if (currentClass) {
              currentTopic.classes.push(currentClass);
            }
            currentModule.topics.push(currentTopic);
          }

          currentTopic = {
            id: `topic-${Date.now()}-${topicMatch[1]}-${topicMatch[2]}`,
            title: "",
            order: parseInt(topicMatch[2]),
            classes: [],
          };
          currentClass = null;
          continue;
        }

        // Topic title
        if (currentTopic && trimmedLine.startsWith("Title:") && !currentClass) {
          currentTopic.title = trimmedLine.replace("Title:", "").trim();
          continue;
        }

        // Class detection
        const classMatch = trimmedLine.match(/^Class (\d+)\.(\d+)\.(\d+):$/);
        if (classMatch && currentTopic) {
          if (currentClass && textContentBuffer.length > 0) {
            currentClass.textContent = textContentBuffer.join("\n").trim();
            textContentBuffer = [];
          }
          collectingTextContent = false;

          if (currentClass) {
            currentTopic.classes.push(currentClass);
          }

          currentClass = {
            id: `class-${Date.now()}-${classMatch[1]}-${classMatch[2]}-${classMatch[3]}`,
            title: "",
            description: "",
            contentType: "text",
            duration: 300,
            order: parseInt(classMatch[3]),
            textContent: "",
          };
          continue;
        }

        // Class properties
        if (currentClass) {
          if (trimmedLine.startsWith("Title:")) {
            currentClass.title = trimmedLine.replace("Title:", "").trim();
            continue;
          }
          if (trimmedLine.startsWith("Description:")) {
            currentClass.description = trimmedLine.replace("Description:", "").trim();
            continue;
          }
          if (trimmedLine.startsWith("Content Type:")) {
            const type = trimmedLine.replace("Content Type:", "").trim().toLowerCase();
            currentClass.contentType = type as "video" | "text" | "contest";
            continue;
          }
          if (trimmedLine.startsWith("Duration:")) {
            const durationStr = trimmedLine.replace("Duration:", "").trim();
            currentClass.duration = parseInt(durationStr) || 300;
            continue;
          }
          if (trimmedLine === "Text Content :" || trimmedLine === "Text Content:") {
            collectingTextContent = true;
            textContentBuffer = [];
            continue;
          }
        }

        // Collect text content
        if (collectingTextContent && currentClass) {
          if (
            trimmedLine.match(/^Class \d+\.\d+\.\d+:$/) ||
            trimmedLine.match(/^Topic \d+\.\d+:$/) ||
            trimmedLine.match(/^Module \d+:$/)
          ) {
            currentClass.textContent = textContentBuffer.join("\n").trim();
            textContentBuffer = [];
            collectingTextContent = false;
            i--;
            continue;
          }
          textContentBuffer.push(line);
        }
      }

      // Save final items
      if (currentClass && textContentBuffer.length > 0) {
        currentClass.textContent = textContentBuffer.join("\n").trim();
      }
      if (currentClass && currentTopic) {
        currentTopic.classes.push(currentClass);
      }
      if (currentTopic && currentModule) {
        currentModule.topics.push(currentTopic);
      }
      if (currentModule) {
        parsedCourse.modules.push(currentModule);
      }

      // Generate course ID if not provided
      if (!parsedCourse.id) {
        parsedCourse.id = `COURSE-${Date.now()}`;
      }

      setCourse(parsedCourse);
      if (parsedCourse.modules.length > 0) {
        setExpandedModules(new Set([parsedCourse.modules[0].id]));
      }
    } catch (error: any) {
      setParseError(error.message || "Failed to parse markdown");
    }
  };

  // Add module manually
  const addModule = () => {
    const newModule: ModuleData = {
      id: `mod-${Date.now()}`,
      title: `Module ${course.modules.length + 1}`,
      description: "",
      order: course.modules.length + 1,
      learningOutcomes: [],
      topics: [],
    };
    setCourse({ ...course, modules: [...course.modules, newModule] });
    setExpandedModules(new Set([...expandedModules, newModule.id]));
  };

  const deleteModule = (moduleId: string) => {
    setCourse({
      ...course,
      modules: course.modules.filter((m) => m.id !== moduleId),
    });
  };

  const updateModule = (moduleId: string, updates: Partial<ModuleData>) => {
    setCourse({
      ...course,
      modules: course.modules.map((m) =>
        m.id === moduleId ? { ...m, ...updates } : m
      ),
    });
  };

  const addTopic = (moduleId: string) => {
    const module = course.modules.find((m) => m.id === moduleId);
    if (!module) return;

    const newTopic: TopicData = {
      id: `topic-${Date.now()}`,
      title: `Topic ${module.topics.length + 1}`,
      order: module.topics.length + 1,
      classes: [],
    };

    setCourse({
      ...course,
      modules: course.modules.map((m) =>
        m.id === moduleId ? { ...m, topics: [...m.topics, newTopic] } : m
      ),
    });
    setExpandedTopics(new Set([...expandedTopics, newTopic.id]));
  };

  const deleteTopic = (moduleId: string, topicId: string) => {
    setCourse({
      ...course,
      modules: course.modules.map((m) =>
        m.id === moduleId
          ? { ...m, topics: m.topics.filter((t) => t.id !== topicId) }
          : m
      ),
    });
  };

  const updateTopic = (topicId: string, updates: Partial<TopicData>) => {
    setCourse({
      ...course,
      modules: course.modules.map((m) => ({
        ...m,
        topics: m.topics.map((t) => (t.id === topicId ? { ...t, ...updates } : t)),
      })),
    });
  };

  const addClass = (topicId: string) => {
    let topic: TopicData | undefined;
    course.modules.forEach((m) => {
      const t = m.topics.find((t) => t.id === topicId);
      if (t) topic = t;
    });
    if (!topic) return;

    const newClass: ClassData = {
      id: `class-${Date.now()}`,
      title: `Class ${topic.classes.length + 1}`,
      contentType: "text",
      duration: 300,
      order: topic.classes.length + 1,
    };

    setCourse({
      ...course,
      modules: course.modules.map((m) => ({
        ...m,
        topics: m.topics.map((t) =>
          t.id === topicId ? { ...t, classes: [...t.classes, newClass] } : t
        ),
      })),
    });
  };

  const deleteClass = (topicId: string, classId: string) => {
    setCourse({
      ...course,
      modules: course.modules.map((m) => ({
        ...m,
        topics: m.topics.map((t) =>
          t.id === topicId
            ? { ...t, classes: t.classes.filter((c) => c.id !== classId) }
            : t
        ),
      })),
    });
  };

  const updateClass = (classId: string, updates: Partial<ClassData>) => {
    setCourse({
      ...course,
      modules: course.modules.map((m) => ({
        ...m,
        topics: m.topics.map((t) => ({
          ...t,
          classes: t.classes.map((c) => (c.id === classId ? { ...c, ...updates } : c)),
        })),
      })),
    });
  };

  const toggleModule = (moduleId: string) => {
    const newExpanded = new Set(expandedModules);
    if (newExpanded.has(moduleId)) {
      newExpanded.delete(moduleId);
    } else {
      newExpanded.add(moduleId);
    }
    setExpandedModules(newExpanded);
  };

  const toggleTopic = (topicId: string) => {
    const newExpanded = new Set(expandedTopics);
    if (newExpanded.has(topicId)) {
      newExpanded.delete(topicId);
    } else {
      newExpanded.add(topicId);
    }
    setExpandedTopics(newExpanded);
  };

  // Save course to database
  const saveCourse = async () => {
    if (!course.title || !course.id) {
      alert("Please provide a course title and ID");
      return;
    }

    setSaving(true);
    try {
      const response = await fetch("/api/admin/courses/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(course),
      });

      if (response.ok) {
        const data = await response.json();
        router.push(`/admin/courses/${data.id}`);
      } else {
        const error = await response.json();
        alert(error.error || "Failed to create course");
      }
    } catch (error) {
      console.error("Failed to create course:", error);
      alert("Failed to create course");
    } finally {
      setSaving(false);
    }
  };

  // Method selection screen
  if (!method) {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Button variant="outline" size="sm" onClick={() => router.push("/admin/courses")}>
            <ArrowLeft className="w-4 h-4 mr-1" />
            Back
          </Button>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Create New Course</h1>
            <p className="text-gray-500 mt-1">Choose how you want to create your course</p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6 max-w-4xl">
          <button
            onClick={() => setMethod("markdown")}
            className="bg-white rounded-lg border-2 border-gray-200 p-8 text-left hover:border-primary hover:shadow-md transition-all group"
          >
            <div className="w-14 h-14 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
              <Upload className="w-7 h-7 text-primary" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Import from Markdown
            </h3>
            <p className="text-sm text-gray-500">
              Paste your course content in our markdown format and we'll automatically
              structure it into modules, topics, and classes.
            </p>
            <Badge className="mt-4">Recommended for bulk content</Badge>
          </button>

          <button
            onClick={() => setMethod("manual")}
            className="bg-white rounded-lg border-2 border-gray-200 p-8 text-left hover:border-primary hover:shadow-md transition-all group"
          >
            <div className="w-14 h-14 rounded-lg bg-secondary/10 flex items-center justify-center mb-4 group-hover:bg-secondary/20 transition-colors">
              <FileText className="w-7 h-7 text-secondary" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Create Manually
            </h3>
            <p className="text-sm text-gray-500">
              Build your course step by step using our visual editor. Add modules,
              topics, and classes one at a time.
            </p>
            <Badge variant="secondary" className="mt-4">Best for new courses</Badge>
          </button>
        </div>
      </div>
    );
  }

  // Markdown import method
  if (method === "markdown") {
    return (
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center gap-4">
            <Button variant="outline" size="sm" onClick={() => setMethod(null)}>
              <ArrowLeft className="w-4 h-4 mr-1" />
              Back
            </Button>
            <div>
              <h1 className="text-xl font-bold text-gray-900">Import from Markdown</h1>
              <p className="text-sm text-gray-500">Paste your markdown content below</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" onClick={() => setShowPreview(!showPreview)}>
              <Eye className="w-4 h-4 mr-1" />
              {showPreview ? "Hide Preview" : "Preview"}
            </Button>
            <Button
              onClick={saveCourse}
              disabled={saving || !course.title}
            >
              <Save className="w-4 h-4 mr-1" />
              {saving ? "Creating..." : "Create Course"}
            </Button>
          </div>
        </div>

        <div className={`grid gap-6 ${showPreview ? "lg:grid-cols-2" : "grid-cols-1"}`}>
          {/* Markdown Input */}
          <div className="space-y-4">
            <div className="bg-white rounded-lg border shadow-sm p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-semibold text-gray-900">Markdown Content</h2>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => parseMarkdown(markdownContent)}
                >
                  Parse Content
                </Button>
              </div>

              {parseError && (
                <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2 text-sm text-red-700">
                  <AlertCircle className="w-4 h-4" />
                  {parseError}
                </div>
              )}

              <textarea
                className="w-full h-96 px-3 py-2 border rounded-lg text-sm font-mono focus:outline-none focus:ring-2 focus:ring-primary/20"
                placeholder={`Paste your markdown here...

Example format:
Course Type: role-specific
Role: DevOps Engineer
Course Title: DevOps Engineer Interview
Course ID: DEVOPS001
Course Description: Your course description here...

Module 1:
Title: Introduction
Description: Module description
Order: 1
Learning Outcomes:
Understand the basics
Learn key concepts

Topic 1.1:
Title: Getting Started
Order: 1

Class 1.1.1:
	Title: Welcome
	Description: Introduction class
Content Type: text
Duration: 300
Order: 1
		Text Content :

## Welcome to the course!
This is your first lesson...`}
                value={markdownContent}
                onChange={(e) => setMarkdownContent(e.target.value)}
              />
            </div>

            {/* Parsed Course Info */}
            {course.title && (
              <div className="bg-white rounded-lg border shadow-sm p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Check className="w-5 h-5 text-green-500" />
                  <h2 className="font-semibold text-gray-900">Parsed Successfully</h2>
                </div>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-500">Course ID:</span>
                    <Input
                      className="mt-1"
                      value={course.id}
                      onChange={(e) => setCourse({ ...course, id: e.target.value })}
                    />
                  </div>
                  <div>
                    <span className="text-gray-500">Title:</span>
                    <Input
                      className="mt-1"
                      value={course.title}
                      onChange={(e) => setCourse({ ...course, title: e.target.value })}
                    />
                  </div>
                  <div>
                    <span className="text-gray-500">Modules:</span>
                    <p className="font-medium">{course.modules.length}</p>
                  </div>
                  <div>
                    <span className="text-gray-500">Total Classes:</span>
                    <p className="font-medium">
                      {course.modules.reduce(
                        (sum, m) => sum + m.topics.reduce((s, t) => s + t.classes.length, 0),
                        0
                      )}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Preview Panel */}
          {showPreview && course.title && (
            <div className="bg-white rounded-lg border shadow-sm overflow-hidden sticky top-4 max-h-[calc(100vh-6rem)]">
              <div className="p-4 border-b bg-gray-50">
                <h3 className="font-semibold text-gray-900">Live Preview</h3>
              </div>
              <div className="overflow-auto max-h-[calc(100vh-10rem)]">
                <CoursePreview course={course} />
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  // Manual creation method
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-4">
          <Button variant="outline" size="sm" onClick={() => setMethod(null)}>
            <ArrowLeft className="w-4 h-4 mr-1" />
            Back
          </Button>
          <div>
            <h1 className="text-xl font-bold text-gray-900">Create Course Manually</h1>
            <p className="text-sm text-gray-500">Build your course step by step</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" onClick={() => setShowPreview(!showPreview)}>
            <Eye className="w-4 h-4 mr-1" />
            {showPreview ? "Hide Preview" : "Preview"}
          </Button>
          <Button onClick={saveCourse} disabled={saving || !course.title || !course.id}>
            <Save className="w-4 h-4 mr-1" />
            {saving ? "Creating..." : "Create Course"}
          </Button>
        </div>
      </div>

      <div className={`grid gap-6 ${showPreview ? "lg:grid-cols-2" : "grid-cols-1"}`}>
        {/* Editor Panel */}
        <div className="space-y-6">
          {/* Course Info */}
          <div className="bg-white rounded-lg border shadow-sm p-6">
            <h2 className="font-semibold text-gray-900 mb-4">Course Information</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Course ID *
                </label>
                <Input
                  value={course.id}
                  onChange={(e) => setCourse({ ...course, id: e.target.value })}
                  placeholder="e.g., DA001, DEVOPS001"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Course Title *
                </label>
                <Input
                  value={course.title}
                  onChange={(e) => setCourse({ ...course, title: e.target.value })}
                  placeholder="e.g., Data Analyst Interview Preparation"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  className="w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
                  rows={3}
                  value={course.description}
                  onChange={(e) => setCourse({ ...course, description: e.target.value })}
                  placeholder="Describe your course..."
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Type
                  </label>
                  <select
                    className="w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
                    value={["role-specific", "skill-based", "company-specific"].includes(course.type) ? course.type : "custom"}
                    onChange={(e) => {
                      const selectedType = e.target.value;
                      if (selectedType === "custom") {
                        setCourse({ ...course, type: "" });
                      } else {
                        setCourse({ ...course, type: selectedType });
                      }
                    }}
                  >
                    <option value="role-specific">Role Specific</option>
                    <option value="skill-based">Skill Based</option>
                    <option value="company-specific">Company Specific</option>
                    <option value="custom">Custom Type</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {course.type === "role-specific"
                      ? "Role"
                      : course.type === "skill-based"
                      ? "Skill"
                      : course.type === "company-specific"
                      ? "Company Name"
                      : "Custom Type Name"}
                  </label>
                  {["role-specific", "skill-based", "company-specific"].includes(course.type) ? (
                    <Input
                      value={
                        course.type === "role-specific"
                          ? course.role || ""
                          : course.type === "skill-based"
                          ? course.skill || ""
                          : course.companyName || ""
                      }
                      onChange={(e) => {
                        if (course.type === "role-specific") {
                          setCourse({ ...course, role: e.target.value });
                        } else if (course.type === "skill-based") {
                          setCourse({ ...course, skill: e.target.value });
                        } else {
                          setCourse({ ...course, companyName: e.target.value });
                        }
                      }}
                      placeholder={
                        course.type === "role-specific"
                          ? "e.g., Data Analyst"
                          : course.type === "skill-based"
                          ? "e.g., Python"
                          : "e.g., Google"
                      }
                    />
                  ) : (
                    <Input
                      value={course.type}
                      onChange={(e) => setCourse({ ...course, type: e.target.value })}
                      placeholder="e.g., Certification, Bootcamp, Workshop"
                    />
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Modules */}
          <div className="bg-white rounded-lg border shadow-sm p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-semibold text-gray-900">
                Modules ({course.modules.length})
              </h2>
              <Button size="sm" onClick={addModule}>
                <Plus className="w-4 h-4 mr-1" />
                Add Module
              </Button>
            </div>

            <div className="space-y-3">
              {course.modules.map((module, moduleIndex) => (
                <div key={module.id} className="border rounded-lg">
                  {/* Module Header */}
                  <div
                    className="flex items-center gap-2 p-3 bg-gray-50 cursor-pointer hover:bg-gray-100"
                    onClick={() => toggleModule(module.id)}
                  >
                    {expandedModules.has(module.id) ? (
                      <ChevronDown className="w-4 h-4 text-gray-500" />
                    ) : (
                      <ChevronRight className="w-4 h-4 text-gray-500" />
                    )}
                    <Badge variant="outline" className="text-xs">
                      M{moduleIndex + 1}
                    </Badge>
                    <Input
                      className="flex-1 h-8"
                      value={module.title}
                      onChange={(e) => updateModule(module.id, { title: e.target.value })}
                      onClick={(e) => e.stopPropagation()}
                    />
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-7 w-7 p-0 text-red-600"
                      onClick={(e) => {
                        e.stopPropagation();
                        deleteModule(module.id);
                      }}
                    >
                      <Trash2 className="w-3 h-3" />
                    </Button>
                  </div>

                  {/* Module Content */}
                  {expandedModules.has(module.id) && (
                    <div className="p-3 border-t space-y-3">
                      <div>
                        <label className="block text-xs font-medium text-gray-500 mb-1">
                          Description
                        </label>
                        <textarea
                          className="w-full px-2 py-1.5 border rounded text-sm"
                          rows={2}
                          value={module.description}
                          onChange={(e) =>
                            updateModule(module.id, { description: e.target.value })
                          }
                        />
                      </div>

                      {/* Topics */}
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <label className="text-xs font-medium text-gray-500">Topics</label>
                          <Button
                            variant="outline"
                            size="sm"
                            className="h-7 text-xs"
                            onClick={() => addTopic(module.id)}
                          >
                            <Plus className="w-3 h-3 mr-1" />
                            Add Topic
                          </Button>
                        </div>

                        <div className="space-y-2">
                          {module.topics.map((topic, topicIndex) => (
                            <div key={topic.id} className="border rounded bg-white">
                              <div
                                className="flex items-center gap-2 p-2 cursor-pointer hover:bg-gray-50"
                                onClick={() => toggleTopic(topic.id)}
                              >
                                {expandedTopics.has(topic.id) ? (
                                  <ChevronDown className="w-3 h-3 text-gray-400" />
                                ) : (
                                  <ChevronRight className="w-3 h-3 text-gray-400" />
                                )}
                                <Badge variant="secondary" className="text-xs h-5">
                                  T{topicIndex + 1}
                                </Badge>
                                <Input
                                  className="flex-1 h-6 text-sm"
                                  value={topic.title}
                                  onChange={(e) =>
                                    updateTopic(topic.id, { title: e.target.value })
                                  }
                                  onClick={(e) => e.stopPropagation()}
                                />
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="h-6 w-6 p-0 text-red-600"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    deleteTopic(module.id, topic.id);
                                  }}
                                >
                                  <Trash2 className="w-3 h-3" />
                                </Button>
                              </div>

                              {expandedTopics.has(topic.id) && (
                                <div className="p-2 pt-0 space-y-1">
                                  {topic.classes.map((cls) => (
                                    <ManualClassEditor
                                      key={cls.id}
                                      classData={cls}
                                      onUpdate={(updates) => updateClass(cls.id, updates)}
                                      onDelete={() => deleteClass(topic.id, cls.id)}
                                    />
                                  ))}
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    className="w-full h-7 text-xs border border-dashed"
                                    onClick={() => addClass(topic.id)}
                                  >
                                    <Plus className="w-3 h-3 mr-1" />
                                    Add Class
                                  </Button>
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}

              {course.modules.length === 0 && (
                <div className="text-center py-8 text-gray-400">
                  <FileText className="w-12 h-12 mx-auto mb-2 opacity-50" />
                  <p className="text-sm">No modules yet. Add your first module to get started.</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Preview Panel */}
        {showPreview && (
          <div className="bg-white rounded-lg border shadow-sm overflow-hidden sticky top-4 max-h-[calc(100vh-6rem)]">
            <div className="p-4 border-b bg-gray-50">
              <h3 className="font-semibold text-gray-900">Live Preview</h3>
            </div>
            <div className="overflow-auto max-h-[calc(100vh-10rem)]">
              {course.title ? (
                <CoursePreview course={course} />
              ) : (
                <div className="flex items-center justify-center h-64 text-gray-400">
                  <p className="text-sm">Add course details to see preview</p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// Manual Class Editor Component
function ManualClassEditor({
  classData,
  onUpdate,
  onDelete,
}: {
  classData: ClassData;
  onUpdate: (updates: Partial<ClassData>) => void;
  onDelete: () => void;
}) {
  const [isExpanded, setIsExpanded] = React.useState(false);

  const getContentTypeIcon = (type: string) => {
    switch (type) {
      case "video":
        return <Video className="w-3 h-3" />;
      case "contest":
        return <Trophy className="w-3 h-3" />;
      default:
        return <FileText className="w-3 h-3" />;
    }
  };

  return (
    <div className="border rounded bg-gray-50">
      <div
        className="flex items-center gap-2 p-2 cursor-pointer hover:bg-gray-100"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        {isExpanded ? (
          <ChevronDown className="w-3 h-3 text-gray-400" />
        ) : (
          <ChevronRight className="w-3 h-3 text-gray-400" />
        )}
        <div className="flex items-center gap-1 text-gray-500">
          {getContentTypeIcon(classData.contentType)}
        </div>
        <Input
          className="flex-1 h-6 text-xs"
          value={classData.title}
          onChange={(e) => onUpdate({ title: e.target.value })}
          onClick={(e) => e.stopPropagation()}
        />
        <Badge variant="outline" className="text-xs h-4 px-1">
          {classData.contentType}
        </Badge>
        <Button
          variant="ghost"
          size="sm"
          className="h-5 w-5 p-0 text-red-600"
          onClick={(e) => {
            e.stopPropagation();
            onDelete();
          }}
        >
          <Trash2 className="w-3 h-3" />
        </Button>
      </div>

      {isExpanded && (
        <div className="p-2 pt-0 space-y-2 border-t">
          <div>
            <label className="block text-xs text-gray-500 mb-1">Description</label>
            <Input
              className="h-7 text-xs"
              value={classData.description || ""}
              onChange={(e) => onUpdate({ description: e.target.value })}
            />
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="block text-xs text-gray-500 mb-1">Content Type</label>
              <select
                className="w-full h-7 px-2 border rounded text-xs"
                value={classData.contentType}
                onChange={(e) =>
                  onUpdate({ contentType: e.target.value as ClassData["contentType"] })
                }
              >
                <option value="text">Text</option>
                <option value="video">Video</option>
                <option value="contest">Contest</option>
              </select>
            </div>
            <div>
              <label className="block text-xs text-gray-500 mb-1">Duration (sec)</label>
              <Input
                type="number"
                className="h-7 text-xs"
                value={classData.duration}
                onChange={(e) => onUpdate({ duration: parseInt(e.target.value) || 0 })}
              />
            </div>
          </div>

          {classData.contentType === "text" && (
            <div>
              <label className="block text-xs text-gray-500 mb-1">Text Content (Markdown)</label>
              <textarea
                className="w-full px-2 py-1 border rounded text-xs font-mono"
                rows={6}
                value={classData.textContent || ""}
                onChange={(e) => onUpdate({ textContent: e.target.value })}
                placeholder="## Your content here..."
              />
            </div>
          )}

          {classData.contentType === "video" && (
            <div>
              <label className="block text-xs text-gray-500 mb-1">Video URL</label>
              <Input
                className="h-7 text-xs"
                value={classData.videoUrl || ""}
                onChange={(e) => onUpdate({ videoUrl: e.target.value })}
                placeholder="https://..."
              />
            </div>
          )}

          {classData.contentType === "contest" && (
            <div>
              <label className="block text-xs text-gray-500 mb-1">Contest URL</label>
              <Input
                className="h-7 text-xs"
                value={classData.contestUrl || ""}
                onChange={(e) => onUpdate({ contestUrl: e.target.value })}
                placeholder="https://..."
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
}

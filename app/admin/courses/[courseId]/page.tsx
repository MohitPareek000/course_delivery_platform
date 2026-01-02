"use client";

import * as React from "react";
import {
  ChevronDown,
  ChevronRight,
  Plus,
  Trash2,
  Save,
  Eye,
  ArrowLeft,
  GripVertical,
  FileText,
  Video,
  Trophy,
  Edit2,
  X,
  Check,
  Upload,
  Code2,
  Loader2,
} from "lucide-react";
import { useRouter, useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { CoursePreview } from "@/components/admin/CoursePreview";
import { MarkdownRenderer } from "@/components/content/MarkdownRenderer";

type EditMode = "markdown" | "detailed";

interface ClassData {
  id: string;
  title: string;
  description?: string;
  contentType: "video" | "text" | "contest";
  videoUrl?: string;
  textContent?: string;
  contestUrl?: string;
  contestQuestions?: number;
  contestSyllabus?: string[];
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
  thumbnailUrl?: string;
  modules: ModuleData[];
}

export default function CourseEditorPage() {
  const params = useParams();
  const courseId = params.courseId as string;
  const router = useRouter();
  const [course, setCourse] = React.useState<CourseData | null>(null);
  const [originalCourse, setOriginalCourse] = React.useState<string>("");
  const [loading, setLoading] = React.useState(true);
  const [saving, setSaving] = React.useState(false);
  const [showPreview, setShowPreview] = React.useState(false);
  const [expandedModules, setExpandedModules] = React.useState<Set<string>>(new Set());
  const [expandedTopics, setExpandedTopics] = React.useState<Set<string>>(new Set());
  const [editingItem, setEditingItem] = React.useState<{
    type: "course" | "module" | "topic" | "class";
    id: string;
  } | null>(null);

  // Edit mode state
  const [editMode, setEditMode] = React.useState<EditMode>("detailed");
  const [markdownContent, setMarkdownContent] = React.useState("");
  const [markdownParsing, setMarkdownParsing] = React.useState(false);
  const [markdownError, setMarkdownError] = React.useState<string | null>(null);

  // Check for unsaved changes
  const hasUnsavedChanges = React.useMemo(() => {
    if (!course || !originalCourse) return false;
    return JSON.stringify(course) !== originalCourse;
  }, [course, originalCourse]);

  React.useEffect(() => {
    fetchCourse();
  }, [courseId]);

  async function fetchCourse() {
    try {
      const response = await fetch(`/api/admin/courses/${courseId}`);
      if (response.ok) {
        const data = await response.json();
        setCourse(data);
        setOriginalCourse(JSON.stringify(data));
        // Expand first module by default
        if (data.modules.length > 0) {
          setExpandedModules(new Set([data.modules[0].id]));
        }
      }
    } catch (error) {
      console.error("Failed to fetch course:", error);
    } finally {
      setLoading(false);
    }
  }

  async function saveCourse() {
    if (!course) return;
    setSaving(true);
    try {
      await fetch(`/api/admin/courses/${courseId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(course),
      });
      // Update original course to reflect saved state
      setOriginalCourse(JSON.stringify(course));
    } catch (error) {
      console.error("Failed to save course:", error);
    } finally {
      setSaving(false);
    }
  }

  async function addModule() {
    if (!course) return;
    try {
      const response = await fetch("/api/admin/modules", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          courseId: course.id,
          title: `Module ${course.modules.length + 1}`,
          description: "New module description",
          order: course.modules.length + 1,
          learningOutcomes: [],
        }),
      });
      if (response.ok) {
        const newModule = await response.json();
        setCourse({
          ...course,
          modules: [...course.modules, { ...newModule, topics: [] }],
        });
        setExpandedModules(new Set([...expandedModules, newModule.id]));
      }
    } catch (error) {
      console.error("Failed to add module:", error);
    }
  }

  async function deleteModule(moduleId: string) {
    if (!course) return;
    try {
      await fetch(`/api/admin/modules/${moduleId}`, { method: "DELETE" });
      setCourse({
        ...course,
        modules: course.modules.filter((m) => m.id !== moduleId),
      });
    } catch (error) {
      console.error("Failed to delete module:", error);
    }
  }

  async function updateModule(moduleId: string, updates: Partial<ModuleData>) {
    if (!course) return;
    try {
      await fetch(`/api/admin/modules/${moduleId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updates),
      });
      setCourse({
        ...course,
        modules: course.modules.map((m) =>
          m.id === moduleId ? { ...m, ...updates } : m
        ),
      });
    } catch (error) {
      console.error("Failed to update module:", error);
    }
  }

  async function addTopic(moduleId: string) {
    if (!course) return;
    const module = course.modules.find((m) => m.id === moduleId);
    if (!module) return;

    try {
      const response = await fetch("/api/admin/topics", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          moduleId,
          courseId: course.id,
          title: `Topic ${module.topics.length + 1}`,
          order: module.topics.length + 1,
        }),
      });
      if (response.ok) {
        const newTopic = await response.json();
        setCourse({
          ...course,
          modules: course.modules.map((m) =>
            m.id === moduleId
              ? { ...m, topics: [...m.topics, { ...newTopic, classes: [] }] }
              : m
          ),
        });
        setExpandedTopics(new Set([...expandedTopics, newTopic.id]));
      }
    } catch (error) {
      console.error("Failed to add topic:", error);
    }
  }

  async function deleteTopic(topicId: string) {
    if (!course) return;
    try {
      await fetch(`/api/admin/topics/${topicId}`, { method: "DELETE" });
      setCourse({
        ...course,
        modules: course.modules.map((m) => ({
          ...m,
          topics: m.topics.filter((t) => t.id !== topicId),
        })),
      });
    } catch (error) {
      console.error("Failed to delete topic:", error);
    }
  }

  async function updateTopic(topicId: string, updates: Partial<TopicData>) {
    if (!course) return;
    try {
      await fetch(`/api/admin/topics/${topicId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updates),
      });
      setCourse({
        ...course,
        modules: course.modules.map((m) => ({
          ...m,
          topics: m.topics.map((t) =>
            t.id === topicId ? { ...t, ...updates } : t
          ),
        })),
      });
    } catch (error) {
      console.error("Failed to update topic:", error);
    }
  }

  async function addClass(topicId: string) {
    if (!course) return;
    let topic: TopicData | undefined;
    course.modules.forEach((m) => {
      const t = m.topics.find((t) => t.id === topicId);
      if (t) topic = t;
    });
    if (!topic) return;

    try {
      const response = await fetch("/api/admin/classes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          topicId,
          title: `Class ${topic.classes.length + 1}`,
          contentType: "text",
          duration: 300,
          order: topic.classes.length + 1,
        }),
      });
      if (response.ok) {
        const newClass = await response.json();
        setCourse({
          ...course,
          modules: course.modules.map((m) => ({
            ...m,
            topics: m.topics.map((t) =>
              t.id === topicId ? { ...t, classes: [...t.classes, newClass] } : t
            ),
          })),
        });
      }
    } catch (error) {
      console.error("Failed to add class:", error);
    }
  }

  async function deleteClass(classId: string) {
    if (!course) return;
    try {
      await fetch(`/api/admin/classes/${classId}`, { method: "DELETE" });
      setCourse({
        ...course,
        modules: course.modules.map((m) => ({
          ...m,
          topics: m.topics.map((t) => ({
            ...t,
            classes: t.classes.filter((c) => c.id !== classId),
          })),
        })),
      });
    } catch (error) {
      console.error("Failed to delete class:", error);
    }
  }

  async function updateClass(classId: string, updates: Partial<ClassData>) {
    if (!course) return;
    try {
      await fetch(`/api/admin/classes/${classId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updates),
      });
      setCourse({
        ...course,
        modules: course.modules.map((m) => ({
          ...m,
          topics: m.topics.map((t) => ({
            ...t,
            classes: t.classes.map((c) =>
              c.id === classId ? { ...c, ...updates } : c
            ),
          })),
        })),
      });
    } catch (error) {
      console.error("Failed to update class:", error);
    }
  }

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

  const getContentTypeIcon = (type: string) => {
    switch (type) {
      case "video":
        return <Video className="w-4 h-4" />;
      case "contest":
        return <Trophy className="w-4 h-4" />;
      default:
        return <FileText className="w-4 h-4" />;
    }
  };

  // Parse markdown content and update course content (PRESERVES USER PROGRESS)
  const parseAndReplaceContent = async () => {
    if (!course || !markdownContent.trim()) {
      setMarkdownError("Please paste markdown content first");
      return;
    }

    setMarkdownParsing(true);
    setMarkdownError(null);

    try {
      // Parse the markdown content
      const parsedCourse = parseMarkdownContent(markdownContent);

      if (!parsedCourse.modules || parsedCourse.modules.length === 0) {
        throw new Error("No modules found in markdown content");
      }

      // INCREMENTAL UPDATE - Preserves user progress by updating existing items
      // instead of deleting and recreating them
      const newModules: ModuleData[] = [];

      for (const moduleData of parsedCourse.modules) {
        // Find existing module by order number
        const existingModule = course.modules.find(m => m.order === moduleData.order);

        let moduleId: string;

        if (existingModule) {
          // UPDATE existing module (preserves ID, so progress is kept)
          const moduleResponse = await fetch(`/api/admin/modules/${existingModule.id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              title: moduleData.title,
              description: moduleData.description,
              order: moduleData.order,
              learningOutcomes: moduleData.learningOutcomes,
            }),
          });
          if (!moduleResponse.ok) throw new Error("Failed to update module");
          moduleId = existingModule.id;
        } else {
          // CREATE new module (only for new modules)
          const moduleResponse = await fetch("/api/admin/modules", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              courseId: course.id,
              title: moduleData.title,
              description: moduleData.description,
              order: moduleData.order,
              learningOutcomes: moduleData.learningOutcomes,
            }),
          });
          if (!moduleResponse.ok) throw new Error("Failed to create module");
          const newModule = await moduleResponse.json();
          moduleId = newModule.id;
        }

        const moduleTopics: TopicData[] = [];
        const existingTopics = existingModule?.topics || [];

        // Process topics
        for (const topicData of moduleData.topics) {
          const existingTopic = existingTopics.find(t => t.order === topicData.order);

          let topicId: string;

          if (existingTopic) {
            // UPDATE existing topic
            const topicResponse = await fetch(`/api/admin/topics/${existingTopic.id}`, {
              method: "PUT",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                title: topicData.title,
                order: topicData.order,
              }),
            });
            if (!topicResponse.ok) throw new Error("Failed to update topic");
            topicId = existingTopic.id;
          } else {
            // CREATE new topic
            const topicResponse = await fetch("/api/admin/topics", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                moduleId: moduleId,
                courseId: course.id,
                title: topicData.title,
                order: topicData.order,
              }),
            });
            if (!topicResponse.ok) throw new Error("Failed to create topic");
            const newTopic = await topicResponse.json();
            topicId = newTopic.id;
          }

          const topicClasses: ClassData[] = [];
          const existingClasses = existingTopic?.classes || [];

          // Process classes
          for (const classData of topicData.classes) {
            const existingClass = existingClasses.find(c => c.order === classData.order);

            if (existingClass) {
              // UPDATE existing class (preserves ID, so UserProgress is kept!)
              const classResponse = await fetch(`/api/admin/classes/${existingClass.id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                  title: classData.title,
                  description: classData.description,
                  contentType: classData.contentType,
                  videoUrl: classData.videoUrl,
                  textContent: classData.textContent,
                  contestUrl: classData.contestUrl,
                  duration: classData.duration,
                  order: classData.order,
                }),
              });
              if (!classResponse.ok) throw new Error("Failed to update class");
              const updatedClass = await classResponse.json();
              topicClasses.push(updatedClass);
            } else {
              // CREATE new class
              const classResponse = await fetch("/api/admin/classes", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                  topicId: topicId,
                  title: classData.title,
                  description: classData.description,
                  contentType: classData.contentType,
                  videoUrl: classData.videoUrl,
                  textContent: classData.textContent,
                  contestUrl: classData.contestUrl,
                  duration: classData.duration,
                  order: classData.order,
                }),
              });
              if (!classResponse.ok) throw new Error("Failed to create class");
              const newClass = await classResponse.json();
              topicClasses.push(newClass);
            }
          }

          moduleTopics.push({ id: topicId, title: topicData.title, order: topicData.order, classes: topicClasses });
        }

        newModules.push({
          id: moduleId,
          title: moduleData.title,
          description: moduleData.description,
          order: moduleData.order,
          learningOutcomes: moduleData.learningOutcomes,
          topics: moduleTopics
        });
      }

      // Update course info if parsed
      if (parsedCourse.title || parsedCourse.description) {
        await fetch(`/api/admin/courses/${courseId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            title: parsedCourse.title || course.title,
            description: parsedCourse.description || course.description,
            type: parsedCourse.type || course.type,
            role: parsedCourse.role,
            skill: parsedCourse.skill,
            companyName: parsedCourse.companyName,
          }),
        });
      }

      // Update local state
      setCourse({
        ...course,
        title: parsedCourse.title || course.title,
        description: parsedCourse.description || course.description,
        type: parsedCourse.type || course.type,
        role: parsedCourse.role,
        skill: parsedCourse.skill,
        companyName: parsedCourse.companyName,
        modules: newModules,
      });

      // Switch to detailed mode after successful import
      setEditMode("detailed");
      setMarkdownContent("");
      alert(`Successfully updated ${newModules.length} modules! User progress has been PRESERVED.`);
    } catch (error: any) {
      console.error("Failed to parse markdown:", error);
      setMarkdownError(error.message || "Failed to parse markdown content");
    } finally {
      setMarkdownParsing(false);
    }
  };

  // Markdown parser function
  function parseMarkdownContent(content: string): Partial<CourseData> & {
    modules: Array<Omit<ModuleData, "id"> & { topics: Array<Omit<TopicData, "id"> & { classes: Array<Omit<ClassData, "id">> }> }>;
  } {
    const lines = content.split("\n");

    const result: any = {
      title: "",
      description: "",
      type: "role-specific",
      modules: [],
    };

    let currentModule: any = null;
    let currentTopic: any = null;
    let currentClass: any = null;
    let collectingTextContent = false;
    let textContentBuffer: string[] = [];
    let collectingLearningOutcomes = false;
    let learningOutcomesBuffer: string[] = [];

    const saveCurrentClass = () => {
      if (currentClass && currentTopic) {
        if (collectingTextContent && textContentBuffer.length > 0) {
          currentClass.textContent = textContentBuffer.join("\n").trim();
          textContentBuffer = [];
          collectingTextContent = false;
        }
        currentTopic.classes.push(currentClass);
        currentClass = null;
      }
    };

    const saveCurrentTopic = () => {
      saveCurrentClass();
      if (currentTopic && currentModule) {
        currentModule.topics.push(currentTopic);
        currentTopic = null;
      }
    };

    const saveCurrentModule = () => {
      saveCurrentTopic();
      if (currentModule) {
        if (collectingLearningOutcomes && learningOutcomesBuffer.length > 0) {
          currentModule.learningOutcomes = learningOutcomesBuffer.filter((l: string) => l.trim());
          learningOutcomesBuffer = [];
          collectingLearningOutcomes = false;
        }
        result.modules.push(currentModule);
        currentModule = null;
      }
    };

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim();
      const originalLine = lines[i];

      // Parse course metadata
      if (line.startsWith("Course Type:")) {
        result.type = line.replace("Course Type:", "").trim();
      } else if (line.startsWith("Role:")) {
        result.role = line.replace("Role:", "").trim();
      } else if (line.startsWith("Skill:")) {
        result.skill = line.replace("Skill:", "").trim();
      } else if (line.startsWith("Company:")) {
        result.companyName = line.replace("Company:", "").trim();
      } else if (line.startsWith("Course Title:")) {
        result.title = line.replace("Course Title:", "").trim();
      } else if (line.startsWith("Course Description:")) {
        result.description = line.replace("Course Description:", "").trim();
      }

      // Parse modules
      if (line.match(/^Module \d+:?$/)) {
        saveCurrentModule();
        const moduleNumber = parseInt(line.match(/\d+/)![0]);
        currentModule = {
          title: "",
          description: "",
          order: moduleNumber,
          learningOutcomes: [],
          topics: [],
        };
        collectingLearningOutcomes = false;
        collectingTextContent = false;
      }

      // Module properties
      else if (line.startsWith("Title:") && currentModule && !currentTopic && !currentClass) {
        currentModule.title = line.replace("Title:", "").trim();
      } else if (line.startsWith("Description:") && currentModule && !currentTopic && !currentClass) {
        currentModule.description = line.replace("Description:", "").trim();
      } else if (line.startsWith("Learning Outcomes:")) {
        collectingLearningOutcomes = true;
        learningOutcomesBuffer = [];
        collectingTextContent = false;
      } else if (collectingLearningOutcomes && currentModule && !currentTopic) {
        if (line.startsWith("Topic") || line.startsWith("Module") || line.startsWith("Class")) {
          currentModule.learningOutcomes = learningOutcomesBuffer.filter((l: string) => l.trim());
          learningOutcomesBuffer = [];
          collectingLearningOutcomes = false;
          i--;
          continue;
        } else if (line) {
          learningOutcomesBuffer.push(line);
        }
      }

      // Parse topics
      else if (line.match(/^Topic \d+\.\d+:?$/)) {
        saveCurrentTopic();
        if (collectingLearningOutcomes && currentModule) {
          currentModule.learningOutcomes = learningOutcomesBuffer.filter((l: string) => l.trim());
          learningOutcomesBuffer = [];
          collectingLearningOutcomes = false;
        }
        const topicMatch = line.match(/Topic (\d+)\.(\d+)/);
        const topicNumber = topicMatch ? parseInt(topicMatch[2]) : 1;
        currentTopic = {
          title: "",
          order: topicNumber,
          classes: [],
        };
        collectingTextContent = false;
      }

      // Topic title
      else if (line.startsWith("Title:") && currentTopic && !currentClass) {
        currentTopic.title = line.replace("Title:", "").trim();
      }

      // Parse classes
      else if (line.match(/^Class \d+\.\d+\.\d+:?$/)) {
        saveCurrentClass();
        const classMatch = line.match(/Class (\d+)\.(\d+)\.(\d+)/);
        const classNumber = classMatch ? parseInt(classMatch[3]) : 1;
        currentClass = {
          title: "",
          contentType: "text",
          duration: 300,
          order: classNumber,
        };
        collectingTextContent = false;
      }

      // Class properties
      else if (line.startsWith("Title:") && currentClass) {
        currentClass.title = line.replace("Title:", "").trim();
      } else if (line.startsWith("Description:") && currentClass) {
        currentClass.description = line.replace("Description:", "").trim();
      } else if (line.startsWith("Content Type:")) {
        const typeStr = line.replace("Content Type:", "").trim().toLowerCase();
        if (currentClass) {
          if (typeStr === "video") currentClass.contentType = "video";
          else if (typeStr === "text") currentClass.contentType = "text";
          else if (typeStr === "contest" || typeStr === "quiz") currentClass.contentType = "contest";
        }
        collectingTextContent = false;
      } else if (line.startsWith("Duration:")) {
        const duration = parseInt(line.replace("Duration:", "").trim());
        if (currentClass && !isNaN(duration)) {
          currentClass.duration = duration;
        }
        collectingTextContent = false;
      } else if (line.startsWith("Video URL:")) {
        if (currentClass) {
          currentClass.videoUrl = line.replace("Video URL:", "").trim();
        }
        collectingTextContent = false;
      } else if (line.startsWith("Contest URL:")) {
        if (currentClass) {
          currentClass.contestUrl = line.replace("Contest URL:", "").trim();
        }
        collectingTextContent = false;
      } else if (line.match(/^Text Content\s*:?$/i)) {
        collectingTextContent = true;
        textContentBuffer = [];
      } else if (collectingTextContent && currentClass) {
        if (line.startsWith("Class ") || line.startsWith("Topic ") || line.startsWith("Module ")) {
          currentClass.textContent = textContentBuffer.join("\n").trim();
          textContentBuffer = [];
          collectingTextContent = false;
          i--;
        } else {
          textContentBuffer.push(originalLine);
        }
      }
    }

    saveCurrentModule();

    return result;
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <p className="text-gray-500">Loading course...</p>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <p className="text-gray-500">Course not found</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-4">
          <Button variant="outline" size="sm" onClick={() => router.push("/admin/courses")}>
            <ArrowLeft className="w-4 h-4 mr-1" />
            Back
          </Button>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-bold text-gray-900">Edit Course</h1>
              {hasUnsavedChanges && (
                <span className="text-xs bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full font-medium">
                  Unsaved changes
                </span>
              )}
            </div>
            <p className="text-sm text-gray-500">ID: {course.id}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" onClick={() => setShowPreview(!showPreview)}>
            <Eye className="w-4 h-4 mr-1" />
            {showPreview ? "Hide Preview" : "Preview"}
          </Button>
          <Button onClick={saveCourse} disabled={saving || !hasUnsavedChanges}>
            <Save className="w-4 h-4 mr-1" />
            {saving ? "Saving..." : "Save Changes"}
          </Button>
        </div>
      </div>

      {/* Edit Mode Toggle */}
      <div className="bg-white rounded-lg border shadow-sm p-4">
        <div className="flex items-center justify-between mb-2">
          <h3 className="font-medium text-gray-900">Edit Mode</h3>
          <div className="flex rounded-lg border overflow-hidden">
            <button
              onClick={() => setEditMode("markdown")}
              className={`px-4 py-2 text-sm font-medium flex items-center gap-2 transition-colors ${
                editMode === "markdown"
                  ? "bg-primary text-white"
                  : "bg-white text-gray-700 hover:bg-gray-50"
              }`}
            >
              <Upload className="w-4 h-4" />
              Markdown Import
            </button>
            <button
              onClick={() => setEditMode("detailed")}
              className={`px-4 py-2 text-sm font-medium flex items-center gap-2 transition-colors ${
                editMode === "detailed"
                  ? "bg-primary text-white"
                  : "bg-white text-gray-700 hover:bg-gray-50"
              }`}
            >
              <Code2 className="w-4 h-4" />
              Detailed Editor
            </button>
          </div>
        </div>
        <p className="text-xs text-gray-500">
          {editMode === "markdown"
            ? "Paste markdown content to replace all course content at once"
            : "Edit individual modules, topics, and classes with full control"}
        </p>
      </div>

      <div className={`grid gap-6 ${showPreview ? "lg:grid-cols-2" : "grid-cols-1"}`}>
        {/* Editor Panel */}
        <div className="space-y-6">
          {/* Markdown Import Mode */}
          {editMode === "markdown" && (
            <div className="bg-white rounded-lg border shadow-sm p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-orange-100 flex items-center justify-center">
                  <Upload className="w-5 h-5 text-orange-600" />
                </div>
                <div>
                  <h2 className="font-semibold text-gray-900">Import from Markdown</h2>
                  <p className="text-xs text-gray-500">
                    Paste your markdown content below to replace all course content
                  </p>
                </div>
              </div>

              <div className="bg-green-50 border border-green-200 rounded-lg p-3 mb-4">
                <p className="text-xs text-green-800">
                  <strong>Safe Update:</strong> This will update course content while PRESERVING user progress.
                  Existing modules/topics/classes are updated by their order numbers.
                </p>
              </div>

              <textarea
                className="w-full h-96 px-4 py-3 border rounded-lg text-sm font-mono focus:outline-none focus:ring-2 focus:ring-primary/20 resize-none"
                placeholder={`Paste your markdown content here...

Example format:
Course Type: role-specific
Role: DevOps Engineer
Course Title: DevOps Fundamentals
Course Description: Learn DevOps from scratch

Module 1:
Title: Introduction to DevOps
Description: Understanding DevOps principles
Learning Outcomes:
- Understand CI/CD pipelines
- Learn about containerization

Topic 1.1:
Title: What is DevOps?

Class 1.1.1:
Title: Introduction
Content Type: text
Duration: 300
Text Content:
Your markdown content here...`}
                value={markdownContent}
                onChange={(e) => setMarkdownContent(e.target.value)}
              />

              {markdownError && (
                <div className="mt-3 p-3 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-sm text-red-700">{markdownError}</p>
                </div>
              )}

              <div className="flex items-center justify-between mt-4">
                <p className="text-xs text-gray-500">
                  {markdownContent.split("\n").length} lines
                </p>
                <Button
                  onClick={parseAndReplaceContent}
                  disabled={markdownParsing || !markdownContent.trim()}
                  className="bg-orange-600 hover:bg-orange-700"
                >
                  {markdownParsing ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Importing...
                    </>
                  ) : (
                    <>
                      <Upload className="w-4 h-4 mr-2" />
                      Import & Replace Content
                    </>
                  )}
                </Button>
              </div>
            </div>
          )}

          {/* Detailed Editor Mode */}
          {editMode === "detailed" && (
            <>
          {/* Course Info */}
          <div className="bg-white rounded-lg border shadow-sm p-6">
            <h2 className="font-semibold text-gray-900 mb-4">Course Information</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Course Title
                </label>
                <Input
                  value={course.title}
                  onChange={(e) => setCourse({ ...course, title: e.target.value })}
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
                    <GripVertical className="w-4 h-4 text-gray-400" />
                    {expandedModules.has(module.id) ? (
                      <ChevronDown className="w-4 h-4 text-gray-500" />
                    ) : (
                      <ChevronRight className="w-4 h-4 text-gray-500" />
                    )}
                    <Badge variant="outline" className="text-xs">
                      M{moduleIndex + 1}
                    </Badge>
                    {editingItem?.type === "module" && editingItem.id === module.id ? (
                      <Input
                        className="flex-1 h-8"
                        value={module.title}
                        onChange={(e) =>
                          setCourse({
                            ...course,
                            modules: course.modules.map((m) =>
                              m.id === module.id ? { ...m, title: e.target.value } : m
                            ),
                          })
                        }
                        onClick={(e) => e.stopPropagation()}
                        onBlur={() => {
                          updateModule(module.id, { title: module.title });
                          setEditingItem(null);
                        }}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            updateModule(module.id, { title: module.title });
                            setEditingItem(null);
                          }
                        }}
                        autoFocus
                      />
                    ) : (
                      <span className="flex-1 font-medium text-sm">{module.title}</span>
                    )}
                    <span className="text-xs text-gray-500">
                      {module.topics.length} topics
                    </span>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-7 w-7 p-0"
                      onClick={(e) => {
                        e.stopPropagation();
                        setEditingItem({ type: "module", id: module.id });
                      }}
                    >
                      <Edit2 className="w-3 h-3" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-7 w-7 p-0 text-red-600 hover:text-red-700 hover:bg-red-50"
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
                      {/* Module Description */}
                      <div>
                        <label className="block text-xs font-medium text-gray-500 mb-1">
                          Description
                        </label>
                        <textarea
                          className="w-full px-2 py-1.5 border rounded text-sm focus:outline-none focus:ring-1 focus:ring-primary/20"
                          rows={2}
                          value={module.description}
                          onChange={(e) =>
                            setCourse({
                              ...course,
                              modules: course.modules.map((m) =>
                                m.id === module.id
                                  ? { ...m, description: e.target.value }
                                  : m
                              ),
                            })
                          }
                          onBlur={() =>
                            updateModule(module.id, { description: module.description })
                          }
                        />
                      </div>

                      {/* Learning Outcomes (Why it is Important) */}
                      <div>
                        <label className="block text-xs font-medium text-gray-500 mb-1">
                          Why it is Important (Learning Outcomes)
                        </label>
                        <div className="space-y-2">
                          {(module.learningOutcomes || []).map((outcome, idx) => (
                            <div key={idx} className="flex items-center gap-2">
                              <span className="text-green-500 text-xs">✓</span>
                              <input
                                type="text"
                                className="flex-1 px-2 py-1.5 border rounded text-sm focus:outline-none focus:ring-1 focus:ring-primary/20"
                                value={outcome}
                                onChange={(e) => {
                                  const newOutcomes = [...(module.learningOutcomes || [])];
                                  newOutcomes[idx] = e.target.value;
                                  setCourse({
                                    ...course,
                                    modules: course.modules.map((m) =>
                                      m.id === module.id
                                        ? { ...m, learningOutcomes: newOutcomes }
                                        : m
                                    ),
                                  });
                                }}
                                onBlur={() =>
                                  updateModule(module.id, { learningOutcomes: module.learningOutcomes })
                                }
                              />
                              <button
                                type="button"
                                className="p-1 text-red-500 hover:bg-red-50 rounded"
                                onClick={() => {
                                  const newOutcomes = (module.learningOutcomes || []).filter((_, i) => i !== idx);
                                  setCourse({
                                    ...course,
                                    modules: course.modules.map((m) =>
                                      m.id === module.id
                                        ? { ...m, learningOutcomes: newOutcomes }
                                        : m
                                    ),
                                  });
                                  updateModule(module.id, { learningOutcomes: newOutcomes });
                                }}
                              >
                                <X className="w-3 h-3" />
                              </button>
                            </div>
                          ))}
                          <button
                            type="button"
                            className="text-xs text-primary hover:underline flex items-center gap-1"
                            onClick={() => {
                              const newOutcomes = [...(module.learningOutcomes || []), "New learning outcome"];
                              setCourse({
                                ...course,
                                modules: course.modules.map((m) =>
                                  m.id === module.id
                                    ? { ...m, learningOutcomes: newOutcomes }
                                    : m
                                ),
                              });
                              updateModule(module.id, { learningOutcomes: newOutcomes });
                            }}
                          >
                            <Plus className="w-3 h-3" />
                            Add Learning Outcome
                          </button>
                        </div>
                      </div>

                      {/* Topics */}
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <label className="text-xs font-medium text-gray-500">
                            Topics
                          </label>
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
                              {/* Topic Header */}
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
                                {editingItem?.type === "topic" &&
                                editingItem.id === topic.id ? (
                                  <Input
                                    className="flex-1 h-6 text-sm"
                                    value={topic.title}
                                    onChange={(e) =>
                                      setCourse({
                                        ...course,
                                        modules: course.modules.map((m) => ({
                                          ...m,
                                          topics: m.topics.map((t) =>
                                            t.id === topic.id
                                              ? { ...t, title: e.target.value }
                                              : t
                                          ),
                                        })),
                                      })
                                    }
                                    onClick={(e) => e.stopPropagation()}
                                    onBlur={() => {
                                      updateTopic(topic.id, { title: topic.title });
                                      setEditingItem(null);
                                    }}
                                    onKeyDown={(e) => {
                                      if (e.key === "Enter") {
                                        updateTopic(topic.id, { title: topic.title });
                                        setEditingItem(null);
                                      }
                                    }}
                                    autoFocus
                                  />
                                ) : (
                                  <span className="flex-1 text-sm">{topic.title}</span>
                                )}
                                <span className="text-xs text-gray-400">
                                  {topic.classes.length} classes
                                </span>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="h-6 w-6 p-0"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setEditingItem({ type: "topic", id: topic.id });
                                  }}
                                >
                                  <Edit2 className="w-3 h-3" />
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="h-6 w-6 p-0 text-red-600"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    deleteTopic(topic.id);
                                  }}
                                >
                                  <Trash2 className="w-3 h-3" />
                                </Button>
                              </div>

                              {/* Topic Content - Classes */}
                              {expandedTopics.has(topic.id) && (
                                <div className="p-2 pt-0 space-y-1">
                                  {topic.classes.map((cls, classIndex) => (
                                    <ClassEditor
                                      key={cls.id}
                                      classData={cls}
                                      index={classIndex}
                                      onUpdate={(updates) => updateClass(cls.id, updates)}
                                      onDelete={() => deleteClass(cls.id)}
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
            </div>
          </div>
            </>
          )}
        </div>

        {/* Preview Panel */}
        {showPreview && (
          <div className="bg-white rounded-lg border shadow-sm overflow-hidden sticky top-4 max-h-[calc(100vh-6rem)]">
            <div className="p-4 border-b bg-gray-50">
              <h3 className="font-semibold text-gray-900">Live Preview</h3>
              <p className="text-xs text-gray-500">See how your course will look</p>
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

// Class Editor Component
function ClassEditor({
  classData,
  index,
  onUpdate,
  onDelete,
}: {
  classData: ClassData;
  index: number;
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
        <span className="flex-1 text-xs truncate">{classData.title}</span>
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
            <label className="block text-xs text-gray-500 mb-1">Title</label>
            <Input
              className="h-7 text-xs"
              value={classData.title}
              onChange={(e) => onUpdate({ title: e.target.value })}
            />
          </div>
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
            <LiveContentEditor
              classData={classData}
              onUpdate={onUpdate}
            />
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
            <div className="space-y-2">
              <div>
                <label className="block text-xs text-gray-500 mb-1">Contest URL</label>
                <Input
                  className="h-7 text-xs"
                  value={classData.contestUrl || ""}
                  onChange={(e) => onUpdate({ contestUrl: e.target.value })}
                  placeholder="https://..."
                />
              </div>
              <div>
                <label className="block text-xs text-gray-500 mb-1">Number of Questions</label>
                <Input
                  type="number"
                  className="h-7 text-xs"
                  value={classData.contestQuestions || ""}
                  onChange={(e) => onUpdate({ contestQuestions: parseInt(e.target.value) || undefined })}
                  placeholder="e.g., 10"
                />
              </div>
              <div>
                <label className="block text-xs text-gray-500 mb-1">
                  Syllabus Topics (comma-separated)
                </label>
                <Input
                  className="h-7 text-xs"
                  value={(classData.contestSyllabus || []).join(", ")}
                  onChange={(e) => {
                    const topics = e.target.value
                      .split(",")
                      .map((t) => t.trim())
                      .filter((t) => t.length > 0);
                    onUpdate({ contestSyllabus: topics });
                  }}
                  placeholder="e.g., Logical Reasoning, Aptitude, Basic Maths"
                />
                <p className="text-[10px] text-gray-400 mt-0.5">
                  Enter topics separated by commas
                </p>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// Live Content Editor Component - Split view with live preview
function LiveContentEditor({
  classData,
  onUpdate,
}: {
  classData: ClassData;
  onUpdate: (updates: Partial<ClassData>) => void;
}) {
  const [isFullScreen, setIsFullScreen] = React.useState(false);
  const [localContent, setLocalContent] = React.useState(classData.textContent || "");
  const [hasUnsavedChanges, setHasUnsavedChanges] = React.useState(false);
  const [isSaving, setIsSaving] = React.useState(false);

  // Sync local content when classData changes from outside
  React.useEffect(() => {
    if (!isFullScreen) {
      setLocalContent(classData.textContent || "");
      setHasUnsavedChanges(false);
    }
  }, [classData.textContent, isFullScreen]);

  // Track unsaved changes
  React.useEffect(() => {
    setHasUnsavedChanges(localContent !== (classData.textContent || ""));
  }, [localContent, classData.textContent]);

  // Save handler
  const handleSave = () => {
    setIsSaving(true);
    onUpdate({ textContent: localContent });
    setTimeout(() => {
      setIsSaving(false);
      setHasUnsavedChanges(false);
    }, 300);
  };

  // Save on Ctrl+S
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "s" && isFullScreen) {
        e.preventDefault();
        handleSave();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [localContent, isFullScreen]);

  // Handle close with unsaved changes
  const handleClose = () => {
    if (hasUnsavedChanges) {
      if (window.confirm("You have unsaved changes. Do you want to save before closing?")) {
        handleSave();
      }
    }
    setIsFullScreen(false);
  };

  return (
    <>
      {/* Compact Editor with Full Screen Button */}
      <div>
        <div className="flex items-center justify-between mb-1">
          <label className="block text-xs text-gray-500">Text Content</label>
          <button
            type="button"
            onClick={() => setIsFullScreen(true)}
            className="text-xs text-primary hover:underline flex items-center gap-1"
          >
            <Eye className="w-3 h-3" />
            Live Edit
          </button>
        </div>
        <textarea
          className="w-full px-2 py-1 border rounded text-xs font-mono"
          rows={6}
          value={localContent}
          onChange={(e) => {
            setLocalContent(e.target.value);
            // For compact editor, save immediately
            onUpdate({ textContent: e.target.value });
          }}
          placeholder="Supports Markdown..."
        />
      </div>

      {/* Full Screen Live Editor Modal */}
      {isFullScreen && (
        <div className="fixed inset-0 bg-gray-900 z-50 flex flex-col">
          {/* Header */}
          <div className="bg-white border-b px-4 py-3 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <h2 className="font-semibold text-gray-900">{classData.title}</h2>
              <Badge variant="outline" className="text-xs">
                <FileText className="w-3 h-3 mr-1" />
                Reading Material
              </Badge>
              {hasUnsavedChanges && (
                <span className="text-xs text-amber-600 bg-amber-50 px-2 py-0.5 rounded">
                  Unsaved changes
                </span>
              )}
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs text-gray-400">Ctrl+S to save</span>
              <Button
                size="sm"
                onClick={handleSave}
                disabled={!hasUnsavedChanges || isSaving}
                className="h-8"
              >
                {isSaving ? (
                  <>
                    <Loader2 className="w-3 h-3 mr-1 animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Save className="w-3 h-3 mr-1" />
                    Save
                  </>
                )}
              </Button>
              <button
                onClick={handleClose}
                className="p-2 text-gray-500 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Split View */}
          <div className="flex-1 flex overflow-hidden">
            {/* Editor Panel */}
            <div className="w-1/2 flex flex-col border-r bg-white">
              <div className="px-4 py-2 border-b bg-gray-50">
                <span className="text-sm font-medium text-gray-700">Markdown Editor</span>
              </div>
              <textarea
                className="flex-1 w-full p-4 font-mono text-sm resize-none focus:outline-none"
                value={localContent}
                onChange={(e) => setLocalContent(e.target.value)}
                placeholder="Write your content in Markdown..."
                autoFocus
              />
            </div>

            {/* Preview Panel */}
            <div className="w-1/2 flex flex-col bg-gray-50">
              <div className="px-4 py-2 border-b bg-gray-100">
                <span className="text-sm font-medium text-gray-700">Live Preview</span>
              </div>
              <div className="flex-1 overflow-auto">
                <div className="bg-white min-h-full">
                  {/* Match actual class page header */}
                  <div className="p-4 sm:p-5 md:p-6 border-b flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center flex-shrink-0">
                      <FileText className="w-5 h-5 text-amber-600" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <span className="text-sm font-medium text-gray-500 block">Reading Material</span>
                      <div className="flex items-center gap-1.5 text-xs text-gray-400">
                        <span>{Math.ceil(classData.duration / 60)} min read</span>
                      </div>
                    </div>
                  </div>
                  {/* Content */}
                  <div className="px-4 py-6 sm:px-6 sm:py-8 md:px-8 md:py-10">
                    {localContent ? (
                      <MarkdownRenderer content={localContent} />
                    ) : (
                      <p className="text-gray-400 text-center py-8">Start typing to see preview...</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

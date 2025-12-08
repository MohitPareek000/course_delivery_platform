import { Course, Round, Topic, Module, UserProgress, CourseAccess } from "@/types";

// Mock Users
export const mockUsers = [
  {
    id: "user-1",
    email: "learner@example.com",
    name: "Mohit",
    createdAt: new Date("2024-01-01"),
  },
];

// Mock Courses
export const mockCourses: Course[] = [
  {
    id: "course-1",
    title: "TCS Interview Preparation",
    description: "Complete preparation guide for TCS interview rounds",
    companyName: "TCS",
    type: "company-specific",
    thumbnailUrl: "/tcs-logo.png",
    createdAt: new Date("2024-01-01"),
  },
  {
    id: "course-2",
    title: "Infosys Interview Preparation",
    description: "Comprehensive Infosys interview preparation course",
    companyName: "Infosys",
    type: "company-specific",
    thumbnailUrl: "/infosys-logo.png",
    createdAt: new Date("2024-01-01"),
  },
  {
    id: "course-3",
    title: "Java Full Stack Bootcamp",
    description: "Master Java full stack development",
    type: "skill-based",
    thumbnailUrl: "/java-logo.png",
    createdAt: new Date("2024-01-01"),
  },
];

// Mock Rounds (for company-specific courses)
export const mockRounds: Round[] = [
  {
    id: "round-1-1",
    courseId: "course-1",
    title: "Round 1: Aptitude & Reasoning",
    description: "Master quantitative aptitude, logical reasoning, and verbal ability",
    order: 1,
    learningOutcomes: [
      "Solve complex quantitative problems quickly",
      "Master logical reasoning patterns",
      "Improve verbal comprehension skills",
      "Practice time management techniques",
    ],
  },
  {
    id: "round-1-2",
    courseId: "course-1",
    title: "Round 2: Technical MCQ",
    description: "Technical multiple choice questions on programming and computer science",
    order: 2,
    learningOutcomes: [
      "Understand core programming concepts",
      "Master data structures and algorithms",
      "Learn database fundamentals",
      "Grasp operating system concepts",
    ],
  },
  {
    id: "round-1-3",
    courseId: "course-1",
    title: "Round 3: Coding Round",
    description: "Live coding assessment with problem-solving challenges",
    order: 3,
    learningOutcomes: [
      "Write efficient algorithms",
      "Practice common coding patterns",
      "Debug code effectively",
      "Optimize time and space complexity",
    ],
  },
  {
    id: "round-2-1",
    courseId: "course-2",
    title: "Round 1: Online Assessment",
    description: "Aptitude, reasoning, and basic technical assessment",
    order: 1,
    learningOutcomes: [
      "Excel in aptitude tests",
      "Master logical puzzles",
      "Answer technical MCQs confidently",
    ],
  },
  {
    id: "round-2-2",
    courseId: "course-2",
    title: "Round 2: Technical Interview",
    description: "In-depth technical interview preparation",
    order: 2,
    learningOutcomes: [
      "Explain technical concepts clearly",
      "Solve coding problems on whiteboard",
      "Discuss project experiences effectively",
    ],
  },
];

// Mock Topics
export const mockTopics: Topic[] = [
  // TCS Round 1 Topics
  {
    id: "topic-1-1",
    roundId: "round-1-1",
    courseId: "course-1",
    title: "Quantitative Aptitude",
    order: 1,
  },
  {
    id: "topic-1-2",
    roundId: "round-1-1",
    courseId: "course-1",
    title: "Logical Reasoning",
    order: 2,
  },
  {
    id: "topic-1-3",
    roundId: "round-1-1",
    courseId: "course-1",
    title: "Verbal Ability",
    order: 3,
  },
  // TCS Round 2 Topics
  {
    id: "topic-2-1",
    roundId: "round-1-2",
    courseId: "course-1",
    title: "Programming Fundamentals",
    order: 1,
  },
  {
    id: "topic-2-2",
    roundId: "round-1-2",
    courseId: "course-1",
    title: "Data Structures",
    order: 2,
  },
  // TCS Round 3 Topics
  {
    id: "topic-3-1",
    roundId: "round-1-3",
    courseId: "course-1",
    title: "Array and String Problems",
    order: 1,
  },
  {
    id: "topic-3-2",
    roundId: "round-1-3",
    courseId: "course-1",
    title: "Dynamic Programming",
    order: 2,
  },
  // Infosys Topics
  {
    id: "topic-4-1",
    roundId: "round-2-1",
    courseId: "course-2",
    title: "Aptitude Basics",
    order: 1,
  },
  {
    id: "topic-4-2",
    roundId: "round-2-1",
    courseId: "course-2",
    title: "Technical MCQ Practice",
    order: 2,
  },
  // Java Bootcamp Topics (skill-based, no roundId)
  {
    id: "topic-5-1",
    courseId: "course-3",
    title: "Java Basics",
    order: 1,
  },
  {
    id: "topic-5-2",
    courseId: "course-3",
    title: "OOP Concepts",
    order: 2,
  },
  {
    id: "topic-5-3",
    courseId: "course-3",
    title: "Spring Boot Framework",
    order: 3,
  },
];

// Mock Modules
export const mockModules: Module[] = [
  // Quantitative Aptitude Modules
  {
    id: "module-1-1",
    topicId: "topic-1-1",
    title: "Introduction to Number Systems",
    description: "Learn the basics of number systems and conversions",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    duration: 900, // 15 minutes
    order: 1,
  },
  {
    id: "module-1-2",
    topicId: "topic-1-1",
    title: "Percentages and Ratios",
    description: "Master percentage calculations and ratio problems",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    duration: 1200, // 20 minutes
    order: 2,
  },
  {
    id: "module-1-3",
    topicId: "topic-1-1",
    title: "Time and Work Problems",
    description: "Solve time and work problems efficiently",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    duration: 1800, // 30 minutes
    order: 3,
  },
  // Logical Reasoning Modules
  {
    id: "module-2-1",
    topicId: "topic-1-2",
    title: "Series and Patterns",
    description: "Identify patterns and complete series",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    duration: 900,
    order: 1,
  },
  {
    id: "module-2-2",
    topicId: "topic-1-2",
    title: "Coding-Decoding",
    description: "Master coding and decoding techniques",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    duration: 1200,
    order: 2,
  },
  // Verbal Ability Modules
  {
    id: "module-3-1",
    topicId: "topic-1-3",
    title: "Reading Comprehension",
    description: "Improve reading speed and comprehension",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    duration: 1500,
    order: 1,
  },
  // Programming Fundamentals Modules
  {
    id: "module-4-1",
    topicId: "topic-2-1",
    title: "Variables and Data Types",
    description: "Understanding variables and data types in programming",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    duration: 1200,
    order: 1,
  },
  {
    id: "module-4-2",
    topicId: "topic-2-1",
    title: "Control Structures",
    description: "Master if-else, loops, and switch statements",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    duration: 1800,
    order: 2,
  },
  // Data Structures Modules
  {
    id: "module-5-1",
    topicId: "topic-2-2",
    title: "Arrays and Linked Lists",
    description: "Understanding array and linked list data structures",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    duration: 2400,
    order: 1,
  },
  // Java Bootcamp Modules
  {
    id: "module-6-1",
    topicId: "topic-5-1",
    title: "Java Installation and Setup",
    description: "Setting up Java development environment",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    duration: 600,
    order: 1,
  },
  {
    id: "module-6-2",
    topicId: "topic-5-1",
    title: "Your First Java Program",
    description: "Writing and running your first Java program",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    duration: 900,
    order: 2,
  },
];

// Mock User Progress
export const mockUserProgress: UserProgress[] = [
  {
    id: "progress-1",
    userId: "user-1",
    moduleId: "module-1-1",
    watchedDuration: 900,
    isCompleted: true,
    lastWatchedAt: new Date("2024-01-15"),
    completedAt: new Date("2024-01-15"),
  },
  {
    id: "progress-2",
    userId: "user-1",
    moduleId: "module-1-2",
    watchedDuration: 600,
    isCompleted: false,
    lastWatchedAt: new Date("2024-01-16"),
  },
];

// Mock Course Access
export const mockCourseAccess: CourseAccess[] = [
  {
    id: "access-1",
    userId: "user-1",
    courseId: "course-1",
    assignedAt: new Date("2024-01-01"),
  },
  {
    id: "access-2",
    userId: "user-1",
    courseId: "course-2",
    assignedAt: new Date("2024-01-01"),
  },
  {
    id: "access-3",
    userId: "user-1",
    courseId: "course-3",
    assignedAt: new Date("2024-01-01"),
  },
];

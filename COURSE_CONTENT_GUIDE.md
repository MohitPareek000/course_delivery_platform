# Course Content Submission Guide

## 📋 Overview
This document outlines all the content required to add a new course to the InterviewPrep platform. Follow this template to ensure all necessary information is provided.

---

## 🎯 Quick Summary

To add a complete course, you need to provide:
1. **Course Information** (basic details)
2. **Rounds** (only for company-specific courses)
3. **Topics** (subjects/sections)
4. **Modules** (individual video lessons)
5. **User Access** (who can access)

---

## 📝 STEP 1: Course Information

### Template
```javascript
{
  id: "course-unique-id",
  title: "Course Title",
  description: "Brief course description (1-2 sentences)",
  companyName: "Company Name", // Optional - only for company-specific
  type: "company-specific" OR "skill-based",
  thumbnailUrl: "/logo.png", // Optional
  createdAt: "2024-01-01"
}
```

### Fields Explanation

| Field | Required? | Description | Example |
|-------|-----------|-------------|---------|
| **id** | ✅ Yes | Unique identifier (lowercase, hyphenated) | `"course-wipro-2024"` |
| **title** | ✅ Yes | Course name (clear and descriptive) | `"Wipro Interview Preparation"` |
| **description** | ✅ Yes | Brief overview (50-100 words) | `"Complete guide for Wipro interview..."` |
| **companyName** | ⚠️ Conditional | Company name (required if type is company-specific) | `"Wipro"`, `"Google"` |
| **type** | ✅ Yes | Either `"company-specific"` or `"skill-based"` | `"company-specific"` |
| **thumbnailUrl** | ❌ No | Path to logo/thumbnail image | `"/wipro-logo.png"` |
| **createdAt** | ✅ Yes | Creation date | `"2024-01-15"` |

### Examples

#### Company-Specific Course
```javascript
{
  id: "course-wipro-2024",
  title: "Wipro Interview Preparation",
  description: "Comprehensive preparation guide covering all Wipro interview rounds including aptitude, technical, and HR interviews",
  companyName: "Wipro",
  type: "company-specific",
  thumbnailUrl: "/wipro-logo.png",
  createdAt: "2024-01-15"
}
```

#### Skill-Based Course
```javascript
{
  id: "course-python-fullstack",
  title: "Python Full Stack Development",
  description: "Master Python backend with Django/Flask and modern frontend frameworks to become a full stack developer",
  type: "skill-based",
  thumbnailUrl: "/python-logo.png",
  createdAt: "2024-01-15"
}
```

---

## 🎪 STEP 2: Rounds (Only for Company-Specific Courses)

> ⚠️ **Skip this step if creating a skill-based course**

### Template
```javascript
{
  id: "round-unique-id",
  courseId: "course-id-from-step-1",
  title: "Round 1: Round Name",
  description: "What this round covers",
  order: 1,
  learningOutcomes: [
    "Outcome 1",
    "Outcome 2",
    "Outcome 3"
  ]
}
```

### Fields Explanation

| Field | Required? | Description |
|-------|-----------|-------------|
| **id** | ✅ Yes | Unique round identifier |
| **courseId** | ✅ Yes | Must match course ID from Step 1 |
| **title** | ✅ Yes | Round name (e.g., "Round 1: Aptitude Test") |
| **description** | ✅ Yes | What topics/skills this round covers |
| **order** | ✅ Yes | Sequential number (1, 2, 3...) |
| **learningOutcomes** | ✅ Yes | Array of 3-5 learning outcomes |

### Common Round Types

1. **Round 1: Aptitude & Reasoning**
   - Quantitative aptitude
   - Logical reasoning
   - Verbal ability

2. **Round 2: Technical MCQ**
   - Programming concepts
   - Data structures
   - Database knowledge
   - Operating systems

3. **Round 3: Coding Round**
   - Algorithm problems
   - Live coding
   - Code optimization

4. **Round 4: Technical Interview**
   - Technical discussion
   - Project explanation
   - Problem-solving

5. **Round 5: HR Interview**
   - Behavioral questions
   - Company fit
   - Salary negotiation

### Example - Wipro Interview Rounds

```javascript
// Round 1
{
  id: "round-wipro-1",
  courseId: "course-wipro-2024",
  title: "Round 1: Online Assessment",
  description: "Aptitude, logical reasoning, and basic technical assessment covering quantitative ability, verbal skills, and fundamental programming concepts",
  order: 1,
  learningOutcomes: [
    "Solve quantitative problems within time limits",
    "Master logical reasoning patterns and puzzles",
    "Answer verbal ability questions accurately",
    "Understand basic programming concepts"
  ]
}

// Round 2
{
  id: "round-wipro-2",
  courseId: "course-wipro-2024",
  title: "Round 2: Technical Interview",
  description: "In-depth technical discussion covering programming languages, data structures, algorithms, and project experience",
  order: 2,
  learningOutcomes: [
    "Explain technical concepts clearly",
    "Solve coding problems on whiteboard",
    "Discuss project architecture and challenges",
    "Demonstrate problem-solving approach"
  ]
}

// Round 3
{
  id: "round-wipro-3",
  courseId: "course-wipro-2024",
  title: "Round 3: HR Interview",
  description: "Final round focusing on behavioral assessment, company culture fit, and career goals discussion",
  order: 3,
  learningOutcomes: [
    "Answer behavioral questions effectively",
    "Demonstrate cultural fit with company values",
    "Discuss career aspirations clearly",
    "Handle salary negotiation professionally"
  ]
}
```

---

## 📚 STEP 3: Topics

Topics are the main subjects/sections within your course.

### Template
```javascript
{
  id: "topic-unique-id",
  roundId: "round-id", // Optional - only for company-specific courses
  courseId: "course-id-from-step-1",
  title: "Topic Name",
  order: 1
}
```

### Fields Explanation

| Field | Required? | Description |
|-------|-----------|-------------|
| **id** | ✅ Yes | Unique topic identifier |
| **roundId** | ⚠️ Conditional | Required for company-specific (links to round) |
| **courseId** | ✅ Yes | Must match course ID from Step 1 |
| **title** | ✅ Yes | Topic name (clear and concise) |
| **order** | ✅ Yes | Sequential number within round/course |

### Example - Company-Specific Topics (Wipro)

```javascript
// Round 1 Topics
{
  id: "topic-wipro-quant",
  roundId: "round-wipro-1",
  courseId: "course-wipro-2024",
  title: "Quantitative Aptitude",
  order: 1
}

{
  id: "topic-wipro-reasoning",
  roundId: "round-wipro-1",
  courseId: "course-wipro-2024",
  title: "Logical Reasoning",
  order: 2
}

{
  id: "topic-wipro-verbal",
  roundId: "round-wipro-1",
  courseId: "course-wipro-2024",
  title: "Verbal Ability",
  order: 3
}

// Round 2 Topics
{
  id: "topic-wipro-dsa",
  roundId: "round-wipro-2",
  courseId: "course-wipro-2024",
  title: "Data Structures & Algorithms",
  order: 1
}

{
  id: "topic-wipro-programming",
  roundId: "round-wipro-2",
  courseId: "course-wipro-2024",
  title: "Programming Fundamentals",
  order: 2
}
```

### Example - Skill-Based Topics (Python)

```javascript
{
  id: "topic-python-basics",
  courseId: "course-python-fullstack",
  title: "Python Basics",
  order: 1
}

{
  id: "topic-python-oop",
  courseId: "course-python-fullstack",
  title: "Object-Oriented Programming",
  order: 2
}

{
  id: "topic-python-django",
  courseId: "course-python-fullstack",
  title: "Django Framework",
  order: 3
}

{
  id: "topic-python-frontend",
  courseId: "course-python-fullstack",
  title: "Frontend Development",
  order: 4
}
```

---

## 🎥 STEP 4: Modules (Video Lessons)

Modules are individual video lessons within each topic.

### Template
```javascript
{
  id: "module-unique-id",
  topicId: "topic-id-from-step-3",
  title: "Lesson Title",
  description: "Brief description of what's covered", // Optional
  videoUrl: "https://www.youtube.com/embed/VIDEO_ID",
  duration: 900, // Duration in seconds
  order: 1
}
```

### Fields Explanation

| Field | Required? | Description | Example |
|-------|-----------|-------------|---------|
| **id** | ✅ Yes | Unique module identifier | `"module-wipro-quant-1"` |
| **topicId** | ✅ Yes | Must match topic ID from Step 3 | `"topic-wipro-quant"` |
| **title** | ✅ Yes | Clear lesson title | `"Number Systems Basics"` |
| **description** | ❌ No | Brief overview (recommended) | `"Learn binary, octal, hex..."` |
| **videoUrl** | ✅ Yes | YouTube embed or direct video URL | `"https://youtube.com/embed/abc123"` |
| **duration** | ✅ Yes | Video length in seconds | `900` (15 minutes) |
| **order** | ✅ Yes | Sequential number within topic | `1, 2, 3...` |

### Duration Conversion Table

| Time | Seconds | Time | Seconds |
|------|---------|------|---------|
| 5 min | 300 | 30 min | 1800 |
| 10 min | 600 | 45 min | 2700 |
| 15 min | 900 | 1 hour | 3600 |
| 20 min | 1200 | 1.5 hours | 5400 |
| 25 min | 1500 | 2 hours | 7200 |

### Video URL Formats

✅ **Correct - YouTube Embed:**
```
https://www.youtube.com/embed/dQw4w9WgXcQ
```

❌ **Wrong - YouTube Watch:**
```
https://www.youtube.com/watch?v=dQw4w9WgXcQ
```

✅ **Correct - Direct Video:**
```
https://yourdomain.com/videos/lesson1.mp4
```

✅ **Correct - Vimeo Embed:**
```
https://player.vimeo.com/video/123456789
```

### Example Modules - Quantitative Aptitude Topic

```javascript
// Module 1
{
  id: "module-wipro-quant-1",
  topicId: "topic-wipro-quant",
  title: "Number Systems and Conversions",
  description: "Learn binary, octal, hexadecimal number systems and how to convert between them efficiently",
  videoUrl: "https://www.youtube.com/embed/VIDEO_ID_1",
  duration: 900, // 15 minutes
  order: 1
}

// Module 2
{
  id: "module-wipro-quant-2",
  topicId: "topic-wipro-quant",
  title: "Percentages and Ratios",
  description: "Master percentage calculations, ratio problems, and proportions with shortcuts and tricks",
  videoUrl: "https://www.youtube.com/embed/VIDEO_ID_2",
  duration: 1200, // 20 minutes
  order: 2
}

// Module 3
{
  id: "module-wipro-quant-3",
  topicId: "topic-wipro-quant",
  title: "Time and Work Problems",
  description: "Solve time and work problems using efficient formulas and techniques",
  videoUrl: "https://www.youtube.com/embed/VIDEO_ID_3",
  duration: 1500, // 25 minutes
  order: 3
}

// Module 4
{
  id: "module-wipro-quant-4",
  topicId: "topic-wipro-quant",
  title: "Profit and Loss",
  description: "Calculate profit, loss, discount, and marked price with real-world examples",
  videoUrl: "https://www.youtube.com/embed/VIDEO_ID_4",
  duration: 1200, // 20 minutes
  order: 4
}
```

---

## 👥 STEP 5: User Access

Define which users can access this course.

### Template
```javascript
{
  id: "access-unique-id",
  userId: "user-1",
  courseId: "course-id-from-step-1",
  assignedAt: "2024-01-15"
}
```

### Example
```javascript
{
  id: "access-wipro-user1",
  userId: "user-1",
  courseId: "course-wipro-2024",
  assignedAt: "2024-01-15"
}
```

---

## 📊 Complete Course Example - Wipro Interview Prep

### Course Structure Overview
```
📘 Wipro Interview Preparation
├── 🎪 Round 1: Online Assessment
│   ├── 📚 Quantitative Aptitude
│   │   ├── 🎥 Number Systems (15 min)
│   │   ├── 🎥 Percentages and Ratios (20 min)
│   │   ├── 🎥 Time and Work (25 min)
│   │   └── 🎥 Profit and Loss (20 min)
│   ├── 📚 Logical Reasoning
│   │   ├── 🎥 Series and Patterns (15 min)
│   │   ├── 🎥 Coding-Decoding (20 min)
│   │   └── 🎥 Blood Relations (18 min)
│   └── 📚 Verbal Ability
│       ├── 🎥 Grammar Basics (20 min)
│       └── 🎥 Reading Comprehension (25 min)
├── 🎪 Round 2: Technical Interview
│   ├── 📚 Data Structures & Algorithms
│   │   ├── 🎥 Arrays and Strings (30 min)
│   │   ├── 🎥 Linked Lists (35 min)
│   │   └── 🎥 Trees and Graphs (40 min)
│   └── 📚 Programming Fundamentals
│       ├── 🎥 OOP Concepts (30 min)
│       └── 🎥 Database Basics (25 min)
└── 🎪 Round 3: HR Interview
    └── 📚 Behavioral Questions
        ├── 🎥 Common HR Questions (20 min)
        └── 🎥 Salary Negotiation (15 min)

Total: 3 Rounds, 7 Topics, 14 Modules, ~6.5 hours
```

---

## ✅ Content Submission Checklist

Use this checklist to ensure you've provided all necessary content:

### Course Level
- [ ] Unique course ID
- [ ] Course title (clear and descriptive)
- [ ] Course description (50-100 words)
- [ ] Course type (company-specific or skill-based)
- [ ] Company name (if applicable)
- [ ] Thumbnail/logo image (optional)

### Rounds Level (Company-Specific Only)
- [ ] All rounds defined with IDs
- [ ] Round titles with numbers
- [ ] Round descriptions
- [ ] Correct sequential ordering
- [ ] 3-5 learning outcomes per round

### Topics Level
- [ ] All topics defined with IDs
- [ ] Topics linked to correct round/course
- [ ] Clear topic titles
- [ ] Correct sequential ordering

### Modules Level
- [ ] All modules defined with IDs
- [ ] Modules linked to correct topics
- [ ] Clear module titles
- [ ] Module descriptions (recommended)
- [ ] Valid video URLs (YouTube embed format)
- [ ] Accurate durations in seconds
- [ ] Correct sequential ordering

### Access Level
- [ ] User access entries created
- [ ] Users assigned to course

---

## 📋 Submission Template

Copy and fill this template when submitting new course content:

```markdown
## New Course Submission

### 1. Course Information
- **ID:** course-[name]
- **Title:** [Course Name]
- **Description:** [Brief description]
- **Type:** company-specific / skill-based
- **Company Name:** [If applicable]

### 2. Rounds (if company-specific)
**Round 1:**
- ID: round-[name]-1
- Title: Round 1: [Name]
- Description: [What it covers]
- Learning Outcomes: [3-5 outcomes]

**Round 2:**
[Repeat as needed]

### 3. Topics
**Topic 1:**
- ID: topic-[name]-1
- Round ID: [If applicable]
- Title: [Topic Name]

[Repeat for all topics]

### 4. Modules
**Module 1:**
- ID: module-[name]-1
- Topic ID: topic-[name]-1
- Title: [Lesson Name]
- Description: [Brief description]
- Video URL: [YouTube embed URL]
- Duration: [Seconds]

[Repeat for all modules]

### 5. Video Content Checklist
- [ ] All videos recorded
- [ ] Videos uploaded to YouTube (or host)
- [ ] Embed URLs ready
- [ ] Video durations measured
- [ ] Audio quality verified
- [ ] Video quality verified (720p minimum)
```

---

## 🎬 Video Content Guidelines

### Technical Requirements
- **Resolution:** Minimum 720p (1280x720)
- **Format:** MP4, WebM, or YouTube
- **Audio:** Clear, noise-free
- **Bitrate:** Minimum 2 Mbps
- **Aspect Ratio:** 16:9

### Content Guidelines
- **Introduction:** 30-60 seconds introducing the topic
- **Main Content:** Core concepts with examples
- **Practice:** Worked examples or problems
- **Summary:** Key takeaways (30-60 seconds)
- **Length:** Ideally 10-30 minutes per module

### Best Practices
1. Start with learning objectives
2. Use visual aids and diagrams
3. Include real-world examples
4. Provide practice problems
5. Summarize key points at the end
6. Keep energy level consistent
7. Avoid background noise
8. Use good lighting

---

## 📞 Support

If you need help or have questions about content submission:
- Email: support@interviewprep.com
- Documentation: [Link to docs]
- Sample courses: Check existing courses in the platform

---

## 📝 Notes

1. **Sequential Unlocking:** Modules unlock sequentially. Users must complete previous module to access next.

2. **Progress Tracking:** System automatically tracks:
   - Watch time per module
   - Completion status (98% threshold)
   - Overall course progress

3. **Ordering:** The `order` field determines the sequence. Always start from 1.

4. **Video URLs:** Must be publicly accessible. Private/unlisted videos won't work.

5. **Duration Accuracy:** Must match actual video length for accurate progress tracking.

6. **IDs:** Must be unique across entire platform. Use descriptive, hyphenated naming.

---

*Last Updated: January 2025*
*Version: 1.0*

# Unified Course Structure Guide

## 📋 Overview
This guide explains the **universal course structure** that works for ALL course types - whether it's a company interview preparation course, a skill-based bootcamp, or any other learning content.

---

## 🏗️ Universal Structure

**Every course follows this 4-level hierarchy:**

```
📘 COURSE
  └── 📑 SECTION (Optional grouping level)
      └── 📚 TOPIC
          └── 🎥 MODULE (Video Lesson)
```

### What Each Level Represents:

| Level | Purpose | Examples |
|-------|---------|----------|
| **Course** | The main learning program | "TCS Interview Prep", "Python Bootcamp" |
| **Section** | Major divisions (OPTIONAL) | "Round 1", "Beginner Level", "Part A" |
| **Topic** | Subject areas | "Aptitude", "Python Basics", "Web Development" |
| **Module** | Individual video lessons | "Number Systems (15 min video)" |

---

## 🎯 Structure Flexibility

### When to Use Sections

✅ **Use Sections when you need to group topics into major divisions:**
- **Company Interview Courses:** "Round 1: Aptitude", "Round 2: Technical"
- **Skill Bootcamps:** "Part 1: Fundamentals", "Part 2: Advanced", "Part 3: Projects"
- **Certification Courses:** "Module A: Theory", "Module B: Practical"
- **Language Learning:** "Level 1: Beginner", "Level 2: Intermediate"

❌ **Skip Sections for simpler courses:**
- Short courses with 3-5 topics
- Single-subject courses
- Courses without natural major divisions

---

## 📝 Complete Structure Template

### 1️⃣ COURSE (Required)

```javascript
{
  id: "course-[name]",
  title: "Course Name",
  description: "Brief course description",
  companyName: "Company", // Optional - for company-specific only
  type: "company-specific" OR "skill-based",
  thumbnailUrl: "/logo.png", // Optional
  createdAt: "2024-01-15"
}
```

---

### 2️⃣ SECTION (Optional - Use if needed)

```javascript
{
  id: "section-[name]-[number]",
  courseId: "course-[name]",
  title: "Section Title",
  description: "What this section covers",
  order: 1,
  learningOutcomes: [
    "Learning outcome 1",
    "Learning outcome 2",
    "Learning outcome 3"
  ]
}
```

**Section Title Examples:**
- Company Interviews: `"Round 1: Aptitude & Reasoning"`
- Skill Course: `"Part 1: Python Fundamentals"`
- Certification: `"Module A: Introduction"`
- Language: `"Level 1: Beginner"`
- Academic: `"Semester 1"`
- Project-Based: `"Phase 1: Planning"`

---

### 3️⃣ TOPIC (Required)

```javascript
{
  id: "topic-[name]",
  roundId: "section-[name]", // Optional - only if using sections
  courseId: "course-[name]",
  title: "Topic Name",
  order: 1
}
```

---

### 4️⃣ MODULE (Required - The actual video lessons)

```javascript
{
  id: "module-[name]",
  topicId: "topic-[name]",
  title: "Lesson Title",
  description: "Brief lesson description", // Optional
  videoUrl: "https://www.youtube.com/embed/VIDEO_ID",
  duration: 900, // Seconds (15 min = 900)
  order: 1
}
```

---

## 💼 Example 1: Company Interview Course (WITH Sections)

### Course: TCS Interview Preparation

```
📘 TCS Interview Preparation (company-specific)
│
├── 📑 SECTION 1: Round 1 - Aptitude & Reasoning
│   ├── 📚 Quantitative Aptitude
│   │   ├── 🎥 Number Systems (15 min)
│   │   ├── 🎥 Percentages (20 min)
│   │   └── 🎥 Time & Work (25 min)
│   ├── 📚 Logical Reasoning
│   │   ├── 🎥 Series Patterns (15 min)
│   │   └── 🎥 Coding-Decoding (20 min)
│   └── 📚 Verbal Ability
│       └── 🎥 Grammar Basics (20 min)
│
├── 📑 SECTION 2: Round 2 - Technical MCQ
│   ├── 📚 Programming Fundamentals
│   │   ├── 🎥 OOP Concepts (30 min)
│   │   └── 🎥 Data Structures (35 min)
│   └── 📚 Database Concepts
│       └── 🎥 SQL Basics (25 min)
│
└── 📑 SECTION 3: Round 3 - HR Interview
    └── 📚 Interview Skills
        ├── 🎥 Common Questions (20 min)
        └── 🎥 Salary Negotiation (15 min)
```

### Data Structure:

```javascript
// COURSE
{
  id: "course-tcs-2024",
  title: "TCS Interview Preparation",
  description: "Complete preparation for all TCS interview rounds",
  companyName: "TCS",
  type: "company-specific",
  createdAt: "2024-01-15"
}

// SECTION 1
{
  id: "section-tcs-round1",
  courseId: "course-tcs-2024",
  title: "Round 1: Aptitude & Reasoning",
  description: "Quantitative aptitude, logical reasoning, and verbal ability",
  order: 1,
  learningOutcomes: [
    "Solve quantitative problems quickly",
    "Master logical reasoning patterns",
    "Improve verbal comprehension"
  ]
}

// TOPIC under Section 1
{
  id: "topic-tcs-quant",
  roundId: "section-tcs-round1",
  courseId: "course-tcs-2024",
  title: "Quantitative Aptitude",
  order: 1
}

// MODULE under Topic
{
  id: "module-tcs-quant-1",
  topicId: "topic-tcs-quant",
  title: "Number Systems and Conversions",
  description: "Learn binary, octal, and hexadecimal conversions",
  videoUrl: "https://www.youtube.com/embed/VIDEO_ID",
  duration: 900,
  order: 1
}
```

---

## 🎓 Example 2: Skill-Based Course (WITH Sections)

### Course: Python Full Stack Development

```
📘 Python Full Stack Development (skill-based)
│
├── 📑 SECTION 1: Part 1 - Python Fundamentals
│   ├── 📚 Python Basics
│   │   ├── 🎥 Variables & Data Types (20 min)
│   │   ├── 🎥 Control Flow (25 min)
│   │   └── 🎥 Functions (30 min)
│   └── 📚 Object-Oriented Programming
│       ├── 🎥 Classes & Objects (30 min)
│       └── 🎥 Inheritance (25 min)
│
├── 📑 SECTION 2: Part 2 - Backend Development
│   ├── 📚 Django Framework
│   │   ├── 🎥 Django Setup (20 min)
│   │   ├── 🎥 Models & ORM (35 min)
│   │   └── 🎥 Views & Templates (30 min)
│   └── 📚 REST APIs
│       ├── 🎥 API Basics (25 min)
│       └── 🎥 Django REST Framework (40 min)
│
└── 📑 SECTION 3: Part 3 - Frontend & Deployment
    ├── 📚 Frontend Development
    │   ├── 🎥 HTML & CSS (30 min)
    │   └── 🎥 JavaScript Basics (35 min)
    └── 📚 Deployment
        └── 🎥 Heroku Deployment (25 min)
```

### Data Structure:

```javascript
// COURSE
{
  id: "course-python-fullstack",
  title: "Python Full Stack Development",
  description: "Complete bootcamp from Python basics to deployment",
  type: "skill-based",
  createdAt: "2024-01-15"
}

// SECTION 1
{
  id: "section-python-part1",
  courseId: "course-python-fullstack",
  title: "Part 1: Python Fundamentals",
  description: "Master Python programming from basics to OOP",
  order: 1,
  learningOutcomes: [
    "Write Python programs confidently",
    "Understand object-oriented concepts",
    "Build reusable code with functions and classes"
  ]
}

// TOPIC under Section 1
{
  id: "topic-python-basics",
  roundId: "section-python-part1",
  courseId: "course-python-fullstack",
  title: "Python Basics",
  order: 1
}

// MODULE under Topic
{
  id: "module-python-variables",
  topicId: "topic-python-basics",
  title: "Variables and Data Types",
  description: "Learn Python variables, strings, numbers, and type conversion",
  videoUrl: "https://www.youtube.com/embed/VIDEO_ID",
  duration: 1200,
  order: 1
}
```

---

## 📚 Example 3: Simple Course (WITHOUT Sections)

### Course: Git & GitHub Essentials

```
📘 Git & GitHub Essentials (skill-based)
│
├── 📚 Git Basics
│   ├── 🎥 What is Git? (10 min)
│   ├── 🎥 Installation & Setup (15 min)
│   └── 🎥 First Repository (20 min)
│
├── 📚 Git Commands
│   ├── 🎥 Add, Commit, Push (25 min)
│   └── 🎥 Branching & Merging (30 min)
│
└── 📚 GitHub Features
    ├── 🎥 Pull Requests (20 min)
    └── 🎥 Collaboration (25 min)
```

### Data Structure (Notice: NO Sections):

```javascript
// COURSE
{
  id: "course-git-essentials",
  title: "Git & GitHub Essentials",
  description: "Master version control with Git and GitHub",
  type: "skill-based",
  createdAt: "2024-01-15"
}

// TOPIC (directly under course, no section)
{
  id: "topic-git-basics",
  courseId: "course-git-essentials", // No roundId/sectionId
  title: "Git Basics",
  order: 1
}

// MODULE under Topic
{
  id: "module-git-intro",
  topicId: "topic-git-basics",
  title: "What is Git?",
  description: "Introduction to version control and Git",
  videoUrl: "https://www.youtube.com/embed/VIDEO_ID",
  duration: 600,
  order: 1
}
```

---

## 🔄 More Section Title Examples

### For Different Course Types:

| Course Type | Section Naming |
|-------------|---------------|
| **Interview Prep** | Round 1, Round 2, Round 3 |
| **Bootcamp** | Part 1, Part 2, Part 3 |
| **Certification** | Module A, Module B, Module C |
| **Academic** | Week 1, Week 2, Week 3 |
| **Language** | Level 1: Beginner, Level 2: Intermediate |
| **Project-Based** | Phase 1: Planning, Phase 2: Development |
| **Exam Prep** | Section A: Theory, Section B: Practical |
| **Skills Course** | Fundamentals, Intermediate, Advanced |

---

## ✅ Decision Tree: Do I Need Sections?

```
Do you have 3+ major divisions in your course?
├── YES → Use Sections
│   └── Examples: Multiple rounds, parts, levels, modules
└── NO → Skip Sections
    └── Examples: Simple courses with just topics
```

**Questions to Ask:**
1. Does my course have natural major divisions? (YES = Use Sections)
2. Are there more than 8-10 topics? (YES = Consider grouping with Sections)
3. Do topics need to be grouped for better organization? (YES = Use Sections)
4. Is this a short, simple course? (YES = Skip Sections)

---

## 📊 Content Submission Checklist

### For ALL Courses:
- [ ] ✅ Course information
- [ ] ✅ All topics defined
- [ ] ✅ All modules with videos
- [ ] ✅ Proper ordering (order field)
- [ ] ✅ User access assigned

### Additional for Courses with Sections:
- [ ] ✅ All sections defined
- [ ] ✅ Section learning outcomes
- [ ] ✅ Topics linked to correct sections

---

## 🎯 Key Takeaways

1. **Universal Structure:** COURSE → (SECTION) → TOPIC → MODULE
2. **Sections are Optional:** Use only when you need major grouping
3. **Flexible Naming:** "Round", "Part", "Level", "Module" - all work
4. **Same UI:** Platform handles all structures the same way
5. **Backward Compatible:** Existing courses work without changes

---

## 📞 Quick Reference

### Minimum Required Structure (Without Sections):
```
Course → Topic → Module
```

### Full Structure (With Sections):
```
Course → Section → Topic → Module
```

### Platform Support:
- ✅ Company interview courses (with rounds)
- ✅ Skill bootcamps (with parts/levels)
- ✅ Certification courses (with modules)
- ✅ Simple courses (no sections)
- ✅ Any other structure you need!

---

*Last Updated: January 2025*
*Version: 2.0 - Unified Structure*

# Course Structure Template

This document explains how to prepare course content for the learning platform. Follow this structure to create your course materials.

## Table of Contents
1. [Course Types](#course-types)
2. [Course Structure Overview](#course-structure-overview)
3. [Template Format](#template-format)
4. [Content Type Guidelines](#content-type-guidelines)
5. [Example Courses](#example-courses)

---

## Course Types

The platform supports three types of courses:

### 1. **Role-Specific Courses**
- Designed for specific job roles (e.g., Software Engineer, Data Analyst, Product Manager)
- Best for: Career-focused learning paths
- Examples: "Java Full Stack Developer", "Data Scientist Bootcamp"

### 2. **Company-Specific Courses**
- Tailored for employees of specific companies
- Best for: Onboarding, company-specific training
- Examples: "TCS Onboarding", "Infosys Internal Training"

### 3. **Skill-Based Courses**
- Focused on specific technical skills
- Best for: Standalone skill development
- Examples: "React Fundamentals", "Python for Beginners"

---

## Course Structure Overview

```
Course
├── Modules (for Role/Company courses only)
│   ├── Topics
│   │   └── Classes (Lessons)
└── Topics (for Skill-based courses)
    └── Classes (Lessons)
```

### Hierarchy Explained:

**For Role-Specific & Company-Specific Courses:**
- **Course** → **Modules** → **Topics** → **Classes**

**For Skill-Based Courses:**
- **Course** → **Topics** → **Classes**

---

## Template Format

### Course Information Template

```yaml
# ====================
# COURSE INFORMATION
# ====================

Course Type: [role-specific | company-specific | skill-based]

# For role-specific courses:
Role: [e.g., "Software Engineer", "Data Analyst"]

# For company-specific courses:
Company Name: [e.g., "TCS", "Infosys", "Google"]

# For skill-based courses:
Skill: [e.g., "React", "Python", "AWS"]

Course Title: [Your course title]
Course Description: [Brief description of the course]
Course Thumbnail: [URL to course image - optional]

# ====================
# MODULES (Only for Role/Company courses)
# ====================

Module 1:
  Title: [Module title]
  Description: [What this module covers]
  Order: 1
  Learning Outcomes:
    - [Learning outcome 1]
    - [Learning outcome 2]
    - [Learning outcome 3]

  Topic 1.1:
    Title: [Topic title]
    Order: 1

    Class 1.1.1:
      Title: [Class title]
      Description: [Brief description - optional]
      Content Type: [video | text | contest]
      Duration: [Duration in seconds, e.g., 600 for 10 minutes]
      Order: 1

      # For video content:
      Video URL: [YouTube URL or direct video link]

      # For text content:
      Text Content: |
        Your text content here.
        You can use markdown formatting:

        ## Heading
        **Bold text**
        *Italic text*
        `code snippets`

        Multiple paragraphs are supported.

      # For contest/assessment:
      Contest URL: [URL to external assessment platform]

    Class 1.1.2:
      Title: [Next class title]
      # ... repeat structure

  Topic 1.2:
    Title: [Another topic title]
    Order: 2
    # ... repeat class structure

Module 2:
  Title: [Next module title]
  # ... repeat structure

# ====================
# TOPICS (For Skill-based courses OR within modules)
# ====================

Topic 1:
  Title: [Topic title]
  Order: 1

  Class 1.1:
    Title: [Class title]
    Description: [Brief description]
    Content Type: [video | text | contest]
    Duration: [Duration in seconds]
    Order: 1
    Video URL: [For video classes]
    # OR
    Text Content: |
      [For text classes]
    # OR
    Contest URL: [For assessments]
```

---

## Content Type Guidelines

### 1. Video Classes
- **Best for:** Demonstrations, lectures, tutorials
- **Duration:** Typically 5-30 minutes (300-1800 seconds)
- **URL Format:**
  - YouTube: `https://www.youtube.com/watch?v=VIDEO_ID`
  - Direct link: Full URL to video file
  - Scaler Academy: `https://www.scaler.com/academy/...`

### 2. Text Classes
- **Best for:** Reading materials, documentation, written tutorials
- **Duration:** Estimate reading time (avg. 200 words/minute)
  - 1000 words ≈ 300 seconds (5 minutes)
  - 2000 words ≈ 600 seconds (10 minutes)
- **Formatting:** Full markdown support with GitHub Flavored Markdown (GFM):
  - **Headers:** `# H1`, `## H2`, `### H3`
  - **Bold:** `**bold text**`
  - **Italic:** `*italic text*`
  - **Code:** Inline `` `code` `` or code blocks with triple backticks
  - **Lists:** Unordered `- item` or ordered `1. item`
  - **Links:** `[text](url)`
  - **Images:** `![alt text](image-url)`
  - **Tables:** Standard markdown tables
  - **Blockquotes:** `> quote`
  - **Math Equations:** LaTeX syntax with `$inline$` or `$$block$$`
  - **Paragraphs:** Separate with blank lines

**Advanced Features:**
- **Mathematical Equations (LaTeX):**
  - Inline: `$E = mc^2$`
  - Block: `$$\int_{a}^{b} f(x)dx$$`
  - Supports complex formulas: `$$\frac{-b \pm \sqrt{b^2-4ac}}{2a}$$`

- **Images:**
  - Use markdown syntax: `![Description](https://example.com/image.png)`
  - Images are automatically responsive and optimized
  - Supports external URLs

- **Code Blocks with Syntax:**
  ```
  ```javascript
  function example() {
    console.log("Hello");
  }
  ```
  ```

### 3. Contest/Assessment Classes
- **Best for:** Quizzes, coding challenges, assessments
- **Duration:** Expected completion time in seconds
- **URL:** Link to external assessment platform (LeetCode, HackerRank, etc.)

---

## Example Courses

### Example 1: Role-Specific Course (Software Engineer)

```yaml
# ====================
# COURSE INFORMATION
# ====================

Course Type: role-specific
Role: Software Engineer
Course Title: Java Full Stack Developer Path
Course Description: Complete path from Java basics to full-stack development with Spring Boot and React

# ====================
# MODULES
# ====================

Module 1:
  Title: Java Fundamentals
  Description: Master the core concepts of Java programming
  Order: 1
  Learning Outcomes:
    - Understand object-oriented programming principles
    - Write efficient Java code
    - Handle exceptions and errors properly

  Topic 1.1:
    Title: Introduction to Java
    Order: 1

    Class 1.1.1:
      Title: What is Java?
      Description: Overview of Java programming language
      Content Type: video
      Duration: 600
      Order: 1
      Video URL: https://www.youtube.com/watch?v=eIrMbAQSU34

    Class 1.1.2:
      Title: Setting Up Java Development Environment
      Content Type: text
      Duration: 420
      Order: 2
      Text Content: |
        ## Setting Up Java

        To start developing with Java, you'll need to install the JDK (Java Development Kit).

        ### Steps:
        1. Download JDK from Oracle website
        2. Install the JDK on your system
        3. Set up environment variables

        **Important:** Make sure to add Java to your PATH.

        `javac -version` - Use this command to verify installation

    Class 1.1.3:
      Title: Java Basics Quiz
      Content Type: contest
      Duration: 900
      Order: 3
      Contest URL: https://leetcode.com/problems/two-sum

  Topic 1.2:
    Title: Object-Oriented Programming
    Order: 2

    Class 1.2.1:
      Title: Classes and Objects
      Content Type: video
      Duration: 720
      Order: 1
      Video URL: https://www.youtube.com/watch?v=xoL6WvCARJY

Module 2:
  Title: Spring Boot Framework
  Description: Learn to build REST APIs with Spring Boot
  Order: 2
  Learning Outcomes:
    - Build RESTful web services
    - Implement database operations with JPA
    - Handle authentication and authorization

  Topic 2.1:
    Title: Introduction to Spring Boot
    Order: 1

    Class 2.1.1:
      Title: What is Spring Boot?
      Content Type: video
      Duration: 540
      Order: 1
      Video URL: https://www.youtube.com/watch?v=vtPkZShrvXQ
```

### Example 2: Company-Specific Course

```yaml
# ====================
# COURSE INFORMATION
# ====================

Course Type: company-specific
Company Name: TCS
Course Title: TCS Digital Onboarding
Course Description: Complete onboarding program for new TCS Digital hires

# ====================
# MODULES
# ====================

Module 1:
  Title: Company Orientation
  Description: Learn about TCS culture, values, and processes
  Order: 1
  Learning Outcomes:
    - Understand TCS values and mission
    - Know internal tools and processes
    - Connect with your team

  Topic 1.1:
    Title: Welcome to TCS
    Order: 1

    Class 1.1.1:
      Title: CEO Welcome Message
      Content Type: video
      Duration: 300
      Order: 1
      Video URL: https://www.youtube.com/watch?v=EXAMPLE

    Class 1.1.2:
      Title: TCS Code of Conduct
      Content Type: text
      Duration: 480
      Order: 2
      Text Content: |
        ## TCS Code of Conduct

        At TCS, we uphold the highest standards of integrity...

        ### Core Values:
        - **Integrity:** We do what is right
        - **Excellence:** We strive for the best
        - **Collaboration:** We work together
```

### Example 3: Skill-Based Course

```yaml
# ====================
# COURSE INFORMATION
# ====================

Course Type: skill-based
Skill: React
Course Title: React Fundamentals
Course Description: Learn React from scratch - components, hooks, and state management

# ====================
# TOPICS (No modules for skill-based)
# ====================

Topic 1:
  Title: Getting Started with React
  Order: 1

  Class 1.1:
    Title: What is React?
    Description: Introduction to React library
    Content Type: video
    Duration: 480
    Order: 1
    Video URL: https://www.youtube.com/watch?v=Tn6-PIqc4UM

  Class 1.2:
    Title: Setting Up React Environment
    Content Type: text
    Duration: 360
    Order: 2
    Text Content: |
      ## Setting Up React

      We'll use Create React App to set up our development environment.

      ### Installation:
      ```
      npx create-react-app my-app
      cd my-app
      npm start
      ```

  Class 1.3:
    Title: Your First React Component
    Content Type: video
    Duration: 600
    Order: 3
    Video URL: https://www.youtube.com/watch?v=w7ejDZ8SWv8

Topic 2:
  Title: React Components
  Order: 2

  Class 2.1:
    Title: Functional Components
    Content Type: video
    Duration: 720
    Order: 1
    Video URL: https://www.youtube.com/watch?v=EXAMPLE
```

---

## Quick Reference: Duration Guidelines

| Content Length | Estimated Duration (seconds) |
|----------------|------------------------------|
| 5-minute video | 300 |
| 10-minute video | 600 |
| 15-minute video | 900 |
| 20-minute video | 1200 |
| 500-word article | 150 |
| 1000-word article | 300 |
| 2000-word article | 600 |
| Short quiz (5 questions) | 300 |
| Medium quiz (10 questions) | 600 |
| Coding challenge | 900-1800 |

---

## Validation Checklist

Before submitting your course structure, ensure:

- [ ] Course type is specified correctly
- [ ] All required fields are filled (Role/Company/Skill based on type)
- [ ] Modules have meaningful titles and descriptions
- [ ] Topics are organized logically
- [ ] Each class has a title, content type, and duration
- [ ] Video URLs are valid and accessible
- [ ] Text content uses proper markdown formatting
- [ ] Contest URLs point to valid assessment platforms
- [ ] Order numbers are sequential (1, 2, 3...)
- [ ] Learning outcomes are clear and specific

---

## Need Help?

If you have questions about structuring your course:
1. Review the examples above
2. Check that your content type matches the guidelines
3. Ensure all required fields are filled
4. Contact the technical team with your course YAML file

---

**Note:** You don't need to provide IDs for courses, modules, topics, or classes. These will be automatically generated when the course is imported into the system.

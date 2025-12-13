import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const newTextContent = `# Navigating the Maze of Data Role Titles

"Data Analyst, Business Analyst, Marketing Analyst..." The industry is flooded with varied titles for data-centric roles. You have likely asked yourself:

* **What defines the day-to-day work of these roles?**
* **Which technical stack is non-negotiable for each?**
* **How should I tailor my preparation to crack these specific interview loops?**

In this module, we will deconstruct the data analytics landscape at top-tier tech companies. We will look beyond the labels to understand the core archetypes, ensuring you know exactly how to align your preparation with the role that fits your career goals.

---

## Why Do Job Titles Vary So Much?
Job titles are often a reflection of a company's maturity, culture, and internal structure rather than a universal standard.

### 1. The "Big Tech" Specialist Model
Tech giants (like Amazon, Microsoft, or Meta) usually have rigid, highly specialized tracks.
* **Example:** Amazon clearly distinguishes between a **Business Analyst** (who focuses on strategic narratives and "why" metrics changed) and a **Business Intelligence Engineer (BIE)** (who builds the SQL pipelines, automates dashboards, and handles the "how").

### 2. The "High-Growth Startup" Generalist Model
In fast-paced startups (Series B/C level), boundaries blur.
* **Example:** A Data Analyst at a startup like Zepto or Cred often wears multiple hats—managing data engineering pipelines in the morning and presenting growth strategies to the founders in the afternoon.

| Large Tech Ecosystems | Startups / Agile Teams |
| :--- | :--- |
| **Highly Specialized:** Titles reflect a specific focus (e.g., Product Analyst vs. Marketing Science Partner). | **Broad Scope:** Titles are generic; responsibilities span the entire data lifecycle. |

Even within the MAANG ecosystem, titles signal specific priorities. For instance:
* **At Microsoft:** A *Data & Applied Scientist* often blends SQL analysis with machine learning to improve product features.
* **At Netflix:** A *Content Analyst* uses data to decide which shows to greenlight or renew based on viewer retention patterns.

> **Pro Tip:** Ignore the title; decode the Job Description (JD). Look for the **Problem Space** (e.g., Supply Chain vs. User Engagement) and the **Stakeholders** (e.g., Engineering Managers vs. Sales VPs) to understand the real job.

---

## Extensions & Specializations
Modern analytics roles are increasingly domain-specific. Instead of generic analysis, companies hire for specific impact areas:

### Product Analyst (e.g., Pinterest/Spotify)
Focuses on user behavior.
* **Goal:** Answer "Did the new 'Save' button increase user retention?"
* **Method:** Heavily relies on A/B testing and event-tracking data.

### Marketing Science Partner (e.g., Meta/TikTok)
Focuses on ad ecosystem efficiency.
* **Goal:** Answer "What is the exact ROI of this million-dollar campaign?"
* **Method:** Relies on causal inference and attribution modeling.

### Industry-Specific Nuances
If you are targeting specialized sectors, domain knowledge is key:
* **FinTech (e.g., Stripe/PayPal):** A Risk Analyst needs to understand fraud patterns, credit logic, and transaction monitoring (AML).
* **HealthTech:** An analyst must be versed in HIPAA/GDPR compliance and patient data privacy.

---

## The Universal Competency Baseline
Despite the confusing variety of titles, the core toolkit remains consistent. Every high-impact data role requires mastery of the **"Data Value Chain"**:

1.  **Ingestion:** Collecting and cleaning raw logs.
2.  **Analysis:** Extracting signals from the noise.
3.  **Visualization:** Building dashboards that tell a story.
4.  **Strategy:** Translating numbers into business decisions.
5.  **Collaboration:** Working with Engineering and Product to implement changes.

### The Non-Negotiable Tech Stack:
* ✅ **SQL:** The absolute bedrock for extracting data.
* ✅ **Excel/Sheets:** For rapid modeling and pivoting.
* ✅ **Visualization:** Tableau, Power BI, or Looker for executive reporting.
* ✅ **Statistics:** Confidence intervals, regression, and hypothesis testing.

> **Critical Note:** Technical skills get you the interview; **Business Context gets you the job.**
>
> Whether you are a "Growth Analyst" or a "BI Engineer," hiring managers prioritize candidates who understand the business model—how the company makes money, where the risks lie, and how data can drive efficiency.

**Don't just prepare to write code. Prepare to solve business problems using code.** In the next section, we will deep-dive into the specific skill assessments used by top tech companies.`;

async function main() {
  try {
    // First, let's check what courses exist
    const courses = await prisma.course.findMany({
      select: { id: true, title: true }
    });
    console.log('Available courses:', courses);

    // Find all modules to see what we have
    const allModules = await prisma.module.findMany({
      orderBy: { order: 'desc' },
      include: {
        course: { select: { title: true } },
        topics: {
          orderBy: { order: 'desc' },
          take: 1,
        },
      },
    });

    console.log('\nAll modules:', allModules.map(m => ({
      id: m.id,
      course: m.course.title,
      title: m.title,
      order: m.order,
      topicsCount: m.topics.length
    })));

    // Find the last module (highest order) across all courses
    const lastModule = allModules[0];

    if (!lastModule || !lastModule.topics[0]) {
      console.error('Could not find last module or topic');
      return;
    }

    const lastTopic = lastModule.topics[0];
    console.log(`Found last module: ${lastModule.title}`);
    console.log(`Found last topic: ${lastTopic.title}`);

    // Find the last class in this topic
    const lastClass = await prisma.class.findFirst({
      where: { topicId: lastTopic.id },
      orderBy: { order: 'desc' },
    });

    if (lastClass) {
      // Update the existing last class
      await prisma.class.update({
        where: { id: lastClass.id },
        data: {
          title: 'Navigating the Maze of Data Role Titles',
          description: 'Understanding different data analytics roles and how to prepare for them',
          contentType: 'text',
          textContent: newTextContent,
          duration: 1200, // 20 minutes
        },
      });
      console.log(`✅ Updated existing class: ${lastClass.title} -> "Navigating the Maze of Data Role Titles"`);
    } else {
      // Create a new class if none exists
      const maxOrder = await prisma.class.findFirst({
        where: { topicId: lastTopic.id },
        orderBy: { order: 'desc' },
        select: { order: true },
      });

      await prisma.class.create({
        data: {
          topicId: lastTopic.id,
          title: 'Navigating the Maze of Data Role Titles',
          description: 'Understanding different data analytics roles and how to prepare for them',
          contentType: 'text',
          textContent: newTextContent,
          duration: 1200, // 20 minutes
          order: (maxOrder?.order || 0) + 1,
        },
      });
      console.log(`✅ Created new class: "Navigating the Maze of Data Role Titles"`);
    }

    console.log('\n✅ Successfully updated the database!');
  } catch (error) {
    console.error('Error updating class:', error);
  } finally {
    await prisma.$disconnect();
  }
}

main();

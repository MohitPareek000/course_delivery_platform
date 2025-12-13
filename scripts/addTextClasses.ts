import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Adding text-based classes to Behavioral Interviews module...');

  // Find the Software Engineer Interview Preparation course
  const course = await prisma.course.findFirst({
    where: {
      title: 'Software Engineer Interview Preparation',
      type: 'role-specific'
    },
    include: {
      modules: {
        include: {
          topics: true
        }
      }
    }
  });

  if (!course) {
    console.error('❌ Course not found!');
    process.exit(1);
  }

  console.log(`✅ Found course: ${course.id}`);

  // Find the Behavioral Interviews module (order: 3)
  const behavioralModule = course.modules.find(m => m.order === 3);

  if (!behavioralModule) {
    console.error('❌ Behavioral Interviews module not found!');
    process.exit(1);
  }

  console.log(`✅ Found module: ${behavioralModule.title}`);

  // Find the topic (Common Behavioral Questions)
  const topic = behavioralModule.topics[0];

  if (!topic) {
    console.error('❌ Topic not found!');
    process.exit(1);
  }

  console.log(`✅ Found topic: ${topic.title}`);

  // Text Class 1: The STAR Method Framework
  const textContent1 = `# The STAR Method Framework

## Introduction

The STAR method is the **gold standard** for answering behavioral interview questions. It provides a structured approach that helps you deliver clear, concise, and compelling answers that demonstrate your skills and experience.

![STAR Method Diagram](https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&q=80)

## What is STAR?

STAR is an acronym that stands for:

- **S**ituation
- **T**ask
- **A**ction
- **R**esult

---

## Breaking Down Each Component

### 1. Situation (The Context)

**What it is:** Set the scene and provide context for your story.

**Key Elements:**
- Where were you working?
- What was the project or challenge?
- Who was involved?
- When did this happen?

**Example:**
> "During my internship at TechCorp in Summer 2023, our team was working on a mobile app redesign that was falling behind schedule due to unclear requirements..."

**⏱️ Time Allocation:** 15-20% of your answer

---

### 2. Task (Your Responsibility)

**What it is:** Describe your specific role and what needed to be accomplished.

**Key Elements:**
- What was YOUR responsibility?
- What was the goal or challenge?
- Why was it important?

**Example:**
> "As the junior developer assigned to the authentication module, I needed to implement a secure login system while ensuring it met both iOS and Android design standards..."

**⏱️ Time Allocation:** 15-20% of your answer

---

### 3. Action (What You Did)

**What it is:** Explain the specific steps YOU took to address the task.

**Critical Success Factors:**

\`\`\`
✓ Use "I" not "We" - Own your contributions
✓ Be specific about YOUR actions
✓ Include technical details when relevant
✓ Show your thought process
✓ Demonstrate problem-solving skills
\`\`\`

**Example:**
> "I took the following steps:
>
> 1. **Research:** Analyzed OAuth 2.0 and JWT authentication patterns
> 2. **Design:** Created a unified authentication flow that worked across platforms
> 3. **Implementation:** Built a reusable auth module using TypeScript
> 4. **Testing:** Wrote 47 unit tests achieving 95% code coverage
> 5. **Collaboration:** Conducted code reviews with senior engineers to ensure security best practices"

**⏱️ Time Allocation:** 40-50% of your answer

---

### 4. Result (The Outcome)

**What it is:** Share the measurable outcomes and impact of your actions.

**Formula for Impact:**

\`\`\`
Impact = Quantifiable Metric + Business Value + Learning
\`\`\`

**Quantify When Possible:**
- Performance improvements (e.g., "reduced load time by 40%")
- Cost savings (e.g., "saved $50K annually")
- User impact (e.g., "improved user retention by 25%")
- Time savings (e.g., "reduced deployment time from 2 hours to 15 minutes")

**Example:**
> "The authentication module I built:
> - ✅ Launched on time, preventing a 2-week delay
> - 📊 Supported 50,000+ daily active users with 99.9% uptime
> - 🔒 Zero security incidents in the first 6 months
> - 📈 Reduced login friction, improving conversion by 18%
> - 🎓 Learned the importance of security-first design and cross-platform development"

**⏱️ Time Allocation:** 20-25% of your answer

---

## The STAR Method Formula

### Time Breakdown Equation

\`\`\`
Total Answer Time = S + T + A + R

Optimal Distribution:
S (20%) + T (15%) + A (50%) + R (15%) = 100%

For a 2-minute answer:
S (24s) + T (18s) + A (60s) + R (18s) = 120s
\`\`\`

---

## Common Mistakes to Avoid

### ❌ DON'T:

1. **Being too vague**
   - ❌ "I worked on a project..."
   - ✅ "As the lead frontend engineer, I architected the dashboard..."

2. **Using "we" instead of "I"**
   - ❌ "We implemented the feature..."
   - ✅ "I implemented the feature by..."

3. **Forgetting the result**
   - ❌ Ending with just the action
   - ✅ Always include measurable outcomes

4. **Making it too long**
   - ❌ 5+ minute rambling story
   - ✅ 1.5-2 minute focused answer

---

## Practice Template

Use this template to prepare your STAR stories:

\`\`\`markdown
**Question:** [Behavioral question here]

**S - Situation:**
- Company/Role: _______________
- Project/Context: _______________
- Timeline: _______________

**T - Task:**
- My responsibility: _______________
- The challenge: _______________
- Why it mattered: _______________

**A - Action:**
1. _______________
2. _______________
3. _______________
4. _______________
5. _______________

**R - Result:**
- Quantifiable outcome: _______________
- Business impact: _______________
- What I learned: _______________
\`\`\`

---

## Example STAR Story

### Question: "Tell me about a time you faced a technical challenge."

**S - Situation:**
> "During my role as a Software Engineer at DataCorp, our analytics dashboard was experiencing severe performance issues. Page load times exceeded 8 seconds, and we were receiving complaints from 200+ enterprise clients."

**T - Task:**
> "As the engineer responsible for the dashboard's frontend, I needed to reduce load times to under 2 seconds while maintaining all existing functionality."

**A - Action:**
> "I approached this systematically:
>
> 1. **Profiling:** Used Chrome DevTools to identify bottlenecks - found unnecessary API calls and inefficient rendering
> 2. **Optimization:** Implemented lazy loading, memoization with React.memo, and virtualized lists
> 3. **Caching:** Added Redis caching layer for frequently accessed data
> 4. **Code Splitting:** Broke the bundle into smaller chunks, reducing initial load
> 5. **Testing:** Created performance benchmarks and automated tests to prevent regression"

**R - Result:**
> "The improvements were significant:
> - ⚡ Reduced load time from 8.3s to 1.4s (83% improvement)
> - 📊 Decreased API calls by 60%
> - 💰 Saved $15K/month in server costs
> - 😊 Customer satisfaction scores increased from 6.2 to 8.9
> - 🎓 Learned to prioritize performance from the start of projects"

---

## Success Metrics

### How to Know Your STAR Answer is Strong:

\`\`\`
Score = (Clarity × Relevance × Impact) / Time

Ideal Answer:
- Clarity: 9/10 (structured, easy to follow)
- Relevance: 10/10 (directly answers the question)
- Impact: 8/10 (measurable, significant results)
- Time: 90-120 seconds

Score = (9 × 10 × 8) / 120 = 6.0 (Excellent!)
\`\`\`

---

## Key Takeaways

1. ✅ **Structure is everything** - Follow STAR religiously
2. 📊 **Quantify your results** - Numbers tell a compelling story
3. 💡 **Focus on YOUR actions** - Use "I" not "we"
4. ⏱️ **Keep it concise** - 1.5-2 minutes max
5. 🎯 **Be specific** - Details make your story credible
6. 📈 **Show growth** - Include what you learned

---

## Next Steps

Now that you understand the STAR method framework:

1. Identify 10-12 key experiences from your background
2. Write out STAR stories for each
3. Practice delivering them in 90-120 seconds
4. Get feedback from peers or mentors
5. Refine based on feedback

**Remember:** The STAR method is a tool, not a script. Adapt it to your style while maintaining the structure.

![Success Path](https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=80)

---

*Practice makes perfect. Prepare your STAR stories in advance, and you'll walk into every behavioral interview with confidence!*`;

  // Text Class 2: Leadership and Teamwork Analysis
  const textContent2 = `# Leadership and Teamwork: A Data-Driven Approach

## Introduction

Leadership isn't about having a title - it's about **influence, impact, and enabling others to succeed**. In technical interviews, demonstrating leadership and teamwork skills can differentiate you from other candidates with similar technical abilities.

![Team Collaboration](https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&q=80)

---

## The Leadership Equation

### Formula for Technical Leadership

\`\`\`
Leadership Impact = (Technical Excellence × Communication) + (Team Enablement × Decision Quality)

Where:
- Technical Excellence: Your ability to deliver quality work
- Communication: How effectively you share knowledge
- Team Enablement: How much you help others succeed
- Decision Quality: The correctness of your technical decisions
\`\`\`

**Example Calculation:**

\`\`\`
Engineer A:
Technical Excellence: 9/10
Communication: 7/10
Team Enablement: 8/10
Decision Quality: 8/10

Impact = (9 × 7) + (8 × 8) = 63 + 64 = 127

Engineer B:
Technical Excellence: 10/10
Communication: 4/10
Team Enablement: 3/10
Decision Quality: 9/10

Impact = (10 × 4) + (3 × 9) = 40 + 27 = 67

Result: Engineer A has 89% more leadership impact!
\`\`\`

---

## Types of Leadership in Tech

### 1. Technical Leadership

**Definition:** Leading through technical expertise and architecture decisions.

**Key Behaviors:**
- Setting technical direction
- Code reviews and mentorship
- Architecture design
- Technology selection

**Example STAR Story Setup:**

> **Situation:** "During a critical migration to microservices at CloudTech..."
>
> **Task:** "As senior engineer, I needed to design the migration strategy..."
>
> **Action:** "I created an RFC (Request for Comments), gathered feedback from 5 teams..."
>
> **Result:** "Successfully migrated 12 services with zero downtime..."

### 2. Collaborative Leadership

**Definition:** Leading through influence, not authority.

**Impact Formula:**

\`\`\`
Collaborative Impact = (Number of Stakeholders × Alignment Score) / Decision Time

Example:
Stakeholders: 8 teams
Alignment: 85%
Decision Time: 2 weeks

Impact = (8 × 0.85) / 2 = 3.4 impact units/week
\`\`\`

### 3. Mentorship Leadership

**Definition:** Growing others through teaching and guidance.

**Mentorship ROI:**

\`\`\`
Mentorship Value = (Mentee Growth Rate × Team Size) + Knowledge Transfer

Metrics:
- Mentee Growth: Skills improved × time saved
- Knowledge Transfer: Documentation created + presentations given
- Team Impact: Number of people influenced
\`\`\`

**Example Metrics:**

| Metric | Before Mentorship | After 6 Months | Improvement |
|--------|------------------|----------------|-------------|
| Code Review Speed | 4 hours | 1.5 hours | 62.5% faster |
| Bug Rate | 12/sprint | 4/sprint | 67% reduction |
| Feature Velocity | 3/sprint | 5/sprint | 67% increase |
| Confidence Score | 5/10 | 8/10 | 60% improvement |

---

## Teamwork Dynamics

### The Tuckman Model Applied to Tech Teams

\`\`\`
Team Performance = f(Stage, Conflict Resolution, Trust)

Stages:
1. Forming (25% productivity)
2. Storming (40% productivity, high conflict)
3. Norming (70% productivity)
4. Performing (95%+ productivity)
5. Adjourning
\`\`\`

### Productivity Curve

\`\`\`
     100% |                    ____________
          |                  /
   P      |                /
   e   75%|              /
   r      |            /
   f   50%|          / \
   o      |        /    \
   r   25%|      /       \
   m      |    /          \
   a    0%|__/______________\______________
   n      Forming Storming Norming Performing
   c
   e                Time →
\`\`\`

![Team Dynamics](https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=800&q=80)

---

## Conflict Resolution Framework

### The Conflict Resolution Equation

\`\`\`
Resolution Quality = (Understanding × Empathy × Solutions) / Ego

Optimal Approach:
- Understanding: 10 (fully comprehend all perspectives)
- Empathy: 9 (genuinely care about others' concerns)
- Solutions: 8 (multiple viable options)
- Ego: 2 (low personal attachment)

Quality = (10 × 9 × 8) / 2 = 360 (High-quality resolution)
\`\`\`

### Common Technical Conflicts

#### 1. Architecture Disagreements

**Scenario:** Team divided on monolith vs microservices

**Resolution Matrix:**

| Factor | Monolith | Microservices | Weight |
|--------|----------|---------------|--------|
| Team Size | 8 | 5 | 3x |
| Complexity | 9 | 3 | 5x |
| Scalability | 4 | 9 | 4x |
| Time to Market | 8 | 5 | 5x |

**Weighted Score Calculation:**

\`\`\`
Monolith Score = (8×3) + (9×5) + (4×4) + (8×5) = 24 + 45 + 16 + 40 = 125

Microservices Score = (5×3) + (3×5) + (9×4) + (5×5) = 15 + 15 + 36 + 25 = 91

Decision: Monolith wins (125 > 91)
\`\`\`

#### 2. Code Review Debates

**Healthy Code Review Formula:**

\`\`\`
Review Quality = (Constructiveness × Specificity) - Ego

Constructiveness: Focus on "we" and "our code"
Specificity: Reference specific lines, not general criticism
Ego: Avoid "you should" → use "we could"
\`\`\`

**Bad Example:**
> ❌ "This code is terrible and unmaintainable."

**Good Example:**
> ✅ "On line 47, we could improve readability by extracting this logic into a helper function. This would make the code easier to test and maintain. What do you think about this approach?"

---

## Measuring Team Contribution

### The Team Player Index (TPI)

\`\`\`
TPI = (Code Reviews Given / Received) × (Knowledge Shared / Knowledge Consumed) × Collaboration Score

High Performer Example:
- Code Reviews Given: 45
- Code Reviews Received: 15
- Knowledge Shared: 12 docs + 8 presentations = 20
- Knowledge Consumed: 5 docs + 3 courses = 8
- Collaboration Score: 8.5/10

TPI = (45/15) × (20/8) × 8.5 = 3 × 2.5 × 8.5 = 63.75

Score Interpretation:
- 0-25: Needs improvement
- 26-50: Good team player
- 51-75: Excellent collaborator ⭐
- 76+: Team multiplier 🌟
\`\`\`

---

## Cross-Functional Collaboration

### Stakeholder Management Matrix

\`\`\`
Priority = (Influence × Interest) + Urgency

Quadrant Analysis:

High Interest, High Influence → Manage Closely
High Interest, Low Influence → Keep Informed
Low Interest, High Influence → Keep Satisfied
Low Interest, Low Influence → Monitor
\`\`\`

**Example Stakeholder Map:**

| Stakeholder | Influence (1-10) | Interest (1-10) | Priority Score |
|-------------|------------------|-----------------|----------------|
| Engineering VP | 10 | 7 | 70 |
| Product Manager | 8 | 10 | 80 |
| Design Lead | 6 | 9 | 54 |
| QA Manager | 5 | 8 | 40 |
| DevOps | 7 | 6 | 42 |

**Action Plan:**
1. **Product Manager (80):** Weekly syncs, direct collaboration
2. **Engineering VP (70):** Bi-weekly updates, strategic alignment
3. **Design Lead (54):** Regular check-ins, design reviews
4. **DevOps (42):** Monthly touchpoints, infrastructure planning
5. **QA Manager (40):** Automated updates, issue triage

---

## Communication Strategies

### The Communication Efficiency Formula

\`\`\`
Communication Efficiency = (Message Clarity × Channel Appropriateness) / Noise

Channels by Latency:
1. In-person/Video: Immediate (best for complex topics)
2. Slack/Chat: Minutes (good for quick questions)
3. Email: Hours (good for documentation)
4. Tickets: Days (good for formal requests)
\`\`\`

### Message Clarity Optimization

\`\`\`
Clarity Score = (Specificity + Context + Action Items) / Ambiguity

Example:

Bad Message (Clarity = 2):
"The build is broken"

Good Message (Clarity = 9):
"🔴 Production build failing on PR #457
- Error: Module 'auth-service' not found
- Affects: Authentication flow
- Action needed: Update import path in src/services/auth.ts
- ETA: 15 minutes
- I'm on it!"
\`\`\`

![Communication](https://images.unsplash.com/photo-1553877522-43269d4ea984?w=800&q=80)

---

## Leadership Story Template

### Structure Your Leadership Examples

\`\`\`markdown
**Situation:**
- Team size: [number]
- Your role: [title/responsibility]
- Challenge: [specific problem]
- Stakes: [what was at risk]

**Task:**
- Your responsibility: [what you owned]
- Success criteria: [measurable goals]
- Constraints: [time, resources, complexity]

**Action:**
Leadership behaviors demonstrated:
1. [Technical leadership action]
2. [Communication action]
3. [Collaboration action]
4. [Decision-making action]
5. [Mentorship action]

**Result:**
Quantified outcomes:
- Team impact: [how you helped others]
- Business impact: [measurable results]
- Technical impact: [quality, performance, etc.]
- Personal growth: [what you learned]
\`\`\`

---

## Common Leadership Questions & Frameworks

### 1. "Tell me about a time you led without authority"

**Framework:**
\`\`\`
Influence = (Expertise × Relationships × Communication) / Resistance

Success Factors:
- Build trust through technical credibility
- Create shared vision
- Enable others' success
- Celebrate team wins
\`\`\`

### 2. "Describe a time you had to convince a team"

**Persuasion Formula:**
\`\`\`
Persuasion = (Logic × Emotion × Credibility) + Timing

Components:
- Logic: Data-driven arguments (60%)
- Emotion: Appeal to values/goals (20%)
- Credibility: Track record (15%)
- Timing: Right moment (5%)
\`\`\`

### 3. "Tell me about mentoring someone"

**Mentorship Impact:**
\`\`\`
Impact = (Skill Growth × Confidence Increase × Knowledge Transfer) × Sustainability

Measure:
- Before/After skill assessments
- Confidence surveys (1-10 scale)
- Documentation created
- Long-term independence
\`\`\`

---

## Red Flags to Avoid

### ❌ Don't Say:

1. **"I had to do everything myself"**
   - Shows inability to delegate or trust others

2. **"The team didn't listen to me"**
   - Shows poor communication or influence skills

3. **"I told them what to do"**
   - Shows authoritarian, not collaborative leadership

4. **"We agreed to disagree"**
   - Shows unresolved conflict

### ✅ Do Say:

1. **"I enabled the team to..."**
   - Shows empowerment focus

2. **"I facilitated a discussion where..."**
   - Shows collaborative approach

3. **"I learned that..."**
   - Shows growth mindset

4. **"We aligned on..."**
   - Shows consensus building

---

## Practical Exercises

### Exercise 1: Calculate Your Team Impact

\`\`\`
Step 1: List your contributions last month
Step 2: Categorize (Technical, Communication, Enablement)
Step 3: Score each (1-10)
Step 4: Calculate weighted average

Example:
- 5 code reviews (Technical: 8)
- 2 design docs (Communication: 9)
- 3 mentoring sessions (Enablement: 9)
- 1 tech talk (Communication: 10)

Impact = (8+9+9+10) / 4 = 9.0 🌟
\`\`\`

### Exercise 2: Prepare 5 Leadership Stories

Pick one from each category:
1. ✅ Technical leadership
2. ✅ Conflict resolution
3. ✅ Mentorship
4. ✅ Cross-functional collaboration
5. ✅ Leading without authority

---

## Key Takeaways

1. 🎯 **Leadership ≠ Management** - Influence matters more than title
2. 📊 **Quantify your impact** - Use metrics to demonstrate value
3. 🤝 **Enable others** - Great leaders multiply team productivity
4. 💡 **Communicate effectively** - Clarity beats complexity
5. 🌱 **Show growth** - Learning from failure is powerful
6. 🔄 **Collaborate actively** - "We" achieves more than "I"

---

## Success Checklist

Before your interview, ensure you can answer:

- [ ] Name a time you led a technical initiative
- [ ] Describe resolving a team conflict
- [ ] Share a mentorship experience
- [ ] Explain influencing without authority
- [ ] Discuss cross-functional collaboration
- [ ] Detail a failed leadership attempt and learnings

**Remember:** Authentic stories beat perfect answers. Share real experiences with humility and growth mindset.

![Leadership Success](https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=80)

---

*Leadership is not about being in charge. It's about taking care of those in your charge and helping them succeed.*`;

  // Create the two text classes
  await prisma.class.createMany({
    data: [
      {
        topicId: topic.id,
        title: 'The STAR Method Framework',
        description: 'Master the structured approach to answering behavioral questions with detailed examples, equations, and proven frameworks',
        contentType: 'text',
        textContent: textContent1,
        duration: 1200, // 20 minutes estimated reading time
        order: 3 // After the existing 2 video classes
      },
      {
        topicId: topic.id,
        title: 'Leadership and Teamwork Analysis',
        description: 'Data-driven guide to demonstrating leadership skills with quantifiable metrics, formulas, and real-world examples',
        contentType: 'text',
        textContent: textContent2,
        duration: 1500, // 25 minutes estimated reading time
        order: 4
      }
    ]
  });

  console.log('✅ Successfully added 2 text-based classes!');

  // Verify the update
  const updatedCourse = await prisma.course.findUnique({
    where: { id: course.id },
    include: {
      modules: {
        include: {
          topics: {
            include: {
              classes: {
                orderBy: { order: 'asc' }
              }
            }
          }
        },
        orderBy: { order: 'asc' }
      }
    }
  });

  const module3 = updatedCourse?.modules.find(m => m.order === 3);
  const topic1 = module3?.topics[0];

  console.log(`\n📊 Module: ${module3?.title}`);
  console.log(`   Topic: ${topic1?.title}`);
  console.log(`   Total Classes: ${topic1?.classes.length}`);
  console.log('\n   Classes:');
  topic1?.classes.forEach((c, i) => {
    console.log(`   ${i + 1}. ${c.title} (${c.contentType}) - ${Math.floor(c.duration / 60)} min`);
  });
}

main()
  .catch((e) => {
    console.error('Error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

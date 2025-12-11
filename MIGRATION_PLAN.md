# Database Schema Migration Plan: Round→Module, Module→Class

## Current Structure
```
Course → Round → Topic → Module (Lesson)
```

## Target Structure
```
Course → Module → Topic → Class (Lesson)
```

## Naming Changes
| Current Name | New Name | Impact |
|--------------|----------|--------|
| Round        | Module   | HIGH - Database table rename, all code references |
| Module       | Class    | HIGH - Database table rename, URL routes, all code references |
| Topic        | Topic    | NONE - Stays the same |

---

## CRITICAL CONSIDERATIONS

### 1. Database Naming Collision
**PROBLEM**: We want to rename `Round` → `Module`, but `Module` already exists (and needs to become `Class`)
**SOLUTION**: Must rename in correct order to avoid collisions:
1. First: Rename `Module` → `Class` (frees up "Module" name)
2. Then: Rename `Round` → `Module`

### 2. URL Route Changes
**Current**: `/course/[courseId]/module/[moduleId]`
**Target**: `/course/[courseId]/class/[classId]`

This will break existing bookmarks and links. Need to consider:
- Adding redirect from old URLs to new URLs
- Or keeping URL structure as-is (use `module` in URL but `class` in code)

### 3. Database Migration Strategy
Two approaches:
- **A. Create new migration** (safer, reversible)
- **B. Rename existing tables** (requires manual SQL, risky)

Recommended: **Approach A** with new migration

---

## PHASE 1: DATABASE SCHEMA CHANGES

### Step 1.1: Update Prisma Schema
File: `prisma/schema.prisma`

Changes needed:
```prisma
// Change "model Round" → "model Module"
model Module {
  id               String   @id @default(cuid())
  courseId         String
  title            String
  description      String
  order            Int
  learningOutcomes String[]
  // Relations
  course Course  @relation(fields: [courseId], references: [id], onDelete: Cascade)
  topics Topic[]
  @@map("modules")  // Keep DB table as "modules" for clarity
}

// Change "model Module" → "model Class"
model Class {
  id              String   @id @default(cuid())
  topicId         String
  title           String
  description     String?
  contentType     String?  @default("video")
  videoUrl        String?
  textContent     String?  @db.Text
  contestUrl      String?
  duration        Int
  order           Int
  // Relations
  topic    Topic          @relation(fields: [topicId], references: [id], onDelete: Cascade)
  progress UserProgress[]
  @@map("classes")  // Keep DB table as "classes"
}

// Update Topic model relations
model Topic {
  id        String   @id @default(cuid())
  moduleId  String?   // Previously roundId
  courseId  String
  title     String
  order     Int
  // Relations
  module  Module?   @relation(fields: [moduleId], references: [id], onDelete: Cascade)  // Previously round
  course  Course    @relation(fields: [courseId], references: [id], onDelete: Cascade)
  classes Class[]   // Previously modules
  @@map("topics")
}

// Update UserProgress
model UserProgress {
  id              String    @id @default(cuid())
  userId          String
  classId         String    // Previously moduleId
  watchedDuration Int
  isCompleted     Boolean   @default(false)
  lastWatchedAt   DateTime  @default(now())
  completedAt     DateTime?
  // Relations
  user   User   @relation(fields: [userId], references: [id], onDelete: Cascade)
  class  Class  @relation(fields: [classId], references: [id], onDelete: Cascade)  // Previously module
  @@unique([userId, classId])  // Previously userId_moduleId
  @@map("user_progress")
}

// Update Course model relations
model Course {
  // ... existing fields ...
  // Relations
  modules      Module[]  // Previously rounds
  topics       Topic[]
  courseAccess CourseAccess[]
  @@map("courses")
}
```

### Step 1.2: Create Prisma Migration
```bash
npx prisma migrate dev --name rename_round_to_module_and_module_to_class
```

**WARNING**: This will create a new migration that:
- Renames `rounds` table → `modules` table
- Renames `modules` table → `classes` table
- Updates all foreign key references
- May cause data loss if not careful!

### Step 1.3: Backup Database
**CRITICAL**: Before running migration:
```bash
pg_dump -U postgres -d courseplatform > backup_before_migration.sql
```

---

## PHASE 2: TYPE DEFINITIONS

### Step 2.1: Update `types/index.ts`

Changes:
```typescript
// Rename Round → Module
export interface Module {  // Previously Round
  id: string;
  courseId: string;
  title: string;
  description: string;
  order: number;
  learningOutcomes: string[];
}

// Remove old Section alias
// export type Section = Round;  // DELETE THIS

// Rename Module → Class
export interface Class {  // Previously Module
  id: string;
  topicId: string;
  title: string;
  description?: string;
  contentType?: 'video' | 'text' | 'contest';
  videoUrl?: string;
  textContent?: string;
  contestUrl?: string;
  duration: number;
  order: number;
}

// Update Topic interface
export interface Topic {
  id: string;
  moduleId?: string;  // Previously roundId
  courseId: string;
  title: string;
  order: number;
}

// Update UserProgress interface
export interface UserProgress {
  id: string;
  userId: string;
  classId: string;  // Previously moduleId
  watchedDuration: number;
  isCompleted: boolean;
  lastWatchedAt: Date;
  completedAt?: Date;
}
```

---

## PHASE 3: API ROUTES

### Files to update:

1. **`app/api/courses/[courseId]/route.ts`**
   - Update Prisma queries: `rounds` → `modules`, `modules` → `classes`
   - Update include statements

2. **`app/api/progress/route.ts`**
   - Change `moduleId` → `classId` in query params
   - Update Prisma queries: `module` → `class`

3. **`app/api/progress/user/[userId]/route.ts`**
   - Update include: `module` → `class`

---

## PHASE 4: HOOKS

### Files to update:

1. **`hooks/useCourseData.ts`**
   - Update type: `rounds` → `modules`, `modules` → `classes`
   - Update interface extends

2. **`hooks/useUserProgress.ts`**
   - Change `moduleId` → `classId`
   - Update function signatures: `getModuleProgress` → `getClassProgress`
   - Update function signatures: `isModuleCompleted` → `isClassCompleted`

---

## PHASE 5: COMPONENTS

### Files to update:

1. **`components/course/RoundCard.tsx` → `components/course/ModuleCard.tsx`**
   - Rename file
   - Change interface: `Round` → `Module`
   - Update props: `round` → `module`
   - Update JSX: all `round.` → `module.`

2. **`components/course/ModuleItem.tsx` → `components/course/ClassItem.tsx`**
   - Rename file
   - Change interface: `Module` → `Class`
   - Update props: `module` → `class`
   - Update JSX: all `module.` → `class.`

3. **`components/course/TopicSection.tsx`**
   - Update children type expectations

---

## PHASE 6: PAGES

### Files to update:

1. **`app/course/[courseId]/page.tsx`**
   - Import: `RoundCard` → `ModuleCard`
   - Import: `ModuleItem` → `ClassItem`
   - Variables: `rounds` → `modules`
   - Variables: all `module` → `class` (for lessons)
   - Functions: `isRoundUnlocked` → `isModuleUnlocked`
   - Functions: `getRoundProgress` → `getModuleProgress`
   - State: `selectedRoundId` → `selectedModuleId`
   - JSX: Update all mappings

2. **`app/course/[courseId]/module/[moduleId]` → `app/course/[courseId]/class/[classId]`**
   - **CRITICAL DECISION NEEDED**: Rename directory or keep as-is?
   - If renaming: Update all hrefs pointing to this route
   - Update page.tsx: `moduleId` → `classId` in params

3. **`app/dashboard/page.tsx`**
   - Check for any Round/Module references

---

## PHASE 7: MOCK DATA & SEED

### Files to update:

1. **`lib/db/mockData.ts`**
   - Rename: `mockRounds` → `mockModules`
   - Rename: `mockModules` → `mockClasses`
   - Update all IDs: `round-` → `module-`, `module-` → `class-`
   - Update all field names: `roundId` → `moduleId`, `moduleId` → `classId`

2. **`prisma/seed.ts`**
   - Update Prisma calls: `round.create` → `module.create`
   - Update Prisma calls: `module.create` → `class.create`
   - Update mock data imports

3. **`lib/db/queries.ts`**
   - Update all function signatures and variable names

---

## PHASE 8: ADDITIONAL FILES

### Files that may need updates:

1. `scripts/showDbStructure.ts` - Update model names
2. `scripts/checkDbNaming.ts` - Update model names
3. `data/` folder - Check for any mock data files
4. Component imports across the app - Update import paths

---

## EXECUTION ORDER (CRITICAL!)

### Step-by-Step Execution:

1. ✅ **BACKUP DATABASE** (pg_dump)
2. ✅ **Commit current working state** to git
3. ✅ Create a new branch: `git checkout -b feature/rename-schema`

4. 🔄 **Phase 1**: Update Prisma schema
5. 🔄 **Phase 1**: Run migration (may fail - need to handle)
6. 🔄 **Phase 1**: Verify database changes

7. 🔄 **Phase 2**: Update type definitions
8. 🔄 **Phase 3**: Update API routes
9. 🔄 **Phase 4**: Update hooks
10. 🔄 **Phase 5**: Update components (rename files)
11. 🔄 **Phase 6**: Update pages
12. 🔄 **Phase 7**: Update mock data and seed
13. 🔄 **Phase 8**: Update additional files

14. ✅ **Fix TypeScript errors** (iterate through files)
15. ✅ **Update seed script** and re-seed database
16. ✅ **Test application** thoroughly
17. ✅ **Update documentation** (README, etc.)

---

## RISKS & MITIGATION

### High Risk Areas:

1. **Database Migration Failure**
   - Risk: Migration may fail due to naming collision
   - Mitigation: Test on copy of database first, have backup ready

2. **URL Route Changes Breaking Links**
   - Risk: Old `/module/[id]` URLs won't work
   - Mitigation: Add redirect middleware or keep URL structure

3. **Missed References in Code**
   - Risk: Some files may still reference old names
   - Mitigation: Use IDE find/replace, compile and fix errors systematically

4. **Progress Data Loss**
   - Risk: UserProgress table foreign key changes could cause issues
   - Mitigation: Careful migration script, test thoroughly

---

## ALTERNATIVE: SAFER APPROACH

Instead of full migration, consider:

### Option B: Alias Approach (No DB Changes)
- Keep database schema as-is (`rounds`, `modules`)
- Use TypeScript type aliases in code:
  ```typescript
  export type Module = Round;  // For display
  export type Class = Module;  // For display
  ```
- Only change display strings in UI components
- Pro: No database risk, easy to revert
- Con: Code uses different names than DB (confusing)

---

## RECOMMENDATION

Given the previous failed attempt and the complexity:

**I recommend Option B (Alias Approach) unless you're confident about the full migration.**

However, if you want the full migration (Option 1), we should:
1. Test the entire process in a development environment first
2. Have database backup ready
3. Proceed incrementally with frequent commits
4. Be prepared to rollback if issues arise

**What would you like to proceed with?**
- Full migration (risky but cleaner)
- Alias approach (safer, keeps DB as-is)
- Different approach?

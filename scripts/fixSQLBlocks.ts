import * as fs from 'fs';
import * as path from 'path';

// Script to fix broken SQL code blocks in DA2.md
// Merges consecutive ```sql blocks that were incorrectly separated

const filePath = path.join(__dirname, '..', 'Course_Content', 'DA2.md');
let content = fs.readFileSync(filePath, 'utf-8');

// Pattern to find consecutive SQL blocks that should be merged
// Matches: ```\n```sql pattern (closing then immediately opening)
content = content.replace(/```\n```sql\n/g, '');

// Write the result
fs.writeFileSync(filePath, content);
console.log('Fixed broken SQL blocks in DA2.md');

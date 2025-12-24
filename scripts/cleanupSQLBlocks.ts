import * as fs from 'fs';
import * as path from 'path';

// Script to clean up fragmented SQL blocks in DA2.md
// Merges consecutive code blocks and inline code that should be together

const filePath = path.join(__dirname, '..', 'Course_Content', 'DA2.md');
let content = fs.readFileSync(filePath, 'utf-8');

// Step 1: Merge consecutive ```sql blocks separated by inline code or empty lines
// Pattern: ``` followed by inline code lines followed by ```sql
let iterations = 0;
let changed = true;

while (changed && iterations < 10) {
  changed = false;
  iterations++;

  // Merge: ```\n`inline`\n```sql -> just the content
  const beforeLength = content.length;

  // Pattern 1: Code block end, then inline code, then code block start
  content = content.replace(/```\n(\s*`[^`]+`\s*\n)+```sql\n/g, (match) => {
    changed = true;
    // Extract the inline code content
    const inlineLines = match
      .replace(/```\n/, '')
      .replace(/```sql\n$/, '')
      .split('\n')
      .filter(line => line.trim())
      .map(line => {
        const m = line.match(/^\s*`([^`]+)`\s*$/);
        return m ? m[1].replace(/\\_/g, '_').replace(/\\=/g, '=') : line;
      })
      .join('\n');
    return inlineLines + '\n';
  });

  // Pattern 2: Just merge consecutive code blocks
  content = content.replace(/```\n```sql\n/g, '');

  if (content.length !== beforeLength) {
    changed = true;
  }
}

// Step 2: Convert remaining standalone inline SQL to proper blocks
// Find sequences of lines that are all inline code and look like SQL
const lines = content.split('\n');
const result: string[] = [];
let inCodeBlock = false;
let inlineSqlBuffer: string[] = [];

function flushInlineSql() {
  if (inlineSqlBuffer.length > 0) {
    result.push('```sql');
    result.push(...inlineSqlBuffer);
    result.push('```');
    inlineSqlBuffer = [];
  }
}

function cleanInlineCode(text: string): string {
  return text
    .replace(/\\_/g, '_')
    .replace(/\\=/g, '=')
    .replace(/\\\*/g, '*')
    .replace(/\\-/g, '-')
    .replace(/\\</g, '<')
    .replace(/\\>/g, '>')
    .replace(/\\\+/g, '+');
}

for (let i = 0; i < lines.length; i++) {
  const line = lines[i];

  // Track code blocks
  if (line.trim().startsWith('```')) {
    flushInlineSql();
    if (line.trim() === '```' || line.trim().startsWith('```sql') || line.trim().startsWith('```python')) {
      inCodeBlock = !inCodeBlock || line.trim() === '```';
      if (line.trim().startsWith('```sql') || line.trim().startsWith('```python')) {
        inCodeBlock = true;
      }
    }
    result.push(line);
    continue;
  }

  if (inCodeBlock) {
    result.push(line);
    continue;
  }

  // Check for standalone inline SQL
  const inlineMatch = line.match(/^\s*`([^`]+)`\s*$/);
  if (inlineMatch) {
    const content = inlineMatch[1];
    // Check if it looks like SQL
    if (/\b(SELECT|FROM|WHERE|JOIN|GROUP|ORDER|HAVING|AND|OR|ON|AS|COUNT|SUM|AVG|MAX|MIN|WITH|INSERT|UPDATE|DELETE|CREATE)\b/i.test(content) ||
        /^[a-z_]+\s*,?\s*$/i.test(content.trim()) ||  // Column names
        /^[a-z_]+\.[a-z_]+/i.test(content.trim())) {  // Table.column
      inlineSqlBuffer.push(cleanInlineCode(content));
      continue;
    }
  }

  // Not inline SQL, flush buffer and add line
  flushInlineSql();
  result.push(line);
}

flushInlineSql();

// Write result
fs.writeFileSync(filePath, result.join('\n'));

console.log('Cleaned up SQL blocks in DA2.md');
console.log(`Iterations: ${iterations}`);

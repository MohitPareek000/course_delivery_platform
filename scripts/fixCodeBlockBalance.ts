import * as fs from 'fs';
import * as path from 'path';

// Script to fix code block balance - ensure every opening has a closing

const filePath = path.join(__dirname, '..', 'Course_Content', 'DA2.md');
const content = fs.readFileSync(filePath, 'utf-8');
const lines = content.split('\n');
const result: string[] = [];

let inCodeBlock = false;
let codeBlockType = '';
let codeBlockStart = 0;

for (let i = 0; i < lines.length; i++) {
  const line = lines[i];
  const trimmed = line.trim();

  // Check for code block opening
  if ((trimmed === '```sql' || trimmed === '```python') && !inCodeBlock) {
    inCodeBlock = true;
    codeBlockType = trimmed.slice(3);
    codeBlockStart = i;
    result.push(line);
    continue;
  }

  // Check for code block closing
  if (trimmed === '```' && inCodeBlock) {
    inCodeBlock = false;
    codeBlockType = '';
    result.push(line);
    continue;
  }

  // If we're in a code block and hit something that looks like markdown heading or new section
  // that shouldn't be in code, close the block first
  if (inCodeBlock) {
    // Check if this line is clearly not code (markdown heading, horizontal rule, etc.)
    if (trimmed.startsWith('### ') || trimmed.startsWith('## ') || trimmed.startsWith('# ') ||
        trimmed === '---' || trimmed.startsWith('**') && trimmed.endsWith('**') ||
        trimmed.startsWith('* ') || trimmed.match(/^\d+\.\s/)) {
      // This is markdown, close the code block
      result.push('```');
      result.push('');
      inCodeBlock = false;
      codeBlockType = '';
    }
  }

  result.push(line);
}

// If file ends while still in code block, close it
if (inCodeBlock) {
  result.push('```');
}

fs.writeFileSync(filePath, result.join('\n'));

// Verify the fix
const newContent = fs.readFileSync(filePath, 'utf-8');
const newLines = newContent.split('\n');
let opened = 0, closed = 0;
for (const l of newLines) {
  const t = l.trim();
  if (t === '```sql' || t === '```python') opened++;
  if (t === '```') closed++;
}
console.log(`Fixed code blocks. Opened: ${opened}, Closed: ${closed}`);

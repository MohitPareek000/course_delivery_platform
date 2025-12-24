import * as fs from 'fs';
import * as path from 'path';

// Insert missing closing ``` tags before new code blocks open

const filePath = path.join(__dirname, '..', 'Course_Content', 'DA2.md');
const content = fs.readFileSync(filePath, 'utf-8');
const lines = content.split('\n');
const result: string[] = [];

let inCodeBlock = false;

for (let i = 0; i < lines.length; i++) {
  const line = lines[i];
  const trimmed = line.trim();

  // If we see a new code block opening while already in one, close the current first
  if ((trimmed === '```sql' || trimmed === '```python') && inCodeBlock) {
    result.push('```');
    result.push('');
  }

  if (trimmed === '```sql' || trimmed === '```python') {
    inCodeBlock = true;
  } else if (trimmed === '```') {
    inCodeBlock = false;
  }

  result.push(line);
}

// Close if file ends in code block
if (inCodeBlock) {
  result.push('```');
}

fs.writeFileSync(filePath, result.join('\n'));

// Verify
const newContent = fs.readFileSync(filePath, 'utf-8');
const newLines = newContent.split('\n');
let opened = 0, closed = 0;
for (const l of newLines) {
  const t = l.trim();
  if (t === '```sql' || t === '```python') opened++;
  if (t === '```') closed++;
}
console.log(`Fixed. Opened: ${opened}, Closed: ${closed}`);

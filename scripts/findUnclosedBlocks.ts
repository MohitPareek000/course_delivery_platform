import * as fs from 'fs';
import * as path from 'path';

// Find unclosed code blocks

const filePath = path.join(__dirname, '..', 'Course_Content', 'DA2.md');
const content = fs.readFileSync(filePath, 'utf-8');
const lines = content.split('\n');

let inCodeBlock = false;
let codeBlockStart = 0;
let codeBlockType = '';

for (let i = 0; i < lines.length; i++) {
  const line = lines[i];
  const trimmed = line.trim();

  if ((trimmed === '```sql' || trimmed === '```python') && !inCodeBlock) {
    inCodeBlock = true;
    codeBlockType = trimmed.slice(3);
    codeBlockStart = i + 1; // 1-indexed
  } else if (trimmed === '```' && inCodeBlock) {
    inCodeBlock = false;
  } else if ((trimmed === '```sql' || trimmed === '```python') && inCodeBlock) {
    // Nested opening - previous block wasn't closed
    console.log(`Unclosed ${codeBlockType} block starting at line ${codeBlockStart}, new block at line ${i + 1}`);
    codeBlockStart = i + 1;
    codeBlockType = trimmed.slice(3);
  }
}

if (inCodeBlock) {
  console.log(`File ends with unclosed ${codeBlockType} block starting at line ${codeBlockStart}`);
}

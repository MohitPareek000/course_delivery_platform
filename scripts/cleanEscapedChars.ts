import * as fs from 'fs';
import * as path from 'path';

// Clean escaped characters in DA2.md that should display normally

const filePath = path.join(__dirname, '..', 'Course_Content', 'DA2.md');
let content = fs.readFileSync(filePath, 'utf-8');

// Don't clean inside code blocks - only in regular text
const lines = content.split('\n');
const result: string[] = [];
let inCodeBlock = false;

for (const line of lines) {
  if (line.trim().startsWith('```')) {
    inCodeBlock = !inCodeBlock;
    result.push(line);
    continue;
  }

  if (inCodeBlock) {
    // Inside code block - keep as is (already cleaned)
    result.push(line);
  } else {
    // Outside code block - clean escaped characters
    const cleaned = line
      .replace(/\\_/g, '_')
      .replace(/\\=/g, '=')
      .replace(/\\\*/g, '*')
      .replace(/\\-/g, '-')
      .replace(/\\</g, '<')
      .replace(/\\>/g, '>')
      .replace(/\\\+/g, '+')
      .replace(/\\#/g, '#')
      .replace(/\\\./g, '.');
    result.push(cleaned);
  }
}

fs.writeFileSync(filePath, result.join('\n'));

// Count what was cleaned
const beforeCount = (content.match(/\\_|\\=|\\\*|\\-|\\<|\\>|\\\+|\\#|\\\./g) || []).length;
const afterContent = result.join('\n');
const afterCount = (afterContent.match(/\\_|\\=|\\\*|\\-|\\<|\\>|\\\+|\\#|\\\./g) || []).length;

console.log(`Cleaned escaped characters in DA2.md`);
console.log(`Before: ${beforeCount} escaped sequences`);
console.log(`After: ${afterCount} escaped sequences`);

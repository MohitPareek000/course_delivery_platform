import * as fs from 'fs';
import * as path from 'path';

// Fix Python code blocks that were incorrectly marked as SQL
// and merge fragmented Python code

const filePath = path.join(__dirname, '..', 'Course_Content', 'DA2.md');
let content = fs.readFileSync(filePath, 'utf-8');

// Fix ```sql blocks that contain Python code
content = content.replace(/```sql\n(import pandas|import numpy|from pandas|result\s*=\s*\(|overall_avg\s*=|final\s*=|transactions\[|monthly\s*=|\.groupby|\.agg\(|\.reset_index)/g, '```python\n$1');

// Merge fragmented Python blocks
// Pattern: ```python\n...\n```\n`python code`\n```python
const lines = content.split('\n');
const result: string[] = [];
let i = 0;

function looksLikePython(line: string): boolean {
  const trimmed = line.trim();
  // Remove backticks if present
  const code = trimmed.replace(/^`|`$/g, '');

  return /^(import |from |result\s*=|overall_avg\s*=|final\s*=|monthly\s*=|transactions\[|\.groupby|\.agg\(|\.reset_index|[a-z_]+\s*=\s*\(|[a-z_]+\[['"])/i.test(code);
}

function cleanPythonLine(line: string): string {
  return line
    .replace(/^`|`$/g, '')  // Remove backticks
    .replace(/\\_/g, '_')
    .replace(/\\=/g, '=');
}

while (i < lines.length) {
  const line = lines[i];
  const trimmed = line.trim();

  // Check for Python code block
  if (trimmed === '```python' || (trimmed === '```sql' && i + 1 < lines.length && looksLikePython(lines[i + 1]))) {
    const codeBlock: string[] = [];
    const blockType = looksLikePython(lines[i + 1] || '') ? 'python' : 'sql';
    i++; // skip opening tag

    while (i < lines.length) {
      const currentLine = lines[i];
      const currentTrimmed = currentLine.trim();

      if (currentTrimmed === '```') {
        i++; // skip closing tag

        // Check for orphaned code after closing
        while (i < lines.length) {
          const nextLine = lines[i];
          const nextTrimmed = nextLine.trim();

          // Inline code that's Python
          const inlineMatch = nextTrimmed.match(/^`([^`]+)`$/);
          if (inlineMatch && looksLikePython(inlineMatch[1])) {
            codeBlock.push(cleanPythonLine(inlineMatch[1]));
            i++;
            continue;
          }

          // Another code block to merge
          if (nextTrimmed === '```python' || nextTrimmed === '```sql') {
            // Check if it's Python
            if (i + 1 < lines.length && looksLikePython(lines[i + 1])) {
              i++; // skip opening tag
              continue;
            }
          }

          // Empty line - check if more Python follows
          if (!nextTrimmed) {
            let lookAhead = i + 1;
            while (lookAhead < lines.length && !lines[lookAhead].trim()) {
              lookAhead++;
            }
            if (lookAhead < lines.length) {
              const futureInline = lines[lookAhead].trim().match(/^`([^`]+)`$/);
              if ((futureInline && looksLikePython(futureInline[1])) ||
                  lines[lookAhead].trim() === '```python') {
                i++;
                continue;
              }
            }
            break;
          }

          break;
        }
        break;
      }

      codeBlock.push(cleanPythonLine(currentLine));
      i++;
    }

    if (codeBlock.length > 0) {
      result.push('```python');
      result.push(...codeBlock);
      result.push('```');
    }
    continue;
  }

  result.push(line);
  i++;
}

fs.writeFileSync(filePath, result.join('\n'));
console.log('Fixed Python blocks in DA2.md');

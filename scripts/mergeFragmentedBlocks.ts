import * as fs from 'fs';
import * as path from 'path';

// Script to merge fragmented code blocks in DA2.md
// Finds patterns where ``` closes a block but SQL continues outside

const filePath = path.join(__dirname, '..', 'Course_Content', 'DA2.md');
let content = fs.readFileSync(filePath, 'utf-8');

const lines = content.split('\n');
const result: string[] = [];

function looksLikeSqlContinuation(line: string): boolean {
  const trimmed = line.trim();
  if (!trimmed) return false;

  // SQL continuation patterns - lines that can't start a new statement
  // but are clearly part of an ongoing SQL block
  const continuationPatterns = [
    /^\)\s*(AS\s+\w+)?/i,                    // ) or ) AS alias
    /^FROM\s+\w+/i,                           // FROM table
    /^WHERE\s+/i,                             // WHERE clause
    /^AND\s+/i,                               // AND condition
    /^OR\s+/i,                                // OR condition
    /^ORDER\s+BY/i,                           // ORDER BY
    /^GROUP\s+BY/i,                           // GROUP BY
    /^HAVING\s+/i,                            // HAVING
    /^LIMIT\s+/i,                             // LIMIT
    /^ON\s+/i,                                // ON clause
    /^LEFT\s+JOIN/i,                          // LEFT JOIN
    /^RIGHT\s+JOIN/i,                         // RIGHT JOIN
    /^INNER\s+JOIN/i,                         // INNER JOIN
    /^JOIN\s+/i,                              // JOIN
    /^UNION/i,                                // UNION
    /^,\s*$/,                                 // Just a comma
    /^\w+\s*,\s*$/,                           // column_name,
    /^\w+\.\w+/,                              // table.column
    /^--\s*.+/,                               // SQL comment
    /^\(\s*$/,                                // Opening parenthesis
    /^\)\s*;?\s*$/,                           // Closing parenthesis
    /^PARTITION\s+BY/i,                       // PARTITION BY
    /^OVER\s*\(/i,                            // OVER (
    /^\)\s*>\s*\d+/,                          // ) > number
    /^\)\s*AS\s+\w+\s*\\?--/i,               // ) AS alias -- comment
  ];

  for (const pattern of continuationPatterns) {
    if (pattern.test(trimmed)) return true;
  }

  // Check if it ends with SQL punctuation and has SQL-like content
  if (/[;,)]$/.test(trimmed) && /\b(SELECT|FROM|WHERE|AS|JOIN)\b/i.test(trimmed)) {
    return true;
  }

  return false;
}

function looksLikeSqlStart(line: string): boolean {
  const trimmed = line.trim();
  return /^(SELECT|WITH|INSERT|UPDATE|DELETE|CREATE|DROP|ALTER)\b/i.test(trimmed);
}

let i = 0;
while (i < lines.length) {
  const line = lines[i];
  const trimmed = line.trim();

  // Check if this is a code block opening
  if (trimmed === '```sql' || trimmed === '```python') {
    const blockType = trimmed.slice(3);
    const blockContent: string[] = [];
    i++; // skip opening tag

    // Collect content until we hit real end
    while (i < lines.length) {
      const currentLine = lines[i];
      const currentTrimmed = currentLine.trim();

      if (currentTrimmed === '```') {
        // Check if next non-empty line is SQL continuation
        let lookAhead = i + 1;
        while (lookAhead < lines.length && !lines[lookAhead].trim()) {
          lookAhead++;
        }

        if (lookAhead < lines.length) {
          const nextContent = lines[lookAhead].trim();

          // Check if it's a continuation
          if (looksLikeSqlContinuation(nextContent)) {
            // Skip the closing tag and continue collecting
            i++;

            // Skip empty lines
            while (i < lines.length && !lines[i].trim()) {
              i++;
            }
            continue;
          }

          // Check if there's another ```sql immediately after
          if (nextContent === '```sql' && blockType === 'sql') {
            // Skip closing, skip opening of next block
            i++; // skip closing ```
            while (i < lines.length && !lines[i].trim()) i++; // skip empty
            if (lines[i]?.trim() === '```sql') i++; // skip ```sql
            continue;
          }
        }

        // Real end of block
        i++;
        break;
      }

      blockContent.push(currentLine);
      i++;
    }

    if (blockContent.length > 0) {
      result.push('```' + blockType);
      result.push(...blockContent);
      result.push('```');
    }
    continue;
  }

  result.push(line);
  i++;
}

fs.writeFileSync(filePath, result.join('\n'));
console.log('Merged fragmented code blocks in DA2.md');
console.log(`Processed ${lines.length} lines, output ${result.length} lines`);

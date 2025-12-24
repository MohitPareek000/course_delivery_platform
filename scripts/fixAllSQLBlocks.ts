import * as fs from 'fs';
import * as path from 'path';

// Comprehensive script to fix ALL SQL formatting issues in DA2.md
// Handles: fragmented blocks, inline code that should be blocks, mixed content

const filePath = path.join(__dirname, '..', 'Course_Content', 'DA2.md');
let content = fs.readFileSync(filePath, 'utf-8');

function cleanSqlText(text: string): string {
  return text
    .replace(/\\_/g, '_')
    .replace(/\\=/g, '=')
    .replace(/\\\*/g, '*')
    .replace(/\\-/g, '-')
    .replace(/\\</g, '<')
    .replace(/\\>/g, '>')
    .replace(/\\\+/g, '+')
    .replace(/\\#/g, '#')
    .replace(/\\\./g, '.');
}

function looksLikeSqlLine(line: string): boolean {
  const trimmed = line.trim();
  if (!trimmed) return false;

  // SQL keywords at start of line
  if (/^(SELECT|FROM|WHERE|JOIN|LEFT|RIGHT|INNER|OUTER|FULL|CROSS|ON|AND|OR|GROUP|ORDER|HAVING|LIMIT|OFFSET|UNION|INSERT|UPDATE|DELETE|CREATE|DROP|ALTER|WITH|SET|VALUES|INTO|AS|CASE|WHEN|THEN|ELSE|END|COUNT|SUM|AVG|MAX|MIN|DISTINCT|BETWEEN|IN|LIKE|IS|NOT|NULL|EXISTS|PARTITION|OVER|ROW_NUMBER|RANK|DENSE_RANK|LAG|LEAD)\b/i.test(trimmed)) {
    return true;
  }

  // Column definitions (word followed by comma or AS)
  if (/^[a-z_][a-z0-9_]*\s*,\s*$/i.test(trimmed)) return true;
  if (/^[a-z_][a-z0-9_]*\s+AS\s+/i.test(trimmed)) return true;

  // Table.column patterns
  if (/^[a-z_]+\.[a-z_]+/i.test(trimmed)) return true;

  // Indented SQL content
  if (/^\s+[a-z_][a-z0-9_]*\s*,?\s*$/i.test(line)) return true;
  if (/^\s+[a-z_]+\.[a-z_]+/i.test(line)) return true;

  // Lines ending with SQL punctuation
  if (/[;,]\s*$/.test(trimmed) && /[a-z_]/i.test(trimmed)) return true;

  return false;
}

// Process line by line
const lines = content.split('\n');
const result: string[] = [];
let i = 0;

while (i < lines.length) {
  const line = lines[i];
  const trimmed = line.trim();

  // Check if we're starting a code block
  if (trimmed === '```sql') {
    // Collect all content until we find the closing ```
    // But also collect any orphaned SQL lines after the closing ```
    const sqlBlock: string[] = [];
    i++; // skip opening ```sql

    while (i < lines.length) {
      const currentLine = lines[i];
      const currentTrimmed = currentLine.trim();

      if (currentTrimmed === '```') {
        // Found closing tag - but check if next lines are orphaned SQL
        i++; // skip closing ```

        // Look ahead for orphaned SQL lines or inline code
        while (i < lines.length) {
          const nextLine = lines[i];
          const nextTrimmed = nextLine.trim();

          // Check for inline code that's SQL
          const inlineMatch = nextTrimmed.match(/^`([^`]+)`$/);
          if (inlineMatch && looksLikeSqlLine(inlineMatch[1])) {
            sqlBlock.push(cleanSqlText(inlineMatch[1]));
            i++;
            continue;
          }

          // Check for plain SQL lines (orphaned from block)
          if (looksLikeSqlLine(nextLine) && !nextTrimmed.startsWith('*') && !nextTrimmed.startsWith('#')) {
            sqlBlock.push(cleanSqlText(nextLine));
            i++;
            continue;
          }

          // Check for another ```sql block that should be merged
          if (nextTrimmed === '```sql') {
            i++; // skip the opening tag, continue collecting
            continue;
          }

          // Check for empty lines - might be between SQL parts
          if (!nextTrimmed) {
            // Look ahead to see if more SQL follows
            let lookAhead = i + 1;
            while (lookAhead < lines.length && !lines[lookAhead].trim()) {
              lookAhead++;
            }
            if (lookAhead < lines.length) {
              const futureLineTrimmed = lines[lookAhead].trim();
              const futureInlineMatch = futureLineTrimmed.match(/^`([^`]+)`$/);
              if (futureLineTrimmed === '```sql' ||
                  (futureInlineMatch && looksLikeSqlLine(futureInlineMatch[1])) ||
                  (looksLikeSqlLine(lines[lookAhead]) && !futureLineTrimmed.startsWith('*') && !futureLineTrimmed.startsWith('#'))) {
                // More SQL coming, skip empty line
                i++;
                continue;
              }
            }
            // No more SQL, break
            break;
          }

          // Not SQL content, stop
          break;
        }
        break;
      }

      // Regular line inside code block
      sqlBlock.push(cleanSqlText(currentLine));
      i++;
    }

    // Output the merged SQL block
    if (sqlBlock.length > 0) {
      result.push('```sql');
      result.push(...sqlBlock);
      result.push('```');
    }
    continue;
  }

  // Check for standalone inline SQL code that starts a block
  const inlineMatch = trimmed.match(/^`([^`]+)`$/);
  if (inlineMatch && looksLikeSqlLine(inlineMatch[1])) {
    const sqlBlock: string[] = [cleanSqlText(inlineMatch[1])];
    i++;

    // Collect following inline SQL lines
    while (i < lines.length) {
      const nextLine = lines[i];
      const nextTrimmed = nextLine.trim();

      const nextInlineMatch = nextTrimmed.match(/^`([^`]+)`$/);
      if (nextInlineMatch && looksLikeSqlLine(nextInlineMatch[1])) {
        sqlBlock.push(cleanSqlText(nextInlineMatch[1]));
        i++;
        continue;
      }

      // Plain SQL line
      if (looksLikeSqlLine(nextLine) && !nextTrimmed.startsWith('*') && !nextTrimmed.startsWith('#') && !nextTrimmed.startsWith('```')) {
        sqlBlock.push(cleanSqlText(nextLine));
        i++;
        continue;
      }

      // Empty line - check if more SQL follows
      if (!nextTrimmed) {
        let lookAhead = i + 1;
        while (lookAhead < lines.length && !lines[lookAhead].trim()) {
          lookAhead++;
        }
        if (lookAhead < lines.length) {
          const futureLineTrimmed = lines[lookAhead].trim();
          const futureInlineMatch = futureLineTrimmed.match(/^`([^`]+)`$/);
          if ((futureInlineMatch && looksLikeSqlLine(futureInlineMatch[1])) ||
              (looksLikeSqlLine(lines[lookAhead]) && !futureLineTrimmed.startsWith('*'))) {
            i++;
            continue;
          }
        }
        break;
      }

      break;
    }

    result.push('```sql');
    result.push(...sqlBlock);
    result.push('```');
    continue;
  }

  // Regular line - pass through
  result.push(line);
  i++;
}

// Write result
fs.writeFileSync(filePath, result.join('\n'));
console.log('Fixed all SQL blocks in DA2.md');
console.log(`Processed ${lines.length} lines, output ${result.length} lines`);

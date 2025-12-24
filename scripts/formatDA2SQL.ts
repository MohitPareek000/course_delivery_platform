import * as fs from 'fs';
import * as path from 'path';

// Script to wrap SQL code blocks in DA2.md with backticks for proper code formatting

const filePath = path.join(__dirname, '..', 'Course_Content', 'DA2.md');
let content = fs.readFileSync(filePath, 'utf-8');

// SQL keywords that start a SQL statement
const sqlStartKeywords = [
  'SELECT', 'INSERT', 'UPDATE', 'DELETE', 'CREATE', 'DROP', 'ALTER',
  'WITH', 'TRUNCATE', 'MERGE', 'GRANT', 'REVOKE'
];

const lines = content.split('\n');
const result: string[] = [];

function isSqlStartLine(line: string): boolean {
  const trimmed = line.trim();

  // If line is a SQL comment (starts with -- or \--), it's not a start line
  // but could be part of a SQL block
  if (trimmed.startsWith('\\--') || (trimmed.startsWith('--') && !trimmed.startsWith('---'))) {
    return false;
  }

  for (const keyword of sqlStartKeywords) {
    if (trimmed.toUpperCase().startsWith(keyword + ' ') ||
        trimmed.toUpperCase().startsWith(keyword + '\\') ||
        trimmed.toUpperCase() === keyword) {
      return true;
    }
  }
  return false;
}

function isSqlCommentLine(line: string): boolean {
  const trimmed = line.trim();
  return trimmed.startsWith('\\--') || (trimmed.startsWith('--') && !trimmed.startsWith('---'));
}

function looksLikeSqlContinuation(line: string): boolean {
  const trimmed = line.trim().toUpperCase();
  if (!trimmed) return false;

  // SQL continuation patterns
  const continuationPatterns = [
    /^(FROM|WHERE|AND|OR|JOIN|LEFT|RIGHT|INNER|OUTER|FULL|CROSS|ON|GROUP|ORDER|HAVING|LIMIT|OFFSET)\b/i,
    /^(UNION|INTERSECT|EXCEPT|SET|VALUES|INTO|AS|PARTITION|OVER|CASE|WHEN|THEN|ELSE|END)\b/i,
    /^(COUNT|SUM|AVG|MAX|MIN|DISTINCT|BETWEEN|IN|LIKE|IS|EXISTS|NOT|NULL)\b/i,
    /^(ROW_NUMBER|RANK|DENSE_RANK|LAG|LEAD|ASC|DESC|BY)\b/i,
    /^\s{2,}(OR|AND|ON|,)/i,  // Indented continuations
  ];

  for (const pattern of continuationPatterns) {
    if (pattern.test(trimmed)) return true;
  }

  // Check for indented lines that look like SQL (column names, operators)
  if (/^\s{2,}[a-z_]+\s*[=<>!]/i.test(line)) return true;
  if (/^\s{2,}[a-z_]+\s*,/i.test(line)) return true;

  return false;
}

function cleanSqlLine(line: string): string {
  // Unescape characters for SQL display
  return line
    .replace(/\\\*/g, '*')
    .replace(/\\=/g, '=')
    .replace(/\\_/g, '_')
    .replace(/\\-/g, '-')
    .replace(/\\</g, '<')
    .replace(/\\>/g, '>')
    .replace(/\\\+/g, '+')
    .replace(/\\#/g, '#')
    .replace(/\\\./g, '.')
    .replace(/\\$/g, '$');
}

function collectSqlBlock(startIndex: number): { lines: string[], endIndex: number } {
  const sqlLines: string[] = [];
  let i = startIndex;

  while (i < lines.length) {
    const line = lines[i];
    const trimmed = line.trim();

    // Empty line - check if SQL continues after
    if (!trimmed) {
      // Look ahead to see if next non-empty line is SQL
      let nextNonEmpty = i + 1;
      while (nextNonEmpty < lines.length && !lines[nextNonEmpty].trim()) {
        nextNonEmpty++;
      }

      if (nextNonEmpty < lines.length) {
        const nextLine = lines[nextNonEmpty];
        if (isSqlStartLine(nextLine) || looksLikeSqlContinuation(nextLine) || isSqlCommentLine(nextLine)) {
          // Include empty lines if SQL continues
          sqlLines.push(line);
          i++;
          continue;
        }
      }
      // End of SQL block
      break;
    }

    // Check if this looks like SQL content
    if (isSqlStartLine(line) || looksLikeSqlContinuation(line) || isSqlCommentLine(line)) {
      sqlLines.push(line);
      i++;
    } else {
      // Not SQL content, stop
      break;
    }
  }

  return { lines: sqlLines, endIndex: i };
}

let i = 0;
while (i < lines.length) {
  const line = lines[i];
  const trimmed = line.trim();

  // Skip if already in a code block
  if (trimmed.startsWith('```')) {
    result.push(line);
    i++;
    while (i < lines.length && !lines[i].trim().startsWith('```')) {
      result.push(lines[i]);
      i++;
    }
    if (i < lines.length) {
      result.push(lines[i]);
      i++;
    }
    continue;
  }

  // Check if this line starts a SQL block
  // Include SQL comments that are followed by SQL statements
  const nextLineIndex = i + 1;

  // Look ahead past empty lines to find next content
  let lookAheadIndex = nextLineIndex;
  while (lookAheadIndex < lines.length && !lines[lookAheadIndex].trim()) {
    lookAheadIndex++;
  }

  const isCommentBeforeSql = isSqlCommentLine(line) &&
                              lookAheadIndex < lines.length &&
                              isSqlStartLine(lines[lookAheadIndex]);

  if (isSqlStartLine(line) || isCommentBeforeSql) {
    // Collect the entire SQL block
    const block = collectSqlBlock(i);

    if (block.lines.length > 0) {
      // Clean and output as code block
      const cleanedLines = block.lines.map(cleanSqlLine);
      result.push('```sql');
      result.push(...cleanedLines);
      result.push('```');
      i = block.endIndex;
    } else {
      result.push(line);
      i++;
    }
  } else {
    result.push(line);
    i++;
  }
}

// Write the result
fs.writeFileSync(filePath, result.join('\n'));
console.log('DA2.md has been updated with SQL code blocks formatted.');
console.log(`Processed ${lines.length} lines.`);

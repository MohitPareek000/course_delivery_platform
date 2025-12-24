import * as fs from 'fs';
import * as path from 'path';

// Script to convert inline SQL code (single backticks) to fenced code blocks
// This ensures consistent styling across all SQL code in DA2.md

const filePath = path.join(__dirname, '..', 'Course_Content', 'DA2.md');
let content = fs.readFileSync(filePath, 'utf-8');

const lines = content.split('\n');
const result: string[] = [];

// SQL keywords to detect
const sqlKeywords = ['SELECT', 'FROM', 'WHERE', 'JOIN', 'LEFT', 'RIGHT', 'INNER', 'OUTER',
  'GROUP', 'ORDER', 'HAVING', 'LIMIT', 'OFFSET', 'INSERT', 'UPDATE', 'DELETE',
  'CREATE', 'DROP', 'ALTER', 'WITH', 'AND', 'OR', 'ON', 'AS', 'CASE', 'WHEN',
  'THEN', 'ELSE', 'END', 'UNION', 'COUNT', 'SUM', 'AVG', 'MAX', 'MIN', 'DISTINCT',
  'NULL', 'NOT', 'IN', 'BETWEEN', 'LIKE', 'IS', 'EXISTS', 'PARTITION', 'OVER',
  'ROW_NUMBER', 'RANK', 'DENSE_RANK', 'LAG', 'LEAD', 'VALUES', 'SET'];

function looksLikeSql(text: string): boolean {
  const upper = text.toUpperCase().trim();
  // Check if starts with SQL keyword or contains SQL patterns
  for (const keyword of sqlKeywords) {
    if (upper.startsWith(keyword + ' ') || upper.startsWith(keyword + '(') ||
        upper === keyword || upper.endsWith(keyword) ||
        upper.includes(' ' + keyword + ' ')) {
      return true;
    }
  }
  // Check for common SQL patterns
  if (/\bFROM\b|\bWHERE\b|\bSELECT\b|\bJOIN\b|\bGROUP BY\b|\bORDER BY\b/i.test(text)) {
    return true;
  }
  return false;
}

function cleanSqlText(text: string): string {
  return text
    .replace(/\\_/g, '_')
    .replace(/\\=/g, '=')
    .replace(/\\\*/g, '*')
    .replace(/\\-/g, '-')
    .replace(/\\</g, '<')
    .replace(/\\>/g, '>')
    .replace(/\\\+/g, '+');
}

let i = 0;
let inCodeBlock = false;
let sqlBlockBuffer: string[] = [];
let collectingSqlLines = false;

while (i < lines.length) {
  const line = lines[i];

  // Track fenced code blocks
  if (line.trim().startsWith('```')) {
    if (inCodeBlock) {
      inCodeBlock = false;
    } else {
      inCodeBlock = true;
    }
    result.push(line);
    i++;
    continue;
  }

  // Skip if inside existing code block
  if (inCodeBlock) {
    result.push(line);
    i++;
    continue;
  }

  // Check for lines that are entirely inline SQL code (like `SELECT ...`)
  const inlineCodeMatch = line.match(/^\s*`([^`]+)`\s*$/);

  if (inlineCodeMatch && looksLikeSql(inlineCodeMatch[1])) {
    // This line is entirely inline SQL - collect it
    if (!collectingSqlLines) {
      collectingSqlLines = true;
      sqlBlockBuffer = [];
    }
    // Clean and add to buffer (preserve indentation within the code)
    const sqlContent = cleanSqlText(inlineCodeMatch[1]);
    sqlBlockBuffer.push(sqlContent);
    i++;
    continue;
  }

  // Check for lines with indented inline SQL (like `    `SELECT ...`)
  const indentedInlineMatch = line.match(/^(\s*)`([^`]+)`\s*$/);
  if (indentedInlineMatch && looksLikeSql(indentedInlineMatch[2])) {
    if (!collectingSqlLines) {
      collectingSqlLines = true;
      sqlBlockBuffer = [];
    }
    const sqlContent = cleanSqlText(indentedInlineMatch[2]);
    // Preserve some indentation for nested SQL
    const indent = indentedInlineMatch[1].length > 2 ? '  ' : '';
    sqlBlockBuffer.push(indent + sqlContent);
    i++;
    continue;
  }

  // If we were collecting SQL and hit a non-SQL line
  if (collectingSqlLines) {
    // Flush the SQL buffer as a fenced code block
    if (sqlBlockBuffer.length > 0) {
      result.push('```sql');
      result.push(...sqlBlockBuffer);
      result.push('```');
      sqlBlockBuffer = [];
    }
    collectingSqlLines = false;
  }

  // Handle lines with mixed content (text + inline SQL)
  // For now, leave these as-is since they're truly inline
  result.push(line);
  i++;
}

// Flush any remaining SQL
if (collectingSqlLines && sqlBlockBuffer.length > 0) {
  result.push('```sql');
  result.push(...sqlBlockBuffer);
  result.push('```');
}

// Write the result
fs.writeFileSync(filePath, result.join('\n'));
console.log('Converted inline SQL to fenced code blocks in DA2.md');
console.log(`Processed ${lines.length} lines.`);

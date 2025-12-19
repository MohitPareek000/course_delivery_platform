import {
  Document,
  Packer,
  Paragraph,
  TextRun,
  HeadingLevel,
  Table,
  TableRow,
  TableCell,
  WidthType,
  BorderStyle,
  AlignmentType,
} from 'docx';
import * as fs from 'fs';

async function convertMarkdownToDocx() {
  const markdownContent = fs.readFileSync(
    '/Users/mohitpareek/Desktop/CoursePlatform/DATABASE_DOCUMENTATION.md',
    'utf-8'
  );

  const lines = markdownContent.split('\n');
  const children: (Paragraph | Table)[] = [];

  let inCodeBlock = false;
  let codeBlockContent: string[] = [];
  let inTable = false;
  let tableRows: string[][] = [];

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    // Handle code blocks
    if (line.startsWith('```')) {
      if (inCodeBlock) {
        // End code block
        children.push(
          new Paragraph({
            children: [
              new TextRun({
                text: codeBlockContent.join('\n'),
                font: 'Courier New',
                size: 18,
              }),
            ],
            shading: { fill: 'F5F5F5' },
            spacing: { before: 100, after: 100 },
          })
        );
        codeBlockContent = [];
        inCodeBlock = false;
      } else {
        inCodeBlock = true;
      }
      continue;
    }

    if (inCodeBlock) {
      codeBlockContent.push(line);
      continue;
    }

    // Handle tables
    if (line.startsWith('|') && line.endsWith('|')) {
      if (!inTable) {
        inTable = true;
        tableRows = [];
      }
      // Skip separator row (|---|---|)
      if (line.includes('---')) continue;

      const cells = line
        .split('|')
        .slice(1, -1)
        .map((cell) => cell.trim());
      tableRows.push(cells);
      continue;
    } else if (inTable) {
      // End of table
      if (tableRows.length > 0) {
        const table = new Table({
          width: { size: 100, type: WidthType.PERCENTAGE },
          rows: tableRows.map(
            (row, rowIndex) =>
              new TableRow({
                children: row.map(
                  (cell) =>
                    new TableCell({
                      children: [
                        new Paragraph({
                          children: [
                            new TextRun({
                              text: cell,
                              bold: rowIndex === 0,
                              size: 20,
                            }),
                          ],
                        }),
                      ],
                      borders: {
                        top: { style: BorderStyle.SINGLE, size: 1 },
                        bottom: { style: BorderStyle.SINGLE, size: 1 },
                        left: { style: BorderStyle.SINGLE, size: 1 },
                        right: { style: BorderStyle.SINGLE, size: 1 },
                      },
                    })
                ),
              })
          ),
        });
        children.push(table);
        children.push(new Paragraph({ text: '' }));
      }
      tableRows = [];
      inTable = false;
    }

    // Handle headings
    if (line.startsWith('# ')) {
      children.push(
        new Paragraph({
          text: line.replace('# ', ''),
          heading: HeadingLevel.HEADING_1,
          spacing: { before: 400, after: 200 },
        })
      );
    } else if (line.startsWith('## ')) {
      children.push(
        new Paragraph({
          text: line.replace('## ', ''),
          heading: HeadingLevel.HEADING_2,
          spacing: { before: 300, after: 150 },
        })
      );
    } else if (line.startsWith('### ')) {
      children.push(
        new Paragraph({
          text: line.replace('### ', ''),
          heading: HeadingLevel.HEADING_3,
          spacing: { before: 200, after: 100 },
        })
      );
    } else if (line.startsWith('#### ')) {
      children.push(
        new Paragraph({
          text: line.replace('#### ', ''),
          heading: HeadingLevel.HEADING_4,
          spacing: { before: 150, after: 75 },
        })
      );
    }
    // Handle horizontal rules
    else if (line.startsWith('---')) {
      children.push(
        new Paragraph({
          border: { bottom: { style: BorderStyle.SINGLE, size: 1, color: 'CCCCCC' } },
          spacing: { before: 200, after: 200 },
        })
      );
    }
    // Handle list items
    else if (line.startsWith('- ') || line.match(/^\d+\. /)) {
      const text = line.replace(/^-\s+/, '').replace(/^\d+\.\s+/, '');
      children.push(
        new Paragraph({
          children: [
            new TextRun({
              text: '• ' + text.replace(/\*\*(.*?)\*\*/g, '$1').replace(/`(.*?)`/g, '$1'),
              size: 22,
            }),
          ],
          spacing: { before: 50, after: 50 },
          indent: { left: 360 },
        })
      );
    }
    // Handle bold text and regular paragraphs
    else if (line.trim() && !line.startsWith('|')) {
      const cleanText = line
        .replace(/\*\*(.*?)\*\*/g, '$1')
        .replace(/`(.*?)`/g, '$1')
        .replace(/\[(.*?)\]\(.*?\)/g, '$1');

      if (cleanText.trim()) {
        children.push(
          new Paragraph({
            children: [new TextRun({ text: cleanText, size: 22 })],
            spacing: { before: 50, after: 50 },
          })
        );
      }
    }
  }

  // Handle remaining table
  if (inTable && tableRows.length > 0) {
    const table = new Table({
      width: { size: 100, type: WidthType.PERCENTAGE },
      rows: tableRows.map(
        (row, rowIndex) =>
          new TableRow({
            children: row.map(
              (cell) =>
                new TableCell({
                  children: [
                    new Paragraph({
                      children: [
                        new TextRun({
                          text: cell,
                          bold: rowIndex === 0,
                          size: 20,
                        }),
                      ],
                    }),
                  ],
                  borders: {
                    top: { style: BorderStyle.SINGLE, size: 1 },
                    bottom: { style: BorderStyle.SINGLE, size: 1 },
                    left: { style: BorderStyle.SINGLE, size: 1 },
                    right: { style: BorderStyle.SINGLE, size: 1 },
                  },
                })
            ),
          })
      ),
    });
    children.push(table);
  }

  const doc = new Document({
    sections: [
      {
        properties: {},
        children: children,
      },
    ],
  });

  const buffer = await Packer.toBuffer(doc);
  fs.writeFileSync('/Users/mohitpareek/Desktop/CoursePlatform/DATABASE_DOCUMENTATION.docx', buffer);
  console.log('✅ Successfully created DATABASE_DOCUMENTATION.docx');
}

convertMarkdownToDocx().catch(console.error);

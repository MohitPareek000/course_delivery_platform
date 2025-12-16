import { prisma } from '../lib/prisma';
import * as fs from 'fs';
import * as path from 'path';
import { promisify } from 'util';
import { pipeline } from 'stream';

const streamPipeline = promisify(pipeline);

// Ensure public/images directory exists
const imagesDir = path.join(process.cwd(), 'public', 'images', 'course-content');
if (!fs.existsSync(imagesDir)) {
  fs.mkdirSync(imagesDir, { recursive: true });
}

function extractGoogleDriveFileId(url: string): string | null {
  const patterns = [
    /[?&]id=([a-zA-Z0-9_-]+)/,
    /\/d\/([a-zA-Z0-9_-]+)/,
    /\/file\/d\/([a-zA-Z0-9_-]+)/
  ];

  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match) {
      return match[1];
    }
  }
  return null;
}

async function downloadImage(url: string, filename: string): Promise<string | null> {
  const fileId = extractGoogleDriveFileId(url);
  if (!fileId) {
    console.log(`❌ Could not extract file ID from: ${url}`);
    return null;
  }

  // Try multiple Google Drive URL formats
  const formats = [
    `https://drive.google.com/uc?export=download&id=${fileId}`,
    `https://lh3.googleusercontent.com/d/${fileId}=s1600`,
    `https://drive.google.com/thumbnail?id=${fileId}&sz=w2000`,
  ];

  for (const downloadUrl of formats) {
    try {
      console.log(`  Trying: ${downloadUrl}`);
      const response = await fetch(downloadUrl, {
        redirect: 'follow',
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
        },
      });

      if (!response.ok) {
        console.log(`    ❌ Failed: ${response.status} ${response.statusText}`);
        continue;
      }

      const contentType = response.headers.get('content-type');
      if (!contentType || !contentType.startsWith('image/')) {
        console.log(`    ❌ Not an image: ${contentType}`);
        continue;
      }

      // Determine file extension from content type
      const ext = contentType.split('/')[1] || 'jpg';
      const finalFilename = `${filename}.${ext}`;
      const filePath = path.join(imagesDir, finalFilename);

      // Download and save
      const arrayBuffer = await response.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);
      fs.writeFileSync(filePath, buffer);

      console.log(`  ✅ Downloaded successfully: ${finalFilename} (${(buffer.length / 1024).toFixed(2)} KB)`);
      return `/images/course-content/${finalFilename}`;
    } catch (error) {
      console.log(`    ❌ Error: ${error}`);
      continue;
    }
  }

  console.log(`❌ All download attempts failed for file ID: ${fileId}`);
  return null;
}

async function main() {
  console.log('🔍 Finding all classes with Google Drive images in textContent...\n');

  const classes = await prisma.class.findMany({
    where: {
      textContent: {
        contains: 'drive.google.com',
      },
    },
    select: {
      id: true,
      title: true,
      textContent: true,
    },
  });

  console.log(`Found ${classes.length} classes with Google Drive images\n`);

  for (const cls of classes) {
    console.log(`📝 Processing: ${cls.title} (${cls.id})`);

    if (!cls.textContent) {
      console.log('  ⏭️  No text content, skipping\n');
      continue;
    }

    // Find all image markdown patterns
    const imagePattern = /!\[([^\]]*)\]\((https:\/\/drive\.google\.com[^)]+)\)/g;
    let updatedContent = cls.textContent;
    let hasChanges = false;
    let match;

    while ((match = imagePattern.exec(cls.textContent)) !== null) {
      const [fullMatch, altText, originalUrl] = match;
      console.log(`  🖼️  Found image: ${altText || 'untitled'}`);

      // Generate a safe filename
      const safeTitle = cls.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .substring(0, 50);
      const imageIndex = (updatedContent.match(/!\[/g) || []).length;
      const filename = `${cls.id}-${safeTitle}-${imageIndex}`;

      // Download the image
      const localPath = await downloadImage(originalUrl, filename);

      if (localPath) {
        // Replace the URL in the content
        updatedContent = updatedContent.replace(originalUrl, localPath);
        hasChanges = true;
        console.log(`  ✅ Replaced URL with: ${localPath}`);
      } else {
        console.log(`  ⚠️  Keeping original URL (download failed)`);
      }
    }

    if (hasChanges) {
      // Update the database
      await prisma.class.update({
        where: { id: cls.id },
        data: { textContent: updatedContent },
      });
      console.log(`  💾 Updated database record\n`);
    } else {
      console.log(`  ⏭️  No changes made\n`);
    }
  }

  console.log('✅ Done!');
}

main()
  .catch((e) => {
    console.error('❌ Error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

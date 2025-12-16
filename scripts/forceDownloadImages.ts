import { prisma } from '../lib/prisma';
import * as fs from 'fs';
import * as path from 'path';
import * as https from 'https';
import * as http from 'http';

// Ensure public/images directory exists
const imagesDir = path.join(process.cwd(), 'public', 'images', 'course-content');
if (!fs.existsSync(imagesDir)) {
  fs.mkdirSync(imagesDir, { recursive: true });
  console.log('✅ Created directory:', imagesDir);
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

async function downloadWithHttps(url: string): Promise<Buffer | null> {
  return new Promise((resolve) => {
    const client = url.startsWith('https://') ? https : http;

    client.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': 'image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.9',
        'Cache-Control': 'no-cache',
        'Pragma': 'no-cache',
      }
    }, (response) => {
      // Handle redirects manually
      if (response.statusCode === 302 || response.statusCode === 301) {
        const redirectUrl = response.headers.location;
        if (redirectUrl) {
          console.log(`    → Redirecting to: ${redirectUrl.substring(0, 80)}...`);
          downloadWithHttps(redirectUrl).then(resolve);
          return;
        }
      }

      if (response.statusCode !== 200) {
        console.log(`    ❌ HTTP ${response.statusCode}`);
        resolve(null);
        return;
      }

      const contentType = response.headers['content-type'] || '';

      if (!contentType.startsWith('image/')) {
        console.log(`    ❌ Not an image: ${contentType}`);
        resolve(null);
        return;
      }

      const chunks: Buffer[] = [];
      response.on('data', (chunk) => chunks.push(chunk));
      response.on('end', () => {
        const buffer = Buffer.concat(chunks);
        console.log(`    ✅ Downloaded ${(buffer.length / 1024).toFixed(2)} KB (${contentType})`);
        resolve(buffer);
      });
      response.on('error', () => resolve(null));
    }).on('error', () => resolve(null));
  });
}

async function downloadImage(url: string, filename: string): Promise<string | null> {
  const fileId = extractGoogleDriveFileId(url);
  if (!fileId) {
    console.log(`❌ Could not extract file ID from: ${url}`);
    return null;
  }

  console.log(`  📥 File ID: ${fileId}`);

  // Try multiple URL formats for Google Drive
  const formats = [
    // Direct content URL (works for public files)
    `https://drive.google.com/uc?export=download&id=${fileId}&confirm=t`,
    // Google User Content CDN
    `https://lh3.googleusercontent.com/d/${fileId}=s2000`,
    // Drive API v3 (public files)
    `https://www.googleapis.com/drive/v3/files/${fileId}?alt=media`,
    // Legacy thumbnail API
    `https://drive.google.com/thumbnail?id=${fileId}&sz=w2000`,
  ];

  for (const downloadUrl of formats) {
    try {
      console.log(`  🔄 Trying: ${downloadUrl.substring(0, 60)}...`);

      const buffer = await downloadWithHttps(downloadUrl);

      if (buffer && buffer.length > 1000) { // Minimum size check
        // Detect file type from buffer
        let ext = 'jpg';
        if (buffer[0] === 0x89 && buffer[1] === 0x50) ext = 'png';
        else if (buffer[0] === 0xFF && buffer[1] === 0xD8) ext = 'jpg';
        else if (buffer[0] === 0x47 && buffer[1] === 0x49) ext = 'gif';
        else if (buffer[0] === 0x52 && buffer[1] === 0x49) ext = 'webp';

        const finalFilename = `${filename}.${ext}`;
        const filePath = path.join(imagesDir, finalFilename);

        fs.writeFileSync(filePath, buffer);
        console.log(`  ✅ Saved: ${finalFilename}\n`);

        return `/images/course-content/${finalFilename}`;
      }
    } catch (error: any) {
      console.log(`    ❌ Error: ${error.message}`);
    }
  }

  console.log(`  ❌ All download attempts failed\n`);
  return null;
}

async function main() {
  console.log('🔍 Finding all classes with Google Drive images...\n');

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

  console.log(`Found ${classes.length} classes with images\n`);
  console.log('=' .repeat(60) + '\n');

  let totalImages = 0;
  let successCount = 0;

  for (const cls of classes) {
    console.log(`📝 ${cls.title}`);
    console.log(`   ID: ${cls.id}`);

    if (!cls.textContent) {
      console.log('   ⏭️  No content\n');
      continue;
    }

    const imagePattern = /!\[([^\]]*)\]\((https:\/\/drive\.google\.com[^)]+)\)/g;
    let updatedContent = cls.textContent;
    let hasChanges = false;

    const matches = Array.from(cls.textContent.matchAll(imagePattern));

    if (matches.length === 0) {
      console.log('   ⏭️  No images found\n');
      continue;
    }

    console.log(`   Found ${matches.length} image(s)\n`);

    for (let i = 0; i < matches.length; i++) {
      const [fullMatch, altText, originalUrl] = matches[i];
      totalImages++;

      console.log(`   Image ${i + 1}/${matches.length}:`);

      const safeTitle = cls.id.substring(0, 12);
      const filename = `${safeTitle}-img-${i + 1}`;

      const localPath = await downloadImage(originalUrl, filename);

      if (localPath) {
        updatedContent = updatedContent.replace(originalUrl, localPath);
        hasChanges = true;
        successCount++;
      }
    }

    if (hasChanges) {
      await prisma.class.update({
        where: { id: cls.id },
        data: { textContent: updatedContent },
      });
      console.log(`   💾 Database updated\n`);
    }

    console.log('=' .repeat(60) + '\n');
  }

  console.log('\n📊 Summary:');
  console.log(`   Total images found: ${totalImages}`);
  console.log(`   Successfully downloaded: ${successCount}`);
  console.log(`   Failed: ${totalImages - successCount}`);
  console.log(`   Success rate: ${((successCount / totalImages) * 100).toFixed(1)}%`);

  if (successCount > 0) {
    console.log('\n✅ Images saved to: /public/images/course-content/');
    console.log('✅ Database updated with local paths');
    console.log('\n🎉 Done! Refresh your browser to see the images.');
  } else {
    console.log('\n⚠️  No images could be downloaded.');
    console.log('   The Google Drive files may not be publicly accessible.');
    console.log('   Please make sure to set sharing to "Anyone with the link"');
  }
}

main()
  .catch((e) => {
    console.error('❌ Fatal error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

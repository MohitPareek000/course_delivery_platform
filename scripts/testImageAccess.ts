import { PrismaClient } from '@prisma/client';
import * as https from 'https';

const prisma = new PrismaClient();

async function testImageAccess() {
  console.log('🔍 Testing image accessibility...\n');

  const classesWithImages = await prisma.class.findMany({
    where: {
      textContent: {
        contains: '![Image]'
      }
    },
    select: {
      id: true,
      title: true,
      textContent: true
    },
    take: 5 // Test first 5 images
  });

  console.log(`Found ${classesWithImages.length} classes to test\n`);

  for (const cls of classesWithImages) {
    const imageMatches = cls.textContent?.matchAll(/!\[Image\]\((.*?)\)/g);
    if (imageMatches) {
      for (const match of imageMatches) {
        const imageUrl = match[1];
        console.log(`Testing: ${cls.title}`);
        console.log(`URL: ${imageUrl}`);

        try {
          const response = await fetch(imageUrl);
          if (response.ok) {
            console.log(`✅ Accessible (${response.status})`);
          } else {
            console.log(`❌ Not accessible (${response.status})`);
          }
        } catch (error) {
          console.log(`❌ Failed to fetch: ${error}`);
        }
        console.log('');
      }
    }
  }

  await prisma.$disconnect();
}

testImageAccess();

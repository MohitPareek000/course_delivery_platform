import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function checkImages() {
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
    }
  });

  console.log(`\n✅ Found ${classesWithImages.length} classes with embedded images:\n`);

  classesWithImages.forEach((cls, index) => {
    const imageCount = (cls.textContent?.match(/!\[Image\]/g) || []).length;
    console.log(`${index + 1}. ${cls.title}`);
    console.log(`   📸 Images: ${imageCount}`);

    // Extract and show image URLs
    const imageMatches = cls.textContent?.matchAll(/!\[Image\]\((.*?)\)/g);
    if (imageMatches) {
      let imgIndex = 1;
      for (const match of imageMatches) {
        console.log(`   Image ${imgIndex}: ${match[1]}`);
        imgIndex++;
      }
    }
    console.log('');
  });

  await prisma.$disconnect();
}

checkImages();

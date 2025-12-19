import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const SCALER_MEETING_URL = 'https://www.scaler.com/meetings/food-delivery-data-exploration-and-analysis-1/j/a/3cmhbMC2z_uWkhakTWKKEmItPuE5x9x4';
const CLASS_ID = 'cmj2ulphj0005sgm6rzwaa124'; // Two Pointer Technique class

async function updateClassWithScalerMeeting() {
  console.log('🔄 Updating Software Engineer course class with Scaler Meeting URL...\n');

  try {
    // Get the current class details
    const currentClass = await prisma.class.findUnique({
      where: { id: CLASS_ID },
      select: {
        id: true,
        title: true,
        videoUrl: true,
        contentType: true,
      },
    });

    if (!currentClass) {
      console.log(`❌ Class with ID ${CLASS_ID} not found\n`);
      return;
    }

    console.log('📝 Current Class Details:');
    console.log(`   Title: ${currentClass.title}`);
    console.log(`   Class ID: ${currentClass.id}`);
    console.log(`   Content Type: ${currentClass.contentType || 'video'}`);
    console.log(`   Current Video URL: ${currentClass.videoUrl || 'None'}\n`);

    // Update the class with Scaler Meeting URL
    const updatedClass = await prisma.class.update({
      where: { id: CLASS_ID },
      data: {
        videoUrl: SCALER_MEETING_URL,
        contentType: 'video', // Ensure it's set to video type
      },
    });

    console.log('✅ Successfully updated class!\n');
    console.log('📝 Updated Class Details:');
    console.log(`   Title: ${updatedClass.title}`);
    console.log(`   Class ID: ${updatedClass.id}`);
    console.log(`   Content Type: ${updatedClass.contentType || 'video'}`);
    console.log(`   New Video URL: ${updatedClass.videoUrl}\n`);

    console.log('🎉 The Scaler Meeting will now be embedded when users view this class!');
    console.log(`   Access it at: /course/cmj2ulp0d0000sgm62xoncj41/class/${CLASS_ID}\n`);

  } catch (error) {
    console.error('❌ Error updating class:', error);
  }
}

async function main() {
  try {
    await updateClassWithScalerMeeting();
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

main();

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function showDatabaseStructure() {
  try {
    console.log('\n=== DATABASE STRUCTURE ===\n');

    // Get all courses with full structure
    const courses = await prisma.course.findMany({
      include: {
        rounds: {
          include: {
            topics: {
              include: {
                modules: {
                  orderBy: { order: 'asc' }
                }
              },
              orderBy: { order: 'asc' }
            }
          },
          orderBy: { order: 'asc' }
        },
        topics: {
          where: {
            roundId: null
          },
          include: {
            modules: {
              orderBy: { order: 'asc' }
            }
          },
          orderBy: { order: 'asc' }
        }
      }
    });

    // Display each course
    for (const course of courses) {
      console.log(`📚 COURSE: ${course.title}`);
      console.log(`   ID: ${course.id}`);
      console.log(`   Type: ${course.type || 'N/A'}`);
      console.log(`   Role: ${course.role || 'N/A'}`);
      console.log(`   Skill: ${course.skill || 'N/A'}`);
      console.log(`   Company: ${course.companyName || 'N/A'}`);
      console.log('');

      // Display rounds and their topics
      if (course.rounds.length > 0) {
        console.log('   ROUNDS:');
        for (const round of course.rounds) {
          console.log(`   🔵 Round ${round.order}: ${round.title}`);

          for (const topic of round.topics) {
            console.log(`      📖 Topic: ${topic.title} (${topic.modules.length} modules)`);

            for (const module of topic.modules) {
              const icon = module.contentType === 'video' ? '🎥' :
                          module.contentType === 'text' ? '📝' :
                          module.contentType === 'contest' ? '🏆' : '❓';
              console.log(`         ${icon} ${module.order}. ${module.title} [${module.contentType}]`);
            }
          }
        }
        console.log('');
      }

      // Display standalone topics (for skill-based courses)
      if (course.topics.length > 0) {
        console.log('   TOPICS (No rounds):');
        for (const topic of course.topics) {
          console.log(`   📖 Topic: ${topic.title} (${topic.modules.length} modules)`);

          for (const module of topic.modules) {
            const icon = module.contentType === 'video' ? '🎥' :
                        module.contentType === 'text' ? '📝' :
                        module.contentType === 'contest' ? '🏆' : '❓';
            console.log(`      ${icon} ${module.order}. ${module.title} [${module.contentType}]`);
          }
        }
        console.log('');
      }
    }

    // Show content type statistics
    console.log('\n=== CONTENT TYPE STATISTICS ===\n');

    const allModules = await prisma.module.findMany({
      select: {
        contentType: true
      }
    });

    const stats = allModules.reduce((acc, module) => {
      const type = module.contentType || 'video';
      acc[type] = (acc[type] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    console.log('Total modules:', allModules.length);
    console.log('By type:');
    console.log('  🎥 Video:', stats['video'] || 0);
    console.log('  📝 Text:', stats['text'] || 0);
    console.log('  🏆 Contest:', stats['contest'] || 0);
    console.log('');

  } catch (error) {
    console.error('Error fetching database structure:', error);
  } finally {
    await prisma.$disconnect();
  }
}

showDatabaseStructure();

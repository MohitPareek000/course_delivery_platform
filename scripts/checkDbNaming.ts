import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function checkDatabaseNaming() {
  try {
    console.log('\n=== CHECKING DATABASE FIELD NAMES ===\n');

    // Get a sample course with one round and one topic
    const course = await prisma.course.findFirst({
      include: {
        rounds: {
          take: 1,
          include: {
            topics: {
              take: 1,
              include: {
                modules: {
                  take: 1
                }
              }
            }
          }
        }
      }
    });

    if (course) {
      console.log('📚 COURSE fields:');
      console.log(JSON.stringify({
        id: course.id,
        title: course.title,
        type: course.type,
        role: course.role,
        skill: course.skill,
        companyName: course.companyName
      }, null, 2));
      console.log('');

      if (course.rounds.length > 0) {
        const round = course.rounds[0];
        console.log('🔵 ROUND fields (stored as):');
        console.log(JSON.stringify({
          id: round.id,
          courseId: round.courseId,
          title: round.title,
          description: round.description,
          order: round.order,
          learningOutcomes: round.learningOutcomes
        }, null, 2));
        console.log('');

        if (round.topics.length > 0) {
          const topic = round.topics[0];
          console.log('📖 TOPIC fields (stored as):');
          console.log(JSON.stringify({
            id: topic.id,
            roundId: topic.roundId,
            courseId: topic.courseId,
            title: topic.title,
            order: topic.order
          }, null, 2));
          console.log('');

          if (topic.modules.length > 0) {
            const module = topic.modules[0];
            console.log('📦 MODULE fields (stored as):');
            console.log(JSON.stringify({
              id: module.id,
              topicId: module.topicId,
              title: module.title,
              contentType: module.contentType,
              videoUrl: module.videoUrl ? 'present' : null,
              textContent: module.textContent ? 'present' : null,
              contestUrl: module.contestUrl ? 'present' : null,
              duration: module.duration,
              order: module.order
            }, null, 2));
          }
        }
      }
    }

    console.log('\n=== FIELD NAME MAPPING ===\n');
    console.log('Database Schema → TypeScript Types → Frontend Display');
    console.log('─────────────────────────────────────────────────────');
    console.log('Round.title      → Round.title       → "Round 1: Aptitude"');
    console.log('Round.name       → NOT IN SCHEMA     → (should be Round.title)');
    console.log('Topic.title      → Topic.title       → "Quantitative Aptitude"');
    console.log('Topic.name       → NOT IN SCHEMA     → (should be Topic.title)');
    console.log('Module.title     → Module.title      → "Introduction to..."');
    console.log('');

    console.log('\n=== ISSUE FOUND ===\n');
    console.log('❌ Database shows "undefined" for Round and Topic names in output');
    console.log('   This happens because:');
    console.log('   1. Schema defines: Round.title and Topic.title');
    console.log('   2. Frontend tries to access: round.name and topic.name');
    console.log('   3. Result: "undefined" displayed instead of actual names');
    console.log('');
    console.log('✅ Solution: Frontend should use round.title and topic.title');
    console.log('');

  } catch (error) {
    console.error('Error:', error);
  } finally {
    await prisma.$disconnect();
  }
}

checkDatabaseNaming();

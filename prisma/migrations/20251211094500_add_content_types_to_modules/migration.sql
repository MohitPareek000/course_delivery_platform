-- AlterTable
ALTER TABLE "modules" ADD COLUMN     "contentType" TEXT DEFAULT 'video',
ADD COLUMN     "contestPlatform" TEXT,
ADD COLUMN     "contestUrl" TEXT,
ADD COLUMN     "textContent" TEXT,
ALTER COLUMN "videoUrl" DROP NOT NULL;

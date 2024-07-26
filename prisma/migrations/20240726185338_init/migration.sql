/*
  Warnings:

  - You are about to drop the column `SubtopicId` on the `Quiz` table. All the data in the column will be lost.
  - Added the required column `ContentId` to the `Quiz` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Quiz" DROP CONSTRAINT "Quiz_SubtopicId_fkey";

-- AlterTable
ALTER TABLE "Quiz" DROP COLUMN "SubtopicId",
ADD COLUMN     "ContentId" INTEGER NOT NULL;

-- CreateIndex
CREATE INDEX "Quiz_ContentId_idx" ON "Quiz"("ContentId");

-- AddForeignKey
ALTER TABLE "Quiz" ADD CONSTRAINT "Quiz_ContentId_fkey" FOREIGN KEY ("ContentId") REFERENCES "Content"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

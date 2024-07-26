/*
  Warnings:

  - You are about to drop the `Quizes` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Quizes" DROP CONSTRAINT "Quizes_ContentId_fkey";

-- DropTable
DROP TABLE "Quizes";

-- CreateTable
CREATE TABLE "Quiz" (
    "id" SERIAL NOT NULL,
    "question" TEXT NOT NULL,
    "options" JSONB NOT NULL,
    "correct" TEXT NOT NULL,
    "timeStarted" TIMESTAMP(3) NOT NULL,
    "timeEnded" TIMESTAMP(3) NOT NULL,
    "ContentId" INTEGER NOT NULL,
    "Completed" BOOLEAN NOT NULL,

    CONSTRAINT "Quiz_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Quiz_ContentId_idx" ON "Quiz"("ContentId");

-- AddForeignKey
ALTER TABLE "Quiz" ADD CONSTRAINT "Quiz_ContentId_fkey" FOREIGN KEY ("ContentId") REFERENCES "Content"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

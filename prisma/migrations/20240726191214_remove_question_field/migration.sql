/*
  Warnings:

  - You are about to drop the `Quiz` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Quiz" DROP CONSTRAINT "Quiz_ContentId_fkey";

-- DropTable
DROP TABLE "Quiz";

-- CreateTable
CREATE TABLE "Quizes" (
    "id" SERIAL NOT NULL,
    "quizcontent" JSONB NOT NULL,
    "ContentId" INTEGER NOT NULL,

    CONSTRAINT "Quizes_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Quizes_ContentId_idx" ON "Quizes"("ContentId");

-- AddForeignKey
ALTER TABLE "Quizes" ADD CONSTRAINT "Quizes_ContentId_fkey" FOREIGN KEY ("ContentId") REFERENCES "Content"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

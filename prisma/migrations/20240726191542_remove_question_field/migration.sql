/*
  Warnings:

  - You are about to drop the column `Completed` on the `Quiz` table. All the data in the column will be lost.
  - You are about to drop the column `correct` on the `Quiz` table. All the data in the column will be lost.
  - You are about to drop the column `options` on the `Quiz` table. All the data in the column will be lost.
  - You are about to drop the column `question` on the `Quiz` table. All the data in the column will be lost.
  - You are about to drop the column `timeEnded` on the `Quiz` table. All the data in the column will be lost.
  - You are about to drop the column `timeStarted` on the `Quiz` table. All the data in the column will be lost.
  - Added the required column `quizcontent` to the `Quiz` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Quiz" DROP COLUMN "Completed",
DROP COLUMN "correct",
DROP COLUMN "options",
DROP COLUMN "question",
DROP COLUMN "timeEnded",
DROP COLUMN "timeStarted",
ADD COLUMN     "quizcontent" JSONB NOT NULL;

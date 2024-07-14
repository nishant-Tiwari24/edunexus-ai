/*
  Warnings:

  - The primary key for the `JsonContent` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - A unique constraint covering the columns `[id]` on the table `JsonContent` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "JsonContent" DROP CONSTRAINT "JsonContent_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT;
DROP SEQUENCE "JsonContent_id_seq";

-- CreateIndex
CREATE UNIQUE INDEX "JsonContent_id_key" ON "JsonContent"("id");

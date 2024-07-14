/*
  Warnings:

  - The `id` column on the `JsonContent` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- DropIndex
DROP INDEX "JsonContent_id_key";

-- AlterTable
ALTER TABLE "JsonContent" DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "JsonContent_pkey" PRIMARY KEY ("id");

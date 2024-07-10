/*
  Warnings:

  - You are about to drop the `Roadmap` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Roadmap" DROP CONSTRAINT "Roadmap_userId_fkey";

-- DropTable
DROP TABLE "Roadmap";

-- CreateTable
CREATE TABLE "ChatGptResponse" (
    "id" SERIAL NOT NULL,
    "content" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "ChatGptResponse_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ChatGptResponse" ADD CONSTRAINT "ChatGptResponse_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

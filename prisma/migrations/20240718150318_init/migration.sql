-- CreateTable
CREATE TABLE "Content" (
    "id" SERIAL NOT NULL,
    "content" TEXT NOT NULL,
    "SubtopicId" INTEGER NOT NULL,

    CONSTRAINT "Content_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Content" ADD CONSTRAINT "Content_SubtopicId_fkey" FOREIGN KEY ("SubtopicId") REFERENCES "Subtopics"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

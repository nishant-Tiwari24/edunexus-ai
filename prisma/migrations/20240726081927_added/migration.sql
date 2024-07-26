-- CreateTable
CREATE TABLE "Quiz" (
    "id" SERIAL NOT NULL,
    "question" TEXT NOT NULL,
    "options" JSONB NOT NULL,
    "correct" TEXT NOT NULL,
    "timeStarted" TIMESTAMP(3) NOT NULL,
    "timeEnded" TIMESTAMP(3) NOT NULL,
    "SubtopicId" INTEGER NOT NULL,
    "Completed" BOOLEAN NOT NULL,

    CONSTRAINT "Quiz_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Quiz" ADD CONSTRAINT "Quiz_SubtopicId_fkey" FOREIGN KEY ("SubtopicId") REFERENCES "Subtopics"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

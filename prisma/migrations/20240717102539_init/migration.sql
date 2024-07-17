-- CreateTable
CREATE TABLE "Subtopics" (
    "id" SERIAL NOT NULL,
    "titles" TEXT NOT NULL,
    "JsonId" INTEGER NOT NULL,

    CONSTRAINT "Subtopics_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Subtopics" ADD CONSTRAINT "Subtopics_JsonId_fkey" FOREIGN KEY ("JsonId") REFERENCES "JsonContent"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

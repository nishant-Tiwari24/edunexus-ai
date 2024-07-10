-- CreateTable
CREATE TABLE "Roadmap" (
    "id" SERIAL NOT NULL,
    "subject" TEXT NOT NULL,
    "syllabus" TEXT NOT NULL,
    "learningObj" TEXT NOT NULL,
    "refResources" TEXT,
    "prerequisites" TEXT,
    "duration" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "Roadmap_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Roadmap" ADD CONSTRAINT "Roadmap_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

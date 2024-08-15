-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ChatGptResponse" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "ChatGptResponse_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "JsonContent" (
    "key" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "responseId" INTEGER NOT NULL,
    "id" SERIAL NOT NULL,

    CONSTRAINT "JsonContent_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Subtopics" (
    "id" SERIAL NOT NULL,
    "titles" TEXT NOT NULL,
    "JsonId" INTEGER NOT NULL,

    CONSTRAINT "Subtopics_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Content" (
    "id" SERIAL NOT NULL,
    "content" TEXT NOT NULL,
    "SubtopicId" INTEGER NOT NULL,

    CONSTRAINT "Content_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Quiz" (
    "id" SERIAL NOT NULL,
    "ContentId" INTEGER NOT NULL,
    "quizcontent" JSONB NOT NULL,

    CONSTRAINT "Quiz_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MegaQuestions" (
    "id" TEXT NOT NULL,
    "ContentId" INTEGER NOT NULL,
    "megaAssessment" JSONB[],

    CONSTRAINT "MegaQuestions_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE INDEX "User_id_idx" ON "User"("id");

-- CreateIndex
CREATE INDEX "ChatGptResponse_userId_idx" ON "ChatGptResponse"("userId");

-- CreateIndex
CREATE INDEX "JsonContent_responseId_idx" ON "JsonContent"("responseId");

-- CreateIndex
CREATE INDEX "Subtopics_JsonId_idx" ON "Subtopics"("JsonId");

-- CreateIndex
CREATE INDEX "Content_SubtopicId_idx" ON "Content"("SubtopicId");

-- CreateIndex
CREATE INDEX "Quiz_ContentId_idx" ON "Quiz"("ContentId");

-- CreateIndex
CREATE INDEX "MegaQuestions_ContentId_idx" ON "MegaQuestions"("ContentId");

-- AddForeignKey
ALTER TABLE "ChatGptResponse" ADD CONSTRAINT "ChatGptResponse_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "JsonContent" ADD CONSTRAINT "JsonContent_responseId_fkey" FOREIGN KEY ("responseId") REFERENCES "ChatGptResponse"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Subtopics" ADD CONSTRAINT "Subtopics_JsonId_fkey" FOREIGN KEY ("JsonId") REFERENCES "JsonContent"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Content" ADD CONSTRAINT "Content_SubtopicId_fkey" FOREIGN KEY ("SubtopicId") REFERENCES "Subtopics"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Quiz" ADD CONSTRAINT "Quiz_ContentId_fkey" FOREIGN KEY ("ContentId") REFERENCES "Content"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MegaQuestions" ADD CONSTRAINT "MegaQuestions_ContentId_fkey" FOREIGN KEY ("ContentId") REFERENCES "Content"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

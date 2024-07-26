-- CreateIndex
CREATE INDEX "ChatGptResponse_userId_idx" ON "ChatGptResponse"("userId");

-- CreateIndex
CREATE INDEX "Content_SubtopicId_idx" ON "Content"("SubtopicId");

-- CreateIndex
CREATE INDEX "JsonContent_responseId_idx" ON "JsonContent"("responseId");

-- CreateIndex
CREATE INDEX "Subtopics_JsonId_idx" ON "Subtopics"("JsonId");

-- CreateIndex
CREATE INDEX "User_id_idx" ON "User"("id");

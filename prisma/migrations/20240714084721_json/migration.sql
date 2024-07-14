-- CreateTable
CREATE TABLE "JsonContent" (
    "id" SERIAL NOT NULL,
    "key" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "responseId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "JsonContent_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "JsonContent" ADD CONSTRAINT "JsonContent_responseId_fkey" FOREIGN KEY ("responseId") REFERENCES "ChatGptResponse"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

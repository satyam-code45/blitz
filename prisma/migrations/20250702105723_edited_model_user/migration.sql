/*
  Warnings:

  - You are about to drop the column `key` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `llm` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "key",
DROP COLUMN "llm";

-- CreateTable
CREATE TABLE "LlmKey" (
    "id" TEXT NOT NULL,
    "llm" "Llm" NOT NULL,
    "key" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "LlmKey_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "LlmKey" ADD CONSTRAINT "LlmKey_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

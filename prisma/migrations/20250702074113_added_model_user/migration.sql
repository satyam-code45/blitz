-- CreateEnum
CREATE TYPE "Llm" AS ENUM ('OPENAI', 'GEMINI');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "llm" "Llm",
    "key" TEXT,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateEnum
CREATE TYPE "NotamType" AS ENUM ('NEW', 'REPLACEMENT', 'CANCEL');

-- CreateEnum
CREATE TYPE "NotamState" AS ENUM ('PENDING', 'APPROVED', 'ARCHVIED');

-- CreateTable
CREATE TABLE "Notam" (
    "id" TEXT NOT NULL,
    "state" "NotamState" NOT NULL DEFAULT 'PENDING',
    "type" "NotamType" NOT NULL,
    "summary" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "subject" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "content" TEXT,
    "startTime" TIMESTAMP(3) NOT NULL,
    "endTime" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Notam_pkey" PRIMARY KEY ("id")
);

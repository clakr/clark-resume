-- CreateEnum
CREATE TYPE "MiscellaneousType" AS ENUM ('TECHNICAL', 'LANGUAGE', 'INTEREST');

-- CreateTable
CREATE TABLE "Miscellaneous" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "type" "MiscellaneousType" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Miscellaneous_pkey" PRIMARY KEY ("id")
);

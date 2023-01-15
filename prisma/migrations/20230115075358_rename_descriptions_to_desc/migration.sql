/*
  Warnings:

  - You are about to drop the column `description` on the `About` table. All the data in the column will be lost.
  - You are about to drop the column `description` on the `Contact` table. All the data in the column will be lost.
  - You are about to drop the `ExperienceDescription` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Interest` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Language` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Technical` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `desc` to the `About` table without a default value. This is not possible if the table is not empty.
  - Added the required column `desc` to the `Contact` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "ExperienceDescription" DROP CONSTRAINT "ExperienceDescription_experienceId_fkey";

-- AlterTable
ALTER TABLE "About" DROP COLUMN "description",
ADD COLUMN     "desc" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Contact" DROP COLUMN "description",
ADD COLUMN     "desc" TEXT NOT NULL;

-- DropTable
DROP TABLE "ExperienceDescription";

-- DropTable
DROP TABLE "Interest";

-- DropTable
DROP TABLE "Language";

-- DropTable
DROP TABLE "Technical";

-- CreateTable
CREATE TABLE "ExperienceDesc" (
    "id" TEXT NOT NULL,
    "experienceId" TEXT NOT NULL,
    "desc" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ExperienceDesc_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ExperienceDesc" ADD CONSTRAINT "ExperienceDesc_experienceId_fkey" FOREIGN KEY ("experienceId") REFERENCES "Experience"("id") ON DELETE CASCADE ON UPDATE CASCADE;

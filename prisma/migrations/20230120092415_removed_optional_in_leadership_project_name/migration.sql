/*
  Warnings:

  - Made the column `name` on table `LeadershipProject` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "LeadershipProject" ALTER COLUMN "name" SET NOT NULL;

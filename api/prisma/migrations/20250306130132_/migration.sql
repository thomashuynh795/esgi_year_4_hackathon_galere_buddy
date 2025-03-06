/*
  Warnings:

  - You are about to drop the column `reaction` on the `Reaction` table. All the data in the column will be lost.
  - The `role` column on the `User` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Added the required column `react` to the `Reaction` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Role" AS ENUM ('ADMIN', 'MEMBER');

-- CreateEnum
CREATE TYPE "React" AS ENUM ('LIKE', 'LAUGH', 'CRY');

-- AlterTable
ALTER TABLE "Reaction" DROP COLUMN "reaction",
ADD COLUMN     "react" "React" NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "role",
ADD COLUMN     "role" "Role" NOT NULL DEFAULT 'MEMBER';

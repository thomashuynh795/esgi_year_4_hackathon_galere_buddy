/*
  Warnings:

  - You are about to drop the column `reaction` on the `Reaction` table. All the data in the column will be lost.
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
ALTER TABLE "User" ADD COLUMN     "role" "Role" NOT NULL DEFAULT 'MEMBER';

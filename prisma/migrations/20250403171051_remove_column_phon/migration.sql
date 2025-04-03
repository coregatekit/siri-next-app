/*
  Warnings:

  - You are about to drop the column `phone` on the `Employee` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "Employee_phone_key";

-- AlterTable
ALTER TABLE "Employee" DROP COLUMN "phone";

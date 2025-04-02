/*
  Warnings:

  - A unique constraint covering the columns `[payment_id]` on the table `Booking` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `payment_id` to the `Booking` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Booking" ADD COLUMN     "payment_id" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Booking_payment_id_key" ON "Booking"("payment_id");

-- AddForeignKey
ALTER TABLE "Booking" ADD CONSTRAINT "Booking_payment_id_fkey" FOREIGN KEY ("payment_id") REFERENCES "Payment"("id") ON DELETE CASCADE ON UPDATE CASCADE;

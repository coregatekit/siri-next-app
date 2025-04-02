-- DropForeignKey
ALTER TABLE "Room" DROP CONSTRAINT "Room_type_id_fkey";

-- AddForeignKey
ALTER TABLE "Room" ADD CONSTRAINT "Room_type_id_fkey" FOREIGN KEY ("type_id") REFERENCES "Type"("id") ON DELETE NO ACTION ON UPDATE CASCADE;

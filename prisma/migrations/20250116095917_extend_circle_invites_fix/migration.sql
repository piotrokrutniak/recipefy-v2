/*
  Warnings:

  - You are about to drop the column `CircleOwnerid` on the `Circle` table. All the data in the column will be lost.
  - Added the required column `circleOwnerId` to the `Circle` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Circle" DROP CONSTRAINT "Circle_CircleOwnerid_fkey";

-- AlterTable
ALTER TABLE "Circle" DROP COLUMN "CircleOwnerid",
ADD COLUMN     "circleOwnerId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Circle" ADD CONSTRAINT "Circle_circleOwnerId_fkey" FOREIGN KEY ("circleOwnerId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

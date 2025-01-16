/*
  Warnings:

  - You are about to drop the column `email` on the `CircleInvite` table. All the data in the column will be lost.
  - Added the required column `invitingUserId` to the `CircleInvite` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "CircleInvite" DROP COLUMN "email",
ADD COLUMN     "inviteeEmail" TEXT,
ADD COLUMN     "inviteeId" TEXT,
ADD COLUMN     "invitingUserId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "CircleInvite" ADD CONSTRAINT "CircleInvite_invitingUserId_fkey" FOREIGN KEY ("invitingUserId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CircleInvite" ADD CONSTRAINT "CircleInvite_inviteeId_fkey" FOREIGN KEY ("inviteeId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CircleInvite" ADD CONSTRAINT "CircleInvite_circleId_fkey" FOREIGN KEY ("circleId") REFERENCES "Circle"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

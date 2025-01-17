/*
  Warnings:

  - A unique constraint covering the columns `[circleId,userId]` on the table `CircleMember` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "CircleMember_circleId_userId_key" ON "CircleMember"("circleId", "userId");

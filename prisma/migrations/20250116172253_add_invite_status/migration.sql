-- CreateEnum
CREATE TYPE "CircleInviteStatus" AS ENUM ('PENDING', 'ACCEPTED', 'REJECTED');

-- AlterTable
ALTER TABLE "CircleInvite" ADD COLUMN     "status" "CircleInviteStatus" NOT NULL DEFAULT 'PENDING';

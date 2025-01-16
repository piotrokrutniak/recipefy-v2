"use server";

import { getCurrentUser } from "@/app/api/users/current/route";
import DBClient from "@/persistence/DBClient";

const prisma = DBClient.getInstance().prisma;

export const cancelCircleInvite = async (circleInviteId: string) => {
  const circleInvite = await prisma.circleInvite.findUnique({
    where: { id: circleInviteId },
  });

  if (!circleInvite) {
    throw new Error("Circle invite not found");
  }

  const currentUser = await getCurrentUser();

  if (circleInvite.invitingUserId !== currentUser?.id) {
    throw new Error("You are not the owner of this invite");
  }

  // Update invite status to accepted
  return await prisma.circleInvite.delete({
    where: { id: circleInviteId },
  });
};

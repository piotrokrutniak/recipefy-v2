"use server";

import { getCurrentUser } from "@/app/api/users/current/route";
import DBClient from "@/persistence/DBClient";

const prisma = DBClient.getInstance().prisma;

export const getUserOutboundCircleInvites = async () => {
  const user = await getCurrentUser();

  if (!user) {
    return [];
  }

  const invites = await prisma.circleInvite.findMany({
    where: {
      invitingUserId: user.id,
    },
  });

  return invites;
};

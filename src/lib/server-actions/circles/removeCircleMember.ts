"use server";

import { getCurrentUser } from "@/app/api/users/current/route";
import { ErrorCodes } from "@/lib/errors";
import DBClient from "@/persistence/DBClient";

const prisma = DBClient.getInstance().prisma;

export const removeCircleMember = async (circleId: string, userId: string) => {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    throw new Error(ErrorCodes.UNAUTHORIZED);
  }

  const circle = await prisma.circle.findUnique({
    where: { id: circleId },
  });

  if (!circle) {
    throw new Error(ErrorCodes.NOT_FOUND);
  }

  if (currentUser.id !== circle.circleOwnerId) {
    throw new Error(ErrorCodes.FORBIDDEN);
  }

  //TODO: Audit log removal
  return await prisma.circleMember.delete({
    where: {
      circleId_userId: {
        circleId: circleId,
        userId: userId,
      },
    },
  });
};

"use server";

import DBClient from "@/persistence/DBClient";
import { CircleInviteStatus } from "@prisma/client";

const prisma = DBClient.getInstance().prisma;

export const rejectCircleInvite = async (circleInviteId: string) => {
  const circleInvite = await prisma.circleInvite.findUnique({
    where: { id: circleInviteId },
  });

  if (!circleInvite) {
    throw new Error("Circle invite not found");
  }

  // Update invite status to accepted
  return await prisma.circleInvite.update({
    where: { id: circleInviteId },
    data: { status: CircleInviteStatus.REJECTED },
  });
};

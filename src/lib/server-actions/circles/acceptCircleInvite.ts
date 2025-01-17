"use server";

import DBClient from "@/persistence/DBClient";
import { CircleInviteStatus } from "@prisma/client";

const prisma = DBClient.getInstance().prisma;

export const acceptCircleInvite = async (circleInviteId: string) => {
  const circleInvite = await prisma.circleInvite.findUnique({
    where: { id: circleInviteId },
  });

  if (!circleInvite || !circleInvite.inviteeEmail) {
    throw new Error("Circle invite not found");
  }

  const invitee = await prisma.user.findUnique({
    where: { email: circleInvite.inviteeEmail },
  });

  if (!invitee) {
    throw new Error("Invitee not found");
  }

  const circleMember = await prisma.circleMember.create({
    data: {
      circleId: circleInvite.circleId,
      userId: invitee.id,
    },
  });

  // Update invite status to accepted
  await prisma.circleInvite.update({
    where: { id: circleInviteId },
    data: { status: CircleInviteStatus.ACCEPTED },
  });

  return circleMember;
};

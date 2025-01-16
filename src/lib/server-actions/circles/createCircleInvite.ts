"use server";

import { CreateCircleInviteSchema } from "./createCircleInvite.schema";
import DBClient from "@/persistence/DBClient";

const prisma = DBClient.getInstance().prisma;

export const createCircleInvite = async (data: CreateCircleInviteSchema) => {
  const circle = await prisma.circle.findUnique({
    where: {
      id: data.circleId,
    },
  });

  if (!circle) {
    throw new Error("Circle not found");
  }

  const circleInvite = await prisma.circleInvite.create({
    data: {
      circleId: data.circleId,
      inviteeEmail: data.inviteeEmail,
      invitingUserId: circle.circleOwnerId,
    },
  });

  return circleInvite;
};

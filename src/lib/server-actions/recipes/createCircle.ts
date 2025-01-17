"use server";

import { getCurrentUser } from "@/app/api/users/current/route";
import DBClient from "@/persistence/DBClient";
import { z } from "zod";
import { createCircleSchema } from "../circles/createCircle.schema";

const prisma = DBClient.getInstance().prisma;

export const createCircle = async (
  data: z.infer<typeof createCircleSchema>
) => {
  console.log(data);
  const user = await getCurrentUser();
  if (!user) {
    throw new Error("User not found");
  }

  const circle = await prisma.circle.create({
    data: {
      name: data.name,
      circleOwner: {
        connect: {
          id: user.id,
        },
      },
    },
  });

  return circle;
};

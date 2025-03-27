"use server";

import { getCurrentUser } from "@/app/api/users/current/route";
import { ErrorCodes } from "@/lib/errors";
import DBClient from "@/persistence/DBClient";
import { UserIngredient } from "@prisma/client";

const prisma = DBClient.getInstance().prisma;

export const getUserIngredients = async (): Promise<UserIngredient[]> => {
  const user = await getCurrentUser();

  if (!user) throw new Error(ErrorCodes.UNAUTHORIZED);

  const userIngredients = await prisma.userIngredient.findMany({
    where: {
      userId: user.id,
    },
  });

  return userIngredients;
};

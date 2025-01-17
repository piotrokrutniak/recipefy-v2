"use server";

import { getCurrentUser } from "@/app/api/users/current/route";
import DBClient from "@/persistence/DBClient";
import { ErrorCodes } from "@/lib/errors";
import { CircleRecipeFullInfoDto } from "@/types/api";

const prisma = DBClient.getInstance().prisma;

export const getCircleRecipes = async (
  circleId: string
): Promise<CircleRecipeFullInfoDto[]> => {
  const user = await getCurrentUser();

  if (!user) {
    throw new Error(ErrorCodes.UNAUTHORIZED);
  }

  const circle = await prisma.circle.findUnique({
    where: {
      id: circleId,
      OR: [
        { circleMembers: { some: { userId: user.id } } },
        { circleOwnerId: user.id },
      ],
    },
  });

  if (!circle) {
    throw new Error(ErrorCodes.FORBIDDEN);
  }

  return await prisma.circleRecipe.findMany({
    where: { circleId: circle.id },
    include: { recipe: true },
  });
};

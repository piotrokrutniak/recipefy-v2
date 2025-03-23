"use server";

import { getCurrentUser } from "@/app/api/users/current/route";
import { ErrorCodes } from "@/lib/errors";
import DBClient from "@/persistence/DBClient";

const prisma = DBClient.getInstance().prisma;

export const putRecipeNote = async (recipeId: string, note: string) => {
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    throw new Error(ErrorCodes.UNAUTHORIZED);
  }

  const recipe = await prisma.recipe.findUnique({
    where: { id: recipeId },
  });

  if (!recipe) {
    throw new Error(ErrorCodes.NOT_FOUND);
  }

  await prisma.userRecipeNote.upsert({
    where: { userId_recipeId: { userId: currentUser.id, recipeId } },
    update: { note },
    create: { userId: currentUser.id, recipeId, note },
  });
};

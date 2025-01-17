"use server";

import { getCurrentUser } from "@/app/api/users/current/route";
import { ErrorCodes } from "@/lib/errors";
import DBClient from "@/persistence/DBClient";
import { Visibility } from "@prisma/client";

const prisma = DBClient.getInstance().prisma;

export const updateRecipeAvailability = async (
  recipeId: string,
  visibility: Visibility
) => {
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

  if (recipe.authorId !== currentUser.id) {
    throw new Error(ErrorCodes.FORBIDDEN);
  }

  const updatedRecipe = await prisma.recipe.update({
    where: { id: recipeId },
    data: { visibility },
  });

  return updatedRecipe;
};

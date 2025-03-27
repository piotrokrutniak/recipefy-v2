"use server";

import DBClient from "@/persistence/DBClient";
import { getCurrentUser } from "@/app/api/users/current/route";
const prisma = DBClient.getInstance().prisma;

export const deleteRecipe = async (id: string) => {
  const user = await getCurrentUser();

  if (!user) {
    throw new Error("User not found");
  }

  const recipe = await prisma.recipe.findUnique({
    where: { id },
  });

  if (!recipe) {
    throw new Error("Recipe not found");
  }

  if (recipe.authorId !== user.id) {
    throw new Error("You are not authorized to delete this recipe");
  }

  // Delete all related circle recipes first
  await prisma.circleRecipe.deleteMany({
    where: { recipeId: id },
  });

  // Delete all related recipe ingredients
  await prisma.recipeIngredient.deleteMany({
    where: { recipeId: id },
  });

  // Delete the recipe
  const recipeResult = await prisma.recipe.delete({
    where: { id },
  });

  return !!recipeResult;
};

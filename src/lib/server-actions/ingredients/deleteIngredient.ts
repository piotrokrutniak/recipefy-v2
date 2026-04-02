"use server";

import DBClient from "@/persistence/DBClient";

const prisma = DBClient.getInstance().prisma;

export const deleteIngredient = async (id: string) => {
  const usageCount = await prisma.recipeIngredient.count({
    where: { ingredientId: id },
  });

  if (usageCount > 0) {
    throw new Error("Ingredient is used in recipes and cannot be deleted");
  }

  const ingredient = await prisma.ingredient.delete({
    where: { id },
  });

  return ingredient;
};

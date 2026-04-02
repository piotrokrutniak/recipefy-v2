"use server";

import DBClient from "@/persistence/DBClient";

const prisma = DBClient.getInstance().prisma;

export const updateIngredient = async (
  id: string,
  name: string,
  vegan: boolean,
  vegetarian: boolean
) => {
  if (!name || name.trim().length === 0) {
    throw new Error("Ingredient name cannot be empty");
  }

  const ingredient = await prisma.ingredient.update({
    where: { id },
    data: {
      name: name.trim(),
      vegan,
      vegetarian,
    },
  });

  return ingredient;
};

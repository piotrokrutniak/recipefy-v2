"use server";

import DBClient from "@/persistence/DBClient";
import { requireAdmin } from "@/lib/server-actions/requireAdmin";

const prisma = DBClient.getInstance().prisma;

export const createIngredient = async (
  name: string,
  vegan: boolean,
  vegetarian: boolean
) => {
  await requireAdmin();

  if (!name || name.trim().length === 0) {
    throw new Error("Ingredient name cannot be empty");
  }

  const ingredient = await prisma.ingredient.create({
    data: {
      name: name.trim(),
      vegan,
      vegetarian,
    },
  });

  return ingredient;
};

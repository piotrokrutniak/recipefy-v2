"use server";

import { getCurrentUser } from "@/app/api/users/current/route";
import DBClient from "@/persistence/DBClient";

const prisma = DBClient.getInstance().prisma;

export const createUserIngredient = async (ingredientName: string) => {
  console.log(ingredientName);
  const user = await getCurrentUser();
  if (!user) {
    throw new Error("User not found");
  }

  if (ingredientName.length === 0) {
    throw new Error("Ingredient name cannot be empty");
  }

  const existingIngredient = await prisma.ingredient.findFirst({
    where: {
      name: {
        equals: ingredientName,
        mode: "insensitive",
      },
    },
  });

  if (existingIngredient) {
    return existingIngredient;
  }

  const existingUserIngredient = await prisma.userIngredient.findFirst({
    where: {
      name: {
        equals: ingredientName,
        mode: "insensitive",
      },
      userId: user.id,
    },
  });

  if (existingUserIngredient) {
    return existingUserIngredient;
  }

  const userIngredient = await prisma.userIngredient.create({
    data: {
      name: ingredientName,
      userId: user.id,
    },
  });

  return userIngredient;
};

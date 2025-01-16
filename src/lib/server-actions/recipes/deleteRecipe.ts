"use server";
import DBClient from "@/persistence/DBClient";

const prisma = DBClient.getInstance().prisma;

export const deleteRecipe = async (id: string) => {
  const recipe = await prisma.recipe.delete({
    where: { id },
  });

  return !!recipe;
};

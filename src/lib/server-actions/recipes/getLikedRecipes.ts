"use server";

import DBClient from "@/persistence/DBClient";

const prisma = DBClient.getInstance().prisma;

export const getLikedRecipes = async (userId: string) => {
  return await prisma.userRecipeFavorite.findMany({
    where: { userId: userId },
  });
};

import { getLikedRecipes } from "./getLikedRecipes";
import DBClient from "@/persistence/DBClient";

const prisma = DBClient.getInstance().prisma;

export const getLikedRecipesFullInfos = async (userId: string) => {
  const likedRecipes = await getLikedRecipes(userId);

  const recipes = await prisma.recipe.findMany({
    where: {
      id: {
        in: likedRecipes.map((recipe) => recipe.recipeId),
      },
    },
  });

  return recipes;
};

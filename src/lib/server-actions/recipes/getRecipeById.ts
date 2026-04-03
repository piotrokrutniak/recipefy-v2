import { unstable_cache } from "next/cache";
import DBClient from "@/persistence/DBClient";

const prisma = DBClient.getInstance().prisma;

const recipeInclude = {
  recipeIngredients: {
    include: {
      ingredient: true,
      userIngredient: true,
    },
  },
  author: true,
  circleRecipes: true,
};

export const getRecipeById = async (id: string) => {
  return prisma.recipe.findUnique({ where: { id }, include: recipeInclude });
};

// Accepts a slug, falls back to id so old bookmarked URLs keep working
export const getRecipeBySlug = async (slug: string) => {
  return prisma.recipe.findFirst({
    where: { OR: [{ slug }, { id: slug }] },
    include: recipeInclude,
  });
};

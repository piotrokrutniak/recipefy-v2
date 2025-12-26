"use server";

import { RecipeSearchParams } from "@/app/api/recipes/route";
import DBClient from "@/persistence/DBClient";

const prisma = DBClient.getInstance().prisma;

export const getPublicRecipes = async (params: Partial<RecipeSearchParams>) => {
  return await prisma.recipe.findMany({
    skip: params.skip || 0,
    take: params.take || 25,
    include: {
      author: true,
      recipeIngredients: true,
    },
    where: {
      OR: params.query
        ? [
            {
              title: {
                contains: params.query,
                mode: "insensitive",
              },
            },
            {
              description: {
                contains: params.query,
                mode: "insensitive",
              },
            },
          ]
        : undefined,
      cookTime: params.cookTime
        ? {
            lte: Number(params.cookTime),
          }
        : undefined,
      prepTime: params.prepTime
        ? {
            lte: Number(params.prepTime),
          }
        : undefined,
      calories: params.calories
        ? {
            lte: Number(params.calories),
          }
        : undefined,
      vegan: params.vegan !== undefined ? params.vegan : undefined,
      vegetarian: params.vegetarian !== undefined ? params.vegetarian : undefined,
      visibility: "PUBLIC",
      recipeIngredients: {
        every: !params.includeBlacklistedRecipes
          ? {
              ingredientId: {
                notIn: params.blacklistedIngredientsIds,
              },
            }
          : undefined,
        some: params.ingredients
          ? {
              ingredient: {
                id: {
                  in: params.ingredients?.split(","),
                },
              },
            }
          : undefined,
      },
    },
    orderBy: { createdAt: "desc" },
  });
};

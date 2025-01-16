"use server";

import { getCurrentUser } from "@/app/api/users/current/route";
import { RecipeSearchParams } from "@/app/api/recipes/route";
import DBClient from "@/persistence/DBClient";
import { Visibility } from "@prisma/client";

const prisma = DBClient.getInstance().prisma;

export const getUserRecipes = async (
  params: Partial<RecipeSearchParams>,
  userId: string
) => {
  const currentUser = await getCurrentUser();

  if (!userId) {
    return [];
  }

  const isCurrentUser = currentUser?.id === userId;

  const visibility: Visibility[] = isCurrentUser
    ? ["PUBLIC", "PRIVATE", "UNLISTED"]
    : ["PUBLIC"];

  return await prisma.recipe.findMany({
    skip: params.skip,
    take: params.take,
    include: {
      author: true,
      recipeIngredients: true,
    },
    where: {
      title: {
        contains: params.query && params.query,
        mode: "insensitive",
      },
      cookTime: {
        lte: params.cookTime && Number(params.cookTime),
      },
      prepTime: {
        lte: params.prepTime && Number(params.prepTime),
      },
      calories: {
        lte: params.calories && Number(params.calories),
      },
      vegan: Boolean(params.vegan),
      vegetarian: Boolean(params.vegetarian),
      visibility: {
        in: visibility,
      },
      authorId: userId,
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

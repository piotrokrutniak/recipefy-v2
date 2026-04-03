"use server";

import { RecipeSearchParams } from "@/app/api/recipes/route";
import DBClient from "@/persistence/DBClient";
import { MealType } from "@prisma/client";

const prisma = DBClient.getInstance().prisma;

export const getPublicRecipesCount = async (
  params: Partial<RecipeSearchParams>
): Promise<number> => {
  return await prisma.recipe.count({
    where: {
      OR: params.query
        ? [
            { title: { contains: params.query, mode: "insensitive" } },
            { description: { contains: params.query, mode: "insensitive" } },
          ]
        : undefined,
      cookTime: params.cookTime ? { lte: Number(params.cookTime) } : undefined,
      prepTime: params.prepTime ? { lte: Number(params.prepTime) } : undefined,
      calories: params.calories ? { lte: Number(params.calories) } : undefined,
      mealTypes: params.mealTypes
        ? { hasSome: params.mealTypes.split(",") as MealType[] }
        : undefined,
      vegan:
        params.vegan !== undefined
          ? params.vegan === true || params.vegan === "true"
          : undefined,
      vegetarian:
        params.vegetarian !== undefined
          ? params.vegetarian === true || params.vegetarian === "true"
          : undefined,
      visibility: "PUBLIC",
      recipeIngredients: {
        every: !params.includeBlacklistedRecipes
          ? { ingredientId: { notIn: params.blacklistedIngredientsIds } }
          : undefined,
        some: params.ingredients
          ? { ingredient: { id: { in: params.ingredients.split(",") } } }
          : undefined,
      },
    },
  });
};

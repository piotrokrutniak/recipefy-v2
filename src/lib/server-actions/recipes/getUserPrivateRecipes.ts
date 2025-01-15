import { RecipeSearchParams } from "@/app/api/recipes/route";
import { getCurrentUser } from "@/app/api/users/current/route";
import DBClient from "@/persistence/DBClient";

const prisma = DBClient.getInstance().prisma;

export const getUserPrivateRecipes = async (
  params: Partial<RecipeSearchParams>
) => {
  const user = await getCurrentUser();

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
      authorId: user?.id,
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

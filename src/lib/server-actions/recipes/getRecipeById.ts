import DBClient from "@/persistence/DBClient";

const prisma = DBClient.getInstance().prisma;

export const getRecipeById = async (id: string) => {
  const recipe = await prisma.recipe.findUnique({
    where: { id },
    include: {
      recipeIngredients: {
        include: {
          ingredient: true,
          userIngredient: true,
        },
      },
      author: true,
      circleRecipes: true,
    },
  });

  return recipe;
};

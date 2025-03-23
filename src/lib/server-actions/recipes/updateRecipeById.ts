import DBClient from "@/persistence/DBClient";
import z from "node_modules/zod/lib";
import {
  replaceBase64WithUrls,
  uploadImageToCloudinary,
} from "@/lib/cloudinary";
import { uploadMarkupAssets } from "@/lib/server-actions/recipes/uploadMarkupAssets";
import { createRecipeSchema } from "./createRecipe.schema";

const prisma = DBClient.getInstance().prisma;

export const updateRecipeById = async (
  data: z.infer<typeof createRecipeSchema>,
  authorId: string
) => {
  let thumbnailUrl = data.thumbnailUrl;

  if (data.thumbnailBase64 && data.thumbnailBase64 !== data.thumbnailUrl) {
    thumbnailUrl = await uploadImageToCloudinary(data.thumbnailBase64);
  }

  // TODO: Try-Catch and clean up maybe?
  // Though the only failure side-effect is lack of SEO for the affected images
  // The failed upload will be re-tried whenever user saves the recipe again
  const replacedAssets = await uploadMarkupAssets(data.content);

  const processedContent = replaceBase64WithUrls(replacedAssets, data.content);

  const recipe = await prisma.recipe.update({
    where: { id: data.id },
    data: {
      title: data.title,
      description: data.description,
      thumbnailUrl,
      content: processedContent,
      cookTime: data.cookTime,
      prepTime: data.prepTime,
      author: {
        connect: {
          id: authorId,
        },
      },
      servings: data.servings,
      vegan: data.vegan,
      vegetarian: data.vegetarian,
      visibility: data.visibility,
      calories: 0,
      verifiedIngredients: false,
      recipeIngredients: {
        deleteMany: {
          recipeId: data.id,
        },
        createMany: {
          data: data.recipeIngredients.map((ingredient) => ({
            ingredientId: ingredient?.ingredientId || undefined,
            userIngredientId: ingredient?.userIngredientId || undefined,
            amount: ingredient?.amount.toString(),
          })),
        },
      },
    },
  });
  return recipe;
};

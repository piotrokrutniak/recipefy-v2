"use server";

import {
  replaceBase64WithUrls,
  uploadImageToCloudinary,
} from "@/lib/cloudinary";
import DBClient from "@/persistence/DBClient";
import { z } from "zod";
import { uploadMarkupAssets } from "./uploadMarkupAssets";
import { createRecipeSchema } from "./createRecipe.schema";

const prisma = DBClient.getInstance().prisma;

export const createRecipe = async (
  data: z.infer<typeof createRecipeSchema>,
  authorId: string
) => {
  let thumbnailUrl = data.thumbnailUrl;

  if (data.thumbnailBase64) {
    thumbnailUrl = await uploadImageToCloudinary(data.thumbnailBase64);
  }

  // TODO: Try-Catch and clean up maybe?
  // Though the only failure side-effect is lack of SEO for the affected images
  // The failed upload will be re-tried whenever user saves the recipe again
  const replacedAssets = await uploadMarkupAssets(data.content);

  const processedContent = replaceBase64WithUrls(replacedAssets, data.content);

  const recipe = await prisma.recipe.create({
    data: {
      title: data.title,
      thumbnailUrl,
      description: data.description,
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
        createMany: {
          data: data.recipeIngredients.map((ingredient) => ({
            id: ingredient?.id,
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

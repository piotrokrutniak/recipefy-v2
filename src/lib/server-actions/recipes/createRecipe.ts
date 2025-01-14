import { replaceBase64WithUrls, uploadImageToCloudinary } from "@/lib/cloudinary";
import DBClient from "@/persistence/DBClient";
import { Visibility, Recipe } from "@prisma/client";
import { z } from "zod";
import { ReplacedAsset, uploadMarkupAssets } from "./uploadMarkupAssets";

const prisma = DBClient.getInstance().prisma;

const createRecipeIngredientSchema = z.object({
  id: z.string(),
  ingredientId: z.string().optional(),
  userIngredientId: z.string().optional(),
  amount: z.string(),
});

// Schema for validation
export const createRecipeSchema = z.object({
  id: z.string().optional(),
  title: z.string().min(1, "Title is required"),
  thumbnailUrl: z.string().optional(),
  thumbnailBase64: z.string().optional(),
  description: z.string(),
  content: z.string().min(1, "Content is required"),
  cookTime: z.number().min(0, "Cook time cannot be negative"),
  prepTime: z.number().min(0, "Prep time cannot be negative"),
  servings: z.number().min(1, "Must have at least 1 serving"),
  vegan: z.boolean(),
  vegetarian: z.boolean(),
  visibility: z.nativeEnum(Visibility),
  recipeIngredients: z.array(createRecipeIngredientSchema),
}) satisfies z.ZodType<Partial<Recipe>>;

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

  const processedContent = replaceBase64WithUrls(replacedAssets, data.content)


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


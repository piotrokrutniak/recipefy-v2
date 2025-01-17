import { Visibility, Recipe } from "@prisma/client";
import { z } from "zod";

const createRecipeIngredientSchema = z.object({
  id: z.string(),
  ingredientId: z.string().optional(),
  userIngredientId: z.string().optional(),
  amount: z.string(),
});

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

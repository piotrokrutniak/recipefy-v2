import { z } from "zod";

export const assignCirclesToRecipeSchema = z.object({
  circleIds: z.array(z.string()),
  recipeId: z.string(),
});

export type AssignCirclesToRecipeSchema = z.infer<
  typeof assignCirclesToRecipeSchema
>;

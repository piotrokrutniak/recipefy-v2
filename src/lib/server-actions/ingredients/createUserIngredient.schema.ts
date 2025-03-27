import { z } from "zod";

export const createUserIngredientSchema = z.object({
  name: z.string().min(1, "Name is required"),
});

export type CreateUserIngredientSchema = z.infer<
  typeof createUserIngredientSchema
>;

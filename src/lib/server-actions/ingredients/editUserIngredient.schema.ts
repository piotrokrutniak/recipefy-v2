import { z } from "zod";

export const editUserIngredientSchema = z.object({
  id: z.string().min(1, "Id is required"),
  name: z.string().min(1, "Name is required"),
});

export type EditUserIngredientSchema = z.infer<typeof editUserIngredientSchema>;

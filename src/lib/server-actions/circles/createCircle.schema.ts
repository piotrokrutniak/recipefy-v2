import { z } from "zod";

export const createCircleSchema = z.object({
  name: z.string().min(1, "Name is required"),
});

export type CreateCircleSchema = z.infer<typeof createCircleSchema>;

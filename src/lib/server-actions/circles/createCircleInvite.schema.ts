import { z } from "zod";

export const createCircleInviteSchema = z.object({
  circleId: z.string(),
  inviteeEmail: z.string().email("Invalid email address"),
});

export type CreateCircleInviteSchema = z.infer<typeof createCircleInviteSchema>;

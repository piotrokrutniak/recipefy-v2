"use server";

import { getCurrentUser } from "@/app/api/users/current/route";
import { UserRole } from "@prisma/client";

export const requireAdmin = async () => {
  const user = await getCurrentUser();
  if (!user || user.role !== UserRole.ADMIN) {
    throw new Error("Unauthorized");
  }
  return user;
};

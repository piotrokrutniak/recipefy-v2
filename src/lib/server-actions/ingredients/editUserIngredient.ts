"use server";

import { getCurrentUser } from "@/app/api/users/current/route";
import DBClient from "@/persistence/DBClient";
import { z } from "zod";
import { editUserIngredientSchema } from "./editUserIngredient.schema";

const prisma = DBClient.getInstance().prisma;

export const editUserIngredient = async (
  data: z.infer<typeof editUserIngredientSchema>
) => {
  console.log(data);
  const user = await getCurrentUser();
  if (!user) {
    throw new Error("User not found");
  }

  const userIngredient = await prisma.userIngredient.update({
    where: {
      id: data.id,
    },
    data: {
      name: data.name,
    },
  });

  return userIngredient;
};

"use server";

import DBClient from "@/persistence/DBClient";

const prisma = DBClient.getInstance().prisma;

import { AssignCirclesToRecipeSchema } from "./assignCirclesToRecipe.schema";
import { getCurrentUser } from "@/app/api/users/current/route";
import { ErrorCodes } from "@/lib/errors";

export const assignCirclesToRecipe = async (
  data: AssignCirclesToRecipeSchema
) => {
  const { circleIds, recipeId } = data;

  const user = await getCurrentUser();
  if (!user) {
    throw new Error(ErrorCodes.UNAUTHORIZED);
  }

  const recipe = await prisma.recipe.findUnique({
    where: { id: recipeId },
  });

  if (!recipe) {
    throw new Error(ErrorCodes.NOT_FOUND);
  }

  // if (recipe.authorId !== user.id) {
  //   throw new Error(ErrorCodes.FORBIDDEN);
  // }

  const existingAssignments = await prisma.circleRecipe.findMany({
    where: {
      recipeId,
    },
  });

  const unassignedCircleIds = circleIds.filter(
    (circleId) =>
      !existingAssignments.some(
        (assignment) => assignment.circleId === circleId
      )
  );

  const circlesToRemove = existingAssignments.filter(
    (assignment) => !circleIds.includes(assignment.circleId)
  );

  const assigments = await prisma.circleRecipe.createMany({
    data: unassignedCircleIds.map((circleId) => ({
      circleId,
      recipeId,
    })),
  });

  await prisma.circleRecipe.deleteMany({
    where: {
      id: {
        in: circlesToRemove.map((circle) => circle.id),
      },
    },
  });

  return assigments;
};

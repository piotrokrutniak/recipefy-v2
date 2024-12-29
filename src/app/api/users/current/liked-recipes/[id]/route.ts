import { NextRequest, NextResponse } from "next/server";
import { getCurrentUser } from "../../route";
import DBClient from "@/persistence/DBClient";

const prisma = DBClient.getInstance().prisma;

export const PUT = async (
  req: NextRequest,
  { params }: { params: { id: string } }
) => {
  const user = await getCurrentUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const likedRecipe = await prisma.userRecipeFavorite.findFirst({
    where: { userId: user.id, recipeId: params.id },
  });

  if (!likedRecipe) {
    await prisma.userRecipeFavorite.create({
      data: {
        userId: user.id,
        recipeId: params.id,
      },
    });
  } else {
    await prisma.userRecipeFavorite.delete({ where: { id: likedRecipe.id } });
  }

  return NextResponse.json({ status: 201 });
};

export const toggleLikedRecipe = async (userId: string, recipeId: string) => {
  const likedRecipe = await prisma.userRecipeFavorite.findFirst({
    where: { userId: userId, recipeId: recipeId },
  });

  if (!likedRecipe) {
    await prisma.userRecipeFavorite.create({
      data: {
        userId: userId,
        recipeId: recipeId,
      },
    });

    return true;
  } else {
    await prisma.userRecipeFavorite.delete({ where: { id: likedRecipe.id } });

    return false;
  }
};

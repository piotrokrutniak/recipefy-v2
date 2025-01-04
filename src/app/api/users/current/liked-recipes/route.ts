import { NextResponse } from "next/server";
import { getCurrentUser } from "../route";
import DBClient from "@/persistence/DBClient";

const prisma = DBClient.getInstance().prisma;

export const getLikedRecipes = async (userId: string) => {
  return await prisma.userRecipeFavorite.findMany({
    where: { userId: userId },
  });
};

export const GET = async () => {
  const user = await getCurrentUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const likedRecipes = await getLikedRecipes(user.id);

  return NextResponse.json({ likedRecipes, status: 201 });
};

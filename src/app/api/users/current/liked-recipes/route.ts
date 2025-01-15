import { NextResponse } from "next/server";
import { getCurrentUser } from "../route";
import { getLikedRecipes } from "@/lib/server-actions/recipes/getLikedRecipes";

export const GET = async () => {
  const user = await getCurrentUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const likedRecipes = await getLikedRecipes(user.id);

  return NextResponse.json({ likedRecipes, status: 201 });
};

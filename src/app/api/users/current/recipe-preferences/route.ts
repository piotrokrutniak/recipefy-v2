import { Ingredient, UserRecipePreferences } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { getCurrentUser } from "../route";
import DBClient from "@/persistence/DBClient";

const prisma = DBClient.getInstance().prisma;

export const GET = async () => {
  const user = await getCurrentUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let recipePreferences = await prisma.userRecipePreferences.findFirst({where: {userId: user.id}});

  if (!recipePreferences) {
    recipePreferences = await prisma.userRecipePreferences.create({
      data: {
        userId: user.id,
        enableSuggestions: true,
        veganOnly: false,
        vegetarianOnly: false,
      }
    });
  }

  return NextResponse.json({ recipePreferences, status: 201 });
};

export const PUT = async (req: NextRequest) => {
  const user = await getCurrentUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json() as UserRecipePreferences;

  const recipePreferences = await prisma.userRecipePreferences.update({
    where: {userId: user.id},
    data: {
      ...body
    }
  });

  return NextResponse.json({ recipePreferences, status: 201 });
};
import DBClient from "@/persistence/DBClient";
import { NextRequest, NextResponse } from "next/server";
import { getCurrentUser } from "../route";
import { Ingredient } from "@prisma/client";

const prisma = DBClient.getInstance().prisma;

export const getBlacklistedIngredients = async () => {
  const user = await getCurrentUser();

  if (!user) {
    return null;
  }

  const blacklistedIngredients = await prisma.userBlacklistedIngredient.findMany({
    where: { userId: user.id },
    select: { ingredientId: true },
  });

  const ingredients = await prisma.ingredient.findMany({
    where: { id: { in: blacklistedIngredients.map((i) => i.ingredientId) } },
  });

  return ingredients ?? [];
};

export const GET = async () => {
  const ingredients = await getBlacklistedIngredients();

  if (!ingredients) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  return NextResponse.json(ingredients, { status: 200 });
};

export const POST = async (req: NextRequest) => {
  const user = await getCurrentUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json() as Ingredient;

  const ingredient = await prisma.userBlacklistedIngredient.create({
    data: {
      ingredientId: body.id,
      userId: user.id,
    },
  });

  return NextResponse.json(ingredient, { status: 201 });
};

export const DELETE = async (req: NextRequest) => {
  const user = await getCurrentUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body: Ingredient = await req.json();

  const ingredient = await prisma.userBlacklistedIngredient.delete({
    where: { ingredientId: body.id, userId: user.id },
  });

  return NextResponse.json(ingredient, { status: 200 });
};

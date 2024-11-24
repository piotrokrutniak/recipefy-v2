import DBClient from "@/persistence/DBClient";
import { NextRequest, NextResponse } from "next/server";

const prisma = DBClient.getInstance().prisma;

export const getRecipeById = async (id: string) => {
  const recipe = await prisma.recipe.findUnique({
    where: { id },
  });

  return recipe;
};

export const GET = async (
  req: NextRequest,
  { params }: { params: { id: string } }
) => {
  const recipe = await getRecipeById(params.id);

  return NextResponse.json(recipe);
};

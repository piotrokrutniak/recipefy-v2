import DBClient from "@/persistence/DBClient";
import { NextRequest, NextResponse } from "next/server";

const prisma = DBClient.getInstance().prisma;

export const GET = async (
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) => {
  const { id } = await params;
  const recipe = await prisma.recipe.findUnique({
    where: { id },
    include: {
      author: true,
      recipeIngredients: {
        include: {
          ingredient: true,
        },
      },
    },
  });

  return NextResponse.json(recipe);
};

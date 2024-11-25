import DBClient from "@/persistence/DBClient";
import { NextRequest, NextResponse } from "next/server";

const prisma = DBClient.getInstance().prisma;

export const GET = async (
  req: NextRequest,
  { params }: { params: { id: string } }
) => {
  const recipe = await prisma.recipe.findUnique({
    where: { id: params.id },
    include: {
      author: true,
      RecipeIngredient: {
        include: {
          ingredient: true,
        },
      },
    },
  });

  return NextResponse.json(recipe);
};

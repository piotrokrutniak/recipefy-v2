import DBClient from "@/persistence/DBClient";
import { NextRequest, NextResponse } from "next/server";

const prisma = DBClient.getInstance().prisma;

export const getIngredients = async (
  skip: number = 0,
  take: number = 25,
  query?: string
) => {
  const ingredients = await prisma.ingredient.findMany({
    skip,
    take,
    where: query
      ? { name: { contains: query, mode: "insensitive" } }
      : undefined,
    orderBy: { name: "desc" },
  });

  return ingredients;
};

export const GET = async (req: NextRequest) => {
  const { searchParams } = req.nextUrl;
  const skip = parseInt(searchParams.get("skip") || "0");
  const take = parseInt(searchParams.get("take") || "25");
  const query = searchParams.get("query") || undefined;

  const ingredients = await getIngredients(skip, take, query);

  // return ingredients;

  return NextResponse.json(ingredients);
};

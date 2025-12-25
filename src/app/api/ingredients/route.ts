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

/**
 * @swagger
 * /api/ingredients:
 *   get:
 *     tags:
 *       - Ingredients
 *     summary: Get ingredients
 *     description: Retrieve a list of ingredients with optional search and pagination
 *     parameters:
 *       - in: query
 *         name: skip
 *         schema:
 *           type: integer
 *           default: 0
 *         description: Number of ingredients to skip (pagination)
 *       - in: query
 *         name: take
 *         schema:
 *           type: integer
 *           default: 25
 *         description: Number of ingredients to return
 *       - in: query
 *         name: query
 *         schema:
 *           type: string
 *         description: Search query for ingredient name
 *     responses:
 *       200:
 *         description: List of ingredients
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                   name:
 *                     type: string
 *                   category:
 *                     type: string
 */
export const GET = async (req: NextRequest) => {
  const { searchParams } = req.nextUrl;
  const skip = parseInt(searchParams.get("skip") || "0");
  const take = parseInt(searchParams.get("take") || "25");
  const query = searchParams.get("query") || undefined;

  const ingredients = await getIngredients(skip, take, query);

  // return ingredients;

  return NextResponse.json(ingredients);
};

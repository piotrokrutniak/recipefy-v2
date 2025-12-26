import { NextRequest, NextResponse } from "next/server";
import { getCurrentUser } from "../../users/current/route";
import { UnauthorizedNextResponse } from "@/lib/api";
import { getUserPrivateRecipes } from "@/lib/server-actions/recipes/getUserPrivateRecipes";
import { RecipeSearchParams } from "../route";
import DBClient from "@/persistence/DBClient";

const prisma = DBClient.getInstance().prisma;

/**
 * @swagger
 * /api/recipes/my-recipes:
 *   get:
 *     tags:
 *       - Recipes
 *     summary: Get current user's recipes
 *     description: Get all recipes created by the authenticated user (including private recipes)
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: query
 *         name: skip
 *         schema:
 *           type: integer
 *           default: 0
 *         description: Number of recipes to skip (pagination)
 *       - in: query
 *         name: take
 *         schema:
 *           type: integer
 *           default: 25
 *         description: Number of recipes to return
 *       - in: query
 *         name: query
 *         schema:
 *           type: string
 *         description: Search query for recipe title/description
 *       - in: query
 *         name: cookTime
 *         schema:
 *           type: integer
 *         description: Maximum cooking time in minutes
 *       - in: query
 *         name: prepTime
 *         schema:
 *           type: integer
 *         description: Maximum preparation time in minutes
 *       - in: query
 *         name: calories
 *         schema:
 *           type: integer
 *         description: Maximum calories
 *       - in: query
 *         name: vegan
 *         schema:
 *           type: boolean
 *         description: Filter for vegan recipes
 *       - in: query
 *         name: vegetarian
 *         schema:
 *           type: boolean
 *         description: Filter for vegetarian recipes
 *     responses:
 *       200:
 *         description: List of user's recipes
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Recipe'
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Server error
 */
export const GET = async (req: NextRequest) => {
  const user = await getCurrentUser();

  if (!user) {
    return UnauthorizedNextResponse;
  }

  const { searchParams } = req.nextUrl;

  const blacklistedIngredients =
    await prisma.userBlacklistedIngredient.findMany({
      where: {
        userId: {
          equals: user?.id,
        },
      },
    });

  const blacklistedIngredientsIds = blacklistedIngredients.map(
    (ingredient) => ingredient.ingredientId
  );

  const skip = parseInt(searchParams.get("skip") || "0");
  const take = parseInt(searchParams.get("take") || "25");

  const params: RecipeSearchParams = {
    skip,
    take,
    query: searchParams.get("query") || "",
    cookTime: parseInt(searchParams.get("cookTime") || "0"),
    prepTime: parseInt(searchParams.get("prepTime") || "0"),
    calories: parseInt(searchParams.get("calories") || "0"),
    ingredients: searchParams.get("ingredients") || undefined,
    vegan: searchParams.get("vegan") === "true",
    vegetarian: searchParams.get("vegetarian") === "true",
    includeBlacklistedRecipes:
      searchParams.get("includeBlacklistedRecipes") === "true",
    blacklistedIngredientsIds: blacklistedIngredientsIds,
  };

  const recipes = await getUserPrivateRecipes(params);

  return NextResponse.json(recipes);
};

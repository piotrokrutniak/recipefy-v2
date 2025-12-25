import DBClient from "@/persistence/DBClient";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { getCurrentUser } from "../users/current/route";
import { UnauthorizedNextResponse } from "@/lib/api";
import { createRecipe } from "@/lib/server-actions/recipes/createRecipe";
import { getUserPrivateRecipes } from "@/lib/server-actions/recipes/getUserPrivateRecipes";
import { createRecipeSchema } from "@/lib/server-actions/recipes/createRecipe.schema";

const prisma = DBClient.getInstance().prisma;

/**
 * @swagger
 * /api/recipes:
 *   post:
 *     tags:
 *       - Recipes
 *     summary: Create a new recipe
 *     description: Creates a new recipe for the authenticated user
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *             properties:
 *               title:
 *                 type: string
 *                 description: Recipe title
 *               description:
 *                 type: string
 *                 description: Recipe description
 *               cookTime:
 *                 type: number
 *                 description: Cooking time in minutes
 *               prepTime:
 *                 type: number
 *                 description: Preparation time in minutes
 *               servings:
 *                 type: number
 *                 description: Number of servings
 *               difficulty:
 *                 type: string
 *                 enum: [easy, medium, hard]
 *               isPublic:
 *                 type: boolean
 *                 description: Whether the recipe is public
 *               ingredients:
 *                 type: array
 *                 items:
 *                   type: object
 *               instructions:
 *                 type: array
 *                 items:
 *                   type: string
 *     responses:
 *       201:
 *         description: Recipe created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Recipe'
 *       400:
 *         description: Invalid recipe data
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Server error
 */
export const POST = async (req: NextRequest) => {
  try {
    const body = await req.json();

    // Validate the request body
    const validatedData = createRecipeSchema.parse(body);

    const user = await getCurrentUser();

    if (!user) {
      return UnauthorizedNextResponse;
    }

    const recipe = await createRecipe(validatedData, user?.id);

    return NextResponse.json(recipe, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Invalid recipe data", details: error.errors },
        { status: 400 }
      );
    }

    console.log(error);

    return NextResponse.json(
      { error: "Failed to create recipe" },
      { status: 500 }
    );
  }
};

export type RecipeSearchParams = {
  skip: number;
  take: number;
  query: string;
  cookTime: number;
  prepTime: number;
  calories: number;
  ingredients?: string;
  vegan: boolean;
  vegetarian: boolean;
  includeBlacklistedRecipes: boolean;
  blacklistedIngredientsIds: string[];
};

/**
 * @swagger
 * /api/recipes:
 *   get:
 *     tags:
 *       - Recipes
 *     summary: Search and filter recipes
 *     description: Get a list of recipes with optional filters
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
 *         name: ingredients
 *         schema:
 *           type: string
 *         description: Filter by ingredients
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
 *       - in: query
 *         name: includeBlacklistedRecipes
 *         schema:
 *           type: boolean
 *         description: Include recipes with blacklisted ingredients
 *     responses:
 *       200:
 *         description: List of recipes
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Recipe'
 *       500:
 *         description: Server error
 */
export const GET = async (req: NextRequest) => {
  const { searchParams } = req.nextUrl;

  const user = await getCurrentUser();

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

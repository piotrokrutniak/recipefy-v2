import DBClient from "@/persistence/DBClient";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { getCurrentUser } from "../users/current/route";
import { UnauthorizedNextResponse } from "@/lib/api";
import { createRecipe } from "@/lib/server-actions/recipes/createRecipe";
import { getPublicRecipes } from "@/lib/server-actions/recipes/getPublicRecipes";
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
 *               content:
 *                 type: string
 *                 description: Recipe markup/HTML content with instructions
 *               thumbnailUrl:
 *                 type: string
 *                 description: URL to recipe thumbnail image
 *               visibility:
 *                 type: string
 *                 enum: [PUBLIC, PRIVATE, CIRCLE]
 *                 description: Recipe visibility setting
 *               cookTime:
 *                 type: number
 *                 description: Cooking time in minutes
 *               prepTime:
 *                 type: number
 *                 description: Preparation time in minutes
 *               servings:
 *                 type: number
 *                 description: Number of servings
 *               calories:
 *                 type: number
 *                 description: Calories per serving
 *               vegan:
 *                 type: boolean
 *                 description: Whether the recipe is vegan
 *               vegetarian:
 *                 type: boolean
 *                 description: Whether the recipe is vegetarian
 *               verifiedIngredients:
 *                 type: boolean
 *                 description: Whether ingredients are verified
 *               shouldPublish:
 *                 type: boolean
 *                 description: Whether to publish the recipe
 *               publishAt:
 *                 type: string
 *                 format: date-time
 *                 description: When to publish the recipe
 *               recipeIngredients:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     ingredientId:
 *                       type: string
 *                     quantity:
 *                       type: number
 *                     unit:
 *                       type: string
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
  query?: string;
  cookTime?: number;
  prepTime?: number;
  calories?: number;
  ingredients?: string;
  vegan?: boolean;
  vegetarian?: boolean;
  includeBlacklistedRecipes?: boolean;
  blacklistedIngredientsIds?: string[];
};

/**
 * @swagger
 * /api/recipes:
 *   get:
 *     tags:
 *       - Recipes
 *     summary: Get public recipes
 *     description: Get a list of public recipes with optional filters (does not require authentication)
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

  const skipParam = searchParams.get("skip");
  const takeParam = searchParams.get("take");
  const cookTimeParam = searchParams.get("cookTime");
  const prepTimeParam = searchParams.get("prepTime");
  const caloriesParam = searchParams.get("calories");
  const veganParam = searchParams.get("vegan");
  const vegetarianParam = searchParams.get("vegetarian");

  const params: RecipeSearchParams = {
    skip: skipParam ? parseInt(skipParam) : 0,
    take: takeParam ? parseInt(takeParam) : 25,
    query: searchParams.get("query") || "",
    cookTime: cookTimeParam ? parseInt(cookTimeParam) : undefined,
    prepTime: prepTimeParam ? parseInt(prepTimeParam) : undefined,
    calories: caloriesParam ? parseInt(caloriesParam) : undefined,
    ingredients: searchParams.get("ingredients") || undefined,
    vegan: veganParam === "true" ? true : veganParam === "false" ? false : undefined,
    vegetarian: vegetarianParam === "true" ? true : vegetarianParam === "false" ? false : undefined,
    includeBlacklistedRecipes:
      searchParams.get("includeBlacklistedRecipes") === "true",
    blacklistedIngredientsIds: blacklistedIngredientsIds,
  };

  const recipes = await getPublicRecipes(params);

  return NextResponse.json(recipes);
};

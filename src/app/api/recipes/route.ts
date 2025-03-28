import DBClient from "@/persistence/DBClient";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { getCurrentUser } from "../users/current/route";
import { UnauthorizedNextResponse } from "@/lib/api";
import { createRecipe } from "@/lib/server-actions/recipes/createRecipe";
import { getUserPrivateRecipes } from "@/lib/server-actions/recipes/getUserPrivateRecipes";
import { createRecipeSchema } from "@/lib/server-actions/recipes/createRecipe.schema";

const prisma = DBClient.getInstance().prisma;

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

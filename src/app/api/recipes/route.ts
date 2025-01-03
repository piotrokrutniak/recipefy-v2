import DBClient from "@/persistence/DBClient";
import { Recipe, Visibility } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { getCurrentUser } from "../users/current/route";
import { UnauthorizedNextResponse } from "@/lib/api";

const prisma = DBClient.getInstance().prisma;

const createRecipeIngredientSchema = z.object({
  id: z.string(),
  ingredientId: z.string().optional(),
  userIngredientId: z.string().optional(),
  amount: z.string(),
});

// Schema for validation
export const createRecipeSchema = z.object({
  id: z.string().optional(),
  title: z.string().min(1, "Title is required"),
  description: z.string(),
  content: z.string().min(1, "Content is required"),
  cookTime: z.number().min(0, "Cook time cannot be negative"),
  prepTime: z.number().min(0, "Prep time cannot be negative"),
  servings: z.number().min(1, "Must have at least 1 serving"),
  vegan: z.boolean(),
  vegetarian: z.boolean(),
  visibility: z.nativeEnum(Visibility),
  recipeIngredients: z.array(createRecipeIngredientSchema),
}) satisfies z.ZodType<Partial<Recipe>>;

export const createRecipe = async (
  data: z.infer<typeof createRecipeSchema>,
  authorId: string
) => {
  const recipe = await prisma.recipe.create({
    data: {
      title: data.title,
      content: data.content,
      cookTime: data.cookTime,
      prepTime: data.prepTime,
      author: {
        connect: {
          id: authorId,
        },
      },
      servings: data.servings,
      vegan: data.vegan,
      vegetarian: data.vegetarian,
      visibility: data.visibility,
      calories: 0,
      verifiedIngredients: false,
      recipeIngredients: {
        createMany: {
          data: data.recipeIngredients.map((ingredient) => ({
            id: ingredient?.id,
            ingredientId: ingredient?.ingredientId || undefined,
            userIngredientId: ingredient?.userIngredientId || undefined,
            amount: ingredient?.amount.toString(),
          })),
        },
      },
    },
  });

  return recipe;
};

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
  ignoreBlacklistedIngredients: boolean;
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
    ignoreBlacklistedIngredients:
      searchParams.get("ignoreBlacklistedIngredients") === "true",
    blacklistedIngredientsIds: blacklistedIngredientsIds,
  };

  console.log("RecipeSearchParams", params);

  const recipes = await getRecipes(params);

  return NextResponse.json(recipes);
};

export const getRecipes = async (params: Partial<RecipeSearchParams>) => {
  return await prisma.recipe.findMany({
    skip: params.skip,
    take: params.take,
    include: {
      author: true,
      recipeIngredients: true,
    },
    where: {
      title: {
        contains: params.query && params.query,
        mode: "insensitive",
      },
      cookTime: {
        lte: params.cookTime && Number(params.cookTime),
      },
      prepTime: {
        lte: params.prepTime && Number(params.prepTime),
      },
      calories: {
        lte: params.calories && Number(params.calories),
      },
      vegan: params.vegan,
      vegetarian: params.vegetarian,
      recipeIngredients: {
        every: !params.ignoreBlacklistedIngredients
          ? {
              ingredientId: {
                notIn: params.ignoreBlacklistedIngredients
                  ? undefined
                  : params.blacklistedIngredientsIds,
              },
            }
          : undefined,
        some: params.ingredients
          ? {
              ingredient: {
                id: {
                  in: params.ingredients?.split(","),
                },
              },
            }
          : undefined,
      },
    },
    orderBy: { createdAt: "desc" },
  });
};

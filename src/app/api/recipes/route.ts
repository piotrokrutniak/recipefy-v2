import DBClient from "@/persistence/DBClient";
import { Recipe, Visibility } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { getCurrentUser } from "../users/current/route";
import { UnauthorizedNextResponse } from "@/lib/api";

const prisma = DBClient.getInstance().prisma;

// Schema for validation
export const createRecipeSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  content: z.string().min(1, "Content is required"),
  cookTime: z.number().min(0, "Cook time cannot be negative"),
  prepTime: z.number().min(0, "Prep time cannot be negative"),
  servings: z.number().min(1, "Must have at least 1 serving"),
  vegan: z.boolean(),
  vegetarian: z.boolean(),
  visibility: z.nativeEnum(Visibility),
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

export const GET = async (req: NextRequest) => {
  const { searchParams } = req.nextUrl;
  const skip = parseInt(searchParams.get("skip") || "0");
  const take = parseInt(searchParams.get("take") || "25");

  const recipes = await prisma.recipe.findMany({
    skip,
    take,
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json(recipes);
};

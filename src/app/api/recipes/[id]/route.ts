import DBClient from "@/persistence/DBClient";
import { NextRequest, NextResponse } from "next/server";
import { createRecipeSchema } from "../route";
import { getCurrentUser } from "../../users/current/route";
import { UnauthorizedNextResponse } from "@/lib/api";
import z from "node_modules/zod/lib";
import { UpdateRecipeDto } from "@/types/api";

const prisma = DBClient.getInstance().prisma;

export const getRecipeById = async (id: string) => {
  const recipe = await prisma.recipe.findUnique({
    where: { id },
    include: {
      recipeIngredients: {
        include: {
          ingredient: true,
        },
      },
    },
  });

  return recipe;
};

export const updateRecipeById = async (
  data: z.infer<typeof createRecipeSchema>,
  authorId: string
) => {
  const recipe = await prisma.recipe.update({
    where: { id: data.id },
    data: {
      title: data.title,
      description: data.description,
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
        deleteMany: {
          recipeId: data.id,
        },
        createMany: {
          data: data.recipeIngredients.map((ingredient) => ({
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

export const GET = async (
  req: NextRequest,
  { params }: { params: { id: string } }
) => {
  const recipe = await getRecipeById(params.id);

  return NextResponse.json(recipe);
};

export const DELETE = async (
  req: NextRequest,
  { params }: { params: { id: string } }
) => {
  try {
    const user = await getCurrentUser();

    if (!user) {
      return UnauthorizedNextResponse;
    }

    // Check if recipe exists and belongs to user
    const recipe = await prisma.recipe.findUnique({
      where: { id: params.id },
    });

    if (!recipe) {
      return NextResponse.json({ error: "Recipe not found" }, { status: 404 });
    }

    if (recipe.authorId !== user.id) {
      return NextResponse.json(
        { error: "Not authorized to delete this recipe" },
        { status: 403 }
      );
    }

    // Delete the recipe
    await prisma.recipe.delete({
      where: { id: params.id },
    });

    return NextResponse.json(
      { message: "Recipe deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to delete recipe" },
      { status: 500 }
    );
  }
};
export const PATCH = async (
  req: NextRequest,
  { params }: { params: { id: string } }
) => {
  try {
    const body = await req.json();

    // Validate the request body
    const validatedData = createRecipeSchema.parse(body);

    console.log("validatedData", validatedData);

    const user = await getCurrentUser();

    if (!user) {
      return UnauthorizedNextResponse;
    }

    // First check if the recipe exists and belongs to the user
    const existingRecipe = await prisma.recipe.findUnique({
      where: { id: params.id },
    });

    if (!existingRecipe) {
      return NextResponse.json({ error: "Recipe not found" }, { status: 404 });
    }

    if (existingRecipe.authorId !== user.id) {
      return NextResponse.json(
        { error: "Not authorized to edit this recipe" },
        { status: 403 }
      );
    }

    // Update the recipe
    // const recipe = await prisma.recipe.update({
    //   where: { id: params.id },
    //   data: {
    //     ...validatedData,
    //     recipeIngredients: {
    //       deleteMany: {
    //         recipeId: params.id,
    //       },
    //       createMany: {
    //         data:
    //           validatedData.recipeIngredients?.map((ingredient) => ({
    //             ingredientId: ingredient?.ingredientId || undefined,
    //             userIngredientId: ingredient?.userIngredientId || undefined,
    //             amount: ingredient?.amount.toString(),
    //           })) || [],
    //       },
    //     },
    //   },
    // });

    const recipe = await updateRecipeById(validatedData, user.id);

    return NextResponse.json(recipe);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Invalid recipe data", details: error.errors },
        { status: 400 }
      );
    }

    console.error(error);
    return NextResponse.json(
      { error: "Failed to update recipe" },
      { status: 500 }
    );
  }
};

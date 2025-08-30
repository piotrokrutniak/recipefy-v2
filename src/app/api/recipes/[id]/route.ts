import DBClient from "@/persistence/DBClient";
import { NextRequest, NextResponse } from "next/server";
import { getCurrentUser } from "../../users/current/route";
import { UnauthorizedNextResponse } from "@/lib/api";
import z from "node_modules/zod/lib";
import { getRecipeById } from "@/lib/server-actions/recipes/getRecipeById";
import { updateRecipeById } from "@/lib/server-actions/recipes/updateRecipeById";
import { createRecipeSchema } from "@/lib/server-actions/recipes/createRecipe.schema";

const prisma = DBClient.getInstance().prisma;

export const GET = async (
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) => {
  const { id } = await params;
  const recipe = await getRecipeById(id);

  return NextResponse.json(recipe);
};

export const DELETE = async (
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) => {
  try {
    const { id } = await params;
    const user = await getCurrentUser();

    if (!user) {
      return UnauthorizedNextResponse;
    }

    // Check if recipe exists and belongs to user
    const recipe = await prisma.recipe.findUnique({
      where: { id },
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
      where: { id },
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

/**
 * TODO: Implement cleaning up the assets in the cloudinary
 * - The thumbnail should be deleted if the recipe is deleted
 * - The thumbnail previously uploaded should be deleted if the recipe thumbnail is updated
 * - The markup should be scanned for images and then delete them if they are not in the updated recipe
 * - The markup should be scanned for base64 images, upload them to cloudinary and replace base64 with the new url
 */
export const PATCH = async (
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) => {
  try {
    const { id } = await params;
    const body = await req.json();

    // Validate the request body
    const validatedData = createRecipeSchema.parse(body);

    const user = await getCurrentUser();

    if (!user) {
      return UnauthorizedNextResponse;
    }

    // First check if the recipe exists and belongs to the user
    const existingRecipe = await prisma.recipe.findUnique({
      where: { id },
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

    const recipe = await updateRecipeById({ ...validatedData, id }, user.id);

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

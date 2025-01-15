import DBClient from "@/persistence/DBClient";
import { NextRequest, NextResponse } from "next/server";
import { getCurrentUser } from "../../users/current/route";
import { UnauthorizedNextResponse } from "@/lib/api";
import z from "node_modules/zod/lib";
import {
  replaceBase64WithUrls,
  uploadImageToCloudinary,
} from "@/lib/cloudinary";
import { createRecipeSchema } from "@/lib/server-actions/recipes/createRecipe";
import { uploadMarkupAssets } from "@/lib/server-actions/recipes/uploadMarkupAssets";

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
      author: true,
    },
  });

  return recipe;
};

export const updateRecipeById = async (
  data: z.infer<typeof createRecipeSchema>,
  authorId: string
) => {
  let thumbnailUrl = data.thumbnailUrl;

  if (data.thumbnailBase64 && data.thumbnailBase64 !== data.thumbnailUrl) {
    thumbnailUrl = await uploadImageToCloudinary(data.thumbnailBase64);
  }

  // TODO: Try-Catch and clean up maybe?
  // Though the only failure side-effect is lack of SEO for the affected images
  // The failed upload will be re-tried whenever user saves the recipe again
  const replacedAssets = await uploadMarkupAssets(data.content);

  const processedContent = replaceBase64WithUrls(replacedAssets, data.content);

  const recipe = await prisma.recipe.update({
    where: { id: data.id },
    data: {
      title: data.title,
      description: data.description,
      thumbnailUrl,
      content: processedContent,
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

/**
 * TODO: Implement cleaning up the assets in the cloudinary
 * - The thumbnail should be deleted if the recipe is deleted
 * - The thumbnail previously uploaded should be deleted if the recipe thumbnail is updated
 * - The markup should be scanned for images and then delete them if they are not in the updated recipe
 * - The markup should be scanned for base64 images, upload them to cloudinary and replace base64 with the new url
 */
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

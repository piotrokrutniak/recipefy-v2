import DBClient from "@/persistence/DBClient";
import { NextRequest, NextResponse } from "next/server";
import { getCurrentUser } from "../../users/current/route";
import { UnauthorizedNextResponse } from "@/lib/api";
import z from "node_modules/zod/lib";
import { getRecipeById } from "@/lib/server-actions/recipes/getRecipeById";
import { updateRecipeById } from "@/lib/server-actions/recipes/updateRecipeById";
import { createRecipeSchema } from "@/lib/server-actions/recipes/createRecipe.schema";

const prisma = DBClient.getInstance().prisma;

/**
 * @swagger
 * /api/recipes/{id}:
 *   get:
 *     tags:
 *       - Recipes
 *     summary: Get recipe by ID
 *     description: Retrieve a single recipe by its ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Recipe ID
 *     responses:
 *       200:
 *         description: Recipe details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Recipe'
 *       404:
 *         description: Recipe not found
 */
export const GET = async (
  req: NextRequest,
  { params }: { params: { id: string } }
) => {
  const recipe = await getRecipeById(params.id);

  return NextResponse.json(recipe);
};

/**
 * @swagger
 * /api/recipes/{id}:
 *   delete:
 *     tags:
 *       - Recipes
 *     summary: Delete a recipe
 *     description: Delete a recipe by ID (must be owner)
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Recipe ID
 *     responses:
 *       200:
 *         description: Recipe deleted successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Not authorized to delete this recipe
 *       404:
 *         description: Recipe not found
 *       500:
 *         description: Server error
 */
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
/**
 * @swagger
 * /api/recipes/{id}:
 *   patch:
 *     tags:
 *       - Recipes
 *     summary: Update a recipe
 *     description: Update a recipe by ID (must be owner)
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Recipe ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               cookTime:
 *                 type: number
 *               prepTime:
 *                 type: number
 *               servings:
 *                 type: number
 *               difficulty:
 *                 type: string
 *                 enum: [easy, medium, hard]
 *               isPublic:
 *                 type: boolean
 *               ingredients:
 *                 type: array
 *                 items:
 *                   type: object
 *               instructions:
 *                 type: array
 *                 items:
 *                   type: string
 *     responses:
 *       200:
 *         description: Recipe updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Recipe'
 *       400:
 *         description: Invalid recipe data
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Not authorized to edit this recipe
 *       404:
 *         description: Recipe not found
 *       500:
 *         description: Server error
 */
export const PATCH = async (
  req: NextRequest,
  { params }: { params: { id: string } }
) => {
  try {
    const body = await req.json();

    // Validate the request body
    const validatedData = createRecipeSchema.parse(body);

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

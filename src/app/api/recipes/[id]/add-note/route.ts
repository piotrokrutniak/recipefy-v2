import { NextRequest, NextResponse } from "next/server";
import DBClient from "@/persistence/DBClient";
import { getCurrentUser } from "@/app/api/users/current/route";

const prisma = DBClient.getInstance().prisma;

export const PATCH = async (
  req: NextRequest,
  { params }: { params: { id: string } }
) => {
  const { note } = await req.json();
  const user = await getCurrentUser();
  const recipe = await prisma.recipe.findUnique({
    where: { id: params.id },
  });

  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 401 });
  }

  if (!recipe) {
    return NextResponse.json({ error: "Recipe not found" }, { status: 404 });
  }

  const createdNote = await prisma.userRecipeNote.upsert({
    where: {
      userId_recipeId: {
        userId: user.id,
        recipeId: params.id,
      },
    },
    update: {
      note: note,
    },
    create: {
      note: note,
      recipeId: params.id,
      userId: user.id,
    },
  });

  return NextResponse.json(createdNote);
};

export const getRecipeNote = async (recipeId: string) => {
  const user = await getCurrentUser();

  if (!user) {
    return null;
  }

  return prisma.userRecipeNote.findUnique({
    where: { userId_recipeId: { userId: user.id, recipeId } },
  });
};

export const GET = async (
  req: NextRequest,
  { params }: { params: { id: string } }
) => {
  const user = await getCurrentUser();

  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 401 });
  }

  const note = await getRecipeNote(params.id);

  if (!note) {
    return NextResponse.json({ error: "Note not found" }, { status: 404 });
  }

  return NextResponse.json(note);
};

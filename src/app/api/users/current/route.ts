import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";
import DBClient from "@/persistence/DBClient";
import { NextRequest, NextResponse } from "next/server";
import { UpdateUserDto } from "@/types/api";
import { UnauthorizedNextResponse } from "@/lib/api";

const prisma = DBClient.getInstance().prisma;

export const getCurrentUser = async () => {
  const session = await getServerSession(authOptions);

  if (!session || !session.user?.email) {
    return null;
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
  });

  return user;
};

export const GET = async () => {
  const user = await getCurrentUser();

  if (!user) {
    return UnauthorizedNextResponse;
  }

  return NextResponse.json(user, { status: 200 });
};

export const PUT = async (req: NextRequest) => {
  const user = await getCurrentUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();

  const updatedUser = await prisma.user.update({
    where: { id: user.id },
    data: {
      ...body,
    } as UpdateUserDto,
  });

  return NextResponse.json(updatedUser, { status: 200 });
};

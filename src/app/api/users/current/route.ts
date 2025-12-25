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

/**
 * @swagger
 * /api/users/current:
 *   get:
 *     tags:
 *       - Users
 *     summary: Get current user
 *     description: Retrieve the currently authenticated user's details
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Current user details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       401:
 *         description: Unauthorized
 */
export const GET = async () => {
  const user = await getCurrentUser();

  if (!user) {
    return UnauthorizedNextResponse;
  }

  return NextResponse.json(user, { status: 200 });
};

/**
 * @swagger
 * /api/users/current:
 *   put:
 *     tags:
 *       - Users
 *     summary: Update current user
 *     description: Update the currently authenticated user's profile
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *               name:
 *                 type: string
 *               bio:
 *                 type: string
 *               image:
 *                 type: string
 *     responses:
 *       200:
 *         description: User updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       401:
 *         description: Unauthorized
 */
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

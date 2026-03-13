import { NextRequest, NextResponse } from "next/server";
import { getCurrentUser } from "@/app/api/users/current/route";
import DBClient from "@/persistence/DBClient";
import { UnauthorizedNextResponse } from "@/lib/api";

const prisma = DBClient.getInstance().prisma;

/**
 * @swagger
 * /api/auth/mobile/revoke:
 *   post:
 *     tags:
 *       - Auth
 *     summary: Revoke a mobile API token
 *     description: Revokes a previously issued mobile token, preventing further use. Requires authentication.
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - jti
 *             properties:
 *               jti:
 *                 type: string
 *                 description: The JWT ID of the token to revoke
 *     responses:
 *       200:
 *         description: Token revoked successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Token not found
 */
export const POST = async (req: NextRequest) => {
  const user = await getCurrentUser();
  if (!user) {
    return UnauthorizedNextResponse;
  }

  const body = await req.json().catch(() => null);
  if (!body?.jti) {
    return NextResponse.json({ error: "jti is required" }, { status: 400 });
  }

  const mobileToken = await prisma.mobileToken.findUnique({
    where: { jti: body.jti },
  });

  if (!mobileToken || mobileToken.userId !== user.id) {
    return NextResponse.json({ error: "Token not found" }, { status: 404 });
  }

  await prisma.mobileToken.update({
    where: { jti: body.jti },
    data: { revokedAt: new Date() },
  });

  return NextResponse.json({ success: true }, { status: 200 });
};

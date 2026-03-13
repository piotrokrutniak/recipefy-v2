import { NextRequest, NextResponse } from "next/server";
import { OAuth2Client } from "google-auth-library";
import { SignJWT } from "jose";
import DBClient from "@/persistence/DBClient";

const prisma = DBClient.getInstance().prisma;
const googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

const TOKEN_EXPIRY_DAYS = 90;

/**
 * @swagger
 * /api/auth/mobile/token:
 *   post:
 *     tags:
 *       - Auth
 *     summary: Exchange Google ID token for a mobile API token
 *     description: Verifies a Google ID token from a native mobile sign-in and returns a long-lived Bearer token for use with all API endpoints.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - idToken
 *             properties:
 *               idToken:
 *                 type: string
 *                 description: Google ID token obtained from native Google Sign-In
 *               deviceName:
 *                 type: string
 *                 description: Optional label for this token (e.g. "iPhone 15")
 *     responses:
 *       200:
 *         description: Mobile token issued successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                 expiresAt:
 *                   type: string
 *                   format: date-time
 *       401:
 *         description: Invalid or expired Google ID token
 *       500:
 *         description: Internal server error
 */
export const POST = async (req: NextRequest) => {
  const body = await req.json().catch(() => null);
  if (!body?.idToken) {
    return NextResponse.json({ error: "idToken is required" }, { status: 400 });
  }

  const { idToken, deviceName } = body as { idToken: string; deviceName?: string };

  let googlePayload;
  try {
    const ticket = await googleClient.verifyIdToken({
      idToken,
      audience: process.env.GOOGLE_CLIENT_ID,
    });
    googlePayload = ticket.getPayload();
  } catch {
    return NextResponse.json({ error: "Invalid Google ID token" }, { status: 401 });
  }

  if (!googlePayload?.email || !googlePayload.sub) {
    return NextResponse.json({ error: "Invalid Google ID token" }, { status: 401 });
  }

  const { email, sub: googleId, name, picture } = googlePayload;

  // Find or create user + account (mirrors what NextAuth PrismaAdapter does)
  let user = await prisma.user.findUnique({ where: { email } });

  if (!user) {
    user = await prisma.user.create({
      data: {
        email,
        name: name ?? null,
        image: picture ?? null,
        emailVerified: new Date(),
        account: {
          create: {
            type: "oauth",
            provider: "google",
            providerAccountId: googleId,
          },
        },
      },
    });
  } else {
    const existingAccount = await prisma.account.findUnique({
      where: { provider_providerAccountId: { provider: "google", providerAccountId: googleId } },
    });
    if (!existingAccount) {
      await prisma.account.create({
        data: {
          userId: user.id,
          type: "oauth",
          provider: "google",
          providerAccountId: googleId,
        },
      });
    }
  }

  const jti = crypto.randomUUID();
  const expiresAt = new Date(Date.now() + TOKEN_EXPIRY_DAYS * 24 * 60 * 60 * 1000);
  const secret = new TextEncoder().encode(process.env.NEXTAUTH_SECRET!);

  const token = await new SignJWT({ type: "mobile" })
    .setProtectedHeader({ alg: "HS256" })
    .setSubject(user.id)
    .setJti(jti)
    .setIssuedAt()
    .setExpirationTime(expiresAt)
    .sign(secret);

  await prisma.mobileToken.create({
    data: {
      jti,
      userId: user.id,
      name: deviceName ?? null,
      expiresAt,
    },
  });

  return NextResponse.json({ token, expiresAt }, { status: 200 });
};

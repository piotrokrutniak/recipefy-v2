import DBClient from "@/persistence/DBClient";
import { User } from "@prisma/client";

const prisma = DBClient.getInstance().prisma;

export type UserPublicInfo = Omit<
  User,
  "email" | "updatedAt" | "emailVerified"
>;

export const getUserPublicInfo = async (
  slugOrId: string
): Promise<UserPublicInfo | null> => {
  if (!slugOrId) {
    throw new Error("User slug or ID is required");
  }

  const user = await prisma.user.findFirst({
    where: {
      OR: [{ slug: slugOrId }, { id: slugOrId }],
    },
  });

  if (!user) {
    return null;
  }

  return {
    id: user.id,
    slug: user.slug,
    name: user.name,
    image: user.image,
    bio: user.bio,
    firstName: user.firstName,
    lastName: user.lastName,
    role: user.role,
    createdAt: user.createdAt,
  };
};

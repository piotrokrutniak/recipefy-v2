import DBClient from "@/persistence/DBClient";
import { User } from "@prisma/client";

const prisma = DBClient.getInstance().prisma;

export type UserPublicInfo = Omit<
  User,
  "email" | "password" | "createdAt" | "updatedAt" | "emailVerified"
>;

export const getUserPublicInfo = async (
  userId: string
): Promise<UserPublicInfo | null> => {
  console.log("getUserPublicInfoId", userId);

  if (!userId) {
    throw new Error("User ID is required");
  }

  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });

  if (!user) {
    return null;
  }

  return {
    id: user.id,
    name: user.name,
    image: user.image,
    bio: user.bio,
    firstName: user.firstName,
    lastName: user.lastName,
  };
};

import { getCurrentUser } from "@/app/api/users/current/route";
import DBClient from "@/persistence/DBClient";
import { Circle } from "@prisma/client";

const prisma = DBClient.getInstance().prisma;

export const getUserJoinedCircles = async (): Promise<Circle[]> => {
  const user = await getCurrentUser();
  if (!user) {
    return [];
  }
  return await prisma.circle.findMany({
    where: { circleMembers: { some: { userId: user.id } } },
  });
};

import DBClient from "@/persistence/DBClient";
import { Circle } from "@prisma/client";

const prisma = DBClient.getInstance().prisma;

export const getUserOwnedCirclesById = async (
  id: string
): Promise<Circle[]> => {
  return await prisma.circle.findMany({ where: { circleOwnerId: id } });
};

import DBClient from "@/persistence/DBClient";
import { CircleInviteFullInfoDto } from "@/types/api";

const prisma = DBClient.getInstance().prisma;

export const getCircleById = async (
  id: string
): Promise<CircleInviteFullInfoDto> => {
  return await prisma.circle.findUnique({
    where: { id },
    include: {
      circleInvite: true,
      circleOwner: true,
    },
  });
};

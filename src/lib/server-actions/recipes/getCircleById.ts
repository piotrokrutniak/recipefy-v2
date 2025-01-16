import DBClient from "@/persistence/DBClient";
import { CircleFullInfoDto } from "@/types/api";

const prisma = DBClient.getInstance().prisma;

export const getCircleById = async (id: string): Promise<CircleFullInfoDto> => {
  const circle = await prisma.circle.findUnique({
    where: { id },
    include: {
      circleInvite: true,
      circleOwner: true,
      circleMembers: {
        include: {
          user: true,
        },
      },
    },
  });

  if (!circle) throw new Error("Circle not found");

  return circle as CircleFullInfoDto;
};

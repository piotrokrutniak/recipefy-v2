import DBClient from "@/persistence/DBClient";

const prisma = DBClient.getInstance().prisma;

export const getCircleById = async (id: string) => {
  return await prisma.circle.findUnique({
    where: { id },
    include: {
      circleInvite: true,
      circleOwner: true,
    },
  });
};

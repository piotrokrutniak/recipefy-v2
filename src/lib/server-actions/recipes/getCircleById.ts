import { getCurrentUser } from "@/app/api/users/current/route";
import { ErrorCodes } from "@/lib/errors";
import DBClient from "@/persistence/DBClient";
import { CircleFullInfoDto } from "@/types/api";

const prisma = DBClient.getInstance().prisma;

export const getCircleById = async (id: string): Promise<CircleFullInfoDto> => {
  const user = await getCurrentUser();

  if (!user) throw new Error(ErrorCodes.UNAUTHORIZED);

  const circle = await prisma.circle.findUnique({
    where: {
      id,
    },
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

  if (!circle) throw new Error(ErrorCodes.NOT_FOUND);

  if (
    circle.circleOwnerId !== user.id &&
    !circle.circleMembers.some((member) => member.userId === user.id)
  ) {
    throw new Error(ErrorCodes.FORBIDDEN);
  }

  return circle as CircleFullInfoDto;
};

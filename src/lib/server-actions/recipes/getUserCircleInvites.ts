import { getCurrentUser } from "@/app/api/users/current/route";
import DBClient from "@/persistence/DBClient";
import { CircleInviteFullInfoDto } from "@/types/api";

const prisma = DBClient.getInstance().prisma;

export const getUserCircleInvites = async (): Promise<
  CircleInviteFullInfoDto[]
> => {
  const user = await getCurrentUser();
  if (!user) {
    return [];
  }
  return await prisma.circleInvite.findMany({
    where: { inviteeEmail: user.email },
    include: {
      circle: true,
      invitingUser: true,
    },
  });
};

import DBClient from "@/persistence/DBClient";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";

const prisma = DBClient.getInstance().prisma;

export const GET = async () => {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    return {
      status: 401,
      body: { error: "Unauthorized" },
    };
  }
};

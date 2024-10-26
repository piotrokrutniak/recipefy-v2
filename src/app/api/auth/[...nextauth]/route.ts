import NextAuth, { AuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import DBClient from "@/persistence/DBClient";

// let prisma;
// // https://github.com/prisma/prisma/issues/1983
// if (process.env.NODE_ENV === "production") {
//   prisma = new PrismaClient();
// } else {
//   if (!global.prisma) {
//     global.prisma = new PrismaClient();
//   }

//   prisma = global.prisma;
// }

// https://github.com/prisma/prisma/issues/1983#issuecomment-686742774
const prisma = DBClient.getInstance().prisma;

// TODO: https://github.com/nextauthjs/next-auth/pull/6777
export const authOptions: AuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
    }),
  ],
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: "database",
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };

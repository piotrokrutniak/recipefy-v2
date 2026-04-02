import NextAuth, { AuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import DBClient from "@/persistence/DBClient";
import { generateSlug } from "@/lib/server-actions/recipes/generateSlug";

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
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.userId = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.userId as string;
      }
      return session;
    },
  },
  events: {
    async createUser({ user }) {
      await prisma.user.update({
        where: { id: user.id },
        data: { slug: generateSlug(user.name ?? user.email ?? "user", user.id) },
      });
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };

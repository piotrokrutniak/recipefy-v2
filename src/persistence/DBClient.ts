import { PrismaClient } from "@prisma/client";

declare global {
  // eslint-disable-next-line no-var
  var prismaGlobal: PrismaClient | undefined;
}

class DBClient {
  public prisma: PrismaClient;
  private static instance: DBClient;

  private constructor() {
    if (process.env.NODE_ENV === "production") {
      this.prisma = new PrismaClient();
    } else {
      // Use globalThis in development to prevent multiple instances
      if (!global.prismaGlobal) {
        global.prismaGlobal = new PrismaClient();
      }
      this.prisma = global.prismaGlobal;
    }
  }

  public static getInstance = () => {
    if (!DBClient.instance) {
      DBClient.instance = new DBClient();
    }
    return DBClient.instance;
  };
}

export default DBClient;

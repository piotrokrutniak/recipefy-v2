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
      if (!global.prismaGlobal) {
        global.prismaGlobal = new PrismaClient();
        // Disconnect Prisma Client on Node.js process termination
        process.on("beforeExit", async () => {
          await global.prismaGlobal?.$disconnect();
        });
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

  // Add method to explicitly disconnect
  public async disconnect() {
    await this.prisma.$disconnect();
  }
}

export default DBClient;

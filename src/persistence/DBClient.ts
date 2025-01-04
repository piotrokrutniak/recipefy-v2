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
      // Clear connections after prisma is initialized
      this.prisma.$connect().then(() => {
        this.clearPreviousConnections();
      });
    } else {
      if (!global.prismaGlobal) {
        console.log("Creating new PrismaClient", process.env.NODE_ENV);
        global.prismaGlobal = new PrismaClient();
        // Clear connections after prisma is initialized
        global.prismaGlobal.$connect().then(() => {
          this.clearPreviousConnections();
        });

        // Disconnect Prisma Client on Node.js process termination
        process.on("beforeExit", async () => {
          await global.prismaGlobal?.$disconnect();
        });
      }
      this.prisma = global.prismaGlobal;
    }
  }

  private async clearPreviousConnections(): Promise<void> {
    try {
      await this.prisma.$executeRaw`
        SELECT pg_terminate_backend(pid) 
        FROM pg_stat_activity 
        WHERE datname = current_database()
        AND pid <> pg_backend_pid()
        AND application_name LIKE 'Prisma%';
      `;
      console.log("Successfully cleared previous database connections");
    } catch (error) {
      console.error("Error clearing database connections:", error);
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

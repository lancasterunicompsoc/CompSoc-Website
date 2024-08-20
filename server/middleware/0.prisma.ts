import { PrismaClient } from "@prisma/client";
import { PrismaLibSQL } from "@prisma/adapter-libsql";
import { createClient, type Client } from "@libsql/client";

const config = useRuntimeConfig();

let libsql: Client;
let adapter: PrismaLibSQL;
let prisma: PrismaClient;

declare module "h3" {
  interface H3EventContext {
    prisma: PrismaClient;
  }
}

export default eventHandler(event => {
  if (!libsql) {
    libsql = createClient({
      url: `${config.turso_database_url}`,
      authToken: `${config.turso_auth_token}`,
    });
  }
  if (!adapter) {
    adapter = new PrismaLibSQL(libsql);
  }
  if (!prisma) {
    prisma = new PrismaClient({ adapter });
  }
  event.context.prisma = prisma;
});

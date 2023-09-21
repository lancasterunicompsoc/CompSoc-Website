import { PrismaClient } from "@prisma/client";

export default defineEventHandler(async event => {
  const prisma = new PrismaClient();
  const records = await prisma.event.findMany();
  prisma.$disconnect();
  return records;
});

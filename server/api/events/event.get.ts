import { PrismaClient } from "@prisma/client";

export default defineEventHandler(async event => {
  const query = getQuery(event)
  const prisma = new PrismaClient();
  const records = await prisma.event.findUnique({
    where:{
      id: Number(query.id),
  },
  });
  prisma.$disconnect();
  return records;
});

import { PrismaClient } from "@prisma/client";

export default defineEventHandler(async event => {
  try {
    const prisma = new PrismaClient();
    const { id } = await readBody(event);

    await prisma.event.delete({
      where: { id },
    });
    prisma.$disconnect();

    // Send the ID of the newly created event in the response
    return { ok: true };
  } catch (error) {
    console.error("Error adding event:", error);
    return { ok: false };
  }
});

import { useValidatedBody, z } from "h3-zod";
import { ensureIsAdmin } from "~/server/middleware/1.auth";

export default defineEventHandler(async event => {
  const {
    context: { prisma },
  } = event;

  ensureIsAdmin(event);

  try {
    const { id } = await useValidatedBody(
      event,
      z.object({
        id: z.string().min(1),
      }),
    );
    await prisma.slides.delete({ where: { id } });

    return { id, ok: true } as const;
  } catch (error) {
    console.error("Error deleting slides:", error);
    throw createError("failed to delete slides");
  }
});

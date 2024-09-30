import { useValidatedBody, z } from "h3-zod";

export default defineEventHandler(async event => {
  const {
    context: { prisma, auth },
  } = event;

  if (!auth?.isAdmin) {
    throw new Error("you do not belong here");
  }
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

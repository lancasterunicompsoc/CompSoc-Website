import { useValidatedBody, z } from "h3-zod";

export default defineEventHandler(async event => {
  const {
    context: { prisma, auth },
  } = event;

  if (!auth?.isAdmin) {
    throw new Error("you do not belong here");
  }
  try {
    const { name, link, speaker } = await useValidatedBody(
      event,
      z.object({
        name: z.string().min(1),
        link: z.string().min(1),
        speaker: z.string(),
      }),
    );
    const newEvent = await prisma.slides.create({
      data: {
        name,
        link,
        speaker,
        creatorId: auth.decoded?.id,
      },
    });
    // Send the ID of the newly created event in the response
    return { id: newEvent.id, ok: true } as const;
  } catch (error) {
    console.error("Error adding slides:", error);
    throw createError("failed to add event");
  }
});

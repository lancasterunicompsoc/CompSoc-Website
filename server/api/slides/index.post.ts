import { useValidatedBody, z } from "h3-zod";

export default defineEventHandler(async event => {
  const {
    context: { prisma, auth },
  } = event;

  if (!auth?.isAdmin) {
    throw new Error("you do not belong here");
  }
  try {
    const { name, link, talkOrganizerName } = await useValidatedBody(
      event,
      z.object({
        name: z.string().min(1),
        link: z.string().min(1),
        talkOrganizerName: z.string(),
      }),
    );
    const newEvent = await prisma.slides.create({
      data: {
        name,
        link,
        talkOrganizerName,
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

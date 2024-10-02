import { useValidatedBody, z } from "h3-zod";
import { ensureIsAdmin } from "~/server/middleware/1.auth";

export default defineEventHandler(async event => {
  const { prisma } = event.context;
  ensureIsAdmin(event);

  const { id, ...body } = await useValidatedBody(
    event,
    z.object({
      id: z.coerce.number(),
      name: z.string(),
      location: z.string(),
      mazemapLink: z.string(),
      summary: z.string(),
      description: z.string(),
      slides: z
        .string()
        .refine(
          value =>
            value.startsWith("https://slides.compsoc.io/") || value === "",
        ),
      image: z.string(),
      organizer: z.string(),
      unixStartTime: z.number(),
      unixEndTime: z.number(),
      difficulty: z.enum(["EASY", "HARD", "SOCIAL"]),
    }),
  );

  await prisma.event.update({
    where: { id },
    data: { ...body },
  });

  return { ok: true, id };
});

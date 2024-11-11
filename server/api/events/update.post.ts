import { useValidatedBody, z } from "h3-zod";

export default defineEventHandler(async event => {
  const { prisma, auth } = event.context;
  if (auth?.decoded.role !== "ADMIN") {
    throw createError("check your privileges");
  }

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
        .refine(value => value.startsWith("https://") || value === ""),
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

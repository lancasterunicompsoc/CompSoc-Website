import { createError as createServerError, type EventHandler } from "h3";
import { useValidatedQuery, z } from "h3-zod";
import { ensureIsAdmin } from "~/server/middleware/1.auth";

export default defineEventHandler(async event => {
  const {
    context: { prisma },
  } = event;
  ensureIsAdmin(event);

  const query = await useValidatedQuery(
    event,
    z.object({
      eventId: z.coerce.number().optional(),
    }),
  );

  if (query.eventId !== 0) {
    const review = await prisma.review.findMany({
      where: { eventId: query.eventId },
      include: { user: { select: { username: true, suVerified: true } } },
    });
    return review;
  }

  return prisma.review.findMany({
    include: { user: { select: { username: true, suVerified: true } } },
  });
});

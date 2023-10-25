import { createError as createServerError } from "h3";
import { useValidatedQuery, z } from "h3-zod";

export default defineEventHandler(async event => {
  const {
    context: { auth, prisma },
  } = event;
  if (!auth || auth.decoded.role !== "ADMIN") {
    throw createServerError(
      "you do not belong here, go back to where you came from",
    );
  }

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

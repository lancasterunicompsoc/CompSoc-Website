import { Prisma } from "@prisma/client";
import { createError as createServerError } from "h3";
import { useValidatedBody, z } from "h3-zod";
import { dateToUnix } from "~/utils/time";

export default defineEventHandler(async event => {
  const { prisma, auth } = event.context;

  if (!auth?.jwt) {
    throw new Error("please sign in before submitting reviews");
  }

  const {
    event: eventId,
    score,
    feedback,
  } = await useValidatedBody(
    event,
    z.object({
      event: z.coerce.number(),
      score: z.number().min(1).max(5),
      feedback: z.string(),
    }),
  );

  // we've now started putting id's into our tokens, so this statement because unnecessary
  // TODO: remove after 24.10 (so that all tokens are new)
  const user = await prisma.user.findUnique({
    where: { username: auth.decoded.username },
  });

  if (!user) {
    throw new Error("user couldn't be found");
  }
  const userId = user.id;

  // TODO: make client side field correspond to db schema names
  try {
    const review = await prisma.review.create({
      data: {
        userId,
        eventId,
        rating: score,
        comment: feedback,
        timestamp: dateToUnix(new Date()),
      },
    });
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      console.log("is of prisma error type");
      if (e.code === "P2002") {
        throw createServerError({
          status: 400,
          statusMessage: "review already submitted",
        });
      }
    }
    throw e;
  }

  return { ok: true };
});

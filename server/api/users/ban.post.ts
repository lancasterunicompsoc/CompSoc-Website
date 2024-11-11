import { useValidatedBody } from "h3-zod";
import { createError as createServerError } from "h3";
import { z } from "zod";
import { ensureIsAdmin } from "~/server/middleware/1.auth";

export default defineEventHandler(async event => {
  ensureIsAdmin(event);

  const { id } = await useValidatedBody(event, z.object({ id: z.string() }));

  const {
    context: { prisma },
  } = event;

  const user = await prisma.user.findUnique({ where: { id } });
  if (!user) {
    throw createServerError("bad userid");
  }

  // could probably be done in a single query, dunno how tho and can't be bothered to find out
  const updated = await prisma.user.update({
    where: { id },
    data: { banned: !user.banned },
  });
  console.log(updated);
  return { ok: true };
});

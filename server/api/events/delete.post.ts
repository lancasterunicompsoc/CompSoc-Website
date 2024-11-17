import { useValidatedBody, z } from "h3-zod";
import { ensureIsAdmin } from "~/server/middleware/1.auth";

export default defineEventHandler(async event => {
  ensureIsAdmin(event);

  const { id } = await useValidatedBody(
    event,
    z.object({ id: z.coerce.number() }),
  );

  await event.context.prisma.event.update({
    where: { id },
    data: { hidden: true },
  });

  // Send the ID of the newly created event in the response
  return { ok: true };
});

import { useValidatedBody, z } from "h3-zod";

export default defineEventHandler(async event => {
  if (!event.context.auth?.isAdmin) {
    throw new Error("you do not belong here");
  }
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

import superjson from "superjson";
import { z } from "zod";
import { useSafeValidatedQuery } from "h3-zod";

export default defineEventHandler(async event => {
  const {
    context: { prisma },
  } = event;

  const res = await useSafeValidatedQuery(
    event,
    z.object({
      orderBy: z.enum(["desc", "asc"]).default("desc"),
    }),
  );
  if (!res.success) {
    console.error(`bad request url: ${getRequestURL(event)}`);
    console.error(res.error.message);
    throw createError("bad request url");
  }

  const options = res.data;

  const results = await prisma.slides.findMany({
    orderBy: { createdAt: options.orderBy },
  });

  // work around the limitations of json serialization
  const data = {
    ...results,
    toJSON() {
      return this;
    },
  };
  return superjson.stringify(data) as unknown as typeof data;
});

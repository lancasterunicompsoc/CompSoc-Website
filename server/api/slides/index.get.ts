import superjson from "superjson";

export default defineEventHandler(async event => {
  const {
    context: { prisma },
  } = event;

  const results = await prisma.slides.findMany({});
  // work around the limitations of json serialization
  const data = {
    ...results,
    toJSON() {
      return this;
    },
  };
  return superjson.stringify(data) as unknown as typeof data;
});

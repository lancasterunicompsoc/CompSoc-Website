import superjson from "superjson";

export default defineEventHandler(async event => {
  const {
    context: { prisma },
  } = event;
  const id = getRouterParam(event, "id");
  if (!id) {
    return {};
  }

  const results = await prisma.slides.findUnique({
    where: { id: id },
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

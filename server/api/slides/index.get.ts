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

/*
export default defineEventHandler(() => {
  const data = {
    createdAt: new Date(),

    // Workaround the type conversion
    toJSON() {
      return this
    }
  }

  // Serialize the output to string, using superjson
  return superjson.stringify(data) as unknown as typeof data
})

*/

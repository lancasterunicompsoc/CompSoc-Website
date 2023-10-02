export default defineEventHandler(async event => {
  const query = getQuery(event);
  const records = await event.context.prisma.event.findUnique({
    where: {
      id: Number(query.id),
    },
  });
  return records;
});

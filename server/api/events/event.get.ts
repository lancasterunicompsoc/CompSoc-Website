export default defineEventHandler(event => {
  const query = getQuery(event);
  return event.context.prisma.event.findUnique({
    where: {
      id: Number(query.id),
    },
  });
});

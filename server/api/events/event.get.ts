export default defineEventHandler(event => {
  const query = getQuery(event);
  return event.context.prisma.event.findFirst({
    where: {
      id: Number(query.id),
      hidden: false,
    },
  });
});

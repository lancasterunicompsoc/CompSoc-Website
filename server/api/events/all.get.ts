export default defineEventHandler(event => {
  return event.context.prisma.event.findMany();
});

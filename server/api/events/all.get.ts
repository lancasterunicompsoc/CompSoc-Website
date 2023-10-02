export default defineEventHandler(async event => {
  const records = await event.context.prisma.event.findMany();
  return records;
});

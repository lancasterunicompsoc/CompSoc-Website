export default defineEventHandler(event => {
  // Calculate the current date and a year in the future
  const currentDate = new Date();
  const futureDate = new Date();
  futureDate.setFullYear(currentDate.getFullYear() + 1);

  // Fetch events that fall within the date range and sort by startTime
  return event.context.prisma.event.findMany({
    where: {
      startTime: {
        gte: currentDate,  // Greater than or equal to today
        lte: futureDate    // Less than or equal to a year from now
      }
    },
    orderBy: {
      startTime: 'asc'  // Sorting by startTime in ascending order
    }
  });
});

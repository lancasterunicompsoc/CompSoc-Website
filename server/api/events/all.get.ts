import { useValidatedQuery, z } from "h3-zod";
import { dateToUnix } from "~/utils/time";

export default defineEventHandler(async event => {
  const query = await useValidatedQuery(
    event,
    z.object({
      years: z.coerce.number().optional().default(0),
      months: z.coerce.number().optional().default(0),
      weeks: z.coerce.number().optional().default(0),
      days: z.coerce.number().optional().default(0),
    }),
  );

  const { months, weeks, days } = query;
  let { years } = query;

  if (years + months + weeks + days === 0) {
    years = 1;
  }

  // Calculate the current date and the end of the desired offset
  const currentDate = new Date();
  const futureDate = new Date();
  futureDate.setFullYear(currentDate.getFullYear() + years);
  futureDate.setMonth(currentDate.getMonth() + months);
  futureDate.setDate(currentDate.getDate() + days + 7 * weeks);

  // Fetch events that fall within the date range and sort by startTime
  return event.context.prisma.event.findMany({
    where: {
      unixStartTime: {
        gte: dateToUnix(currentDate), // Greater than or equal to today
        lte: dateToUnix(futureDate), // Less than or equal to a year from now
      },
    },
    orderBy: {
      unixStartTime: "asc", // Sorting by startTime in ascending order
    },
  });
});

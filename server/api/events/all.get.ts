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
      past: z
        .enum(["false", "true"])
        .optional()
        .transform(val => val === "true"),
      all: z
        .enum(["false", "true"])
        .optional()
        .transform(val => val === "true"),
    }),
  );

  const { months, weeks, days, past, all } = query;
  let { years } = query;

  if (years + months + weeks + days === 0) {
    years = 1;
  }

  if (all) {
    return event.context.prisma.event.findMany();
  }

  // Calculate the current date and the end of the desired offset
  const currentDate = new Date();
  const futureDate = new Date();
  futureDate.setFullYear(currentDate.getFullYear() + years);
  futureDate.setMonth(currentDate.getMonth() + months);
  futureDate.setDate(currentDate.getDate() + days + 7 * weeks);

  if (past) {
    const pastDate = new Date();
    pastDate.setFullYear(currentDate.getFullYear() - years);
    pastDate.setMonth(currentDate.getMonth() - months);
    pastDate.setDate(currentDate.getDate() - days - 7 * weeks);

    return event.context.prisma.event.findMany({
      where: {
        unixStartTime: {
          lte: dateToUnix(currentDate),
          gte: dateToUnix(pastDate),
        },
      },
      orderBy: {
        unixStartTime: "desc",
      },
    });
  }
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

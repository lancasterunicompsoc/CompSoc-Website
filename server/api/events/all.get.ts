import { dateToUnix } from "~/utils/time";
interface OffsetData {
  years?: string;
  months?: string;
  weeks?: string;
  days?: string;
}

export default defineEventHandler(event => {
  const offsetData = getQuery<OffsetData>(event);
  let years = parseInt(offsetData.years ?? "0");
  const months = parseInt(offsetData.months ?? "0");
  const weeks = parseInt(offsetData.weeks ?? "0");
  const days = parseInt(offsetData.days ?? "0");
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

import { createEvents } from "ics";
import { icsTime } from "~/utils/time";

export default defineEventHandler(async event => {
  const allEvents = await event.context.prisma.event.findMany({
    orderBy: {
      unixStartTime: "asc", // Sorting by startTime in ascending order
    },
  });
  const objIcs = allEvents.map(e => ({
    start: icsTime(e.unixStartTime),
    end: icsTime(e.unixEndTime),
    title: e.name,
    description: e.summary,
    location: e.location,
    url: `https://compsoc.io/events/${e.id}`,
    categories: [e.difficulty],
    status: "CONFIRMED" as const,
    busyStatus: "BUSY" as const,
    organizer: { name: e.organizer },
  }));

  const { error, value } = createEvents(objIcs);
  if (error != null) {
    throw error;
  }
  return value!.replaceAll(";CN=", ":");
});

import { createEvents } from "ics";
import { icsTime } from "~/utils/time";

export default defineEventHandler(async event => {
  const allEvents = await event.context.prisma.event.findMany({
    orderBy: {
      unixStartTime: "asc", // Sorting by startTime in ascending order
    },
  });
  const objIcs = [];
  for (const e of allEvents) {
    objIcs.push({
      start: icsTime(e.unixStartTime),
      end: icsTime(e.unixEndTime),
      title: e.name,
      description: e.summary,
      location: e.location,
      url: `https://compsoc.io/events/${e.id}`,
      categories: [e.difficulty],
      status: "CONFIRMED",
      busyStatus: "BUSY",
      organizer: { name: e.organizer },
    });
  }
  let { error, value } = createEvents(objIcs);
  if (error != null) {
    throw error;
  }
  return value?.replaceAll(";CN=", ":");
});

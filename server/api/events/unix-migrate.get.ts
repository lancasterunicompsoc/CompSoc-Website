import { dateToUnix } from "~/utils/time";
import { EventDifficulty } from "~/components/events/utils";

interface Event {
  id: number;
  name: string;
  location: string;
  summary: string;
  description: string;
  slides: string;
  image: string;
  organizer: string;
  startTime: string;
  endTime: string;
  difficulty: EventDifficulty;
}

export default defineEventHandler(async event => {
  if (event.context.auth?.decoded?.role !== "ADMIN") {
    throw new Error("you do not belong here");
  }
  const allEvents = await event.context.prisma.event.findMany();
  const out = [];
  for (const e of allEvents) {
    if (e.startTime == null) {
      continue;
    }
    out.push(
      event.context.prisma.event.update({
        where: {
          id: e.id,
        },
        data: {
          unixStartTime: dateToUnix(new Date(e.startTime)),
          // @ts-ignore
          unixEndTime: dateToUnix(new Date(e.endTime)),
        },
      }),
    );
  }
  await Promise.all(out);
  return { ok: true };
});

import { dateToUnix } from "~/utils/time";

interface Event {
  id: number;
  name: string;
  location: string;
  summary: string;
  description: string;
  slides: string;
  image: string;
  organizer: string;
  startTime: Date;
  endTime: Date;
  difficulty: EventDifficulty;
}

enum EventDifficulty {
  EASY = "EASY",
  HARD = "HARD",
  SOCIAL = "SOCIAL",
}

export default defineEventHandler(async event => {
  if (event.context.auth?.decoded?.role !== "ADMIN") {
    throw new Error("you do not belong here");
  }
  const all_events = (await event.context.prisma.event.findMany()) as Event[];
  const out = [];
  for (const e of all_events) {
    out.push(
      event.context.prisma.event.update({
        where: {
          id: e.id,
        },
        data: {
          unixStartTime: dateToUnix(e.startTime),
          unixEndTime: dateToUnix(e.endTime),
        },
      }),
    );
  }
  await Promise.all(out);
  return { ok: true };
});

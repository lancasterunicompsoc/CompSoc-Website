import { dateToUnix, unixToDate, unixAnySpan } from "~/utils/time";

export default defineEventHandler(async event => {
  const config = useRuntimeConfig();
  if (event.headers.get("authorization") !== config.cron_secret) {
    return { ok: false };
  }

  // Calculate the current date and the end of the desired offset
  const currentDate = new Date();
  const futureDate = unixToDate(dateToUnix(new Date()) + 604800); // get the next 7 days of events
  const events = await event.context.prisma.event.findMany({
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
  const hr =
    "\n~~                                                                                                                         ~~";
  let content = "@everyone\n# Here's whats coming up this week:\n";
  const eventStrings = [];
  for (const e of events) {
    const location =
      e.mazemapLink === "" ? e.location : `[${e.location}](${e.mazemapLink})`;

    const title = `## [${e.name} - ${e.difficulty}](https://compsoc.io/events/${e.id})`;

    const details = `📅 ${unixAnySpan(
      e.unixStartTime,
      e.unixEndTime,
    )}\n🗺️ ${location}\n🤵 ${e.organizer}`;

    eventStrings.push(`\n${title}\n${details}\n\n${e.summary}\n`);
  }

  content += eventStrings.join(hr);

  content += "​";

  $fetch(
    `https://discord.com/api/webhooks/${config.discord_id}/${config.discord_token}`,
    { method: "POST", body: { content } },
  );
  return { ok: true };
});

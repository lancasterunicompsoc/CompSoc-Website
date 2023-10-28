import { Feed } from "feed";
import { unixToDate, unixAnySpan } from "~/utils/time";

export default defineEventHandler(async event => {
  const allEvents = await event.context.prisma.event.findMany({
    orderBy: {
      unixStartTime: "asc", // Sorting by startTime in ascending order
    },
  });

  const feed = new Feed({
    title: "LUCompSoc Events",
    description: "LUCompSoc events RSS feed.",
    id: "https://compsoc.io/",
    link: "https://compsoc.io/",
    image: "https://compsoc.io/android-chrome-512x512.png",
    favicon: "https://compsoc.io/favicon.ico",
    copyright: `All rights reserved ${new Date().getFullYear()}, LUCompSoc`,
  });

  allEvents.forEach(e => {
    const link = `https://compsoc.io/events/${e.id}`;
    const content = `<h1>${e.name}</h1><b>Time: </b>${unixAnySpan(e.unixStartTime, e.unixEndTime)} <b>Location: </b>${e.location} <b>Organizer: </b>${e.organizer} <b>Difficulty: </b>${e.difficulty}<p>${e.summary}<p>${e.summary}</p><p>${e.description}</p>p<p><a href="${e.slides}">Slides</a> <a href="https://compsoc.io/events/review/${e.id}">Leave a review</a></p>`;
    feed.addItem({
      title: `${e.name} - ${e.difficulty}`,
      id: link,
      link,
      description: e.summary,
      content,
      author: [
        {
          name: e.organizer,
        },
      ],
      date: unixToDate(e.unixStartTime),
      image: e.image ?? "",
    });
  });
  return feed.rss2();
});

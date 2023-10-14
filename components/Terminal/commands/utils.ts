import type { Entry } from "./filesystem";
import { EntryType } from "./filesystem";

import type { EventType } from "~/components/events/utils";

const eventToSlug = (event: EventType) => `${event.id}-${event.name.toLowerCase().split(" ").join("-")}`;

export function eventToFile(event: EventType): Entry {
  const content = [
    `# ${event.name} [${event.difficulty}]`,
    "",
    `${unixAnySpan(event.unixStartTime, event.unixEndTime)}`,
    `Location: ${event.location}`,
    `Organizer: ${event.organizer}`,
    event.slides ? `Slides: ${event.slides}` : null,
    "",
    event.summary,
    "",
    event.description,
    "",
  ];
  return {
    type: EntryType.file,
    name: eventToSlug(event),
    content: content.filter(line => line !== null).join("\n"),
  };
}

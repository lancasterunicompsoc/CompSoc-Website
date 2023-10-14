import type { Entry } from "./filesystem";
import { EntryType } from "./filesystem";

import type { EventType } from "~/components/events/utils";

const eventToSlug = (event: EventType) => `${event.id}-${event.name.toLowerCase().split(" ").join("-")}`;

export function eventToFile(event: EventType): Entry {
  let content = `# ${event.name} [${event.difficulty}]

${unixAnySpan(event.unixStartTime, event.unixEndTime)}
Location: ${event.location}
Organizer: ${event.organizer}
`;
  if (event.slides) {
    content += `${event.slides}\n`;
  }
  content += "\n";
  content += event.summary;
  content += "\n\n";
  content += event.description;
  content += "\n";
  return {
    type: EntryType.file,
    name: eventToSlug(event),
    content,
  };
}

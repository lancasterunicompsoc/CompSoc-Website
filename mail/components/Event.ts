import { unixAnySpan } from "~/utils/time";

import {
  a,
  h3,
  p,
  span,
  div,
  article,
} from "~/mail/components/html";

import Icon from "~/mail/components/icons";

export type MailEventType = {
  id: number;
  unixStartTime: number;
  unixEndTime: number;
  difficulty: "EASY" | "HARD" | "SOCIAL";
  location: string;
  mazemapLink?: string;
  organizer: string;
  name: string;
  summary: string;
};

function Location({
  location,
  mazemapLink,
}: {
  location: string;
  mazemapLink?: string;
}) {
  let text = p(location);
  if (mazemapLink) {
    text = a({
      href: mazemapLink,
      class: ["underline", "text-highlight2Light"],
      children: text,
    });
  }
  return Icon({
    class: "flex",
    name: "location",
    children: text,
  });
}

type Props = {
  event: MailEventType;
};

const InfoLine = ({ event }: Props) =>
  div({
    class: ["flex", "info-line", "items-center", "flex-wrap"],
    children: [
      Icon({
        class: "flex",
        name: "time",
        children: p(unixAnySpan(event.unixStartTime, event.unixEndTime)),
      }),
      Location(event),
      Icon({
        class: "flex",
        name: "speaker",
        children: p(event.organizer),
      }),
      span({
        class: "tag",
        children: event.difficulty,
      }),
    ],
  });

export default ({ event }: Props) => {
  return a({
    href: `https://compsoc.io/events/${event.id}`,
    children: [
      article({
        class: "card",
        children: [
          div([h3(event.name), InfoLine({ event }), p(event.summary)]),
        ],
      }),
    ],
  });
};

import { EventType } from "~/components/events/utils";

export type CardData = {
  title: string;
  body: string;
  image: string;
};

export enum SlideLayout {
  event,
  card,
  bounce,
}

export type SlideType = {
  data: EventType | CardData | string;
  layout: SlideLayout;
  millis: number;
};

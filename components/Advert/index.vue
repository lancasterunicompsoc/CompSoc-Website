<script lang="ts">
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
</script>

<script setup lang="ts">
import { Event as EventType } from "~/components/events/utils";
import Event from "./Event";
import Card, { CardData } from "./Card";
import Bounce from "./Bounce";

const { slide } = defineProps<{ slide: SlideType }>();
</script>

<template>
  <Event
    v-if="slide?.layout === SlideLayout.event"
    :event="slide?.data as EventType"
  />
  <Card
    v-if="slide?.layout === SlideLayout.card"
    :data="slide?.data as CardData"
  />
  <Bounce
    :visible="slide?.layout === SlideLayout.bounce"
    :src="slide?.layout === SlideLayout.bounce ? (slide?.data as string) : ''"
  />
</template>

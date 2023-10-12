<script setup lang="ts">
import type { SlideType, CardData } from "./types";
import { SlideLayout } from "./types";
import { EventType } from "~/components/events/utils";

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

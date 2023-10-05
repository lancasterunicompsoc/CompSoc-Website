<script setup lang="ts">
import type { Event as EventType } from "~/components/events/utils";
import { getEvent, EventDifficulty } from "~/components/events/utils";
import Event from "~/components/events/Event.vue";

const route = useRoute();
const id = route.params.id as unknown as string;

const thisEvent = ref<EventType>({
  id: 0,
  name: "",
  location: "",
  summary: "",
  description: "",
  slides: "",
  organizer: "",
  startTime: "",
  endTime: "",
  difficulty: EventDifficulty.EASY,
});

getEvent(id, (data, err) => {
  if (err || data === null) {
    throw console.error("Failed", err);
  }
  thisEvent.value = data;
});
</script>

<template>
  <main>
    <ClientOnly>
      <Event :event="thisEvent" :is-full-size="true" />
    </ClientOnly>
  </main>
</template>

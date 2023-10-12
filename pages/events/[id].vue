<script setup lang="ts">
import type { Event as EventType } from "~/components/events/utils";
import { getEvent, EventDifficulty } from "~/components/events/utils";
import Event from "~/components/events/Event.vue";

const route = useRoute();
const id = route.params.id as unknown as string;

const thisEvent = ref<EventType | null>(null);

getEvent(id, (data, err) => {
  if (err || data === null) {
    throw console.error("Failed", err);
  }
  thisEvent.value = data;
});
</script>

<template>
  <main v-if="thisEvent">
      <Event :event="thisEvent" :is-full-size="true" />
  </main>
</template>

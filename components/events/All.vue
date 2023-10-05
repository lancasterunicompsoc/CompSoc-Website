<script setup lang="ts">
import { getAllEvents, Event as EventType } from "./utils";
import Event from "~/components/events/Event.vue";

const allEvents = ref<EventType[] | null>(null);
const hasErrored = ref(false);
getAllEvents()
  .then(events => (allEvents.value = events))
  .catch(err => {
    hasErrored.value = true;
    console.error(err);
  });
</script>

<template>
  <div>
    <h2>All Events</h2>
    <div v-if="hasErrored">
      Unfortunately we've had trouble loading events data, please try again
      later
    </div>
    <ul v-if="allEvents">
      <li class="card" v-for="(event, index) in allEvents" :key="index">
        <NuxtLink :to="`/events/${(event).id}`">
          <Event :event="event" :is-full-size="false" />
        </NuxtLink>
      </li>
    </ul>
  </div>
</template>

<style scoped>
h2 {
  font-size: 1.5rem;
  font-weight: 600;
}

ul {
  width: 100%;
}

.card {
  margin: 1em 0;
  padding: 1em 1.5em;
  width: 100%;
  display: block;
  cursor: pointer;
}

.card:hover {
  filter: brightness(1.3);
}

.card:nth-child(2n)> :is(h1, h2, h3, h4, h5, h6) {
  text-align: unset;
}
</style>

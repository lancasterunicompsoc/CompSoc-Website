<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useAuthStore } from "~/stores/auth";
import { getAllEvents, EventType } from "~/components/events/utils";
import Event from "~/components/events/Event.vue";

const { isAdmin } = storeToRefs(useAuthStore());
const router = useRouter();

const allEvents = ref<EventType[] | null>(null);
const hasErrored = ref(false);

const pastFuture = ref<"future" | "past">("future");
watch(
  pastFuture,
  () => {
    getAllEvents({ past: pastFuture.value === "past" })
      .then(events => {
        allEvents.value = events;
      })
      .catch(err => {
        hasErrored.value = true;
        console.error(err);
      });
  },
  { immediate: true },
);
</script>
<template>
  <main class="main-container">
    <a target="_blank" href="/events.ics">iCalendar/ICS Feed</a
    >&NonBreakingSpace;
    <a target="_blank" href="/feed.xml">RSS Feed</a>
    <ClientOnly>
      <div v-if="isAdmin">
        <button
          class="bg-#ddd dark:bg-lightgrey p-4"
          @click="router.push('/events/add')"
        >
          Add Event
        </button>
      </div>
      <div>
        <div class="flex flex-row justify-between items-center">
          <h2>All Events</h2>
          <div>
            <select
              name=""
              id="futurePast"
              class="bg-lightbg dark:bg-darkgrey"
              v-model="pastFuture"
            >
              <option value="future">Future Events</option>
              <option value="past">Past Events</option>
            </select>
          </div>
        </div>
        <div v-if="hasErrored">
          Unfortunately we've had trouble loading events data, please try again
          later
        </div>
        <ul v-if="allEvents">
          <li class="card" v-for="(event, index) in allEvents" :key="index">
            <NuxtLink :to="`/events/${event.id}`">
              <Event :event="event" :is-full-size="false" />
            </NuxtLink>
          </li>
        </ul>
      </div>
    </ClientOnly>
  </main>
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

.card:nth-child(2n) > :is(h1, h2, h3, h4, h5, h6) {
  text-align: unset;
}
</style>

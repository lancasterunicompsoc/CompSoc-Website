<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useAuthStore } from "~/stores/auth";
import Event from "~/components/events/Event.vue";

useHead({
  title: "LUCompSoc Events",
  meta: [
    {
      name: "description",
      content:
        "All past and upcoming events run by Lancaster University Computing Society, LU CompSoc",
    },
  ],
});

const { isAdmin } = storeToRefs(useAuthStore());
const router = useRouter();

const hasErrored = ref(false);

const pastFuture = ref<"future" | "past">("future");
const fetchPast = computed(() => pastFuture.value === "past");

const { data: allEvents } = await useFetch(
  () => `/api/events/all?past=${fetchPast.value}`,
  { watch: [fetchPast] },
);

const confirmAndRunWebhook = async () => {
  // Ask for confirmation
  const confirmed = window.confirm("Are you sure you want to notify everyone in discord?");

  // If user confirms, make the GET request to the webhook
  if (confirmed) {
    try {
      const response = await useFetch(
        "https://event-notification-discord.lucompsoc.workers.dev/",
        {
          headers: {
            'X-CS-Clippy': 'true'
          }
        }
      );
      console.log("Webhook executed successfully:", response);
    } catch (error) {
      console.error("Error executing webhook:", error);
    }
  }
};
</script>
<template>
  <main class="main-container">
    <div flex ml-auto justify-end>
      <a target="_blank" href="/events.ics" class="btn text-sm bg-highlight2Light dark:bg-highlight2Light">iCalendar/ICS
        Feed</a>
      <a target="_blank" href="/feed.xml" class="btn text-sm bg-highlight2Light dark:bg-highlight2Light">RSS Feed</a>
    </div>
    <div v-if="isAdmin">
      <button class="bg-#ddd dark:bg-lightgrey p-4" @click="router.push('/events/add')">
        Add Event
      </button>
      <button class="bg-#ddd dark:bg-lightgrey p-4" @click="confirmAndRunWebhook()">
        Push Discord Notification
      </button>
    </div>
    <div>
      <div class="flex flex-row justify-between items-center">
        <h2>All Events</h2>
        <div>
          <span hidden id="filterLabel">Filters:</span>
          <select aria-labelledby="filterLabel" name="" id="futurePast" class="bg-lightbg dark:bg-darkgrey"
            v-model="pastFuture">
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

.card:nth-child(2n)> :is(h1, h2, h3, h4, h5, h6) {
  text-align: unset;
}
</style>

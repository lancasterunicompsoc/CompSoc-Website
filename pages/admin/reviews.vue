<script setup lang="ts">
import { formatTimeAgo } from "@vueuse/core";
import { useAuthStore } from "~/stores/auth";
import { unixToDate } from "~/utils/time";

definePageMeta({
  middleware: ["auth-admin"],
});

const filterByEvent = ref<string>("all");
const eventId = ref(0);

watch(filterByEvent, () => {
  if (filterByEvent.value === "all") {
    eventId.value = 0;
    return;
  }
  eventId.value = Number(filterByEvent.value);
});

const authStore = useAuthStore();
const {
  pending: reviewsPending,
  data: reviewsData,
  status: reviewsStatus,
  refresh: reviewsRefresh,
} = await useFetch(() => `/api/admin/reviews?eventId=${eventId.value}`, {
  headers: { Bearer: authStore.jwt as unknown as string },
});

const {
  pending: eventsPending,
  data: eventsData,
  status: eventsStatus,
  refresh: eventsRefresh,
} = useFetch("/api/events/all?all=true");

const formatDate = (unixdate: number) => formatTimeAgo(unixToDate(unixdate));
</script>

<template>
  <div class="m-8">
    <h1 class="text-3xl">Reviews</h1>
    <div>
      <h2 class="text-2xl font-bold">Filter</h2>
      <div v-if="eventsData">
        <label for="events" class="py-4 pr-4">Event:</label>
        <select
          v-model="filterByEvent"
          id="events"
          class="bg-lightbg dark:bg-darkgrey"
        >
          <!-- TODO: sync this to the url, so that we can share results for this directly via link-->
          <option value="all">All</option>
          <option :value="event.id" v-for="event in eventsData" :key="event.id">
            {{ event.id }} - {{ event.name }}
          </option>
        </select>
      </div>
    </div>
    <div v-if="reviewsPending === true">Loading reviews...</div>
    <div v-if="reviewsStatus === 'success' && reviewsData" class="p-8 pl-0">
      <button @click="reviewsRefresh" class="btn">Refresh</button>
      <table class="mt-8 dark:bg-#222">
        <thead class="dark:bg-#222">
          <th class="dark:bg-#222">Event</th>
          <th class="dark:bg-#222">User</th>
          <th class="dark:bg-#222">Rating</th>
          <th class="dark:bg-#222">Comment</th>
          <th class="dark:bg-#222">Timestamp</th>
        </thead>
        <tbody>
          <tr v-for="review in reviewsData" :key="review.id">
            <td class="dark:bg-#222 text-blue underline">
              <NuxtLink :to="`/events/${review.eventId}`">
                {{ review.eventId }}
              </NuxtLink>
            </td>
            <td class="dark:bg-#222">
              {{ review.userId }}
            </td>
            <td class="dark:bg-#222 flex">
              <span
                class="i-carbon-star-filled text-yellow-500"
                v-for="s in review.rating"
                :key="s"
              ></span>
            </td>
            <td class="dark:bg-#222">
              {{ review.comment }}
            </td>
            <td class="dark:bg-#222">
              {{ formatDate(review.timestamp) }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<style scoped>
table,
th,
td {
  padding: 1em;
  border: 1px solid #111;
  background-color: rgb(221, 221, 221);
}
</style>

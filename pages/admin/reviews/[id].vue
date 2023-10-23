<script setup lang="ts">
import { formatTimeAgo } from "@vueuse/core";
import { useAuthStore } from "~/stores/auth";
import { unixToDate } from "~/utils/time";

definePageMeta({
  middleware: ["auth-admin"],
});

const route = useRoute();
const router = useRouter();
if (
  typeof route.params.id !== "string" ||
  Number.isNaN(Number(route.params.id))
) {
  router.replace("/admin/reviews/0"); // 0 is our magic number for all events
}
const id = Number(route.params.id);

const authStore = useAuthStore();
const {
  pending: reviewsPending,
  data: allReviews,
  status: reviewsStatus,
  refresh: reviewsRefresh,
} = useFetch(`/api/admin/reviews?eventId=${id}`, {
  headers: { Bearer: authStore.jwt as unknown as string },
});
const reviewsData = ref(new Array(allReviews.value));

const {
  pending: eventsPending,
  data: eventsData,
  status: eventsStatus,
  refresh: eventsRefresh,
} = useFetch("/api/events/all?all=true");

const formatDate = (unixdate: number) => formatTimeAgo(unixToDate(unixdate));

const newEventId = ref(id);
const showVerified = ref(true);

const handleEventFilter = () => {
  nextTick(() => {
    router.push(`/admin/reviews/${newEventId.value}`);
  });
};

watch(showVerified, () => {
  if (showVerified.value) {
    reviewsData.value = allReviews.value;
  } else {
    reviewsData.value = allReviews.value?.filter(review => !review.user.suVerified) ?? [];
  }
});
</script>

<template>
  <div class="m-8">
    <h1 class="text-3xl">
      Reviews
    </h1>
    <div>
      <h2 class="text-2xl font-bold">
        Filter
      </h2>
      <div v-if="eventsData">
        <div>
          <label for="events" class="py-4 pr-4">Event:</label>
          <select
            id="events"
            v-model="newEventId"
            class="bg-lightbg dark:bg-darkgrey"
            @change="handleEventFilter"
          >
            <option :value="0">
              All
            </option>
            <option
              v-for="event in eventsData"
              :key="event.id"
              :value="event.id"
            >
              {{ event.id }} - {{ event.name }}
            </option>
          </select>
        </div>
        <div>
          <label for="show-verified" class="py-4 pr-4">
            Show verified users:
          </label>
          <input id="show-verified" v-model="showVerified" type="checkbox" name="show-verified" />
        </div>
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
              {{ review.user.username }}
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

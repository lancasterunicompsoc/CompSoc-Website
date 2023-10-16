<script setup lang="ts">
import { useAuthStore } from "~/stores/auth";

definePageMeta({
  middleware: ["auth-admin"],
});

const authStore = useAuthStore();
const { pending, data, status, refresh } = useFetch("/api/admin/reviews", {
  headers: { Bearer: authStore.jwt as unknown as string },
});

const eventsUrl = (eventId: number) => `/events/${eventId}`;
</script>

<template>
  <div class="m-8">
    <h1 class="text-3xl">Reviews</h1>
    <div v-if="pending === true">Loading reviews...</div>
    <div v-if="status === 'success' && data">
      <button @click="() => refresh" class="btn">Refresh</button>
      <table class="mt-8 dark:bg-#222">
        <thead class="dark:bg-#222">
          <th class="dark:bg-#222">Event</th>
          <th class="dark:bg-#222">User</th>
          <th class="dark:bg-#222">Rating</th>
          <th class="dark:bg-#222">Comment</th>
        </thead>
        <tbody>
          <tr v-for="review in data" :key="review.id">
            <td class="dark:bg-#222 text-blue underline">
              <NuxtLink :to="eventsUrl(review.eventId)">
                {{ review.eventId }}
              </NuxtLink>
            </td>
            <td class="dark:bg-#222">
              {{ review.userId }}
            </td>
            <td class="dark:bg-#222">
              {{ review.rating }}
            </td>
            <td class="dark:bg-#222">
              {{ review.comment }}
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

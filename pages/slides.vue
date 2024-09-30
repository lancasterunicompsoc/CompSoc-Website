<script setup lang="ts">
import superjson from "superjson";
import { useAuthStore } from "~/stores/auth";

const authStore = useAuthStore();
const slidesData = await useFetch("/api/slides/", {
  headers: { Bearer: authStore.jwt as unknown as string },
  transform: value => {
    return superjson.parse(value as unknown as string);
  },
});

// TODO: deserialize the data from unixtime
const { data, status } = slidesData;
</script>

<template>
  <div class="flex flex-col p-8 items-center">
    <div v-if="status === 'pending'">Loading...</div>
    <div v-if="status === 'success'">
      <ul v-for="slides in data" :key="slides.id">
        <li>
          <Slides :slides="slides" />
        </li>
      </ul>
    </div>
  </div>
</template>

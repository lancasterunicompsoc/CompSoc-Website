<script setup lang="ts">
import superjson from "superjson";
import { type SlidesType } from "~/components/slides/Slides.vue";

const route = useRoute();
const slidesId = route.params.id as unknown as string;

const slidesData = await useFetch(() => `/api/slides/${slidesId}`, {
  transform: value => {
    return superjson.parse(value as unknown as string) as SlidesType;
  },
});

const { data, status } = slidesData;
</script>

<template>
  <div class="flex flex-col p-8 items-center">
    <div v-if="status === 'pending'">Loading...</div>
    <div v-else-if="status === 'success'">
      <Slides v-if="data !== null" :slides="data" :isFullSize="true" />
      <p v-else>Something went wrong, please check back later</p>
    </div>
  </div>
</template>

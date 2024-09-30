<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useAuthStore } from "~/stores/auth";

const { isAdmin, jwt, isLoggedIn } = storeToRefs(useAuthStore());

export type SlidesType = {
  id: string;
  link: string;
  name: string;
  talkOrganizerName: string;
  createdAt: Date;
  updatedAt: Date;
  creatorId: string;
};

const props = defineProps<{ slides: SlidesType }>();
</script>

<template>
  <div class="bg-#ddd dark:bg-lightgrey p-4 my-2 w-90vw md:w-70vw lg:w-50vw">
    <a :href="slides.link" target="_blank" class="hover:underline">
      <div flex flex-row items-start justify-between gap-2>
        <div>
          <h3 class="text-2xl font-bold">
            {{ props.slides.name }}
          </h3>
          <p>{{ props.slides.talkOrganizerName }}</p>
        </div>
        <span>{{ convertToLocalDate(props.slides.createdAt) }}</span>
      </div>
    </a>
    <!-- <div v-if="isAdmin" class="my-4">
      <EventsIconEdit class="cursor-pointer" />
    </div> -->
  </div>
</template>

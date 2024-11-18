<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useAuthStore } from "~/stores/auth";

const authStore = useAuthStore();
const { isAdmin, jwt } = storeToRefs(authStore);

const deleteSlides = () => {
  $fetch<{ ok: boolean }>("/api/slides", {
    method: "DELETE",
    headers: {
      Bearer: jwt.value as string,
    },
    body: { id: props.slides.id },
  })
    .then(response => {
      if (!response.ok) {
        console.error("Failed to delete event.");
      }
      // forces refresh of data
      window.location.reload();
    })
    .catch(error => {
      console.error("There was a problem with the fetch operation:", error);
    });
};

export type SlidesType = {
  id: string;
  link: string;
  name: string;
  speaker: string;
  createdAt: Date;
  updatedAt: Date;
  creatorId: string;
};

const props = defineProps<{ slides: SlidesType }>();
</script>

<template>
  <div class="bg-box p-4 my-2 w-90vw md:w-70vw lg:w-50vw hover:bg-box-hover">
    <a :href="slides.link" target="_blank">
      <div flex flex-row items-start justify-between gap-2>
        <div>
          <h3 class="text-2xl font-bold">
            {{ props.slides.name }}
          </h3>
          <p>{{ props.slides.speaker }}</p>
        </div>
        <span>{{ convertToLocalDate(props.slides.createdAt) }}</span>
      </div>
    </a>
    <div v-if="isAdmin">
      <EventsIconDelete class="cursor-pointer" @click="deleteSlides" />
    </div>
  </div>
</template>

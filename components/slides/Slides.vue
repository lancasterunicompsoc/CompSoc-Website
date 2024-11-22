<script setup lang="ts">
import ExternalLink from "~/components/SVG/ExternalLink.vue";
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

const props = defineProps<{ slides: SlidesType; isFullSize: boolean }>();
const link = computed(() => {
  if (props.isFullSize) {
    return props.slides.link;
  }
  return `/slides/${encodeURIComponent(props.slides.id)}`;
});
</script>

<template>
  <div
    class="bg-box p-8 my-2 w-90vw hover:bg-box-hover"
    :class="{ 'md:70vw': !isFullSize, 'lg:w-50vw': !isFullSize }"
  >
    <a :href="link">
      <div flex flex-row items-start justify-between gap-2>
        <div>
          <h3
            class="font-bold flex flex-row pb-4"
            :class="{ 'text-4xl': isFullSize, 'text-2xl': !isFullSize }"
          >
            {{ props.slides.name }}
            <span v-if="isFullSize" class="flex items-center">
              &nbsp;
              <ExternalLink size="0.8em" />
            </span>
          </h3>
          <p>{{ props.slides.speaker }}</p>
        </div>
        <span>{{ convertToLocalDate(props.slides.createdAt) }}</span>
      </div>
    </a>
    <div v-if="isAdmin">
      <EventsIconDelete class="cursor-pointer" @click="deleteSlides" />
    </div>
    <div v-if="isFullSize">
      <h3 class="text-lg font-bold mt-8">Preview:</h3>
      <iframe
        class="h-90vh pt-8"
        id="slidespreview"
        width="100%"
        :src="props.slides.link"
      >
      </iframe>
    </div>
  </div>
</template>

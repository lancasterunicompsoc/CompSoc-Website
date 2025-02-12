<script setup lang="ts">
import { storeToRefs } from "pinia";
import IconDelete from "./IconDelete.vue";
import IconEdit from "./IconEdit.vue";
import IconLocation from "./IconLocation.vue";
import IconSpeaker from "./IconSpeaker.vue";
import IconTime from "./IconTime.vue";
import IconReview from "./IconReview.vue";
import { deletePost } from "~/components/events/utils";
import type { EventType } from "~/components/events/utils";
import { unixAnySpan } from "~/utils/time";
import { useAuthStore } from "~/stores/auth";

const { isAdmin, jwt, isLoggedIn } = storeToRefs(useAuthStore());

const router = useRouter();
const props = defineProps<{ event: EventType; isFullSize: boolean }>();

function deleteEvent(id: number) {
  if (!isLoggedIn.value) {
    return;
  }
  const confirmed = window.confirm(
    "Are you sure you want to delete this event?",
  );
  if (confirmed) {
    deletePost(id, jwt.value as unknown as string);
    router.back();
  } else {
    console.log("Event not deleted.");
  }
}

function reviewEvent(id: number) {
  const reviewUrl = `/events/review/${id}`;
  navigateTo(reviewUrl);
}
</script>

<template>
  <div
    :class="{ wrapper: isFullSize, 'bg-box': isFullSize, 'text-white': true }"
  >
    <h3>{{ event.name }}</h3>
    <div class="flex info-line items-center flex-wrap">
      <figure class="flex">
        <figcaption>
          <IconTime />
        </figcaption>
        <p>
          {{ unixAnySpan(event.unixStartTime, event.unixEndTime) }}
        </p>
      </figure>
      <figure class="flex">
        <figcaption>
          <IconLocation />
        </figcaption>
        <template v-if="event.mazemapLink">
          <a :href="event.mazemapLink" class="underline text-highlight2Light">
            <p>{{ event.location }}</p>
          </a>
        </template>
        <template v-else>
          <p>{{ event.location }}</p>
        </template>
      </figure>
      <figure class="flex">
        <figcaption>
          <IconSpeaker />
        </figcaption>
        <p>{{ event.organizer }}</p>
      </figure>
      <span class="tag sm:ml-auto">{{ event.difficulty }}</span>
    </div>
    <p :class="{ compressedSummary: !isFullSize }">{{ event.summary }}</p>
    <template v-if="isFullSize">
      <p>{{ event.description }}</p>
      <a :href="event.slides" v-if="event.slides">View Slides</a>
      <div class="flex">
        <template v-if="isLoggedIn">
          <button
            v-if="isAdmin"
            @click="router.push(`/events/update/${props.event.id}`)"
          >
            <IconEdit />
          </button>
          <button v-if="isAdmin" @click="deleteEvent(event.id)">
            <IconDelete />
          </button>
        </template>
        <NuxtLink :to="`/events/review/${event.id}`">
          <IconReview />
        </NuxtLink>
      </div>
    </template>
  </div>
</template>

<style scoped>
h2 {
  font-size: 1.5rem;
  font-weight: 600;
}

h3 {
  font-size: 1.3rem;
  font-weight: 600;
}

ul {
  width: 100%;
}

.info-line p {
  margin-right: 1rem;
}

.tag {
  background-color: var(--highlight2Light);
  color: white;
  padding: 0.25rem 0.5rem;
  height: max-content;
  width: 8ch;
  text-align: center;
}

.compressedSummary {
  display: block;
  display: -webkit-box;
  width: 100%;
  max-height: calc(1rem * 3 * 1.4);
  font-size: 1rem;
  line-height: 1.3;
  overflow: hidden;
  text-overflow: ellipsis;
  margin-bottom: 0.7rem;
}

.wrapper {
  margin: 1em 0;
  padding: 1em 1.5em;
}
</style>

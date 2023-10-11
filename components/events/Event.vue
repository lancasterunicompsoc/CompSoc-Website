<script setup lang="ts">
import IconDelete from "./IconDelete.vue";
import IconEdit from "./IconEdit.vue";
import IconLocation from "./IconLocation.vue";
import IconSpeaker from "./IconSpeaker.vue";
import IconTime from "./IconTime.vue";
import { deletePost } from "./utils";
import type { Event } from "./utils";
import { unixAnySpan } from "~/utils/time";
import { useAuthStore } from "~/stores/auth";

const { isAdmin, jwt, isLoggedIn } = useAuthStore();

const router = useRouter();
const p = defineProps<{ event: Event; isFullSize: boolean }>();

function deleteEvent(id: number) {
  if (!isLoggedIn) {
    return;
  }
  const confirmed = window.confirm(
    "Are you sure you want to delete this event?",
  );
  if (confirmed) {
    deletePost(id, jwt);
    router.back();
  } else {
    console.log("Event not deleted.");
  }
}

function editEvent(id: number) {
  console.log(id);
}
</script>

<template>
  <div :class="{ wrapper: isFullSize }" class="bg-#ddd dark:bg-lightgrey">
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
        <p>{{ event.location }}</p>
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
      <div class="flex" v-if="isAdmin">
        <button @click="editEvent(event.id)">
          <IconEdit />
        </button>
        <button @click="deleteEvent(event.id)">
          <IconDelete />
        </button>
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

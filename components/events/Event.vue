<script setup lang="ts">
import IconDelete from "./IconDelete.vue";
import IconEdit from "./IconEdit.vue";
import IconLocation from "./IconLocation.vue";
import IconSpeaker from "./IconSpeaker.vue";
import IconTime from "./IconTime.vue";
import { deletePost } from "./utils";
import type { Event } from "./utils";
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
  <h3>{{ event.name }}</h3>
  <div class="flex info-line items-center flex-wrap">
    <figure class="flex">
      <figcaption>
        <IconTime />
      </figcaption>
      <p>
        {{
          new Date(event.startTime).toLocaleString("en-GB", {
            weekday: "long",
            day: "numeric",
            month: "long",
            hour: "numeric",
            minute: "numeric",
            hour12: false,
          })
        }}
        to
        {{
          new Date(event.endTime).toLocaleString("en-GB", {
            hour: "numeric",
            minute: "numeric",
            hour12: false,
          })
        }}
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
  <p>{{ event.summary }}</p>
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

.card {
  margin: 0.5rem 0;
  padding: 0.5rem;
  width: 100%;
  display: block;
  cursor: pointer;
}

.card:hover {
  filter: brightness(1.3);
}

.info-line p {
  margin-right: 1rem;
}

.card:nth-child(2n) > :is(h1, h2, h3, h4, h5, h6) {
  text-align: unset;
}

.tag {
  background-color: var(--highlight2Light);
  color: white;
  padding: 0.25rem 0.5rem;
  height: max-content;
}
</style>

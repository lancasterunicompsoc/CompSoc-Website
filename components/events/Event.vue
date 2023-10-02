<script setup lang="ts">
import IconDelete from "./IconDelete.vue";
import IconEdit from "./IconEdit.vue";
import IconLocation from "./IconLocation.vue";
import IconSpeaker from "./IconSpeaker.vue";
import IconTime from "./IconTime.vue";
import { getEvent, deletePost, Event } from "./utils"; const p = defineProps<{ id: string }>();

const thisEvent: Ref<Event> = ref({
  id: 0,
  name: "",
  location: "",
  summary: "",
  description: "",
  slides: "",
  organizer: "",
  startTime: "",
  endTime: "",
});

getEvent(p.id, (data, err) => {
  if (err || data === null) {
    throw console.error("Failed", err);
  }
  thisEvent.value = data;
});

function deleteEvent(id: number) {
  const confirmed = window.confirm(
    "Are you sure you want to delete this event?",
  );
  if (confirmed) {
    deletePost(id);
    window.history.back();
  } else {
    console.log("Event not deleted.");
  }
}

function editEvent(id: number) {
  console.log(id);
}
</script>

<template>
  <h3>{{ thisEvent.name }}</h3>
  <div class="flex info-line">
    <IconTime />
    <p>
      {{
        new Date(thisEvent.startTime).toLocaleString("en-GB", {
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
        new Date(thisEvent.endTime).toLocaleString("en-GB", {
          hour: "numeric",
          minute: "numeric",
          hour12: false,
        })
      }}
    </p>
    <IconLocation />
    <p>{{ thisEvent.location }}</p>
    <IconSpeaker />
    <p>{{ thisEvent.organizer }}</p>
  </div>
  <p>{{ thisEvent.summary }}</p>
  <p>{{ thisEvent.description }}</p>
  <a :href="thisEvent.slides">View Slides</a>
  <div class="flex">
    <button @click="editEvent(thisEvent.id)">
      <IconEdit />
    </button>
    <button @click="deleteEvent(thisEvent.id)">
      <IconDelete />
    </button>
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
</style>

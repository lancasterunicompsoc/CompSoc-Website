<script setup lang="ts">
import { ref, onBeforeMounted } from "vue"
let all_events = ref([]);

onMounted(() => {
fetch("/api/events/all")
  .then(response => {
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.json();
  })
  .then(data => {
    all_events.value= data;
  })
  .catch(error => {
    console.error("There was a problem with the fetch operation:", error);
  });
})
</script>

<template>
  <div>
    <h2>All Events</h2>
    <ul>
      <li v-for="(event, index) in all_events" :key="index">
        <h3>{{ event.name }}</h3>
        <p><strong>Location:</strong> {{ event.location }}</p>
        <p><strong>Summary:</strong> {{ event.summary }}</p>
      </li>
    </ul>
  </div>
</template>

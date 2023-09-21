<script setup lang="ts">
import {all_events, getAllEvents} from "./All"
getAllEvents()
</script>

<template>
  <div>
    <h2>All Events</h2>
    <ul>
      <li v-for="(event, index) in all_events" :key="index">
        <h3>{{ event.name }}</h3>
        <p>{{ new Date(event.start_time).toLocaleDateString()}} in {{event.location}}</p>
        <p>{{event.summary}}</p>
      </li>
    </ul>
  </div>
</template>

<style scoped>
h2 {
  font-size: 1.5rem;
  font-weight: 600;
}

h3{
font-size:1.3rem;
font-weight: 600;
}
</style>

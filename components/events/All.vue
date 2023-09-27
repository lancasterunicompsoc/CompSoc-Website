<script setup lang="ts">
import {all_events, getAllEvents, Event} from "./utils"
getAllEvents()
</script>

<template>
  <div>
    <h2>All Events</h2>
    <ul>
      <li v-for="(event, index) in all_events" :key="index">
        <h3>{{ (event as Event).name }}</h3>
        <p>{{ new Date((event as Event).startTime).toLocaleDateString()}} in {{(event as Event).location}}</p>
        <p>{{(event as Event).summary}}</p>
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

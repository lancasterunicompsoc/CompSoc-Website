<script setup lang="ts">
import IconLocation from "./IconLocation.vue";
import IconSpeaker from "./IconSpeaker.vue";
import IconTime from "./IconTime.vue";
import { allEvents, getAllEvents, Event } from "./utils";

getAllEvents();
//TODO only get events between today and a year in the future, sort from today to future, do all of this based on startDate
</script>

<template>
  <div>
    <h2>All Events</h2>
    <ul>
      <li class="card" v-for="(event, index) in allEvents" :key="index">
        <NuxtLink :to="`/events/${(event as Event).id}`">
          <h3>{{ (event as Event).name }}</h3>
          <div class="flex info-line">
            <IconTime />
            <p>
              {{
                new Date((event as Event).startTime).toLocaleString("en-GB", {
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
                new Date((event as Event).endTime).toLocaleString("en-GB", {
                  hour: "numeric",
                  minute: "numeric",
                  hour12: false,
                })
              }}
            </p>
            <IconLocation />
            <p>{{ (event as Event).location }}</p>
            <IconSpeaker />
            <p>{{ (event as Event).organizer }}</p>
          </div>
          <p>{{ (event as Event).summary }}</p>
        </NuxtLink>
      </li>
    </ul>
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

<script setup lang="ts">
import IconDelete from "./IconDelete.vue"
import IconEdit from "./IconEdit.vue"
import IconLocation from "./IconLocation.vue"
import IconSpeaker from "./IconSpeaker.vue"
import IconTime from "./IconTime.vue"
import { all_events, getAllEvents, Event } from "./utils"

const deleteName = ref("")
const canDelete = ref(false)

getAllEvents()
//TODO only get events between today and a year in the future, sort from today to future, do all of this based on startDate

function deleteEvent(id:number){
  if (canDelete.value){

  }
}

function editEvent(id:number){

}
</script>

<template>
  <div>
    <h2>All Events</h2>
    <ul>
      <li class="card" v-for="(event, index) in all_events" :key="index">
        <h3>{{ (event as Event).name }}</h3>
        <div class="flex info-line">
          <IconTime />
          <p>
            {{
              new Date((event as Event).startTime).toLocaleString('en-GB', {
                weekday: 'long',
                day: 'numeric',
                month: 'long',
                hour: 'numeric',
                minute: 'numeric',
                hour12: false,
              })
            }}
            to
            {{
              new Date((event as Event).endTime).toLocaleString('en-GB', {
                hour: 'numeric',
                minute: 'numeric',
                hour12: false,
              })
            }}
          </p>
          <IconLocation/>
          <p>{{ (event as Event).location }}</p>
          <IconSpeaker />
          <p>{{ (event as Event).organizer }}</p>
        </div>
        <p>{{ (event as Event).summary }}</p>
        <div class="info-more">
          <p>{{ (event as Event).description }}</p>
          <a :href="(event as Event).slides">View Slides</a>
          <div class="flex">
            <button @click="editEvent((event as Event).id)"><IconEdit/></button>
            <button @click="eventDelete = true"><IconDelete/></button>
            <div class="deleteModal" v-if="eventDelete">
              <h2>Danger: delete event '{{(event as Event).name}}'</h2>
              <p>To confirm that you want to do this type the name of this event in the box below.</p>
              <input ref="deleteName" type="text" @input="canDelete = deleteName == (event as Event).name">
              <button :class="{allowAction: canDelete}" class="confirm" @click="deleteEvent((event as Event).id)">Confirm</button>
            </div>
          </div>
        </div>
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

.info-more {
  display: none;
}

.card:hover .info-more {
  display: block;
}

.card:nth-child(2n)> :is(h1, h2, h3, h4, h5, h6) {
  text-align: unset;
}
</style>

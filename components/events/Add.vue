<script setup lang="ts">
import { ref } from "vue";
import { allEvents, Event } from "./utils";
const showModal = ref(false);
let formData = {
  name: "",
  location: "",
  summary: "",
  description: "",
  slides: "",
  organizer: "",
  startTime: "",
  endTime: "",
};

async function addEvent() {
  try {
    const response = await fetch("/api/events/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      const data = await response.json();
      allEvents.value.push({
        id: data.id,
        name: formData.name,
        location: formData.location,
        summary: formData.summary,
        description: formData.description,
        slides: formData.slides,
        organizer: formData.organizer,
        startTime: formData.startTime,
        endTime: formData.endTime,
      });
      formData = {
        name: "",
        location: "",
        summary: "",
        description: "",
        slides: "",
        organizer: "",
        startTime: "",
        endTime: "",
      };
      showModal.value = false;
    } else {
      const errorData = await response.json();
      console.log(`Error adding event: ${errorData.error}`);
    }
  } catch (error) {
    console.error("Error adding event:", error);
    console.log("Error adding event. Please try again later.");
  }
}
</script>
<template>
  <div>
    <button class="bg-#ddd dark:bg-lightgrey" @click="showModal = true">
      Add Event
    </button>
  </div>
  <div v-if="showModal" class="modal-shade"></div>
  <div v-if="showModal" class="modal dark:bg-darkgrey bg-#e7e7e7">
    <div class="flex flex-justify-between flex-items-center">
      <h2>Add Event</h2>
      <button class="close" @click="showModal = false">&times;</button>
    </div>
    <form @submit.prevent="addEvent">
      <div>
        <label for="name">Name:</label>
        <input
          class="bg-#ddd dark:bg-lightgrey"
          type="text"
          id="name"
          v-model="formData.name"
          required
        />
      </div>
      <div>
        <label for="location">Location:</label>
        <input
          class="bg-#ddd dark:bg-lightgrey"
          type="text"
          id="location"
          v-model="formData.location"
          required
        />
      </div>
      <div>
        <label for="summary">Summary:</label>
        <textarea
          class="bg-#ddd dark:bg-lightgrey"
          type="datetime-local"
          id="summary"
          v-model="formData.summary"
          required
        ></textarea>
      </div>
      <div>
        <label for="description">Description:</label>
        <textarea
          class="bg-#ddd dark:bg-lightgrey"
          type="datetime-local"
          id="description"
          v-model="formData.description"
          required
        ></textarea>
      </div>
      <div>
        <label for="slides">Slides:</label>
        <input
          class="bg-#ddd dark:bg-lightgrey"
          type="text"
          id="slides"
          v-model="formData.slides"
          required
        />
      </div>
      <div>
        <label for="organizer">Organizer:</label>
        <input
          class="bg-#ddd dark:bg-lightgrey"
          type="text"
          id="organizer"
          v-model="formData.organizer"
          required
        />
      </div>
      <div>
        <label for="startTime">Start Time:</label>
        <input
          class="bg-#ddd dark:bg-lightgrey"
          type="datetime-local"
          id="startTime"
          v-model="formData.startTime"
          required
        />
      </div>
      <div>
        <label for="endTime">End Time:</label>
        <input
          class="bg-#ddd dark:bg-lightgrey"
          type="datetime-local"
          id="endTime"
          v-model="formData.endTime"
          required
        />
      </div>
      <button
        class="submit bg-#ddd dark:bg-lightgrey float-right"
        type="submit"
      >
        Add Event
      </button>
    </form>
  </div>
</template>
<style scoped>
.modal {
  position: absolute;
  top: 2rem;
  left: 25vw;
  width: 50vw;
  padding: 1rem;
  z-index: 999;
}

.modal div {
  margin: 1rem;
}

.modal-shade {
  position: absolute;
  background-color: #00000099;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
}

input,
textarea {
  color: inherit;
  background-color: inherit;
  border: none;
  outline: none;
  resize: none;
}

textarea {
  height: 10ch;
  width: 100%;
}

button {
  padding: 1rem;
}

label {
  padding-right: 0.5rem;
}

h2 {
  font-size: 1.5rem;
  font-weight: 600;
}

.submit {
  background-color: var(--highlight2Light);
}

.close {
  font-size: 2rem;
  font-weight: 600;
  margin: 0;
  padding: 0;
}
</style>

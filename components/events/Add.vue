<script setup lang="ts">
import { storeToRefs } from "pinia";
import { getAllEvents, EventDifficulty } from "./utils";
import type { EventType } from "./utils";
import { useAuthStore } from "~/stores/auth";

const showModal = ref(false);

const { jwt, isLoggedIn } = storeToRefs(useAuthStore());

const inputStartTime = ref("");
const inputEndTime = ref("");

const formData = ref<Omit<EventType, "id">>({
  name: "",
  location: "",
  summary: "",
  description: "",
  slides: "",
  image: "",
  organizer: "",
  unixStartTime: 0,
  unixEndTime: 0,
  difficulty: EventDifficulty.EASY, // Add the difficulty field to formData
});

const resetFormData = () => {
  formData.value = {
    name: "",
    location: "",
    summary: "",
    description: "",
    slides: "",
    image: "",
    organizer: "",
    unixStartTime: 0,
    unixEndTime: 0,
    difficulty: EventDifficulty.EASY,
  };
};

async function addEvent() {
  if (!isLoggedIn.value) {
    return;
  }
  try {
    formData.value.unixStartTime = inputToUnix(inputStartTime.value);
    formData.value.unixEndTime = inputToUnix(inputEndTime.value);
    console.log(formData.value.unixStartTime);

    const response = await fetch("/api/events/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Bearer: jwt.value as string,
      },
      body: JSON.stringify(formData.value),
    });

    if (response.ok) {
      const data = await response.json();
      console.log(data);
      getAllEvents({});
      resetFormData();
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
        <label for="image">Image:</label>
        <input
          class="bg-#ddd dark:bg-lightgrey"
          type="text"
          id="image"
          v-model="formData.image"
        />
      </div>
      <div>
        <label for="slides">Slides:</label>
        <input
          class="bg-#ddd dark:bg-lightgrey"
          type="text"
          id="slides"
          v-model="formData.slides"
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
      <span
        >All times should be entered in the time that they will run. Do not
        adujust for time zones.</span
      >
      <div>
        <label for="unixStartTime">Start Time:</label>
        <input
          class="bg-#ddd dark:bg-lightgrey"
          type="datetime-local"
          id="unixStartTime"
          v-model="inputStartTime"
          required
        />
      </div>
      <div>
        <label for="unixEndTime">End Time:</label>
        <input
          class="bg-#ddd dark:bg-lightgrey"
          type="datetime-local"
          id="unixEndTime"
          v-model="inputEndTime"
          required
        />
      </div>
      <div>
        <label>Difficulty:</label>
        <div>
          <input
            type="radio"
            id="easy"
            name="difficulty"
            value="EASY"
            v-model="formData.difficulty"
          />
          <label for="easy">Easy</label>
        </div>
        <div>
          <input
            type="radio"
            id="hard"
            name="difficulty"
            value="HARD"
            v-model="formData.difficulty"
          />
          <label for="hard">Hard</label>
        </div>
        <div>
          <input
            type="radio"
            id="social"
            name="difficulty"
            value="SOCIAL"
            v-model="formData.difficulty"
          />
          <label for="social">Social</label>
        </div>
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

<script setup lang="ts">
import { EventDifficulty } from "./utils";
import type { EventType } from "./utils";

const props = defineProps<
  | {
      isEdit: false;
      formValues?: formWithoutId;
    }
  | { formValues: EventType; isEdit: true }
>();

const emit = defineEmits<{
  eventAdded: [values: formWithoutId];
  eventEdited: [values: EventType];
}>();

type formType = Omit<EventType, "id"> & { id?: string };
type formWithoutId = Omit<EventType, "id">;

const formData = ref<formType>({
  name: props?.formValues?.name ?? "",
  location: props?.formValues?.location ?? "",
  mazemapLink: props?.formValues?.mazemapLink ?? "",
  summary: props?.formValues?.summary ?? "",
  description: props?.formValues?.description ?? "",
  slides: props?.formValues?.slides ?? "",
  image: props?.formValues?.image ?? "",
  organizer: props?.formValues?.organizer ?? "",
  unixStartTime: props?.formValues?.unixStartTime ?? 0,
  unixEndTime: props?.formValues?.unixEndTime ?? 0,
  difficulty: props?.formValues?.difficulty ?? EventDifficulty.EASY, // Add the difficulty field to formData
});

const inputStartTime = ref(convertToLocalDate(unixToDate(formData.value.unixStartTime)));
const inputEndTime = ref(convertToLocalDate(unixToDate(formData.value.unixEndTime)));

function addEvent() {
  formData.value.unixStartTime = inputToUnix(inputStartTime.value);
  formData.value.unixEndTime = inputToUnix(inputEndTime.value);

  if (props.isEdit) {
    const values = { ...formData.value, id: props.formValues.id };
    emit("eventEdited", values);
  } else {
    emit("eventAdded", { ...formData.value });
  }
}
</script>
<template>
  <div class="dark:bg-darkgrey bg-#e7e7e7">
    <div class="flex flex-justify-between flex-items-center">
      <h2 v-if="isEdit">Edit Event</h2>
      <h2 v-else>Add Event</h2>
      <button class="close" @click="$router.go(-1)">&times;</button>
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
        <label for="mazemapLink">Mazemap link:</label>
        <input
          class="bg-#ddd dark:bg-lightgrey"
          type="text"
          id="mazemapLink"
          v-model="formData.mazemapLink"
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
        adjust for time zones.</span
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

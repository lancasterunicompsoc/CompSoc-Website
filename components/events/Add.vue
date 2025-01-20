<script setup lang="ts">
import IconBack from "../SVG/IconBack.vue";
import { EventDifficulty } from "./utils";
import type { EventType } from "./utils";

type formType = Omit<EventType, "id"> & { id?: string };
type formWithoutId = Omit<EventType, "id">;

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

const formData = ref<formType>({
  name: props?.formValues?.name ?? "",
  location: props?.formValues?.location ?? "",
  mazemapLink: props?.formValues?.mazemapLink ?? "",
  summary: props?.formValues?.summary ?? "",
  description: props?.formValues?.description ?? "",
  slides: props?.formValues?.slides ?? "",
  image: props?.formValues?.image ?? "",
  organizer: props?.formValues?.organizer ?? "",
  unixStartTime: props?.formValues?.unixStartTime ?? dateToUnix(new Date()),
  unixEndTime: props?.formValues?.unixEndTime ?? dateToUnix(new Date()),
  difficulty: props?.formValues?.difficulty ?? EventDifficulty.EASY,
});

const inputStartTime = ref(
  convertToLocalDateTime(unixToDate(formData.value.unixStartTime)),
);
const inputEndTime = ref(
  convertToLocalDateTime(unixToDate(formData.value.unixEndTime)),
);

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
  <div class="dark:bg-darkgrey">
    <div class="flex flex-justify-between flex-items-center">
      <button class="close" @click="$router.go(-1)">
        <IconBack />
      </button>
      <h2 v-if="isEdit">Edit Event</h2>
      <h2 v-else>Add Event</h2>
    </div>
    <form @submit.prevent="addEvent">
      <div>
        <label for="name">Name:</label>
        <input
          id="name"
          v-model="formData.name"
          class="bg-#ddd dark:bg-lightgrey"
          type="text"
          required
        />
      </div>
      <div>
        <label for="location">Location:</label>
        <input
          id="location"
          v-model="formData.location"
          class="bg-#ddd dark:bg-lightgrey"
          type="text"
          required
        />
      </div>
      <div>
        <label for="mazemapLink">Mazemap link:</label>
        <input
          id="mazemapLink"
          v-model="formData.mazemapLink"
          class="bg-#ddd dark:bg-lightgrey"
          type="text"
        />
      </div>
      <div>
        <label for="summary">Summary:</label>
        <textarea
          id="summary"
          v-model="formData.summary"
          class="bg-#ddd dark:bg-lightgrey"
          type="datetime-local"
          required
        ></textarea>
      </div>
      <div>
        <label for="description">Description:</label>
        <textarea
          id="description"
          v-model="formData.description"
          class="bg-#ddd dark:bg-lightgrey"
          type="datetime-local"
          required
        ></textarea>
      </div>
      <div>
        <label for="image">Image:</label>
        <input
          id="image"
          v-model="formData.image"
          class="bg-#ddd dark:bg-lightgrey"
          type="text"
        />
      </div>
      <div>
        <label for="slides">Slides:</label>
        <input
          id="slides"
          v-model="formData.slides"
          class="bg-#ddd dark:bg-lightgrey"
          type="text"
        />
      </div>
      <div>
        <label for="organizer">Organizer:</label>
        <input
          id="organizer"
          v-model="formData.organizer"
          class="bg-#ddd dark:bg-lightgrey"
          type="text"
          required
        />
      </div>
      <span>
        All times should be entered in the time that they will run. Do not
        adjust for time zones.
      </span>
      <div>
        <label for="unixStartTime">Start Time:</label>
        <input
          id="unixStartTime"
          v-model="inputStartTime"
          class="bg-#ddd dark:bg-lightgrey"
          type="datetime-local"
          required
        />
      </div>
      <div>
        <label for="unixEndTime">End Time:</label>
        <input
          id="unixEndTime"
          v-model="inputEndTime"
          class="bg-#ddd dark:bg-lightgrey"
          type="datetime-local"
          required
        />
      </div>
      <div>
        <label>Difficulty:</label>
        <div>
          <input
            id="easy"
            v-model="formData.difficulty"
            type="radio"
            name="difficulty"
            value="EASY"
          />
          <label for="easy">Easy</label>
        </div>
        <div>
          <input
            id="hard"
            v-model="formData.difficulty"
            type="radio"
            name="difficulty"
            value="HARD"
          />
          <label for="hard">Hard</label>
        </div>
        <div>
          <input
            id="social"
            v-model="formData.difficulty"
            type="radio"
            name="difficulty"
            value="SOCIAL"
          />
          <label for="social">Social</label>
        </div>
      </div>
      <button
        class="submit bg-#ddd dark:bg-lightgrey float-right"
        type="submit"
      >
        <template v-if="isEdit">Save Changes</template>
        <template v-else>Add Event</template>
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

div {
  margin-block: 0.5rem;
}

.submit {
  background-color: var(--highlight2Light);
}
.submit[disabled] {
  background-color: #222;
}

.close {
  font-size: 2rem;
  font-weight: 600;
  margin: 0;
  padding: 0;
}
</style>

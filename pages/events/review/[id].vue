<script setup lang="ts">
import { storeToRefs } from "pinia";
import Star from "~/components/SVG/Star";
import StarFilled from "~/components/SVG/StarFilled";
import { useAuthStore } from "~/stores/auth";

definePageMeta({
  layout: "review",
});

const { jwt, isLoggedIn } = storeToRefs(useAuthStore());

const route = useRoute();
const eventId = route.params.id as unknown as string;

const score = ref<number>(5);
const ghostScore = ref<number>(0);
const displayScore = ref<number>(0);
const feedbackMessage = ref<string>("");

const submitted = ref<boolean>(false);
const now = useDateFormat(useNow(), "YYYY-MM-DD HH:mm:ss");

function updateDisplayScoreActual() {
  if (score.value < displayScore.value) {
    displayScore.value--;
  } else {
    displayScore.value++;
  }
  if (displayScore.value !== score.value) {
    useTimeoutFn(updateDisplayScore, 75);
  }
}

function updateDisplayScoreGhost() {
  if (ghostScore.value < displayScore.value) {
    displayScore.value--;
  } else {
    displayScore.value++;
  }
  if (displayScore.value !== ghostScore.value) {
    useTimeoutFn(updateDisplayScore, 75);
  }
}

function updateDisplayScore() {
  if (ghostScore.value === 0) {
    updateDisplayScoreActual();
  } else {
    updateDisplayScoreGhost();
  }
}

watch([score, ghostScore], () => {
  useTimeoutFn(updateDisplayScore, 125);
}, { immediate: true });

async function submitReview() {
  console.log("submitting review");
  // await $fetch("/api/events/review", {
  //   method: "POST",
  //   body: {
  //     event: eventId,
  //     score: score.value,
  //     feedback: feedbackMessage.value,
  //   },
  //   headers: { Bearer: jwt.value },
  // })
  //   .catch(console.error);
  submitted.value = true;
}
</script>

<template>
  <main v-if="submitted">
    <div class="column text-center m-auto text-3xl">
      <p v-if="score === 5">
        Glad you enjoyed it!
      </p>
      <p v-else-if="score === 4">
        Perfection next time?
      </p>
      <p v-else-if="score === 3">
        One more chance?
      </p>
      <p v-else-if="score === 2">
        We'll try harder next time.
      </p>
      <p v-else-if="score === 1">
        We're sorry to hear that.
      </p>
      <p class="my-8 text-highlight1Light dark:text-highlight1Dark font-bold">
        Do not leave this page
      </p>
      <p>{{ now }}</p>
    </div>
  </main>
  <main v-else>
    <form @submit.prevent="submitReview">
      <div class="row">
        <button
          v-for="x in [1, 2, 3, 4, 5]"
          :key="x"
          type="button"
          class="star fill-yellow light:stroke-darkgrey"
          @click="
            () => {
              score = x;
            }
          "
          @mouseenter="
            () => {
              ghostScore = x;
            }
          "
          @mouseleave="
            () => {
              ghostScore = 0;
            }
          "
        >
          <StarFilled v-if="displayScore >= x" />
          <Star v-else />
        </button>
      </div>

      <div class="message-wrapper">
        <label for="message">Feedback (optional)</label>
        <textarea
          id="message"
          v-model="feedbackMessage"
          name="message"
          class="grow block px-4 py-2 bg-transparent outline-none border border-highlight1Light dark:border-highlight1Dark"
        ></textarea>
      </div>

      <div class="row">
        <button type="submit" class="btn btn-primary text-5xl p-6">
          Submit
        </button>
      </div>
    </form>
  </main>
</template>

<style scoped>
main {
  display: flex;
}
form {
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1;
}
.star {
  width: 15vw;
}
.message-wrapper {
  width: 75%;
  margin: 1rem;
  display: flex;
  flex-direction: column;
  flex: 1;
}
</style>

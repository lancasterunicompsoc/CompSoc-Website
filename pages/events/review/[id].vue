<script setup lang="ts">
import Star from "~/components/SVG/Star";
import StarFilled from "~/components/SVG/StarFilled";

definePageMeta({
  layout: "review",
});

// TODO: proper animation between states

const score = ref<number>(0);
const ghostScore = ref<number>(0);
const hovered = ref<boolean>(false);
const submitMessage = ref<string>("Submit");

function ghostAway() {
  if (hovered.value) {
    return;
  }
  if (score.value < ghostScore.value) {
    ghostScore.value--;
  } else {
    ghostScore.value++;
  }
  if (ghostScore.value !== score.value) {
    useTimeoutFn(ghostAway, 75);
  }
}
</script>

<template>
  <main>
    <form>
      <input type="hidden" name="score" :value="score" />
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
              hovered = true;
              ghostScore = x;
            }
          "
          @mouseleave="
            () => {
              hovered = false;
              useTimeoutFn(ghostAway, 125);
            }
          "
        >
          <StarFilled v-if="ghostScore > 0 ? ghostScore >= x : score >= x" />
          <Star v-else />
        </button>
      </div>

      <div class="message-wrapper">
        <label for="message">Feedback (optional)</label>
        <textarea
          id="message"
          name="message"
          class="grow block px-4 py-2 bg-transparent outline-none border border-highlight1Light dark:border-highlight1Dark"
        ></textarea>
      </div>

      <div class="row">
        <button type="submit" class="btn btn-primary text-5xl p-6">
          {{ submitMessage }}
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

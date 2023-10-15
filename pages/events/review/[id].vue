<script setup lang="ts">
import Star from "~/components/SVG/Star";
import StarFilled from "~/components/SVG/StarFilled";

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
  <form>
    <input type="hidden" :value="score" />
    <div class="row">
      <button
        v-for="x in [1, 2, 3, 4, 5]"
        :key="x"
        type="button"
        class="star fill-yellow"
        @click="() => { score = x; }"
        @mouseenter="() => { hovered = true; ghostScore = x; }"
        @mouseleave="() => { hovered = false; useTimeoutFn(ghostAway, 125); }
        "
      >
        <StarFilled v-if="ghostScore > 0 ? ghostScore >= x : score >= x" />
        <Star v-else />
      </button>
    </div>

    <button type="submit">
      {{ submitMessage }}
    </button>
  </form>
</template>

<style scoped>
.star {
  width: 15vw;
}
</style>

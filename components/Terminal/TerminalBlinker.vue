<template>
  <svg
    width="20"
    height="20"
    xmlns="http://www.w3.org/2000/svg"
    class="inline m-0"
  >
    <!-- Background -->
    <rect width="20" height="20" fill="black" />

    <!-- Cursor -->
    <rect
      class="cursor"
      :class="{ focussed: focussed }"
      x="2"
      y="2"
      fill="black"
      stroke="red"
    />
  </svg>
</template>

<script setup lang="ts">
defineProps<{ focussed: boolean }>();
</script>

<style scoped>
.cursor {
  stroke: var(--red);
  animation: blink 750ms linear alternate infinite;
  height: calc(1em + 1px);
  width: 1ch;
}

.focussed {
  fill: var(--red);
}

@keyframes blink {
  0% {
    opacity: 0%;
  }
  35% {
    opacity: 0%;
  }
  65% {
    opacity: 100%;
  }
  100% {
    opacity: 100%;
  }
}
</style>

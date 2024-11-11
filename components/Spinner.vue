<script setup>
const props = defineProps({
  isLoading: {
    type: Boolean,
    default: true,
  },
});
</script>

<template>
  <div class="spinner" v-if="isLoading">
    <svg
      class="spinner-svg"
      width="50"
      height="50"
      viewBox="0 0 50 50"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Loading"
    >
      <circle
        class="spinner-circle"
        cx="25"
        cy="25"
        r="20"
        stroke-width="5"
        fill="none"
      />
    </svg>
  </div>
</template>

<style scoped>
.spinner {
  display: inline-flex;
  justify-content: center;
  align-items: center;
}
.spinner-svg {
  animation: spinner-rotate 1s linear infinite;
}
.spinner-circle {
  stroke: #3498db;
  stroke-dasharray: 126; /* Length of the circle's perimeter */
  stroke-dashoffset: 0;
  transform-origin: center;
  animation: spinner-dash 1.5s ease-in-out infinite;
}

@keyframes spinner-rotate {
  100% {
    transform: rotate(360deg);
  }
}

@keyframes spinner-dash {
  0% {
    stroke-dashoffset: 126;
  }
  50% {
    stroke-dashoffset: 63;
    transform: rotate(45deg);
  }
  100% {
    stroke-dashoffset: 126;
    transform: rotate(360deg);
  }
}
</style>

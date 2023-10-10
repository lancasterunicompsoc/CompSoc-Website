<script setup lang="ts">
const { src, visible } = defineProps<{ src: string, visible: boolean }>();
</script>

<template>
  <article :class="`slide ${visible ? 'visible' : ''}`">
    <img :src="src" alt="" />
  </article>
</template>

<style scoped>
.slide {
  width: 100vw;
  height: 100vh;
  position: relative;

  z-index: 100;

  background-color: #000;

  opacity: 0;
}

.slide.visible {
  opacity: 1;
  transition: opacity 250ms linear;
}

img {
  --size: min(25vh, 25vw);

  width: var(--size);
  height: var(--size);

  display: block;
  position: absolute;

  overflow: hidden;

  top: 0;
  left: 0;

  opacity: 0;

  animation: moveX 7.68s linear infinite alternate,
             moveY 4.32s linear infinite alternate;
}

.slide.visible img {
  opacity: 1;
  transition: opacity 250ms 250ms linear;
}

@keyframes moveX {
  0% {
    left: 0;
  }

  100% {
    left: calc(100vw - var(--size));
  }
}

@keyframes moveY {
  0% {
    top: 0;
  }

  100% {
    top: calc(100vh - var(--size));
  }
}
</style>


<script setup lang="ts">
import "xp.css/dist/XP.css";
</script>

<template>
  <div class="title-bar">
    <p class="title-bar-text"><slot /></p>
    <div class="title-bar-controls">
      <button aria-label="Minimize"></button>
      <button aria-label="Restore"></button>
      <button aria-label="Close"></button>
    </div>
  </div>
</template>

<style scoped>
.title-bar {
  height: 1.3125em;
  font-size: 0.8125em;
  font-family: "Pixelated MS Sans Serif";
}
</style>

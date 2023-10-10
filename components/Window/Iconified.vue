<script setup lang="ts">
const { src } = defineProps<{ src: string }>();
</script>

<template>
  <div class="iconified">
    <img :src="src" alt="" />
    <span><slot /></span>
  </div>
</template>


<style scoped>
.iconified {
  display: grid;
  grid-template-columns: 10% auto;
  align-items: center;
  gap: 0.5em;
}

.iconified > * {
  display: block;
}

img {
  height: 80%;
  aspect-ratio: 1 / 1;
  margin-inline: auto;
}
</style>

<style>
.row > .iconified {
  grid-template-columns: 40% auto;
}
</style>


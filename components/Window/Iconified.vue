<script setup lang="ts">
const { src } = defineProps<{ src: string }>();
</script>

<template>
  <div>
    <div class="iconified flex flex-row mr-4 w-max items-center justify-center">
      <img :src="src" alt="" class="mx-4" />
      <span>
        <slot />
      </span>
    </div>
  </div>
</template>

<style scoped>
img {
  height: 1em;
  aspect-ratio: 1 / 1;
  display: inline-block;
}
</style>

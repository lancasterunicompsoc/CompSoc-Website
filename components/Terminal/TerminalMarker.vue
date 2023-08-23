<script setup lang="ts">
defineProps<{ cwd: string }>();
</script>

<template>
  <span class="marker">{{ cwd }}&gt;</span>
</template>

<style scoped>
.marker {
  color: var(--red);
}
</style>

<script setup lang="ts">
import "xp.css/dist/XP.css"
</script>

<template>
  <div class="window">
    <slot />
  </div>
</template>

<style scoped>
@font-face {
  font-family: Tahoma;
  src: url(/fonts/Tahoma.ttf);
}

.window {
  font-size: 0.6875em;
  font-family: 'Tahoma', sans-serif;
}
</style>


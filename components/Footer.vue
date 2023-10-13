<script setup lang="ts">
import Discord from "./SVG/Discord.vue";
import Github from "./SVG/Github.vue";
import Instagram from "./SVG/Instagram.vue";
</script>
<template>
  <footer
    class="bg-#ddd dark:bg-lightgrey p-4 flex m-0 items-center flex-row justify-center"
  >
    <a href="https://discord.gg/compsoc " target="_blank" class="social-icon">
      <Discord />
    </a>
    <a href="https://github.com/LUCompSoc" target="_blank" class="social-icon">
      <Github />
    </a>
    <a
      href="https://www.instagram.com/lucompsoc"
      target="_blank"
      class="social-icon"
    >
      <Instagram />
    </a>
  </footer>
</template>

<style scoped>
.social-icon {
  margin: 0.3rem;
}
</style>

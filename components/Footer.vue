<script setup lang="ts">
import Discord from "./SVG/Discord.vue";
import Github from "./SVG/Github.vue";
import Instagram from "./SVG/Instagram.vue";
import Twitter from "./SVG/Twitter.vue";
import Facebook from "./SVG/Facebook.vue";
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
    <a href="https://twitter.com/lucompsoc" target="_blank" class="social-icon">
      <Twitter />
    </a>
    <a
      href="https://www.facebook.com/lucompsoc"
      target="_blank"
      class="social-icon"
    >
      <Facebook />
    </a>
  </footer>
</template>

<style scoped>
.social-icon {
  margin: 0.3rem;
}
</style>

<script setup lang="ts">
import Discord from "./SVG/Discord.vue";
import Github from "./SVG/Github.vue";
import Instagram from "./SVG/Instagram.vue";
</script>
<template>
  <footer class="p-4 m-0 flex items-center flex-col justify-center text-white">
    <div class="flex m-0 items-center flex-row justify-center">
      <a
        href="https://discord.gg/compsoc"
        target="_blank"
        class="social-icon"
        aria-label="Discord"
      >
        <Discord />
      </a>
      <a
        href="https://github.com/LUCompSoc"
        target="_blank"
        class="social-icon"
        aria-label="Github"
      >
        <Github />
      </a>
      <a
        href="https://www.instagram.com/lucompsoc"
        target="_blank"
        class="social-icon"
        aria-label="Instagram"
      >
        <Instagram />
      </a>
      <a
        href="mailto:info@compsoc.io"
        aria-label="email"
        class="hover:underline"
      >
        info@compsoc.io
      </a>
    </div>
  </footer>
</template>

<style scoped>
.social-icon {
  margin: 0.3rem;
}

footer {
  background-color: rgba(0, 0, 0, 0.2);
  width: 100vw;
}
</style>

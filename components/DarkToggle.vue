<script setup lang="ts">
const color = useColorMode();

useHead({
  meta: [
    {
      id: "theme-color",
      name: "theme-color",
      content: () => (color.value === "dark" ? "#222222" : "#ffffff"),
    },
  ],
  link: [
    {
      rel: "icon",
      href: () =>
        color.value === "dark" ? "/dark-favicon/favicon.ico" : "/favicon.ico",
    },
  ],
});

function toggleDark() {
  color.preference = color.value === "dark" ? "light" : "dark";
}

const isDark = computed(() => color.value === "dark");
</script>

<template>
  <div>
    <Switch
      class="SwitchAppearance"
      aria-label="toggle dark mode"
      :aria-checked="isDark"
      @click="toggleDark"
    >
      <IconSun class="sun" />
      <IconMoon class="moon" />
    </Switch>
  </div>
</template>

<style scoped>
.sun {
  opacity: 1;
}

.moon {
  opacity: 0;
}

.dark .sun {
  opacity: 0;
}

.dark .moon {
  opacity: 1;
}
.dark .SwitchAppearance :deep(.check) {
  transform: translateX(18px);
}
</style>

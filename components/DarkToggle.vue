<script setup lang="ts">
const color = useColorMode({ initialValue: "dark" });

useHead({
  meta: [
    {
      id: "theme-color",
      name: "theme-color",
      content: () => (color.value === "dark" ? "#222222" : "#ffffff"),
    },
  ],
});

function toggleDark() {
  color.value = color.value === "dark" ? "light" : "dark";
}
</script>

<template>
  <Switch
    class="SwitchAppearance"
    aria-label="toggle dark mode"
    @click="toggleDark"
  >
    <IconSun class="sun" />
    <IconMoon class="moon" />
  </Switch>
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

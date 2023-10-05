<template>
  <header
    class="bg-#ddd dark:bg-lightgrey px-8 py-4 flex flex-col sm:flex-row m-0 justify-between items-center"
  >
    <div class="flex items-center justify-between w-full">
      <a href="/">
        <h1 class="font-bold text-2em">
          <Logo />
        </h1>
      </a>
      <div class="cursor-pointer flex transition-all" v-show="isMobile" @click="toggleMenu">
        <span class="i-carbon-menu" v-show="!isMenuOpen"></span>
        <span class="i-carbon-close" v-show="isMenuOpen"></span>
      </div>
    </div>
    <nav
      class="flex flex-col items-center sm:flex-row sm:ml-auto p-4 [&>*]:p-4 transition-colors w-full justify-end"
      v-show="!isMobile || isMenuOpen"
    >
      <a class="hover:bg-darkred" href="/about">About Us</a>
      <a class="hover:bg-darkred" href="/events">Events</a>
      <a class="hover:bg-darkred" href="https://slides.compsoc.io/">Slides</a>
      <Login class="hover:bg-darkred" />
      <DarkToggle />
    </nav>
  </header>
</template>

<script setup lang="ts">
const isMenuOpen = ref(false);
const { width } = useWindowSize();
const isMobile = computed(() => width.value < 640);
const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value;
};
</script>

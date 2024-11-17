<template>
  <header
    class="px-8 py-4 flex flex-col sm:flex-row m-0 justify-between items-center"
  >
    <div class="flex grow-0 items-center justify-between w-full">
      <NuxtLink to="/">
        <h1 class="font-bold text-2em">
          <Logo />
        </h1>
      </NuxtLink>
      <div
        class="cursor-pointer flex transition-all"
        v-show="isMobile"
        @click="toggleMenu"
      >
        <span class="i-carbon-menu" v-show="!isMenuOpen"></span>
        <span class="i-carbon-close" v-show="isMenuOpen"></span>
      </div>
    </div>
    <nav
      class="flex grow flex-col items-center sm:flex-row sm:ml-auto p-4 [&>*]:p-4 transition-colors w-full justify-end"
      v-show="!isMobile || isMenuOpen"
    >
      <NuxtLink class="hover:bg-darkred" to="/about">About Us</NuxtLink>
      <NuxtLink class="hover:bg-darkred" to="/events">Events</NuxtLink>
      <NuxtLink class="hover:bg-darkred" to="/slides">Slides</NuxtLink>
      <a class="hover:bg-darkred" href="https://photos.compsoc.io/">Photos</a>
      <template v-if="authStore.isAdmin">
        <NuxtLink class="hover:bg-darkred" to="/admin/users">Users</NuxtLink>
        <NuxtLink class="hover:bg-darkred" to="/admin/reviews/0"
          >Reviews</NuxtLink
        >
      </template>
    </nav>
  </header>
</template>

<script setup lang="ts">
import { useAuthStore } from "~/stores/auth";
const authStore = useAuthStore();
const isMenuOpen = ref(false);
const { width } = useWindowSize();
const isMobile = computed(() => width.value && width.value < 640);
const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value;
};
</script>

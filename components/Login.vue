<script setup lang="ts">
import { useAuthStore } from "~/stores/auth";

const authStore = useAuthStore();

const config = useRuntimeConfig();
const route = useRoute();
const { loginUrl } = config.public;

const startLogin = () => {
  setLaterRedirect(route.fullPath);
  window.location.href = loginUrl;
};
</script>

<template>
  <ClientOnly>
    <div v-bind="$attrs">
      <a v-if="!authStore.isLoggedIn" class="pointer-cursor" @click="startLogin"
        >Log In</a
      >
      <a v-else href="#" class="pointer-cursor" @click="authStore.logOut"
        >Log Out</a
      >
    </div>
  </ClientOnly>
</template>

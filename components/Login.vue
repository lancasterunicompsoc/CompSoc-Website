<script setup lang="ts">
import { useAuthStore } from "~/stores/auth";

const authStore = useAuthStore();

const config = useRuntimeConfig();
const route = useRoute();
const { login_url: loginUrl } = config.public;

const startLogin = () => {
  setLaterRedirect(route.fullPath);
  window.location.href = loginUrl as string;
};
</script>

<template>
  <div v-bind="$attrs">
    <a
      v-if="!authStore.isLoggedIn"
      class="pointer-cursor"
      :href="loginUrl as string"
      @click="startLogin"
      >Log In</a
    >
    <a v-else href="#" class="pointer-cursor" @click="authStore.logOut"
      >Log Out</a
    >
  </div>
</template>

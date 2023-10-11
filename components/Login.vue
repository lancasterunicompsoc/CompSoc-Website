<script setup lang="ts">
import { useAuthStore } from "~/stores/auth";

const authStore = useAuthStore();
const config = useRuntimeConfig();
const { loginUrl } = config.public;
</script>

<template>
  <ClientOnly>
    <div v-bind="$attrs">
      <a v-if="!authStore.isLoggedIn" class="pointer-cursor" :href="loginUrl">Log In</a>
      <a v-else href="#" class="pointer-cursor" @click="authStore.logOut">Log Out</a>
    </div>
  </ClientOnly>
</template>

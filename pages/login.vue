<script setup lang="ts">
import { useAuthStore } from "~/stores/auth";

const authStore = useAuthStore();

const config = useRuntimeConfig();
const { login_url: loginUrl } = config.public;

if (!authStore.isLoggedIn) {
  window.location.href = loginUrl as string;
}
</script>
<template>
  <NuxtLink to="/">Home</NuxtLink>
</template>

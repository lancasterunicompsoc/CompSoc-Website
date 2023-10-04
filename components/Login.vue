<script setup lang="ts">
import { useAuthStore } from "~/stores/auth";

const { isLoggedIn, logOut } = useAuthStore();
const config = useRuntimeConfig();
const { loginUrl } = config.public;
</script>

<template>
  <ClientOnly>
    <div v-bind="$attrs">
      <a v-if="!isLoggedIn" class="pointer-cursor" :href="loginUrl"> Log In </a>
      <a v-else href="#" class="pointer-cursor" @click="logOut">Log Out</a>
    </div>
  </ClientOnly>
</template>

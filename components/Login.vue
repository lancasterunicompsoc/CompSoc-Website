<script setup lang="ts">
const { isLoggedIn, logOut } = useAuth();
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

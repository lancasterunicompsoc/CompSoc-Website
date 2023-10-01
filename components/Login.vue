<script setup lang="ts">
const { isLoggedIn, logOut } = useAuth();
</script>

<template>
  <ClientOnly>
    <a
      v-if="!isLoggedIn"
      class="pointer-cursor"
      href="https://weblogin.lancs.ac.uk/jwt/compsoctestdev"
    >
      Log In
    </a>
    <a v-else href="#" class="pointer-cursor" @click="logOut">Log Out</a>
  </ClientOnly>
</template>

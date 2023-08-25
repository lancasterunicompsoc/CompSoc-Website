<script setup lang="ts">
const { status, signIn, signOut } = useAuth();

async function toggleAuthStatus() {
  switch (status.value) {
    case "authenticated":
      await signOut();
      break;
    case "unauthenticated":
      await signIn();
  }
}
</script>

<template>
  <a @click="toggleAuthStatus" class="pointer-cursor">{{
    status === "authenticated" ? "Sign out" : "Sign in"
  }}</a>
</template>

<template>
  <div v-if="isLoggedIn">
    <div>I'm protected! Session data: {{ payload }}</div>
    <div>jwt: {{ jwt }}</div>
    <div>isExpired: {{ isExpired }}</div>
    <button class="btn" @click="callAPI">Call API</button>
  </div>
  <div v-else>Currently not logged in</div>
</template>

<script setup lang="ts">
import { useAuthStore } from "~/stores/auth";

const { jwt, payload, isLoggedIn, isExpired } = useAuthStore();

const callAPI = () => {
  $fetch("/api/protected", { headers: { Bearer: jwt as string } });
};
</script>

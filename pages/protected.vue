<template>
  <div v-if="isLoggedIn">
    <div>I'm protected! Session data: {{ payload }}</div>
    <div>jwt: {{ jwt }}</div>
    <div>isExpired: {{ isExpired }}</div>
    <div>isAdmin: {{ isAdmin }}</div>
    <button class="btn" @click="callAPI">Call API</button>
  </div>
  <div v-else>Currently not logged in</div>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useAuthStore } from "~/stores/auth";

const authStore = useAuthStore();
const { jwt, payload, isLoggedIn, isExpired, isAdmin } = storeToRefs(authStore);

const callAPI = () => {
  $fetch("/api/protected", { headers: { Bearer: jwt as unknown as string } });
};
</script>

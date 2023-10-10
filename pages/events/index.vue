<script setup lang="ts">
import All from "~/components/events/All.vue";
import Add from "~/components/events/Add.vue";
import { useAuthStore } from "~/stores/auth";

const { isAdmin } = useAuthStore();
</script>
<template>
  <main class="main-container">
    <ClientOnly>
      <Add v-if="isAdmin" />
      <All />
    </ClientOnly>
  </main>
</template>
<style scoped></style>

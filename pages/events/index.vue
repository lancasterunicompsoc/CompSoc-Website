<script setup lang="ts">
import { storeToRefs } from "pinia";
import All from "~/components/events/All.vue";
import Add from "~/components/events/Add.vue";
import { useAuthStore } from "~/stores/auth";

const { isAdmin } = storeToRefs(useAuthStore());
</script>
<template>
  <main class="main-container">
    <a target="_blank" href="/feed.xml">RSS Feed</a>
    <ClientOnly>
      <Add v-if="isAdmin" />
      <All />
    </ClientOnly>
  </main>
</template>
<style scoped></style>

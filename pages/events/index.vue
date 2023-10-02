<script setup lang="ts">
import All from "~/components/events/All.vue";
import Add from "~/components/events/Add.vue";

const { decoded } = useAuth();
const isAdmin = computed(
  () => decoded.value && decoded.value?.role === "ADMIN",
);

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

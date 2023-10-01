<script setup lang="ts">
import All from "~/components/events/All.vue"
import Add from "~/components/events/Add.vue"
</script>
<template>
  <main class="main-container">
    <ClientOnly>
      <Add />
      <All />
    </ClientOnly>
  </main>
</template>
<style scoped></style>

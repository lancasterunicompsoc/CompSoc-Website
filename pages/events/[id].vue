<script setup lang="ts">
import Event from "~/components/events/Event.vue";

const route = useRoute();
const id = route.params.id as unknown as string;
</script>

<template>
  <main>
    <ClientOnly>
      <Event :id="id" />
    </ClientOnly>
  </main>
</template>

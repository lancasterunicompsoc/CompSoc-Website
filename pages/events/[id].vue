<script setup lang="ts">

import Event from "~/components/events/Event.vue"

const route = useRoute()
let id: string;

if (route.params.id == undefined) {
  throw console.error("Failed to get param.")
} else {
  id = route.params.id as string
}
</script>

<template>
  <main>
    <ClientOnly>
      <Event :id="id" />
    </ClientOnly>
  </main>
</template>

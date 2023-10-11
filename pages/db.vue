<script setup lang="ts">
import { useAuthStore } from "~/stores/auth";

definePageMeta({
  middleware: ["auth-admin"],
});

const { jwt } = useAuthStore();
useFetch("/api/events/unix-migrate", {
    headers: { Bearer: jwt },
  })
</script>

<template>
</template>

<script setup lang="ts">
import { FetchError } from "ofetch";

const error = ref<FetchError>();

function clearError() {
  error.value = undefined;
}

onErrorCaptured(err => {
  error.value = err;
  return false;
});

const route = useRoute();
watch(
  () => route.fullPath,
  () => {
    error.value = undefined;
  },
);
</script>

<template>
  <slot v-if="!error" />
  <slot v-else name="error" :error="error" :clear-error="clearError" />
</template>

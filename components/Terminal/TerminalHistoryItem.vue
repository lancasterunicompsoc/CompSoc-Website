<script setup lang="ts">
import TerminalMarker from "./TerminalMarker.vue";
import type { HistoryItem } from "./index.vue";

const props = defineProps<HistoryItem>();
</script>

<template>
  <TerminalMarker :cwd="props.cwd" />
  {{ props.input }} <br />
  {{ props.output }} <br v-if="props.output" />
</template>

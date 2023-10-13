<script setup lang="ts">
import TerminalMarker from "./TerminalMarker.vue";
import type { HistoryItem } from "./index.vue";

const props = defineProps<HistoryItem>();
</script>

<template>
  <TerminalMarker v-if="props.cwd" :cwd="props.cwd" />
  {{ props.input }} <br v-if="props.input || props.cwd" />
  {{ props.output }} <br v-if="props.output" />
</template>

<script setup lang="ts">
import TerminalMarker from "./TerminalMarker.vue";
import type { HistoryItem } from "./index.vue";

const props = defineProps<HistoryItem>();
</script>

<template>
  <TerminalMarker :cwd="props.cwd" v-if="props.cwd" />
  {{ props.input }} <br v-if="props.input" />
  {{ props.output }} <br v-if="props.output" />
</template>

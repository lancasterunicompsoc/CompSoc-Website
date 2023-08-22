<script setup lang="ts">
import TerminalMarker from './TerminalMarker.vue'

defineProps(['input', 'output', 'cwd'])
</script>

<template>
    <TerminalMarker :cwd="cwd" />
    {{ input }} <br/>
    {{ output }} <br v-if="output" />
</template>


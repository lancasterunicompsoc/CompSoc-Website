<script setup>
import TerminalMarker from './TerminalMarker.vue'

defineProps(['input', 'output', 'cwd'])
</script>

<template>
    <TerminalMarker :cwd="cwd" />
    {{ input }} <br/>
    {{ output }} <br v-if="output" />
</template>


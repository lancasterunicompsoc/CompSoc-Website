<script setup>
import TerminalMarker from './TerminalMarker.vue'

defineProps(['input', 'output'])
</script>

<template>
    <TerminalMarker />
    {{ input }} <br/>
    {{ output }} <br v-if="output" />
</template>


<template>
  <div>
    <div>I'm protected! Session data: {{ decoded }}</div>
    <div>jwt: {{ jwt }}</div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ middleware: "auth-protected" });

const { jwt, decoded } = useAuth();
</script>

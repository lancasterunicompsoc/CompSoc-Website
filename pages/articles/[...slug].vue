<script setup lang="ts">
const route = useRoute();
const contentpath = computed(() => route.path.replace('/articles', ''));
</script>

<template>
  <main>
    <ContentDoc :path="contentpath"> </ContentDoc>
  </main>
</template>

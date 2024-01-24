<template>
  <main class="main-container">
    <Suspense>
      <ClientOnly>
        <Terminal />
      </ClientOnly>
    </Suspense>

    <p class="info-line">
      Lancaster University Computer Science Society exists to promote interest
      in computing and technology among students and wider society.
    </p>

    <a
      href="https://lancastersu.co.uk/groups/compsoc-2be7/join"
      class="button block text-white"
    >
      Join the society
    </a>
  </main>
</template>
<script setup lang="ts">
const Terminal = defineAsyncComponent(
  () => import("~/components/Terminal/index.vue"),
);
</script>

<style scoped>
.button {
  background-color: var(--highlight2Light);
  width: fit-content;
  margin: auto;
  padding: 1rem;
}
.info-line {
  text-align: center;
}
</style>

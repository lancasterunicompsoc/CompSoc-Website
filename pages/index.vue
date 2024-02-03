<template>
  <main class="main-container">
    <div class="row">
      <Clippy style="height: 75vh" />

      <div class="pt-16">
        <NuxtLink to="/join" class="button block text-white text-size-10">
          Join
        </NuxtLink>
      </div>
    </div>

    <Suspense>
      <ClientOnly>
        <Terminal />
      </ClientOnly>
    </Suspense>

    <p class="info-line">
      Lancaster University Computer Science Society exists to promote interest
      in computing and technology among students and wider society.
    </p>

    <NuxtLink to="/join" class="button block text-white">
      Join the society
    </NuxtLink>
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
  padding: 1rem 2rem;
  text-align: center;
}
.info-line {
  text-align: center;
}
</style>

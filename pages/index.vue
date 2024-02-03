<script setup lang="ts">
const Terminal = defineAsyncComponent(
  () => import("~/components/Terminal/index.vue"),
);

const clippyMessage = `It looks like you're interested in Computer Science.
Why not join CompSoc?`;
</script>

<template>
  <main class="main-container">
    <div class="clippy-row">
      <Clippy style="height: 75vh" :message="clippyMessage" />

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
  </main>
</template>

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

.clippy-row {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
}

@media (max-width: 30rem) {
  .clippy-row {
    flex-direction: column;
  }
}
</style>

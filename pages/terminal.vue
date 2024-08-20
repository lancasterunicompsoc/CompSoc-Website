<script setup lang="ts">
const TermComponent = defineAsyncComponent(
  () => import("~/components/Terminal/index.vue"),
);
</script>

<template>
  <div class="center">
    <NuxtLink to="/">&lt;- Back to Home</NuxtLink>
    <Suspense>
      <ClientOnly>
        <TermComponent />
      </ClientOnly>
    </Suspense>
  </div>
</template>

<script setup lang="ts">

</script>

<style scoped>
.center {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>

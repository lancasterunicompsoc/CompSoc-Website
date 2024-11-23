<template>
  <section class="card px-8 py-6">
    <slot />
  </section>
</template>

<style>
.card h2 {
  font-size: 1.75rem;
}
</style>

<style scoped>
.card {
  text-align: justify;
  margin-block: 2.5rem;
  background-color: rgba(0, 0, 0, 0.5); /* Black background with 50% opacity */
}
</style>

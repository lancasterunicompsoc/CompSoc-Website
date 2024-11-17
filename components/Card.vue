<template>
  <section class="card rounded">
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

.card + .card {
  margin-top: 5rem;
}
</style>

<template>
  <section class="card">
    <slot />
  </section>
</template>

<style>
.card h2 {
  font-size: 1.75rem;
}

.card:nth-child(2n + 0) > :is(h1, h2, h3, h4, h5, h6) {
  text-align: right;
}
</style>

<style scoped>
.card {
  text-align: justify;
  margin-block: 2.5rem;
}

.card + .card {
  margin-top: 5rem;
}

.card:nth-child(2n + 0) {
  box-shadow: 0px 0px 1px 0 #000,  1rem 1rem 0px -0.25rem var(--un-shadow-color, #fff);
}

.card:nth-child(2n + 1) {
  box-shadow: 0px 0px 1px 0 #000, -1rem 1rem 0px -0.25rem var(--un-shadow-color, #fff);
}
</style>


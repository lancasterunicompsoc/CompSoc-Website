<script lang="ts">
export type CardData = {
  title: string,
  body: string,
  image: string
};
</script>

<script setup lang="ts">
const { data } = defineProps<{ data: CardData }>();
</script>

<template>
  <article class="slide">
    <p class="title">{{ data.title }}</p>
    <p class="body">{{ data.body }}</p>
    <img :src="data.image" alt="" />
  </article>
</template>

<style scoped>
.slide {
  width: 100vw;
  height: 100vh;

  padding: 10vh 10vw;

  display: grid;
  gap: 1rem;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 90%;
  grid-template-areas:
    'title img'
    'body  img'
    ;
}

.title {
  grid-area: title;
}

.body {
  grid-area: body;
}

img {
  grid-area: img;
  max-width: 50vw;
  max-height: 100vh;
  margin-block: auto;
}
</style>


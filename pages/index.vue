<template>
  <main class="main-container">
    <p class="info-line">
      This Website is changing, please stay tuned.
    </p>

    <p class="info-line">
      Lancaster University Computer Science Society exists to promote interest
      in computing and technology among students and wider society.
    </p>

    <div class="row">
      <a href="/join" class="button block text-white text-size-5">
        Join the Society
      </a>
    </div>

    <p class="info-line">
      Previously on this front page was a
      <NuxtLink to="/terminal" class="link">
        Toy Terminal Emulator</NuxtLink>,
      which has now been moved to its own page.
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

.row {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
}

.link {
  color: var(--highlight2);
  text-decoration: underline;
}

@media (max-width: 35rem) {
  .row {
    flex-direction: column;
  }
}
</style>

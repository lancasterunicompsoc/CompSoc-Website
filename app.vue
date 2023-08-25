<template>
  <div class="dark:bg-darkgrey dark:text-gray-300 bg-#e7e7e7">
    <NuxtLayout name="default">
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<style>
:root{
  --highlight1Dark: #ec5042;
  --highlight2Dark: #d14537;
  --highlight1Light: #d12415;
  --highlight2Light: #ae3428;
}

* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica,
    Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
}

.page {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

main {
  flex: 1;

  max-width: 100vw;
  padding: 1rem 2rem;
  line-height: 1.75;
}

main * {
  margin-bottom: 1em;
}

@media (min-width: 30rem) {
  main {
    padding-inline: 0;
    width: 80vw;
    margin-inline: auto;
  }
}

@media (min-width: 60rem) {
  main {
    max-width: 80rem;
    width: 60vw;
  }
}
</style>

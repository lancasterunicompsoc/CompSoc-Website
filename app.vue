<template>
  <Body class="dark:bg-darkgrey dark:text-gray-300 bg-lightbg">
    <div>
      <noscript>
        This website only works if you enable Javascript in your browser, please
        enable Javascript execution and reload the page.
      </noscript>
      <NuxtLayout>
        <NuxtPage />
      </NuxtLayout>
    </div>
  </Body>
</template>

<style>
:root {
  --highlight1Dark: #ec5042;
  --highlight2Dark: #d14537;
  --highlight1Light: #d12415;
  --highlight2Light: #ae3428;

  --highlight1: var(--highlight1Light);
  --highlight2: var(--highlight2Light);
}

.dark {
  --highlight1: var(--highlight1Dark);
  --highlight2: var(--highlight2Dark);
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  background: rgb(246, 112, 3);
  background: linear-gradient(
    135deg,
    rgba(246, 112, 3, 1) 0%,
    rgba(180, 34, 34, 1) 50%,
    rgba(87, 1, 164, 1) 100%
  );
  font-size: 19px;
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

main > * {
  margin-bottom: 2.75em;
}

main a:not([class]) {
  color: var(--highlight1Light);
}

.dark main a:not([class]) {
  color: var(--highlight1Dark);
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

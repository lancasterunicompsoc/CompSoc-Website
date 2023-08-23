<script setup>
import Logo from "./Logo";
</script>

<template>
  <header
    class="bg-#ddd dark:bg-lightgrey p-8 flex m-0 justify-between items-center"
  >
    <a href="/">
      <h1 class="font-bold text-2em">
        <Logo />
      </h1>
    </a>
    <div class="spacer"></div>
    <nav class="primary-navbar">
      <a href="/about">About Us</a>
      <a href="/events">Events</a>
      <div class="sep"></div>
      <a href="#">Sign Up</a>
      <a href="#">Sign In</a>
    </nav>
    <DarkToggle />
  </header>
</template>

<style scoped>
.primary-navbar,
.spacer {
  display: none;
}

@media (min-width: 30rem) {
  .primary-navbar {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-evenly;
  }

  .primary-navbar > * {
    --padding: 1rem;

    display: grid;
    place-content: center;

    height: 3rem;
    padding-inline: var(--padding);
    margin-inline: calc(var(--padding) / 2);

    transition: background-color 250ms ease-in-out;
  }

    .primary-navbar > :not(.sep):hover {
        background-color: #ae3428;
    }

  .primary-navbar > .sep {
    width: 2px;
    padding-inline: 0;

    background-color: currentColor;
  }
}

@media (min-width: 60rem) {
  .primary-navbar {
    margin-right: 2.5vw;
  }

  .spacer {
    display: block;
    flex: 1;
  }
}
</style>

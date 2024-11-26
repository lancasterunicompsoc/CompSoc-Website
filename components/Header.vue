<template>
  <header
    class="px-8 py-4 flex flex-col lg:flex-row m-0 justify-between items-center"
  >
    <div class="flex grow-0 items-center justify-between w-full">
      <NuxtLink to="/">
        <h1 class="font-bold text-2em">
          <Logo />
        </h1>
      </NuxtLink>
    </div>

    <nav role="navigation" ref="nav">
      <div id="menuToggle">
        <input type="checkbox" id="menuCheckbox" ref="navigationCheckbox" />

        <!--
        Hamburger lines
        -->
        <span class="hamburger"></span>
        <span class="hamburger"></span>
        <span class="hamburger"></span>

        <div
          id="menu"
          class="flex flex-col p-4 [&>*]:p-4 transition-colors font-bold text-md backdrop-blur-md rounded-bl-[20px]"
        >
          <NuxtLink
            class="hover:bg-[rgba(91,0,0,0.24)]"
            to="/about"
            @click="closeMenu"
            >About Us</NuxtLink
          >
          <NuxtLink
            class="hover:bg-[rgba(91,0,0,0.24)]"
            to="/events"
            @click="closeMenu"
            >Events</NuxtLink
          >

          <NuxtLink
            class="hover:bg-[rgba(91,0,0,0.24)]"
            to="/slides"
            @click="closeMenu"
            >Slides</NuxtLink
          >
          <a
            class="hover:bg-[rgba(91,0,0,0.24)]"
            href="https://photos.compsoc.io/"
            >Photos</a
          >

          <template v-if="authStore.isAdmin">
            <NuxtLink
              class="hover:bg-[rgba(91,0,0,0.24)]"
              to="/admin/users"
              @click="closeMenu"
              >Users</NuxtLink
            >
            <NuxtLink
              class="hover:bg-[rgba(91,0,0,0.24)]"
              to="/admin/reviews/0"
              @click="closeMenu"
              >Reviews</NuxtLink
            >
            <button
              class="hover:bg-[rgba(91,0,0,0.24)] text-left"
              @click="logOut"
            >
              Log out
            </button>
          </template>
        </div>
      </div>
    </nav>
  </header>
</template>

<script setup lang="ts">
import { useAuthStore } from "~/stores/auth";
const authStore = useAuthStore();
const logOut = () => {
  authStore.logOut();
  closeMenu();
};

const navigationCheckbox = ref<HTMLInputElement | null>(null);
const closeMenu = () => {
  if (!navigationCheckbox.value) {
    return;
  }
  navigationCheckbox.value.click();
};

const nav = ref<HTMLElement | null>();

onClickOutside(nav, () => {
  if (navigationCheckbox.value?.checked) {
    navigationCheckbox.value.click();
  }
});
</script>

<style scoped>
#menuToggle {
  display: block;
  /* You can also use relative/absolute here if you want to stay on the top */
  position: fixed;
  top: 28px;
  right: 50px;

  z-index: 1;

  -webkit-user-select: none;
  user-select: none;
}

#menuToggle a {
  text-decoration: none;

  transition: color 0.3s ease;
}

#menuToggle input {
  display: block;
  width: 40px;
  height: 32px;
  position: absolute;
  top: -7px;
  right: -5px;

  cursor: pointer;

  opacity: 0; /* hide this */
  z-index: 2; /* and place it over the hamburger */

  -webkit-touch-callout: none;
}

#menuToggle .hamburger {
  display: block;
  width: 30px;
  height: 3px;
  margin-bottom: 5px;
  position: relative;

  background: white;
  border-radius: 3px;

  z-index: 1;

  transform-origin: 4px 0px;

  transition:
    transform 0.5s cubic-bezier(0.77, 0.2, 0.05, 1),
    background 0.5s cubic-bezier(0.77, 0.2, 0.05, 1),
    opacity 0.55s ease;
}

#menuToggle .hamburger:first-child {
  transform-origin: 0% 0%;
}

#menuToggle .hamburger:nth-last-child(2) {
  transform-origin: 0% 100%;
}

/*
 * Transform all the slices of hamburger
 * into a crossmark.
 */
#menuToggle input:checked ~ .hamburger {
  opacity: 1;
  transform: rotate(45deg) translate(-2px, -1px);
  background: white;
}

/*
 * But let's hide the middle one.
 */
#menuToggle input:checked ~ .hamburger:nth-last-child(3) {
  opacity: 0;
  transform: rotate(0deg) scale(0.2, 0.2);
}

/*
 * Ohyeah and the last one should go the other direction
 */
#menuToggle input:checked ~ .hamburger:nth-last-child(2) {
  transform: rotate(-45deg) translate(0, -1px);
}

/*
 * Make this absolute positioned
 * at the top left of the screen
 */
#menu {
  position: absolute;
  max-width: 400px;
  width: 100vw;
  max-height: 100vh;
  margin: -100px 0 0 -200px;
  padding: 45px;
  padding-top: 125px;
  box-sizing: border-box;
  overflow-y: auto;
  list-style-type: none;
  -webkit-font-smoothing: antialiased;
  /* to stop flickering of text in safari */

  transform-origin: 0% 0%;
  transform: translate(100%, 0);

  transition: transform 0.5s cubic-bezier(0.77, 0.2, 0.05, 1);
}

#menuToggle input:checked ~ div {
  transform: none;
}

@media only screen and (min-width: 1024px) {
  #menuToggle .hamburger {
    display: none;
  }
  #menuCheckbox {
    display: none !important;
  }

  #menu {
    position: static;
    transform: none;
    padding: 0px;
    padding-right: 1em;
    margin: 0px;
    flex-direction: row;
    border-bottom-left-radius: 0px;
    max-width: max-content;
  }

  #menuToggle {
    position: static;
    top: initial;
    right: initial;
  }
}
</style>

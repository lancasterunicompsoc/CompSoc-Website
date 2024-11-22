<template>
  <div class="flex font-heading">
    <NuxtImg src="/img/logo/full-transparent.webp" alt="CompSoc Logo" />
    &nbsp;
    <LogoText id="text" />
  </div>
</template>
<style scoped>
img {
  width: 3rem;
  height: 3rem;
}

@media only screen and (max-width: 400px) {
  #text {
    display: none;
  }
}
</style>

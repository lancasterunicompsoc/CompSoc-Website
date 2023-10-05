<template>
  <div class="page">
    <Header />
    <div class="py-4 fill-page">
      <slot />
    </div>
    <Footer />
  </div>
</template>

<style>
.fill-page {
  min-height: calc(100vh - 184px);
}
</style>

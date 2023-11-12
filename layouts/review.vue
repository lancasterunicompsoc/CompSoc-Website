<template>
  <div class="page flex flex-column">
    <Header />
    <div class="py-4 grow flex flex-column">
      <ErrorBoundary @error="console.error">
        <slot />
        <template #error="{ error }">
          <div class="w-4/5 m-auto text-3xl text-white bg-red-500 p-8 text-center">
            Error: {{ error.statusMessage ?? error.message }}
          </div>
        </template>
      </ErrorBoundary>
    </div>
    <Footer />
  </div>
</template>

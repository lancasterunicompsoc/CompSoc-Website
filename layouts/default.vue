<template>
  <div class="page flex flex-column">
    <Header />
    <div class="py-4 grow">
      <ErrorBoundary @error="console.error">
        <slot />
        <template #error="{ error, clearError }">
          <div
            class="w-4/5 m-auto text-3xl text-white bg-red-500 p-8 flex flex-col items-center gap-4"
          >
            <h1>Error: {{ error.statusMessage ?? error.message }}</h1>
            <button class="btn-secondary" @click="clearError">
              Clear error message
            </button>
          </div>
        </template>
      </ErrorBoundary>
    </div>
    <Footer />
  </div>
</template>

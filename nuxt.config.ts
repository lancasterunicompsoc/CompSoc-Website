// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ["@sidebase/nuxt-auth", "@nuxtjs/tailwindcss"],
  build: {
    transpile: ["trpc-nuxt"],
  },
  typescript: {
    shim: false,
  },
  runtimeConfig: {
    secret: "", // override using NUXT_SECRET in .env
    github_client_id: "", // same here
    github_client_secret: "", // same here
    database_url: "", // same here
  },
});

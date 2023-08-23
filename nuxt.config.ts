// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    "@sidebase/nuxt-auth",
    "@nuxt/devtools",
    "@vueuse/nuxt",
    "@nuxt/content",
    "@unocss/nuxt",
    "nuxt-icon"
  ],
  build: {
    transpile: ["trpc-nuxt"]
  },
  css: ["@unocss/reset/tailwind.css"],
  typescript: {
    shim: false
  },
  runtimeConfig: {
    secret: "", // override using NUXT_SECRET in .env
    github_client_id: "", // same here
    github_client_secret: "", // same here
    database_url: "", // same here
    discord_client_secret: "",
    discord_client_id: ""
  }
});

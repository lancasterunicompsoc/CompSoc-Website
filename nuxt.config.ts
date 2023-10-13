// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    "@nuxt/devtools",
    "@vueuse/nuxt",
    "@nuxt/content",
    "@unocss/nuxt",
    "nuxt-icon",
    "@pinia/nuxt",
    "@pinia-plugin-persistedstate/nuxt",
  ],
  build: {
    transpile: ["trpc-nuxt"],
  },
  css: ["@unocss/reset/tailwind.css"],
  typescript: {
    shim: false,
  },
  ssr: false,
  runtimeConfig: {
    secret: "", // override using NUXT_SECRET in .env
    github_client_id: "", // same here
    github_client_secret: "", // same here
    database_url: "", // same here
    discord_client_secret: "",
    discord_client_id: "",
    public: {
      loginUrl: "",
    },
  },
  app: {
    head: {
      title: "LUCompSoc",
    },
  },
  routeRules: {
    "/img/**": {
      headers: {
        "Cache-Control": "max-age=604800, public",
      },
    },
  },
});

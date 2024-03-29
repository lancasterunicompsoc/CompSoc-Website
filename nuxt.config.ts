const joinLink = "https://lancastersu.co.uk/groups/compsoc-2be7/join";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    "@nuxt/devtools",
    "@nuxtjs/color-mode",
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
  ssr: true,
  runtimeConfig: {
    secret: "", // override using NUXT_SECRET in .env
    database_url: "", // same here
    discord_id: "",
    discord_token: "",
    public: {
      login_url: "",
    },
  },
  app: {
    head: {
      title: "LUCompSoc",
      meta: [
        {
          name: "description",
          content:
            "Website of the Lancaster University Computing Society, LUCompSoc",
        },
      ],
      htmlAttrs: {
        lang: "en",
      },
    },
  },
  routeRules: {
    "/img/**": {
      headers: {
        "Cache-Control": "max-age=604800, public",
      },
    },
    "/slides": { redirect: "https://slides.compsoc.io" },
    "/discord": { redirect: "https://discord.gg/zH5MsZCrJG" },
    "/github": { redirect: "https://github.com/LUCompSoc" },
    "/github/CompSoc-Website": {
      redirect: "https://github.com/lancasterunicompsoc/CompSoc-Website",
    },
    "/github/compsoc-website": {
      redirect: "https://github.com/lancasterunicompsoc/CompSoc-Website",
    },
    "/start": { redirect: joinLink },
    "/join": { redirect: joinLink },
    "/admin/reviews": { redirect: "/admin/reviews/0" },
  },
  colorMode: {
    preference: "system", // default value of $colorMode.preference
    fallback: "dark", // fallback value if not system preference found
    storageKey: "nuxt-color-mode",
    classSuffix: "",
  },
});

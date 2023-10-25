const joinLink = "https://lancastersu.co.uk/groups/compsoc-2be7/join";

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
    resend_key: "",
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
});

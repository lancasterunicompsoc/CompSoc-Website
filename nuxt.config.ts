const joinLink = "https://lancastersu.co.uk/groups/compsoc-2be7";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    "@nuxt/devtools",
    "@nuxtjs/color-mode",
    "@vueuse/nuxt",
    "@nuxt/content",
    "@unocss/nuxt",
    "@nuxt/icon",
    "@pinia/nuxt",
    "@pinia-plugin-persistedstate/nuxt",
    "@nuxt/image",
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
    iss_jwt_secret: "", // override using NUXT_SECRET in .env,
    site_jwt_secret: "",
    turso_auth_token: "",
    turso_database_url: "",
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
    "/discord": { redirect: "https://discord.gg/compsoc" },
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
    "/bright-signup": {
      redirect:
        "https://www.brightnetwork.co.uk/signup/?utm_medium=university&utm_source=society&utm_campaign=referral_challenge_2024&utm_content=the_computer_science_society_of_lancaster_university_lancaster_university",
    },
    "/agm2025": { redirect: "https://lancasteruni.eu.qualtrics.com/jfe/form/SV_3yIJzMbUsGSjDCu" },
  },

  colorMode: {
    preference: "system", // default value of $colorMode.preference
    fallback: "dark", // fallback value if not system preference found
    storageKey: "nuxt-color-mode",
    classSuffix: "",
  },

  compatibilityDate: "2024-11-17",
});

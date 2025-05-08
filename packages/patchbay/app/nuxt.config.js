// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },
  modules: ["@nuxt/content"],
  nitro: {
    routeRules: {
      "/api/**": {
        proxy: {
          to: `http://${process.env.NODE_ENV === "production" ? "api" : "localhost"}:8055/**`, // make sure this is an ENV driven variable if production does not match
        },
      },
    },
  },
});

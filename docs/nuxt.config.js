// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: true,
  app: {
    baseURL: "/patchbay",
  },
  devtools: { enabled: false },
  extends: ["shadcn-docs-nuxt"],
  nitro: {
    static: true,
    prerender: {
      crawlLinks: true,
      failOnError: false,
    },
  },
});

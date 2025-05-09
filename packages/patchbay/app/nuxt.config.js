import process from "node:process";
import tailwindcss from "@tailwindcss/vite";

const sw = process.env.SW === "true";
const prod = process.env.NODE_ENV === "production";

// https://nuxt.com/docs/api/configuration/nuxt-config
// eslint-disable-next-line no-undef
export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  devtools: { enabled: false },
  modules: [
    "@nuxt/content",
    "shadcn-nuxt",
    "@vite-pwa/nuxt",
    "@nuxtjs/i18n",
    "nuxt-svgo",
    "@pinia/nuxt",
  ],
  app: {
    head: {
      htmlAttrs: { lang: "en" },
      bodyAttrs: {
        class: "dark",
      },
      link: [
        {
          rel: "icon",
          type: "image/png",
          href: "/icon/favicon.png",
        },
      ],
    },
  },
  i18n: {
    defaultLocale: "en",
    locales: [{ code: "en", name: "English", file: "en.json" }],
  },
  shadcn: {
    prefix: "",
    componentDir: "./components/ui",
  },
  nitro: {
    routeRules: {
      "/patchbay/**": {
        proxy: {
          to: `http://${prod ? "api" : "localhost"}:8055/**`, // make sure this is an ENV driven variable if production does not match
        },
      },
    },
  },
  css: ["~/assets/css/tailwind.css"],
  vite: {
    plugins: [tailwindcss()],
  },
  pwa: {
    enabled: prod,
    strategies: sw ? "injectManifest" : "generateSW",
    srcDir: sw ? "service-worker" : undefined,
    filename: sw ? "sw.ts" : undefined,
    registerType: "autoUpdate",
    manifest: {
      name: "Patchbay",
      short_name: "Patchbay",
      theme_color: "#07f78c",
      icons: [
        {
          src: "/icon/favicon-192x192.png",
          sizes: "192x192",
          type: "image/png",
        },
        {
          src: "/icon/favicon-512x512.png",
          sizes: "512x512",
          type: "image/png",
        },
        {
          src: "/icon/favicon-512x512.png",
          sizes: "512x512",
          type: "image/png",
          purpose: "any maskable",
        },
      ],
    },
    workbox: {
      globPatterns: ["**/*.{js,css,html,png,svg,ico}"],
    },
    injectManifest: {
      globPatterns: ["**/*.{js,css,html,png,svg,ico}"],
    },
    client: {
      installPrompt: true,
      // you don't need to include this: only for testing purposes
      // if enabling periodic sync for update use 1 hour or so (periodicSyncForUpdates: 3600)
      periodicSyncForUpdates: 20,
    },
    devOptions: {
      enabled: prod,
      suppressWarnings: prod,
      navigateFallback: "/",
      navigateFallbackAllowlist: [/^\/$/],
      type: "module",
    },
  },
});

import vueCssModule from "@inetss/vite-plugin-vue-css-module"
import { nodePolyfills } from "vite-plugin-node-polyfills"

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },

  app: {
    baseURL: "/fugu/",
  },

  ssr: false,

  // @sort
  modules: [
    "nuxt-open-fetch",
  ],

  nitro: {
    esbuild: {
      options: {
        // For native bigints.
        target: "ESNext",
      },
    },
  },
  vite: {
    plugins: [
      vueCssModule({ attrName: "mclass", pugClassLiterals: true }),
      nodePolyfills(),
    ],
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: "@use '~/styles/colors.scss' as *;",
        },
      },
    },
  },

  css: [
    "~/styles/index.scss",
  ],

  openFetch: {
    clients: {
      api: {
        baseURL: "https://testnet.toncenter.com",
      },
    },
  },

  runtimeConfig: {
    // Token for accessing admin API
    adminToken: "",
    baseUrl: "https://arjun-silver.github.io/fugu/",
    database: {
      url: "postgres://localhost/fugu",
      log: false,
    },
  },
})

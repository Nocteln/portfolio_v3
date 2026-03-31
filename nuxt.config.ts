// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-04-03",
  devtools: { enabled: true },
  ssr: false,
  modules: ["@nuxtjs/tailwindcss", "@nuxt/icon", "@nuxt/content", "@nuxt/image", "@nuxtjs/sitemap", "@nuxtjs/google-fonts"],
  site: {
    url: 'https://nocteln.fr',
    name: 'Eliott Mieze - Portfolio'
  },
  devServer: {
    port: 3001
  },

  googleFonts: {
    families: {
      Poppins: [100, 200, 300, 400, 500, 600, 700, 800, 900],
      'Roboto Condensed': [100, 200, 300, 400, 500, 600, 700, 800, 900],
    },
    display: 'swap',
    prefetch: true,
    preconnect: true,
    preload: true,
  },

  routeRules: {
    '/img/**': { headers: { 'cache-control': 'public, max-age=31536000, immutable' } },
    '/_nuxt/**': { headers: { 'cache-control': 'public, max-age=31536000, immutable' } },
  }
});

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ["@nuxtjs/prismic", '@vueuse/nuxt'],
  prismic: {
    endpoint: "team-duca",
  },
})
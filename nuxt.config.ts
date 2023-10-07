// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ["@nuxtjs/prismic", '@vueuse/nuxt'],
  prismic: {
    endpoint: "team-duca",
  },
  css: ["@/assets/sass/global.sass"],
  vite: {
        css: {
            preprocessorOptions: {
                sass: {
                    additionalData: `@import "@/assets/sass/main.sass"
`,
                },
            },
        },
    },
})
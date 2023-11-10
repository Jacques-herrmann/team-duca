// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    devtools: { enabled: true },
    modules: ["@nuxtjs/prismic", '@vueuse/nuxt', '@nuxtjs/google-fonts'],
    prismic: {
        endpoint: "team-duca",
    },
    components: {
        global: true,
        dirs: ['@/components']
    },
    googleFonts: {
      families: {
          Rubik: [900],
          Overpass: true,
      }
    },
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
// https://nuxt.com/docs/api/configuration/nuxt-config
import getRoutes from "./utils/getRoutes";

export default defineNuxtConfig({
    routeRules: {
        '/': {static: true},
        '/**': {static: true},
        '/slice-simulator': {prerender: false, ssr: false},
    },
    devtools: {enabled: true},
    modules: ["@nuxtjs/prismic", '@vueuse/nuxt', '@nuxtjs/google-fonts', '@pinia/nuxt'],
    prismic: {
        endpoint: "team-duca",
        preview: false,
    },
    components: {
        global: true,
        dirs: ['@/components']
    },
    app: {
        pageTransition: false,
        layoutTransition: false
    },
    googleFonts: {
        families: {
            Rubik: [900],
            Overpass: true,
        }
    },
    hooks: {
        async 'nitro:config'(nitroConfig) {
            if (nitroConfig.dev) {
                return
            }
            const slugs = getRoutes();
            nitroConfig.prerender.routes.push(...slugs);
        },
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
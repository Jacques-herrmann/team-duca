// https://nuxt.com/docs/api/configuration/nuxt-config
import getRoutes from "./utils/getRoutes";

export default defineNuxtConfig({
    routeRules: {
        '/': {static: true},
        '/**': {static: true},
        '/slice-simulator': {prerender: false, ssr: false},
        '/preview': {prerender: false, ssr: false},
    },
    head: {
        link: [{rel: 'icon', type: 'image/x-icon', href: '/favicon.ico'}],
        // script: [{src: '/libs/ammo.wasm.js',}]
    },
    devtools: {enabled: true},
    modules: [
        "@nuxtjs/prismic",
        '@vueuse/nuxt',
        '@nuxtjs/google-fonts',
        'nuxt-booster',
        '@pinia/nuxt',
        '@nuxtjs/seo',
        "@nuxt/image"
    ],
    prismic: {
        endpoint: "team-duca",
        preview: false,
        toolbar: false,
    },
    components: {
        global: true,
        dirs: ['@/components']
    },
    ogImage: {
        enabled: false
    },
    site: {
        url: 'https://science-duca.fr',
        name: 'SCIENCE DUCA - MMA MARSEILLE',
        description: 'Bienvenue sur le site de la TEAM SCIENCE DUCA, club de MMA !\nRetrouvez nous au 268 Avenue de la Capelette - Bâtiment G, 1er étage - 13010 Marseille.\nRejoignez-nous pour apprendre les techniques de combat et améliorer votre condition physique.',
        defaultLocale: 'fr', // not needed if you have @nuxtjs/i18n installed
    },
    sitemap: {
        exclude: ['/preview', '/slice-simulator'],
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
    speedkit: {

        detection: {
            performance: true,
            browserSupport: true
        },

        performanceMetrics: {
            device: {
                hardwareConcurrency: {min: 2, max: 48},
                deviceMemory: {min: 2}
            },
            timing: {
                fcp: 800,
                dcl: 1200
            }
        },

        targetFormats: ['webp', 'avif', 'jpg|jpeg|png|gif'],

        componentAutoImport: false,
        componentPrefix: undefined,

        /**
         * IntersectionObserver rootMargin for Compoennts and Assets
         */
        lazyOffset: {
            component: '0%',
            asset: '0%'

        },
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
    runtimeConfig: {
        public: {
            RECAPTCHA_SITE_KEY: process.env.SITE_RECAPTCHA_KEY,
            // RECAPTCHA_SITE_KEY_SECRET: process.env.SITE_RECAPTCHA_SECRET
        }

    }
})
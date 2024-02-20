// https://nuxt.com/docs/api/configuration/nuxt-config
import getRoutes from "./utils/getRoutes";

export default defineNuxtConfig({
  routeRules: {
    '/': {static: true},
    '/**': {static: true},
    '/slice-simulator': {prerender: false, ssr: false},
    '/preview': {prerender: false, ssr: false},
  },
  devtools: {enabled: true},
  modules: ["@nuxtjs/prismic", '@vueuse/nuxt', '@nuxtjs/google-fonts', '@pinia/nuxt', 'nuxt-speedkit'],
  prismic: {
    endpoint: "team-duca",
    preview: false,
    toolbar: false,
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
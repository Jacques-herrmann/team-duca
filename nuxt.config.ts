export default defineNuxtConfig({
  devtools: { enabled: true },

  modules: [
    '@nuxtjs/i18n',
    '@nuxtjs/google-fonts',
    '@nuxt/image',
    '@pinia/nuxt',
    '@vueuse/nuxt',
  ],

  routeRules: {
    '/': { prerender: true },
    '/**': { prerender: true },
  },

  i18n: {
    restructureDir: false,
    locales: [
      { code: 'fr', file: 'fr.json', name: 'Français' },
      { code: 'en', file: 'en.json', name: 'English' },
    ],
    defaultLocale: 'fr',
    langDir: 'locales/',
    strategy: 'prefix_except_default',
  },

  googleFonts: {
    families: {
      'Bebas Neue': true,
      'Barlow Condensed': [600, 700, 800],
      Barlow: [400, 500, 600],
    },
    display: 'swap',
  },

  css: ['~/assets/sass/main.sass'],

  vite: {
    css: {
      preprocessorOptions: {
        sass: {
          // Injecte uniquement les variables/mixins dans chaque composant.
          // main.sass (CSS output) est chargé globalement via css[] ci-dessus.
          additionalData: `@import "@/assets/sass/_tools.sass"\n`,
        },
      },
    },
  },

  runtimeConfig: {
    public: {
      RECAPTCHA_SITE_KEY: process.env.SITE_RECAPTCHA_KEY,
    },
  },
})

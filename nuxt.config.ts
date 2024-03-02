// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  runtimeConfig: {
    dbHost: '',
    dbUser: '',
    dbPassword: '',
    dbPort: '',
  },
  app: {
    head: {
      htmlAttrs: {
        lang: 'ru',
      },
      title: 'FastDelivery',
    },
  },
  modules: ['@nuxtjs/tailwindcss', '@pinia/nuxt', '@nuxtjs/google-fonts', '@nuxtjs/color-mode', '@element-plus/nuxt'],
  pinia: {
    storesDirs: ['./store/**'],
  },
  css: ['animate.css', '~/assets/index.sass'],
  vite: {
    css: {
      preprocessorOptions: {
        sass: {
          additionalData: '@use "~/assets/_colors.sass"\n',
        },
        scss: {
          additionalData: '@use "@/assets/element/index.scss" as element;',
        },
      },
    },
  },
  elementPlus: {
    icon: 'ElIcon',
    importStyle: 'scss',
    themes: ['dark'],
  },
  googleFonts: {
    families: {
      roboto: true,
    },
  },
  colorMode: {
    classSuffix: '',
  },
})

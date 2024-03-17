// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  runtimeConfig: {
    dbHost: '',
    dbUser: '',
    dbPassword: '',
    dbPort: '',
    jwtSecret: '',
  },
  app: {
    head: {
      htmlAttrs: {
        lang: 'ru',
      },
      title: 'FastDelivery',
    },
  },
  modules: [
    '@nuxtjs/tailwindcss',
    '@pinia/nuxt',
    '@pinia-plugin-persistedstate/nuxt',
    '@nuxtjs/google-fonts',
    '@nuxtjs/color-mode',
    '@element-plus/nuxt',
    '@vee-validate/nuxt',
  ],
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
  veeValidate: {
    // disable or enable auto imports
    autoImports: true,
    // Use different names for components
    componentNames: {
      Form: 'vForm',
      Field: 'vField',
      FieldArray: 'VeeFieldArray',
      ErrorMessage: 'VeeErrorMessage',
    },
  },
})

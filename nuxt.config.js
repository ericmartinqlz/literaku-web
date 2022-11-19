// eslint-disable-next-line no-unused-vars
import { version } from 'prettier'

const AxiosInstance = {
  baseURL: process.env.BASE_API,
  withCredentials: false,
  retry: true,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
}

export default {
  // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
  ssr: false,
  env: {
    BASE_API: process.env.BASE_API
  },

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'Literaku Web',
    htmlAttrs: {
      lang: 'id'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ['@/assets/scss/main.scss', 'vue-select/dist/vue-select.css'],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    { src: '~/plugins/helpers.js' },
    { src: '~/plugins/vuelidate' },
    { src: '~/plugins/vue-select.js' },
    { src: '~/plugins/vue-datepicker' }
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
    // https://go.nuxtjs.dev/tailwindcss
    '@nuxtjs/tailwindcss'
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    '@nuxtjs/style-resources'
  ],

  styleResources: {
    scss: ['./assets/scss/partials/_variables.scss']
  },

  serverMiddleware: ['~/server-middleware/response'],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    // Workaround to avoid enforcing hard-coded localhost:3000: https://github.com/nuxt-community/axios-module/issues/308
    proxy: true,
    AxiosInstance
  },

  privateRuntimeConfig: {
    axios: {
      baseURL: process.env.BASE_API
    }
  },

  proxy: {
    '/api/': {
      target: process.env.BASE_API,
      pathRewrite: { '^/api/': '' },
      changeOrigin: true,
      onProxyReq(request) {
        request.setHeader('origin', process.env.BASE_API)
      }
    }
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {}
}

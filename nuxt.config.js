import colors from "vuetify/es5/util/colors";

export default {
  target: "static",
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    titleTemplate: "%s - blog",
    title: "polz's blog",
    htmlAttrs: {
      lang: "en"
    },
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { hid: "description", name: "description", content: "" },
      { name: "format-detection", content: "telephone=no" },
      {
        name: "google-signin-client_id",
        content:
          "884171338892-2i1nb7cakj8e0g0k5r3s1o9dhlr5oebe.apps.googleusercontent.com"
      }
    ],
    script: [
      {
        src: "https://apis.google.com/js/platform.js",
        async: true,
        defer: true
      }
    ],
    link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [{src:'~/plugins/amplify.js'}],
  
  router: {
    middleware: "auth"
  },
  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  loading: "~/components/Loading.vue",

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/vuetify
    "@nuxtjs/vuetify"
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: ["@nuxtjs/dotenv", "@nuxtjs/axios","nuxt-highlightjs"],

  // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
  vuetify: {
    customVariables: [],
    theme: {
      dark: true,
      themes: {
        dark: {
          primary: colors.blue.darken2,
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3
        }
      }
    }
  },

  env: {
    baseUrl: process.env.BASE_URL || `http://localhost:8080`
  },

  build: {}
};

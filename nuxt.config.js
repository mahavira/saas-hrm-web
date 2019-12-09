export default {
  mode: 'spa',
  /*
  ** Headers of the page
  */
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },
  /*
  ** Global CSS
  */
  css: [
    'normalize.css',
    '@/assets/element-ui.scss',
    '@/assets/helper.scss',
    '@/assets/common.scss'
  ],
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    { src: '@/plugins/resize', ssr: false },
    { src: '@/plugins/element-ui', ssr: false },
    { src: '~/plugins/mock', ssr: false },
    '@/plugins/moment',
    '@/plugins/axios',
    '@/plugins/vuex-router-sync',
    { src: '~/plugins/bus-inject', ssr: false }
  ],
  router: {
    // 在每页渲染前运行 middleware/user-agent.js 中间件的逻辑
    // middleware: 'auth'
    extendRoutes (routes, resolve) {
    }
  },
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
    '@nuxtjs/eslint-module'
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    '@nuxtjs/proxy'
  ],
  /*
  ** Axios module configuration
  ** See https://axios.nuxtjs.org/options
  */
  axios: {
    proxy: true,
    prefix: '/api',
    // baseURL: 'http://172.16.17.106:9590/',
    timeout: 1000,
    headers: {
      AuthorizationType: 'web-api'
    }
  },
  proxy: {
    '/api/mock': {
      target: 'http://localhost:3001/',
      pathRewrite: { '^/api/mock': '' }
    },
    '/api': {
      target: 'http://172.16.17.106:9590/',
      pathRewrite: { '^/api': '' }
    }
  },
  /*
  ** Build configuration
  */
  build: {
    transpile: [/^element-ui/],
    /*
    ** You can extend webpack config here
    */
    extend (config, ctx) {
      config.module.rules.push({
        test: /\.ya?ml$/,
        use: [ 'json-loader', 'yaml-loader' ]
      })
    }
  },
  ignore: ['**/*.test.*', '**/*.spec.*', '**/*.conf.*']
}

import config from './config'

export default {
  mode: 'spa',
  head: {
    title: config.title, // process.env.npm_package_name
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  loading: { color: '#fff' },
  css: [
    'normalize.css',
    '@/assets/element-ui.scss',
    '@/assets/helper.scss',
    '@/assets/common.scss'
  ],
  plugins: [
    { src: '~/plugins/resize', ssr: false },
    { src: '~/plugins/element-ui', ssr: false },
    // { src: '~/plugins/mock', ssr: false },
    { src: '~/plugins/moment', ssr: false },
    { src: '~/plugins/axios', ssr: false },
    { src: '~/plugins/vuex-router-sync', ssr: false },
    { src: '~/plugins/bus-inject', ssr: false },
    { src: '~/plugins/perfect-scrollbar', ssr: false },
    { src: '~/plugins/request', ssr: false }
  ],
  router: {
    middleware: 'auth'
  },
  buildModules: [
    '@nuxtjs/eslint-module'
  ],
  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/proxy'
    // '~/modules/conf'
  ],
  axios: {
    proxy: true,
    prefix: '/hrm',
    timeout: 30000,
    headers: {
      fib: config.applicationKey
    }
  },
  proxy: {
    '/api/mock': {
      target: 'http://localhost:3001/',
      pathRewrite: { '^/api/mock': '' }
    },
    '/ucsp': { target: 'http://172.16.24.121:39400/', pathRewrite: { '^/ucsp': '' } },
    '/hrm': { target: 'http://172.16.24.121:39590/', pathRewrite: { '^/hrm': '' } }
  },
  build: {
    transpile: [/^element-ui/],
    extend (config, ctx) {
      config.module.rules.push({
        test: /\.ya?ml$/,
        use: [ 'json-loader', 'yaml-loader' ]
      })
    }
  },
  ignore: ['**/*.test.*', '**/*.spec.*', '**/*.*.*']
}

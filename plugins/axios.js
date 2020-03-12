import { Message } from 'element-ui'
const requestToken = []
export default function ({ $axios, store, redirect, app }) {
  $axios.onRequest((config) => {
    config.headers.token = store.state.authorization || ''
    const source = $axios.CancelToken.source()
    requestToken.push(source)
    config.cancelToken = source.token
  }, (error) => {
    Message.error({
      showClose: true,
      message: '加载超时'
    })
    Promise.reject(error)
  })
  $axios.onError((error) => {
    const code = parseInt(error.response && error.response.status)
    if (error.response && error.response.data && error.response.data.message) {
      Message.error({
        showClose: true,
        message: `接口访问错误：${error.response.data.message}`
      })
    }
    if (code === 400) {
      // redirect('/400')
    }
  })
  app.router.beforeEach((to, from, next) => {
    while (requestToken.length > 0) {
      requestToken.shift().cancel()
    }
    next()
  })
}

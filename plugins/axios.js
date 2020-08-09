import { Message } from 'element-ui'
import conf from '~/config'
const requestToken = []

export default function ({ $axios, store, redirect, app }) {
  $axios.onRequest((config) => {
    config.headers.token = store.state.authorization || ''
    if (conf.name === 'middleground' && store.state.application.applicationId) {
      config.headers.exp = store.state.application.applicationId
    }
    if (conf.name === 'hrm' && store.state.userinfo.tenantId) {
      config.headers.exg = store.state.userinfo.tenantId
    }
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
  $axios.onResponse(({ config, data }) => { // 默认除了2XX之外的都是错误的，就会走这里
    requestToken.some((item, index) => {
      if (item.token === config.cancelToken) {
        requestToken.splice(index, 1)
        return true
      }
    })
    const code = parseInt(data.status)
    if (code === 205519) {
      store.commit('logout')
      Message.error({
        message: '用户凭证已过期，重新登录'
      })
      redirect('/login')
      return true
    }
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

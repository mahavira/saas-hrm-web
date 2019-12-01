import { Message } from 'element-ui'

export default function ({ $axios, store, redirect }) {
  $axios.onRequest((config) => {
    console.log('Making request to ' + config.url)
    config.headers.token = store.state.authorization || ''
  }, (error) => {
    Message.error({
      message: '加载超时'
    })
    Promise.reject(error)
  })
  $axios.onError((error) => {
    const code = parseInt(error.response && error.response.status)
    if (error.response.data && error.response.data.message) {
      Message.error(error.response.data.message)
    }
    if (code === 400) {
      // redirect('/400')
    }
  })
}

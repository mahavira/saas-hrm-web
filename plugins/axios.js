export default function ({ $axios, store, redirect }) {
  $axios.onRequest((config) => {
    console.log('Making request to ' + config.url)
    config.headers.token = store.state.authorization || ''
  })
  $axios.onError((error) => {
    const code = parseInt(error.response && error.response.status)
    if (code === 400) {
      // redirect('/400')
    }
  })
}

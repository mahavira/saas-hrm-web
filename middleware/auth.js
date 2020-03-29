export default function ({ store, redirect, route }) {
  console.log(route.name)
  if (route.name === 'login') {
    return true
  }
  if (!store.state.authorization) {
    redirect('/login')
    return false
  }
}

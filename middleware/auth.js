export default function ({ store, redirect, route }) {
  if (route.name === 'login') {
    return true
  }
  if (!store.state.authorization || !store.state.application.applicationId) {
    return redirect('/login')
  }
}

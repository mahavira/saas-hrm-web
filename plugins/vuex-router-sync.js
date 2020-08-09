import defaultMenus from '~/config/menu.yml'
import { findChildren } from '~/utils/collection'

const moduleName = 'route'
function cloneRoute (to, from) {
  const clone = {
    name: to.name,
    path: to.path,
    hash: to.hash,
    query: to.query,
    params: to.params,
    fullPath: to.fullPath,
    meta: to.meta
  }
  if (from) {
    clone.from = cloneRoute(from)
  }
  return Object.freeze(clone)
}

export default function ({ app, store }) {
  store.registerModule(moduleName, {
    namespaced: true,
    state: cloneRoute(app.router.currentRoute),
    getters: {
      currentPaths: state => state.path.split('/').filter(n => !!n),
      currentMenus (state, getters) {
        const paths = []
        const menus = defaultMenus
        // const menus = store.state.menus
        const res = [
          menus,
          ...getters.currentPaths.map((path) => {
            paths.push(path)
            return findChildren(menus, [...paths])
          }).filter(n => !!n)
        ]
        return res
      }
    },
    mutations: {
      'ROUTE_CHANGED' (state, transition) {
        store.state[moduleName] = cloneRoute(transition.to, transition.from)
      }
    }
  })

  let isTimeTraveling = false
  let currentPath

  // sync router on store change
  const storeUnwatch = store.watch(
    state => state[moduleName],
    (route) => {
      const { fullPath } = route
      if (fullPath === currentPath) {
        return
      }
      if (currentPath != null) {
        isTimeTraveling = true
        app.router.push(route)
      }
      currentPath = fullPath
    },
    { sync: true }
  )

  // sync store on router navigation
  const afterEachUnHook = app.router.afterEach((to, from) => {
    if (isTimeTraveling) {
      isTimeTraveling = false
      return
    }
    currentPath = to.fullPath
    store.commit(moduleName + '/ROUTE_CHANGED', { to, from })
  })

  return function unsync () {
    // On unsync, remove router hook
    if (afterEachUnHook != null) {
      afterEachUnHook()
    }

    // On unsync, remove store watch
    if (storeUnwatch != null) {
      storeUnwatch()
    }

    // On unsync, unregister Module with store
    store.unregisterModule(moduleName)
  }
}

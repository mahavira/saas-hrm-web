import Vue from 'vue'
import createPersistedState from 'vuex-persistedstate'
import { Message } from 'element-ui'
import { translateDataToTree, treeToEmap } from '~/utils'

// 参与本地存储
const includeStorageState = [
  'authorization',
  'userinfo',
  'apps',
  'application',
  'menus',
  'permission',
  'rolePermissionDtos',
  'orgs'
]
export default {
  strict: process.env.NODE_ENV !== 'production',
  plugins: [createPersistedState({
    setState: (key, state, storage) => {
      const saved = {}
      Object.keys(state).filter(s => includeStorageState.includes(s)).forEach((k) => {
        saved[k] = state[k]
      })
      return storage.setItem(key, JSON.stringify(saved))
    }
  })],
  getters: {
    permission (state) {
      const path = state.route.path
      const permission = state.permission
      if (permission[path]) {
        return permission[path]
      }
      return []
    },
    organId ({ orgs }) {
      if (orgs && orgs.length) {
        return orgs[0].organId
      }
      return null
    }
  },
  state: {
    userinfo: {},
    apps: [],
    menus: [],
    authorization: '',
    rolePermissionDtos: [],
    application: {},
    permission: {}, // 按钮权限
    orgs: []
  },
  mutations: {
    set (state, payload) {
      Object.keys(payload).forEach((k) => {
        Vue.set(state, k, payload[k])
      })
    },
    logout (state) {
      state.apps = []
      state.authorization = ''
      state.userinfo = {}
      state.menus = []
      state.rolePermissionDtos = []
      state.application = {}
      state.permission = {}
      state.orgs = []
    }
  },
  actions: {
    switchApp ({ state, commit }, e) {
      if (!state.rolePermissionDtos.length) {
        Message.error({
          message: '当前用户没有配置权限信息！',
          showClose: true
        })
        return false
      }
      const application = e.ltApplicationDto
      const menus = state.rolePermissionDtos[0].menus
      const treeMenus = translateDataToTree(menus, '1')
      const permission = {}
      const findBtns = (data, names) => {
        if (data.children && data.children.length) {
          if (data.children[0].menuType === '2') {
            permission['/' + names.join('/')] = data.children.map(item => item.buttonType)
            delete data.children
          } else {
            data.children.forEach(item => findBtns(item, [...names, item.keyName]))
          }
        }
      }
      treeMenus.forEach(item => findBtns(item, [item.keyName]))
      commit('set', {
        menus: treeToEmap(treeMenus, { url: 'path', keyName: 'name', icon: 'icon', name: 'label' }),
        permission,
        application
      })
      return true
    }
  }
}

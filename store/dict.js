import { isString } from '~/utils'
export default {
  state: {
    degree: {},
    education: {},
    learning_way: {},
    degree_type: {}
  },
  mutations: {
    set (state, payload) {
      state[payload.key] = payload.value
    }
  },
  actions: {
    async fetch ({ state, commit, dispatch }, type = []) {
      if (!isString(type)) {
        return type.forEach(e => dispatch('fetch', e))
      }
      if (!state[type] || Object.keys(state[type]).length) { return }
      const { data } = await this.$axios.post('hrDict/list', { type })
      const map = {}
      data.data.forEach((item) => {
        map[item.id] = item.value
      })
      commit('set', {
        key: type,
        value: map
      })
    }
  }
}

export default {
  state: {
    degree: {},
    education: {},
    learning_way: {}
  },
  mutations: {
    set (state, payload) {
      state[payload.key] = payload.value
    }
  },
  actions: {
    async fetch ({ commit }, type = 'degree_type') {
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

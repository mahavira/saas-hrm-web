import { isArray } from '~/utils'
const awaitRequests = []

export default {
  state: {
    data: {
      province: {},
      city: {},
      offerState: {
        1: '已接受',
        0: '未接受'
      },
      gender: {
        'man': '男',
        'woman': '女'
      },
      sex: {
        'man': '男',
        'woman': '女'
      }
    }
  },
  mutations: {
    set (state, payload) {
      state.data[payload.key] = payload.value
    }
  },
  actions: {
    async fetch ({ state, commit, dispatch }, dictType = '') {
      if (isArray(dictType)) {
        return dictType.forEach(e => dispatch('fetch', e))
      }
      if (state[dictType] && Object.keys(state[dictType]).length) { return }
      if (awaitRequests.includes(dictType)) { return }
      try {
        awaitRequests.push(dictType)
        const { data } = await this.$axios.post('hrRedisCache/list', { type: dictType })
        if (!data.data || !data.data.length) {
          throw new Error(`字典[${dictType}]没有数据`)
        }
        const map = {}
        data.data.forEach((item) => {
          map[item.id] = item.value
        })
        commit('set', {
          key: dictType,
          value: map
        })
      } catch (e) {
        console.error(e)
      } finally {
        awaitRequests.splice(awaitRequests.indexOf(dictType), 1)
      }
    },
    async fetchProvince ({ state, commit }) {
      if (state.province && Object.keys(state.province).length) { return }
      try {
        const { data } = await this.$axios.post('/ltArea/province')
        const map = {}
        data.data.forEach((item) => {
          map[item.code] = item.name
        })
        commit('set', {
          key: 'province',
          value: map
        })
      } catch (e) {
        console.error(e)
      }
    },
    async fetchCity ({ state, commit }, parentId) {
      if (state.city[parentId] && Object.keys(state.city[parentId]).length) { return }
      try {
        const { data } = await this.$axios.post('/ltArea/city', {
          parentId
        })
        const map = {}
        data.data.forEach((item) => {
          map[item.code] = item.name
        })
        const value = Object.assign({ [parentId]: map }, state.city)
        commit('set', {
          key: 'city',
          value
        })
      } catch (e) {
        console.error(e)
      }
    }
  }
}

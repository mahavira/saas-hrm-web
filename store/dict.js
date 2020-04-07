import Vue from 'vue'
import { isArray } from '~/utils'
const awaitRequests = []
const defaultData = {
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
export default {
  state: {
    data: defaultData
  },
  getters: {
    g: state => (key) => {
      if (state.data[key]) {
        return state.data[key]
      }
      return null
    }
  },
  mutations: {
    set (state, { key, value }) {
      Vue.set(state.data, key, value)
    }
  },
  actions: {
    async fetch ({ state, rootState, commit, dispatch }, dictType = '') {
      if (dictType === 'jobs') {
        return dispatch('fetchJobs')
      }
      if (isArray(dictType)) {
        return dictType.forEach(e => dispatch('fetch', e))
      }
      if (state.data[dictType] || awaitRequests.includes(dictType)) { return }
      if (dictType === 'province') {
        return dispatch('fetchProvince')
      }
      try {
        awaitRequests.push(dictType)
        const { data } = await this.$axios.post('hrRedisCache/list', {
          type: dictType,
          tenantId: rootState.application.tenantId
        })
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
      if (state.data.province && Object.keys(state.data.province).length) { return }
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
      if (state.data.city && state.data.city[parentId] && Object.keys(state.data.city[parentId]).length) { return }
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
    },
    async fetchJobs ({ commit }) {
      try {
        const { data } = await this.$axios.post('ltPost/list', {
          limit: 99999
        }, {
          baseURL: '/ucsp'
        })
        if (data.status === 0 || data.status === 200) {
          const map = {}
          data.data.forEach((item) => {
            map[item.id] = item.postName
          })
          commit('set', {
            key: 'jobs',
            value: map
          })
        }
      } finally {
      }
    }
  }
}

import Vue from 'vue'
import { isArray } from '~/utils'
const awaitRequests = []
const defaultData = {
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
      } else if (dictType === 'organ') {
        return dispatch('fetchOrgan')
      }
      try {
        awaitRequests.push(dictType)
        const { data } = await this.$axios.post('/hrDict/idList', {
          type: dictType,
          tenantId: rootState.userinfo.tenantId || '1'
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
    async fetchProvince ({ state, commit, rootState }) {
      if (state.data.province && Object.keys(state.data.province).length) { return }
      try {
        const { data } = await this.$axios.post('/hrArea/province', {
          tenantId: rootState.userinfo.tenantId || '1'
        })
        const map = {}
        data.data.list.forEach((item) => {
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
    async fetchCity ({ state, commit, rootState }, parentId) {
      if (state.data.city && state.data.city[parentId] && Object.keys(state.data.city[parentId]).length) { return }
      try {
        const { data } = await this.$axios.post('/hrArea/city', {
          parentId,
          tenantId: rootState.userinfo.tenantId || '1'
        })
        const map = {}
        data.data.list.forEach((item) => {
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
    },
    async fetchOrgan ({ getters, rootState, state, commit }, parentId) {
      try {
        const { data } = await this.$axios.post('/hrOrgan/staff', {
          organId: getters.organId,
          tenantId: rootState.userinfo.tenantId || '1'
        })
        const map = {}
        data.data.list.forEach((item) => {
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

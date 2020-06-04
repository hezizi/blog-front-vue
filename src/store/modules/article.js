import { articleList } from '@/services/api'

export default {
  state: {
    hottest: [],  // 最热
    latest: [],  // 最新
  },

  mutations: {
    SET_HOTTEST_ARTICLE: (state, payload) => {
      state.hottest = payload
    },
    SET_LATEST_ARTICLE: (state, payload) => {
      state.latest = payload
    }
  },
  
  actions: {
    setHottest({ commit }, params) {
      articleList(params).then(res => {
        commit('SET_HOTTEST_ARTICLE', res.result.data)
      })
    },
    setLatest({ commit }, params) {
      articleList(params).then(res => {
        commit('SET_LATEST_ARTICLE', res.result.data)
      })
    }
  }
}
import { articleList } from '@/services/api'

export default {
  state: {
    allPosts: []
  },

  mutations: {
    SET_ALL_POSTS: (state, payload) => {
      state.allPosts = payload
    }
  },

  actions: {
    setAllPosts({ commit }) {
      articleList().then(res => {
        const posts = res.result.data
        commit('SET_ALL_POSTS', posts)
      })
    }
  }
}

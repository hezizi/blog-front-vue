import { tagList } from '@/services/api'

export default {
  state: {
    allTags: [],
    selectedTag: ''
  },

  mutations: {
    SET_ALL_TAGS: (state, payload) => {
      state.allTags = payload
    },
    SET_SELECTED_TAG: (state, payload) => {
      state.selectedTag = payload
    }
  },
  
  actions: {
    setAllTags({ commit }) {
      tagList().then(res => {
        const newRes = res.result.data.map(t => {
          t.article && t.article.map((a, i) => {
            if (a.status !== 'published') t.article.splice(i, 1)
          })
          return t
        })
        commit('SET_ALL_TAGS', newRes)
      })
    },
    setSelectedTag({ commit }, payload) {
      commit('SET_SELECTED_TAG', payload)
    }
  }
}
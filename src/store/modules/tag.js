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
        commit('SET_ALL_TAGS', res.result.data)
      })
    },
    setSelectedTag({ commit }, payload) {
      commit('SET_SELECTED_TAG', payload)
    }
  }
}
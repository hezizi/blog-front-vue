import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import user from './modules/user'
import tag from './modules/tag'
import article from './modules/article'
import getters from './getters'

export default new Vuex.Store({
  state: {

  },
  mutations: {

  },
  actions: {

  },
  modules: {
    user,
    tag,
    article
  },
  getters
})

import { login } from '@/services/api'
import { setStorage, removeStorage } from '@/utils/storage'

export default {
  state: {
    token: '',
    userInfo: {}
  },

  mutations: {
    SET_TOKEN: (state, payload) => {
      state.token = payload
    },
    SET_USERINFO: (state, payload) => {
      state.userInfo = payload
    }
  },

  actions: {
    loginAction({ commit }, payload) {
      return login(payload).then(res => {
        if (res.status) {
          const { token, userInfo } = res.result.data

          // Object.keys(mutations).map(key => {
          //   commit(key, token)
          // })

          commit('SET_TOKEN', token)
          commit('SET_USERINFO', userInfo)
          setStorage('GITHUB_ACCESS_TOKEN', token)
          setStorage('GITHUB_INFO', userInfo)
          return Promise.resolve(userInfo.github)
        } else {
          return Promise.reject(res.message)
        }
      })
    },

    logoutAction({ commit }) {
      commit('SET_TOKEN', '')
      commit('SET_USERINFO', {})
      removeStorage('GITHUB_ACCESS_TOKEN')
      removeStorage('GITHUB_INFO')
      return Promise.resolve('已退出')
    }
  }
}
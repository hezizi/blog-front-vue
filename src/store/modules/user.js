import { login } from '@/services/api'
import { setStorage, removeStorage } from '@/utils/storage'

export default {
  state: {
    userInfo: {}
  },

  mutations: {
    SET_USERINFO: (state, payload) => {
      state.userInfo = payload
    }
  },

  actions: {
    loginAction({ commit }, payload) {
      return login(payload).then(res => {
        if (res && res.status) {
          const { token, userInfo } = res.result.data
          commit('SET_USERINFO', userInfo)
          setStorage('GITHUB_INFO', userInfo)
          setStorage('GITHUB_ACCESS_TOKEN', token)
          return Promise.resolve(userInfo)
        } else {
          return Promise.reject('登录失败')
        }
      })
    },

    logoutAction({ commit }) {
      commit('SET_USERINFO', {})
      removeStorage('GITHUB_INFO')
      removeStorage('GITHUB_ACCESS_TOKEN')
      setTimeout(() => {
        return Promise.resolve('已退出')
      }, 500)
    }
  }
}
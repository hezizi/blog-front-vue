import Vue from 'vue'
import App from './App.vue'

import router from './router'
import store from './store'
import { getStorage } from '@/utils/storage'

import moment from 'moment'
moment.locale('zh-cn')
Vue.prototype.moment = moment

import Antd from 'ant-design-vue/es'
import 'ant-design-vue/dist/antd.css'
import '@/assets/styles/index.scss'

Vue.use(Antd)
// import { message, Icon, BackTop, Skeleton, Tag } from 'ant-design-vue'

// Vue.use(Icon)
// Vue.use(BackTop)
// Vue.use(Skeleton)
// Vue.use(Tag)
// Vue.prototype.$message = message

Vue.config.productionTip = false

new Vue({
  router,
  store,
  mounted() {
    store.commit('SET_TOKEN', getStorage('GITHUB_ACCESS_TOKEN'))
    store.commit('SET_USERINFO', getStorage('GITHUB_INFO'))
  },
  render: h => h(App)
}).$mount('#app')

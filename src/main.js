import Vue from 'vue'
import App from './App.vue'

import router from './router'
import store from './store'

import Antd from 'ant-design-vue/es'

import 'ant-design-vue/dist/antd.css'
import '@/assets/styles/index.scss'

// import { message, Icon, BackTop, Skeleton, Tag } from 'ant-design-vue'

// Vue.use(Icon)
// Vue.use(BackTop)
// Vue.use(Skeleton)
// Vue.use(Tag)
// Vue.prototype.$message = message

Vue.use(Antd)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

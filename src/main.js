import Vue from 'vue'
import App from './App.vue'

import router from './router'
import store from './store'
import SvgIcon from '@/components/icon'
import { getStorage } from '@/utils/storage'

import moment from 'moment'
moment.locale('zh-cn')
Vue.prototype.moment = moment

import VueLazyload from 'vue-lazyload'
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
Vue.use(VueLazyload, {
  // error: 'dist/error.png',
  loading: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1599662145948&di=a34b11cc695afcff74b9c407b9cb1293&imgtype=0&src=http%3A%2F%2Fimg4.imgtn.bdimg.com%2Fit%2Fu%3D439157189%2C4163695168%26fm%3D214%26gp%3D0.jpg'
})

// 全局注册SvgIcon组件
Vue.component('svg-icon', SvgIcon)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  mounted () {
    store.commit('SET_TOKEN', getStorage('GITHUB_ACCESS_TOKEN'))
    store.commit('SET_USERINFO', getStorage('GITHUB_INFO'))
    store.dispatch('setAllTags')
  },
  render: h => h(App)
}).$mount('#app')

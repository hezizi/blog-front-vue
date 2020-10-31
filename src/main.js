import Vue from 'vue'
import App from './App.vue'

import router from './router'
import store from './store'
import SvgIcon from '@/components/icon'
import { getStorage } from '@/utils/storage'

import dayjs from 'dayjs'
const relativeTime = require('dayjs/plugin/relativeTime')
dayjs.locale('zh-cn')
dayjs.extend(relativeTime)
Vue.prototype.dayjs = dayjs

import VueLazyload from 'vue-lazyload'
// import Antd from 'ant-design-vue/es'
// import 'ant-design-vue/dist/antd.css'
import '@/assets/styles/index.scss'

import {
  BackTop,
  Anchor,
  Tag,
  Tooltip,
  Breadcrumb,
  Comment,
  List,
  Avatar,
  Button,
  Icon,
  Spin,
  Form,
  Skeleton,
  Timeline,
  Row,
  Col,
  Radio,
  Pagination,
  Affix,
  Badge,
  Divider,
  Empty,
  message
} from 'ant-design-vue'

Vue.use(BackTop)
Vue.use(Anchor)
Vue.use(Tag)
Vue.use(Tooltip)
Vue.use(Breadcrumb)
Vue.use(Comment)
Vue.use(List)
Vue.use(Avatar)
Vue.use(Button)
Vue.use(Icon)
Vue.use(Spin)
Vue.use(Form)
Vue.use(Skeleton)
Vue.use(Timeline)
Vue.use(Row)
Vue.use(Col)
Vue.use(Radio)
Vue.use(Pagination)
Vue.use(Affix)
Vue.use(Badge)
Vue.use(Divider)
Vue.use(Empty)
Vue.prototype.$message = message

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

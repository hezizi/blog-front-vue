import Vue from 'vue'
import App from './App.vue'

import router from './router'
import store from './store'
import SvgIcon from '@/components/icon'
import { getStorage } from '@/utils/storage'

// dayjs
import dayjs from 'dayjs'
const relativeTime = require('dayjs/plugin/relativeTime')
dayjs.locale('zh-cn')
dayjs.extend(relativeTime)
Vue.prototype.dayjs = dayjs

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
  Input,
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
  Modal,
  Menu,
  Dropdown,
  Drawer
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
Vue.use(Input)
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
Vue.use(Modal)
Vue.use(Menu)
Vue.use(Dropdown)
Vue.use(Drawer)
Vue.prototype.$confirm = Modal.confirm

import VueLazyload from 'vue-lazyload'
Vue.use(VueLazyload, {
  // error: 'dist/error.png',
  loading: require('./assets/images/loading.gif')
})

// 全局注册SvgIcon组件
Vue.component('svg-icon', SvgIcon)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  mounted() {
    store.commit('SET_TOKEN', getStorage('GITHUB_ACCESS_TOKEN'))
    store.commit('SET_USERINFO', getStorage('GITHUB_INFO'))
    store.dispatch('setAllTags')
    store.dispatch('setAllPosts') // 如果严重影响首屏加载可以去掉此功能
  },
  render: h => h(App)
}).$mount('#app')

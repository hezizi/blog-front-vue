import Vue from 'vue'
import VueRouter from 'vue-router'

// import store from '@/store'
import routes from './routes'
import { getStorage } from '@/utils/storage'

Vue.use(VueRouter)

/**
 * 添加这段代码用于处理该错误
 * vue-router.esm.js?8c4f:2007
 * Uncaught (in promise) NavigationDuplicated {_name: "NavigationDuplicated", name: "NavigationDuplicated"}
 */
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  // scrollBehavior: () => ({ y: 0 }),
  routes
})

/* 路由守卫 */
router.beforeEach((to, from, next) => {
  const token = getStorage('GITHUB_ACCESS_TOKEN')
  // const token = store.getters.token
  if (token) {
    to.path.includes('auth') ? next(from.path) : next()
  }
  next()
})

export default router

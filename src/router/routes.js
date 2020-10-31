import { BasicLayout } from '@/layouts'

export default [{
  path: '/',
  component: BasicLayout,
  children: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/views/home'),
      meta: {
        // breadcrumb: 'Home'
        keepAlive: false
      }
    }, {
      // 文章详情
      path: '/article/:articleId',
      name: 'article',
      component: () => import('@/views/article'),
      props: true,
      meta: {
        // breadcrumb: '文章',
        keepAlive: false
      }
    }, {
      // 标签
      path: '/tag',
      name: 'tag',
      component: () => import('@/views/tag'),
      meta: {
        // breadcrumb: '标签'
      }
    }, {
      // 标签
      path: '/tag/:name',
      name: 'tagArticle',
      breadcrumb: '',
      component: () => import('@/views/tag/ArticleList'),
      props: true,
      meta: {
        keepAlive: false
      }
    }, {
      // 归档
      path: '/archive',
      name: 'archive',
      component: () => import('@/views/archive'),
      meta: {
        // breadcrumb: '归档'
      }
    }, {
      // 关于
      path: '/about',
      name: 'about',
      component: () => import('@/views/about'),
      meta: {
        breadcrumb: '关于'
      }
    }, {
      path: '/auth',
      name: 'auth',
      component: () => import('@/components/github-auth'),
      meta: {
        keepAlive: false
      }
    }
  ]
}, {
  // 404页面
  path: '*',
  component: () => import('@/views/error/Error_404')
}]

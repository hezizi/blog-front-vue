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
        keepAlive: false
      }
    }, {
      // 文章详情
      path: '/article/:articleId',
      name: 'article',
      component: () => import('@/views/article'),
      props: true,
      meta: {
        keepAlive: false
      }
    }, {
      // 标签
      path: '/tag',
      name: 'tag',
      component: () => import('@/views/tag')
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
      component: () => import('@/views/archive')
    }, {
      // 关于
      path: '/about',
      name: 'about',
      component: () => import('@/views/about')
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

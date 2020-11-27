import { BasicLayout } from '@/layouts'

export default [{
  path: '/',
  component: BasicLayout,
  children: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/views/home')
    }, {
      // 文章详情
      path: '/article/:articleId',
      name: 'article',
      component: () => import('@/views/article'),
      props: true,
      meta: {
        breadcrumb: {
          title: '文章',
          link: '/archive'
        }
      }
    }, {
      // 标签
      path: '/tags',
      name: 'tags',
      component: () => import('@/views/tag')
    }, {
      // 标签
      path: '/tag/:tagId',
      name: 'tag',
      component: () => import('@/views/tag/ArticleList'),
      props: true,
      meta: {
        breadcrumb: {
          title: '标签',
          link: '/tags'
        }
      }
    }, {
      // 归档
      path: '/archive',
      name: 'archive',
      component: () => import('@/views/archive'),
      meta: {
        keepAlive: true
      }
    }, {
      // 关于
      path: '/about',
      name: 'about',
      component: () => import('@/views/about'),
      meta: {
        keepAlive: true
      }
    }, {
      path: '/auth',
      name: 'auth',
      component: () => import('@/components/github-auth')
    }
  ]
}, {
  // 404页面
  path: '*',
  component: () => import('@/views/error')
}]

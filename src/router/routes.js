import { BasicLayout } from '@/layouts'

export default [{
  path: '/',
  component: BasicLayout,
  children: [
    {
      path: '/',
      name: 'home',
      breadcrumbName: 'Home',
      component: () => import('@/views/home')
    }, {
      // 文章详情
      path: '/article/:articleId',
      name: 'article',
      breadcrumbName: '文章',
      component: () => import('@/views/article'),
      props: true
    }, {
      // 标签
      path: '/tag/',
      name: 'tag',
      breadcrumbName: '标签',
      component: () => import('@/views/tag')
    }, {
      // 标签
      path: '/tag/:name',
      name: 'tagArticle',
      breadcrumbName: '',
      component: () => import('@/views/tag/ArticleList'),
      props: true
    }, {
      // 归档
      path: '/archive',
      name: 'archive',
      breadcrumbName: '归档',
      component: () => import('@/views/archive')
    }, {
      // 关于
      path: '/about',
      name: 'about',
      breadcrumbName: '关于',
      component: () => import('@/views/about')
    }, {
      path: '/auth',
      name: 'auth',
      component: () => import('@/components/github-auth')
    }
  ]
}, {
  // 404页面
  path: '*',
  component: () => import('@/views/error/Error_404')
}]

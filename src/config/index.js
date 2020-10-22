/**
 * about me相关配置
 */
// 头像
const USER_AVATAR = require('@/assets/images/ahh.png')

// 名称
const USER_NAME = '赫子子'

// 介绍
const USER_INTRODUCE = 'API 码农，码农圈中的一粒尘埃'

// 描述
const USER_DESC = `
  我是赫子子，
  熟练掌握前端领域部分技术栈 API 的调用，目标是写 API 供他人调用；
  重度音乐爱好者，音乐串联我的故事；
  技术很水，但正在努力让自己不那么水；
  有一个公众号，欢迎大家关注
`

// 微信 公众号
const USER_WX = {
  wx: '微信：KK1340599486',
  wx_img: require('@/assets/images/wx.jpg'),
  wxgzh: '微信公众号：前端仓库',
  wxgzh_img: require('@/assets/images/wxgzh.jpg')
}

// 其他社区
const OTHER_LINKS = [{
  title: 'Github',
  icon: '',
  link: 'https://github.com/hezizi'
}, {
  title: '掘金',
  icon: '',
  link: 'https://juejin.im/user/59c126ce6fb9a00a3d134eea'
}, {
  title: '思否',
  icon: '',
  link: 'https://segmentfault.com/u/hezizi'
}, {
  title: 'CSDN',
  icon: '',
  link: 'https://blog.csdn.net/yucihent'
}, {
  // title: '知乎',
  // icon: '',
  // link: ''
}, {
  title: '简书',
  icon: '',
  link: 'https://www.jianshu.com/u/c1096b3b83eb'
}]

/**
 * github授权登录配置
 */
const GITHUB = {
  client_id: '277e5ee3373cd755fb40',
  auth_url: 'https://github.com/login/oauth/authorize'
}

/**
 * 评论头像
 */
import { getStorage } from '@/utils/storage'
const COMMIT_AVATAR = getStorage('GITHUB_INFO') && getStorage('GITHUB_INFO').github.avatar_url

const appConfig = () => ({
  USER_AVATAR,
  USER_NAME,
  USER_INTRODUCE,
  USER_DESC,
  USER_WX,
  OTHER_LINKS,
  COMMIT_AVATAR,
  GITHUB
})

export default appConfig

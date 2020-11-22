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
  各位coder👨‍💻👩‍💻，欢迎来到我的博客👏👏👏，
  我是赫子子，
  熟练掌握前端领域部分技术栈 API 的调用，目标是写 API 供他人调用；
  重度音乐爱好者，音乐🎵串联我的故事；
  技术很水，正在努力让自己不那么水；
  有个公众号【前端仓库】，欢迎大家关注
`

// 微信 公众号
const USER_WX = [{
  text: '微信：KK1340599486',
  icon: 'weixin',
  img: require('@/assets/images/wx.jpg')
}, {
  text: '微信公众号：【前端仓库】',
  icon: 'weixingzh',
  img: require('@/assets/images/wxgzh.png')
}]

// 其他社区
const OTHER_LINKS = [{
  label: 'Github',
  icon: 'github',
  link: 'https://github.com/hezizi'
}, {
  label: '掘金',
  icon: 'juejin',
  link: 'https://juejin.im/user/59c126ce6fb9a00a3d134eea'
}, {
  label: '思否',
  icon: 'segmentfault',
  link: 'https://segmentfault.com/u/hezizi'
}, {
  label: 'CSDN',
  icon: 'csdn',
  link: 'https://blog.csdn.net/yucihent'
}, {
  label: '知乎',
  icon: 'zhihu',
  link: ''
}, {
  label: '简书',
  icon: 'jianshu',
  link: 'https://www.jianshu.com/u/c1096b3b83eb'
}]

/**
 * github授权登录配置
 */
const GITHUB = {
  client_id: 'b6c0e96509a9181764bc',
  auth_url: 'https://github.com/login/oauth/authorize'
}

/**
 * 评论头像
 */
import { getStorage } from '@/utils/storage'
const COMMENT_AVATAR = getStorage('GITHUB_INFO') && getStorage('GITHUB_INFO').github.avatar_url


export default {
  USER_AVATAR,
  USER_NAME,
  USER_INTRODUCE,
  USER_DESC,
  USER_WX,
  OTHER_LINKS,
  COMMENT_AVATAR,
  GITHUB
}

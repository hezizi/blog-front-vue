/* 个人中心 */
// 头像
const USER_AVATAR = require('@/assets/images/ahh.png')
// 名称
const USER_NAME = '赫子子'
// 描述
const USER_DESC = 'API 码农，年纪轻轻脑壳就很凉'
// 微信
const USER_WX = {   
  wx: '微信：KK1340599486',
  img: require('@/assets/images/wx.jpg')
}
// 公众号
// const USER_WXGZH = require('@/assets/images/wxghz.jpg')
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


const userInfo = () => ({
  USER_AVATAR,
  USER_NAME,
  USER_DESC,
  USER_WX,
  // USER_WXGZH,
  OTHER_LINKS
})

export default userInfo
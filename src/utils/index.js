import marked from 'marked'
import hljs from 'highlight'
import dayjs from 'dayjs'
import { message } from 'ant-design-vue'
message.config({
  duration: 1.5,
  maxCount: 3,  // 最多显示3个
})

/* markdown转html */
export const markdownToHtml = markdown => marked(markdown, {
  renderer: new marked.Renderer(),
  gfm: true,
  pedantic: false,
  sanitize: false,
  tables: true,
  breaks: true,
  smartLists: true,
  smartypants: true,
  highlight: code => hljs.highlightAuto(code).value
})


/* 日期格式转换 */
export const dateFormat = date =>
  dayjs(new Date(date).toLocaleString('zh-CN', { hour12: false })).format('YYYY-MM-DD HH:mm:ss')


/* 根据数量定大小 */
export const setSizeByCount = count => {
  switch (true) {
    case count === 0:
      return 14
    case count > 0 && count <= 5:
      return 18
    case count > 5 && count <= 10:
      return 24
    case count > 10 && count <= 15:
      return 28
    default:
      return 32
  }
}


/* message */
export const showMessage = (type, msg) => {
  message[type]({
    content: msg,
    icon: h => <svg-icon icon-name={type} />
    // icon: h => h('svg-icon', {
    //   'attrs': {
    //     'icon-name': type
    //   }
    // })
  })
}

import marked from 'marked'
import hljs from 'highlight.js'
import moment from 'moment'


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
  moment(new Date(date).toLocaleString('zh-CN', { hour12: false })).format('YYYY-MM-DD HH:mm:ss')


/* 根据数量定大小 */
export const setSizeByCount = count => {
  switch (true) {
    case count <= 3:
      return 16
    case 3 < count <= 8:
      return 20
    case 8 < count <= 15:
      return 24
    default:
      return 14
  }
}
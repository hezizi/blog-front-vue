import marked from 'marked'
import hljs from 'highlight.js'
import moment from 'moment'

/* markdown转html */
export const markdownToHtml = markdown => {
  return marked(markdown, {
    renderer: new marked.Renderer(),
    gfm: true,
    pedantic: false,
    sanitize: false,
    tables: true,
    breaks: true,
    smartLists: true,
    smartypants: true,
    highlight: code => {
      return hljs.highlightAuto(code).value
    }
  })
}

/* 日期格式转换 */
export const dateFormat = date => 
  moment(new Date(date).toLocaleString('zh-CN', { hour12: false })).format('YYYY-MM-DD HH:mm:ss')
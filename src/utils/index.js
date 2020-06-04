
import marked from 'marked'
import hljs from 'highlight.js'

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
export const dateFormat = date => new Date(date).toLocaleString('zh-CN', { hour12: false }).replace(/\//g, '-')
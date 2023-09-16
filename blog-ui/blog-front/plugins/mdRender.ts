import MarkdownIt from 'markdown-it'
import hljs from 'highlight.js'

import MILA from 'markdown-it-link-attributes'
import MIK from 'markdown-it-katex'
import MIF from 'markdown-it-footnote'
import MIS from 'markdown-it-sub'
import MITL from 'markdown-it-task-lists'
import MIA from 'markdown-it-anchor'

const mdRender = (mdContent: string) => {
  const md = new MarkdownIt({
    html: true,
    linkify: true,
    typographer: true,
    breaks: true,
    highlight: function (str: string, lang: string): string {
      // 生成行号
      const linesLength = str.split(/\n/).length - 1
      let linesNum = '<span aria-hidden="true" class="line-numbers-rows">'
      for (let index = 0; index < linesLength; index++) {
        linesNum = linesNum + '<span></span>'
      }
      linesNum += '</span>'
      if (lang == null) {
        lang = 'java'
      }
      // 当前时间加随机数生成唯一的id标识
      var d = new Date().getTime()
      const codeIndex = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(
        /[xy]/g,
        function (c) {
          var r = (d + Math.random() * 16) % 16 | 0
          d = Math.floor(d / 16)
          return (c == 'x' ? r : (r & 0x3) | 0x8).toString(16)
        }
      )
      // 复制功能主要使用的是 clipboard.js
      let html = `<button class="copy-btn" data-clipboard-action="copy" data-clipboard-target="#copy${codeIndex}"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"><path fill="currentColor" d="M3 21q-.825 0-1.413-.588T1 19V6h2v13h17v2H3Zm4-4q-.825 0-1.413-.588T5 15V4q0-.825.588-1.413T7 2h5l2 2h7q.825 0 1.413.588T23 6v9q0 .825-.588 1.413T21 17H7Zm0-2h14V6h-7.825l-2-2H7v11Zm0 0V4v11Z"/></svg></button>`
      if (lang && hljs.getLanguage(lang)) {
        // highlight.js 高亮代码
        const preCode = hljs.highlight(str, {
          language: lang,
          ignoreIllegals: true,
        }).value
        html = html + preCode
        if (linesLength) {
          html += '<b class="name">' + lang + '</b>'
        }
        // 将代码包裹在 textarea 中，由于防止textarea渲染出现问题，这里将 "<" 用 "<" 代替，不影响复制功能
        return `<pre class="hljs"><code>${html}</code>${linesNum}</pre><textarea style="position: absolute;top: -9999px;left: -9999px;z-index: -9999;" id="copy${codeIndex}">${str.replace(
          /<\/textarea>/g,
          '</textarea>'
        )}</textarea>`
      }
      return `<pre class="hljs"><code>${md.utils.escapeHtml(str)}</code></pre>`
    },
  })

  md.use(MILA, {
    attrs: {
      target: '_blank',
      rel: 'noopener',
    },
  })
    .use(MIK)
    .use(MIF)
    .use(MIS)
    .use(MITL)
    .use(MIA.default, {
      slugify: (id: string) => id,
    })

  return md.render(mdContent)
}

function deleteHTMLTag(mdContent: string) {
  return mdRender(mdContent)
    .replace(/<\/?[^>]*>/g, '')
    .replace(/[|]*\n/, '')
    .replace(/&npsp;/gi, '')
}

export default defineNuxtPlugin(() => {
  return {
    provide: {
      mdRender,
      deleteHTMLTag,
    },
  }
})

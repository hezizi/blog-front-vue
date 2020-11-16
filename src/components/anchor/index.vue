<template>
  <a-anchor :offsetTop="100">
    <a-anchor-link
      v-for="anchor in anchorList"
      :key="anchor.href"
      :href="anchor.href"
      :title="anchor.title"
    >
    </a-anchor-link>
  </a-anchor>
</template>

<script>
export default {
  name: 'Anchor',
  data() {
    return {
      anchorList: []
    }
  },
  methods: {
    /* 根据文章生成锚点目录 */
    getAnchorList(article) {
      const pattern = /<(h[1-6])[\s\S]+?(?=<\/\1>)/g
      const list = []
      function pushItem(arr, item) {
        const len = arr.length
        const matchItem = arr[len - 1]
        if (matchItem && matchItem.tag !== item.tag) {
          pushItem(matchItem.children, item)
        } else {
          arr.push(item)
        }
      }
      article.replace(pattern, ($0, $1) => {
        console.log('*********************************$0', $0)
        const title = $0.replace(/.*?>/, '')
        const startIndex = $0.indexOf('"')
        const endIndex = $0.indexOf('">')
        const href = `#${$0.slice(startIndex + 1, endIndex)}`
        const currentItem = {
          tag: $1, // 标签类型
          title,
          href,
          children: []
        }
        pushItem(list, currentItem)
      })
      this.anchorList = list
    }
  }
}
</script>

<style lang="scss" scoped>
  /deep/ .ant-anchor-ink-ball {
    border: 2px solid $themeColor;
  }
  /deep/ .ant-anchor-link-active > .ant-anchor-link-title {
    color: $themeColor;
  }
</style>

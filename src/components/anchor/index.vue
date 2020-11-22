<template>
  <div class="anchor-wrapper">
    <template v-if="bodyWidth < 768">
      <div class="drawer-btn" :class="{ open: visible === true }" @click="showDrawer">
        <div class="btn-icon" :class="{ open: visible === true }"></div>
      </div>

      <a-drawer
        placement="right"
        width="250"
        :closable="false"
        :visible="visible"
        @close="visible = false"
      >
        <a-anchor>
          <a-anchor-link
            v-for="anchor in anchorList"
            :key="anchor.href"
            :href="anchor.href"
            :title="anchor.title"
          >
          </a-anchor-link>
        </a-anchor>
      </a-drawer>
    </template>

    <template v-else>
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
  </div>
</template>

<script>
export default {
  name: 'Anchor',
  data() {
    return {
      anchorList: [],
      // drawer
      visible: false,
      bodyWidth: document.body.clientWidth
    }
  },
  mounted() {
    window.addEventListener('resize', this.onresize)
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.onresize)
  },
  methods: {
    onresize() {
      this.bodyWidth = document.body.clientWidth
    },

    showDrawer(e) {
      this.visible = true
      if (e.target.className.includes('open')) {
        this.visible = false
      }
    },

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
  .anchor-wrapper {
    .drawer-btn {
      @include flex($align: center, $justify: center);
      position: fixed;
      top: 200px;
      right: 0;
      z-index: 99999;
      width: 35px;
      height: 35px;
      background-color: #fff;
      border-radius: 4px 0 0 4px;
      cursor: pointer;
      box-shadow: 2px 0 8px rgba(0, 0, 0, .15);
      transition: transform .3s cubic-bezier(0.7, 0.3, 0.1, 1);
      &.open {
        box-shadow: 2px 0 8px rgba(0, 0, 0, 0);
        transform: translateX(-245px);
        transition: transform .3s cubic-bezier(0.7, 0.3, 0.1, 1);
        .btn-icon {
          background: transparent;
          &::before {
            transform: translateY(5px) rotate(45deg);
          }
          &::after {
            transform: translateY(-5px) rotate(-45deg);
          }
        }
      }
      .btn-icon {
        position: relative;
        width: 14px;
        height: 2px;
        background: #333;
        transition: background .3s cubic-bezier(0.7, 0.3, 0.1, 1);
        &::before, &::after {
          content: "";
          display: block;
          position: absolute;
          z-index: 1;
          width: 100%;
          height: 2px;
          background: #333;
          transition: transform .3s cubic-bezier(0.7, 0.3, 0.1, 1);
        }
        &::before {
          top: -5px;
        }
        &::after {
          top: 5px;
        }
      }
    }
  }
</style>

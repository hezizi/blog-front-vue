<template>
  <div class="turn-page">
    <div v-for="pager in pagerList" :key="pager.pageId" :class="pager.pageId" >
      <template v-if="pagers[pager.pageId]">
        <p class="label">{{ pager.label }}</p>
        <router-link :to="link(pager)">
          {{ title(pager) }}
        </router-link>
      </template>
      <p v-else-if="!pagers['prev']">这是第一篇文章 🤣🤣🤣</p>
      <p v-else>这是最后第一篇文章 🤣🤣🤣</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TurnPage',
  props: {
    pagers: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      pagerList: [{
        pageId: 'prev',
        label: '上一篇'
      }, {
        pageId: 'next',
        label: '下一篇'
      }]
    }
  },
  computed: {
    link() {
      return pager => ({ name: 'article', params: { articleId: this.pagers[pager.pageId]._id } })
    },
    title() {
      return pager => this.pagers[pager.pageId].title
    }
  },
}
</script>

<style lang="scss" scoped>
  .turn-page {
    @include flex();
    p {
      color: #666;
    }
    .prev, .next {
      flex: 1;
      .label {
        margin-bottom: 5px;
        color: #bfbfbf;
      }
    }
    .next {
      text-align: right;
    }
  }
</style>
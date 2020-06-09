<template>
  <div class="comment-list">
    <a-list
      v-if="commList.length"
      :data-source="commList"
      :header="`${commList.length} ${commList.length > 1 ? 'replies' : 'reply'}`"
      item-layout="horizontal"
    >
      <a-list-item slot="renderItem" slot-scope="item">
        <a-comment
          :author="item.author"
          :avatar="item.avatar"
          :content="item.content"
          :datetime="item.datetime"
        />
      </a-list-item>

      <load-more
        :is-show-load-more="isShowLoadMore"
        :loading-more="loadingMore"
        @getPageNum="getPageNum"
      />
    </a-list>
  </div>
</template>

<script>
import moment from 'moment'
import LoadMore from '@/components/load-more'
import { commentList } from '@/services/api'

export default {
  name: 'CommentList',
  components: { LoadMore },
  data() {
    return {
      isShowLoadMore: true,
      loadingMore: false,
      commList: [],
      pageNum: 1,
      pageSize: 10,

      total: 0
    }
  },
  watch: {
    pageNum() {
      this.loadMore()
    },
  },
  mounted() {
    this.commListApi()
  },
  methods: {
    getPageNum(page) {
      this.pageNum = page
    },

    // 留言列表
    commListApi(isAdd = false) {
      return commentList({
        pageNum: this.pageNum,
        pageSize: this.pageSize
      }).then(res => {
        const list = res.result.data.map(item => ({
          author: item.user.github.name,
          avatar: item.user.github.avatar_url,
          content: item.content,
          datetime: moment(item.create_time).fromNow()
        }))
        this.commList = isAdd ? list : [ ...this.commList, ...list ]

        return Promise.resolve(res)
      })
    },

    // 加载更多
    loadMore() {
      this.loadingMore = true
      this.commListApi().then(res => {
        const total = res.result.total
        if (total <= this.pageNum * this.pageSize) {
          this.isShowLoadMore = false
        }
      }).finally(() => {
        this.loadingMore = false
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  
</style>
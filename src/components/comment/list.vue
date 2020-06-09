<template>
  <div class="comment-list">
    <a-list
      v-if="commList.length"
      :data-source="commList"
      :header="listHeader"
      item-layout="horizontal"
    >
      <a-list-item slot="renderItem" slot-scope="item">
        <a-comment
          class="w100"
          :author="item.author"
          :avatar="item.avatar"
          :datetime="item.datetime"
        >
          <!-- :content="commContent(item.content)" -->
          <div class="comment-content" slot="content" v-html="commContent(item.content)"></div>
        </a-comment>
      </a-list-item>

      <!-- 加载更多 -->
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
import { markdownToHtml } from '@/utils'
import '@/assets/styles/markdown.scss'

export default {
  name: 'CommentList',
  components: { LoadMore },
  data() {
    return {
      isShowLoadMore: false,
      loadingMore: false,
      commList: [],
      pageNum: 1,
      pageSize: 5,
      total: 0
    }
  },
  computed: {
    // 评论header
    listHeader() {
      return <p>总共 <span class="comment-count">{this.total}</span> 条留言</p>
    },
    // 评论内容
    commContent: () => content => markdownToHtml(content)
  },
  watch: {
    pageNum() {
      this.loadMore()
    }
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
        this.total = res.result.total

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
      this.commListApi().then(() => {
        if (this.total >= this.pageNum * this.pageSize) {
          this.isShowLoadMore = true
        }
      }).finally(() => {
        this.loadingMore = false
      })
    }
  }
}
</script>
<style lang="scss" scoped>
  .comment-count {
    font-size: 20px;
  }
  /deep/ .ant-list-split .ant-list-item {
    border-bottom: 1px solid rgba(238, 238, 238, 0.5);
  }
</style>
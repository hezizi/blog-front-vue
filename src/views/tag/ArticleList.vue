<template>
  <div class="article-tag-page">
    <!-- breadcrumb -->
    <basic-breadcrumb :current="current" />

    <!-- blockquote -->
    <div class="blockquote">
      <h4>{{ current.name }}</h4>
    </div>

    <!-- article list -->
    <fetch-loading ref="fetch">
      <!-- 暂无数据 -->
      <div class="empty" v-if="isEmpty">
        <a-empty description="暂无数据"/>
      </div>

      <div
        v-else
        class="item df"
        :key="item._id"
        v-for="item in articlesList"
      >
        <div class="avatar">
          <a-avatar
            :size="36"
            :src="userConfig.USER_AVATAR"
          />
        </div>
        <div class="flex1">
          <h3 class="title">
            <router-link :to="{ name: 'article', params: { articleId: item._id } }">{{ item.title }}</router-link>
          </h3>
          <div class="meta df-aic">
            <a-tooltip placement="top">
              <template slot="title">
                <span>{{ createDate(item, 'tooltip') }}</span>
              </template>
              <span>
                <a-icon type="clock-circle" />
                {{ createDate(item) }}
              </span>
            </a-tooltip>
            <span>
              <a-icon type="eye" />
              {{ item.views }}
            </span>
            <div class="df-aic">
              <a-icon
                :style="{marginRight: '5px'}"
                type="tags"
              />
              <a-tag
                :key="tag._id"
                class="tag"
                v-for="tag in item.tags"
              >{{ tag.name }}</a-tag>
            </div>
          </div>
        </div>
      </div>
    </fetch-loading>

    <!-- pagination -->
    <div class="pagination-wrapper" v-if="pager.total > pager.pageSize">
      <basic-pagination
        :pager="pager"
        @on-pager-change="onPagerChange"
      />
    </div>
  </div>
</template>

<script>
import FetchLoading from '@/components/loading'
import BasicBreadcrumb from '@/components/breadcrumb'
import BasicPagination from '@/components/pagination'
import { articleList } from '@/services/api'
import { dateFormat } from '@/utils'
import userConfig from '@/config'

export default {
  name: 'ArticleList',
  components: {
    FetchLoading,
    BasicBreadcrumb,
    BasicPagination
  },
  props: ['tagId'],
  data () {
    return {
      userConfig,
      articlesList: [],
      isEmpty: false,
      // 分页器
      pager: {
        pageNum: 1,
        pageSize: 6,
        total: 0
      }
    }
  },
  computed: {
    createDate () {
      return (item, v) => {
        return v ? dateFormat(item.create_time) : this.dayjs(item.create_time).fromNow()
      }
    },
    // 当前页信息
    current() {
      const tags = this.$store.getters.allTags
      const { name } = tags.find(t => t._id === this.tagId)
      return {
        id: this.tagId,
        name
      }
    }
  },
  watch: {
    $route() {
      this.onPagerChange(1)
    }
  },
  mounted () {
    this.getAllArticle()
  },
  methods: {
    async getAllArticle () {
      const { pageNum, pageSize, total } = this.pager

      this.$refs['fetch'].fetchData({
        api: articleList,
        params: {
          pageNum,
          pageSize,
          tags: this.tagId
        },
        withLoading: true,
        handleFn: ({ data, total }) => {
          this.articlesList = data
          this.$set(this.pager, 'total', total)
          this.isEmpty = this.pager.total === 0 && true
        }
      })
    },

    onPagerChange(cur) {
      this.$set(this.pager, 'pageNum', cur)
      this.getAllArticle()
    }
  }
}
</script>

<style lang="scss" scoped>
.article-tag-page {
  @media screen and (max-width: 576px) {
    padding: 0;
  }
  padding: 0 60px;
  .blockquote {
    padding: 10px 16px;
    margin: 10px 0;
    color: #666;
    border-left: 4px solid rgba($themeColor, .1);
    background-color: rgba($themeColor, .05);
  }
  .empty {
    margin-top: 100px;
  }
  .item {
    padding: 15px 0 10px;
    margin-bottom: 15px;
    border-bottom: 1px dashed #eee;
    .avatar {
      margin-right: 10px;
    }
    .title {
      margin-bottom: 10px;
    }
    .meta {
      & > span {
        margin-right: 10px;
      }
      .tag {
        color: #666;
        border: 1px solid transparent;
        background-color: rgba($themeColor, 0.15);
      }
    }
  }
  .pagination-wrapper {
    margin-top: 30px;
  }
}
</style>

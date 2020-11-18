<template>
  <div class="article-tag-page">
    <!-- breadcrumb -->
    <basic-breadcrumb
      :current="name"
      :list="list"
    />

    <!-- article list -->
    <fetch-loading ref="fetch">
      <div
        :key="item._id"
        class="item df"
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
  props: ['name'],
  data () {
    return {
      userConfig,
      articlesList: [],
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
    }
  },
  mounted () {
    this.getAllArticle()
  },
  methods: {
    async getAllArticle () {
      const tagId = this.$route.query.tag_id
      const { pageNum, pageSize, total } = this.pager

      this.$refs['fetch'].fetchData({
        api: articleList,
        params: {
          pageNum,
          pageSize,
          tags: tagId
        },
        withLoading: true,
        handleFn: ({ data, total }) => {
          this.articlesList = data
          this.$set(this.pager, 'total', total)
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
  .item {
    padding: 15px 0;
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

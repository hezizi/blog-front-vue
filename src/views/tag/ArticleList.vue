<template>
  <div class="article-tag-page">
    <fetch-loading ref="fetch">

      <div class="breadcrumb">
        <a-breadcrumb :routes="routes">
          <template slot="itemRender" slot-scope="{route, params, routes, paths}">
            <!-- {{ route }} -->
            <span v-if="routes.indexOf(route) === routes.length - 1">
              {{route.breadcrumbName}}
            </span>
            <router-link v-else :to="paths.join('/')">
              {{route.breadcrumbName}}
            </router-link>
          </template>
        </a-breadcrumb>
      </div>

      <div class="item df" v-for="item in articlesList" :key="item._id">
        <div class="avatar">
          <a-avatar :size="36" :src="userInfo.USER_AVATAR" />
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
              <span><a-icon type="clock-circle" /> {{ createDate(item) }}</span>
            </a-tooltip>
            <span><a-icon type="eye" /> {{ item.views }}</span>
            <div class="df-aic">
              <a-icon type="tags" :style="{marginRight: '5px'}"/>
              <a-tag class="tag" v-for="tag in item.tags" :key="tag._id">{{ tag.name }}</a-tag>
            </div>
          </div>
        </div>
      </div>
    </fetch-loading>
  </div>
</template>

<script>
import { themeColor } from '@/assets/styles/variables.scss'
import FetchLoading from '@/components/loading'
import { articleList } from '@/services/api'
import { dateFormat } from '@/utils'
import userConf from '@/config'
import routes from '@/router/routes'

export default {
  name: 'ArticleList',
  components: {
    FetchLoading
  },
  props: ['name'],
  data() {
    return {
      pageNum: 1,
      pageSize: 20,
      
      articlesList: [],

      
      tagColor: themeColor,
      
      userInfo: userConf(),

      routes
    }
  },
  computed: {
    createDate() {
      return (item, v) => {
        return v ? dateFormat(item.create_time) : this.moment(item.create_time).fromNow()
      }
    }
  },
  mounted() {
    this.getAllArticle()
  },
  methods: {
    async getAllArticle() {
      const tagId = this.$route.query.tag_id
      this.$refs['fetch'].fetchData({
        api: articleList,
        params: {
          pageNum: this.pageNum,
          pageSize: this.pageSize,
          tags: tagId
        },
        withLoading: true,
        handleFn: result => {
          this.articlesList = result.data

          const dateObj = {}
          this.articlesList.map(item => {
            const year = item.create_time.slice(0, 4)
            dateObj[year] = dateObj[year] || []
            dateObj[year].push(item)
          })
          this.newList = Object.keys(dateObj).map(group => dateObj[group])
        }
      })
    },
  },
}
</script>

<style lang="scss" scoped>
  .article-tag-page {
    @media screen and (max-width: 992px) {
      padding: 0 60px;
    }
    @media screen and (max-width: 576px) {
      padding: 0;
    }
    padding: 0 100px;
    .breadcrumb {
      margin-bottom: 20px;
    }
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
          background-color: rgba($themeColor, .15);
        }
      }
    }
  }
</style>
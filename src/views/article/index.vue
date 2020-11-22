<template>
  <div class="detail-page">
    <!-- breadcrumb -->
    <basic-breadcrumb :current="current" />

    <!-- 文章详情 -->
    <fetch-loading ref="fetch">
      <a-row :gutter="40" class="detail-wrapper df flex1">
        <a-col :md="18" class="left">
          <!-- header -->
          <header>
            <div class="title">
              <h1>{{ articleInfo.title }}</h1>
            </div>
            <div class="meta df-aic">
              <div class="avatar">
                <a-avatar :size="50" :src="userConfig.USER_AVATAR" />
              </div>
              <div class="author-info flex1">
                <div class="author-name">
                  <h3>{{ articleInfo.author }}</h3>
                </div>
                <div class="meta-wrapper df-aic">
                  <span><a-icon type="clock-circle"  /> {{ articleInfo.createDate }}</span>
                  <span><a-icon type="eye" /> {{ articleInfo.views }}</span>
                  <div class="df-aic">
                    <a-icon type="tags" :style="{marginRight: '5px'}"/>
                    <a-tag v-for="tag in articleInfo.tags" :key="tag._id" :color="tagColor">{{ tag.name }}</a-tag>
                  </div>
                </div>
              </div>
            </div>
          </header>

          <!-- 详情 -->
          <article class="flex1">
            <div class="detail" v-html="detail"></div>
          </article>

          <!-- 上一篇 下一篇 -->
          <turn-page :pagers="pagers" />
        </a-col>

        <a-col :md="6">
          <!-- 锚点目录 -->
          <article-anchor ref="anchor" />
        </a-col>
      </a-row>
    </fetch-loading>
  </div>
</template>

<script>
import { articleDetail } from '@/services/api'
import { markdownToHtml, dateFormat } from '@/utils'
import userConfig from '@/config'
import FetchLoading from '@/components/loading'
import ArticleAnchor from '@/components/anchor'
import BasicBreadcrumb from '@/components/breadcrumb'
import TurnPage from '@/components/turn-page'
import { themeColor } from '@/assets/styles/variables.scss'
import '@/assets/styles/markdown.scss'

export default {
  name: 'ArticleDetail',
  props: ['articleId'],
  components: {
    ArticleAnchor,
    FetchLoading,
    BasicBreadcrumb,
    TurnPage
  },
  data() {
    return {
      articleInfo: {
        title: '',
        author: '赫子子',
        content: '',
        createDate: '',
        views: 0,
        tags: []
      },
      pagers: {}, // 文章切换
      tagColor: themeColor,

      userConfig
    }
  },
  computed: {
    detail() {
      return markdownToHtml(this.articleInfo.content)
    },
    // 当前页信息
    current() {
      return {
        id: this.articleId,
        name: this.articleInfo.title
      }
    }
  },
  watch: {
    articleId() {
      this.getDetail()
    }
  },
  mounted() {
    // this.$store.dispatch('setAllPosts')
    this.getDetail()
  },
  methods: {
    /* 文章详情 */
    getDetail() {
      this.$refs['fetch'].fetchData({
        api: articleDetail,
        params: this.articleId,
        withLoading: true,
        handleFn: result => {
          new Promise(resolve => {
            // 请求成功后的操作
            const { data, data: { create_time, content, pagers } } = result
            for (const key in this.articleInfo) {
              if (this.articleInfo.hasOwnProperty(key)) {
                this.$set(this.articleInfo, key, data[key])
              }
            }
            this.pagers = pagers
            this.$set(this.articleInfo, 'createDate', dateFormat(create_time))
            resolve(content)
          }).then(content => {
            this.$refs['anchor'].getAnchorList(markdownToHtml(content))
          })
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  .detail-page {
    @include flex($direction: column);
    min-height: calc(100vh - #{$mainPaddingTop} - #{$mainPaddingBottom} - #{$footerHeight});
    .breadcrumb-wrapper {
      padding: 10px;
      color: #666;
      border-left: 4px solid rgba($themeColor, .1);
      background-color: rgba($themeColor, .05);
    }
    .detail-wrapper {
      @media screen and (max-width: 767px) {
        @include flex($direction: column);
      }
      .left {
        @media screen and (max-width: 767px) {
          flex: 1;
        }
        @include flex($direction: column);
      }
      header {
        .title {
          margin-bottom: 20px;
          h1 {
            font-size: 26px;
            font-weight: bold;
          }
        }
        .author-info {
          margin-left: 10px;
          .author-name {
            margin-bottom: 3px;
          }
        }
        .meta-wrapper {
          color: #666;
          & > span {
            margin-right: 10px;
          }
        }
      }
      article {
        margin: 15px 0;
        padding: 20px 0;
        border-top: 1px dashed #eee;
        border-bottom: 1px dashed #eee;
        color: #333;
      }
    }
  }
</style>

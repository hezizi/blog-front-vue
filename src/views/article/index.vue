<template>
  <fetch-loading ref="fetch">
    <div class="article-detail">
      <a-row :gutter="40">
        <a-col :md="18">
          <div class="">
            <!-- header -->
            <header>
              <div class="title">
                <h1>{{ articleInfo.title }}</h1>
              </div>
              <div class="meta df-aic">
                <div class="avatar">
                  <a-avatar :size="50" :src="userInfo.USER_AVATAR" />
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
            <article>
              <div class="detail" v-html="detail"></div>
            </article>
          </div>
        </a-col>

        <a-col :md="6">
          <!-- 锚点目录 -->
          <div class="anchor">
            <article-anchor ref="anchor" />
          </div>
        </a-col>
      </a-row>
    </div>
  </fetch-loading>
</template>

<script>
import { themeColor } from '@/assets/styles/variables.scss'
import ArticleAnchor from '@/components/anchor'
import FetchLoading from '@/components/loading'
import { markdownToHtml, dateFormat } from '@/utils'
import { articleDetail } from '@/services/api'
import userConf from '@/config'
import '@/assets/styles/markdown.scss'

export default {
  name: 'ArticleDetail',
  props: ['articleId'],
  components: {
    ArticleAnchor,
    FetchLoading
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
      tagColor: themeColor,
      
      userInfo: userConf()
    }
  },
  computed: {
    detail() {
      return markdownToHtml(this.articleInfo.content)
    }
  },
  mounted() {
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
            const { data, data: { create_time, content } } = result
            for (const info in this.articleInfo) {
              this.$set(this.articleInfo, info, data[info])
            }
            this.$set(this.articleInfo, 'createDate', dateFormat(create_time))
            resolve(content)
          }).then(content => {
            this.$refs['anchor'].getAnchorList(markdownToHtml(content))
          })
        }
      })
    }
  },
}
</script>

<style lang="scss" scoped>
  // @import './index.scss';

  .article-detail {
    header {
      margin-bottom: 20px;
      padding-bottom: 15px;
      border-bottom: 1px dashed #eee;
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
      color: #333;
    }
    .anchor {
      // width: 20%;
      // margin-left: 40px;
      /deep/ .ant-anchor-ink::before {
        width: 1px;
        background-color: #eee;
      }
    }
  }
</style>
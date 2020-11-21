<template>
  <div class="home-page">
    <a-row :gutter="30" class="flex1">
      <a-col :lg="17" :md="16">
        <!-- 标签列表 -->
        <div class="wrapper-item">
          <div class="head-label">
            <svg-icon icon-name="tag" />
            <h2>文章标签</h2>
          </div>
          <home-tags :tag-list="allTags" @tagClick="getSelectedTag" />
        </div>

        <div class="wrapper-item">
          <div class="head-label article-title">
            <div class="df">
              <svg-icon icon-name="article" />
              <h2>全部文章</h2>
            </div>
            <a-radio-group @change="handleRadioChange" v-model="radioVal">
              <a-radio value="latest">最新</a-radio>
              <a-radio value="hottest">最热</a-radio>
            </a-radio-group>
          </div>

          <!-- 文章列表 -->
          <fetch-loading ref="fetch">
            <!-- 暂无数据 -->
            <div class="empty" v-if="isEmpty">
              <a-empty description="暂无数据"/>
            </div>

            <div v-else>
              <home-articles :article-list="postList" />
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
      </a-col>

      <a-col :lg="7" :md="8">
        <!-- 推荐 最新 -->
        <!-- <div class="wrapper-item" v-for="item in wrapperList" :key="item.label">
          <div class="head-label">
            <svg-icon icon-name="hot" />
            <h2>{{ item.title }}</h2>
          </div>
          <div class="list">
            <ul>
              <li
                v-for="(p, index) in (item.label === 'hottest' ? hottest : latest)"
                :key="p._id"
                :data-index="index + 1"
              >
                <router-link
                  :to="{ name: 'article', params: { articleId: p._id } }"
                  class="link">
                  {{ p.title }}
                </router-link>
                <span class="views df-aic">
                  <a-icon type="eye" :style="{marginRight: '5px'}"/>
                  {{ p.views }}
                </span>
              </li>
            </ul>
          </div>
        </div> -->
        <div class="wrapper-item">
          <div class="head-label">
            <svg-icon icon-name="hot" />
            <h2>推荐文章</h2>
          </div>
          <!-- 推荐文章 -->
          <fetch-loading ref="fetchHot">
            <div class="list">
              <ul>
                <li
                  v-for="(p, index) in hottest"
                  :key="p._id"
                  :data-index="index + 1"
                >
                  <router-link
                    :to="{ name: 'article', params: { articleId: p._id } }"
                    class="link">
                    {{ p.title }}
                  </router-link>
                  <span class="views df-aic">
                    <a-icon type="eye" :style="{marginRight: '5px'}"/>
                    {{ p.views }}
                  </span>
                </li>
              </ul>
            </div>
          </fetch-loading>
        </div>

        <!-- 和我交流 -->
        <a-affix :offset-top="offsetTop">
          <div class="wrapper-item mb0">
            <div class="head-label">
              <svg-icon icon-name="focus" />
              <h2>关注你啦</h2>
            </div>
            <img :src="userConfig.USER_WX[1].img" alt="wxgzh" :style="{width: '100%'}" />
          </div>
        </a-affix>
      </a-col>
    </a-row>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import HomeArticles from '@/components/article'
import HomeTags from '@/components/tag'
import FetchLoading from '@/components/loading'
import BasicPagination from '@/components/pagination'
import { articleList } from '@/services/api'
import userConfig from '@/config'

export default {
  name: 'Home',
  components: {
    HomeArticles,
    HomeTags,
    FetchLoading,
    BasicPagination
  },
  data() {
    return {
      userConfig,
      postList: [],     // 文章列表
      hottest: [],      // 最热
      // latest: [],    // 最新
      // 分页器
      pager: {
        pageNum: 1,
        pageSize: 15,
        total: 0
      },
      // 无数据
      isEmpty: false,
      params: {
        sortBy: 'latest'
      },
      radioVal: 'latest',
      // wrapperList: [{
      //   title: '推荐文章',
      //   label: 'hottest'
      // }, {
      //   title: '最新文章',
      //   label: 'latest'
      // }],
      offsetTop: 90
    }
  },
  computed: {
    ...mapGetters(['allTags'])
  },
  mounted() {
    this.getList()
    this.getHottest()
    // this.getLatest()
  },
  methods: {
    /* 数据获取 */
    fetch(cb, size, ref = 'fetch') {
      this.$refs[ref].fetchData({
        api: articleList,
        params: {
          pageNum: this.pager.pageNum,
          pageSize: size,
          ...this.params
        },
        withLoading: true,
        handleFn: result => cb(result)
      })
    },

    /* 文章列表 */
    getList() {
      this.fetch(({ data, total }) => {
        this.postList = data
        this.$set(this.pager, 'total', total)
        this.isEmpty = this.pager.total === 0 && true
      }, this.pager.pageSize)
    },

    /* 最新，最热排序 */
    handleRadioChange() {
      this.$set(this.params, 'sortBy', this.radioVal)
      this.getList()
    },

    /* 热门文章 */
    commonFn(arg) {
      this.$set(this.params, 'sortBy', arg)
      this.fetch(result => this[arg] = result.data, 10, 'fetchHot')
    },
    getHottest() {
      this.commonFn('hottest')
    },

    /* 最新文章 */
    // getLatest() {
    //   this.commonFn('latest')
    // },

    /* 标签选择 */
    getSelectedTag(tag) {
      this.$set(this.params, 'tags', tag._id)
      this.$set(this.pager, 'pageNum', 1)
      this.getList()
    },

    /* 分页 */
    onPagerChange(cur) {
      this.$set(this.pager, 'pageNum', cur)
      this.getList()
    }
  },
}
</script>

<style lang="scss" scoped>
  .home-page {
    @include flex;
    .wrapper-item {
      margin-bottom: 35px;
      &.mb0 {
        margin-bottom: 0;
      }
      .head-label {
        @include flex($align: center);
        padding-bottom: 5px;
        margin-bottom: 15px;
        border-bottom: 1px dashed #eee;
        .icon {
          font-size: 1.8em;
          margin-right: 6px;
        }
        h2 {
          margin: 0;
          font-size: 18px;
          font-weight: bold;
        }
      }
      .pagination-wrapper {
        @include flex($justify: flex-end);
        margin-top: 30px;
      }
    }
    .article-title {
      @include flex($justify: space-between, $align: center);
    }
    .empty {
      margin-top: 60px;
    }
    .list {
      ul {
        li {
          @include flex($align: center);
          position: relative;
          margin-bottom: 15px;
          padding-left: 32px;
          .link {
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
          .views {
            margin-left: 10px;
            color: #999;
          }
          &:last-child {
            margin-bottom: 0;
          }
          &::after {
            @include flex($justify: center, $align: center);
            content: attr(data-index);
            position: absolute;
            left: 5px;
            top: 50%;
            transform: translateY(-50%);
            width: 18px;
            height: 18px;
            border: 1px solid rgba(51, 51, 51, .3);
            border-radius: 2px;
            color: rgba(51, 51, 51, .6);
            font-size: 12px;
            font-style: italic;
          }
          &[data-index="1"]::after,
          &[data-index="2"]::after,
          &[data-index="3"]::after {
            color: #fff;
          }
          &[data-index="1"]::after {
            background-color: #d4533e;
            border-color: #d4533e;
          }
          &[data-index="2"]::after {
            background-color: #e78d22;
            border-color: #e78d22;
          }
          &[data-index="3"]::after {
            background-color: #2a64da;
            border-color: #2a64da;
          }
        }
      }
    }
  }

  /deep/ .ant-radio-checked .ant-radio-inner {
    border-color: $themeColor;
  }
  /deep/ .ant-radio-inner::after {
    background-color: $themeColor;
  }
</style>

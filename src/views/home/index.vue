<template>
  <div class="home-page">
    <a-row :gutter="36" class="flex1">
      <a-col :lg="18" :md="16">
        <!-- 标签列表 -->
        <div class="wrapper-item">
          <div class="head-label">
            <h2>标签分类</h2>
          </div>
          <home-tags :tag-list="allTags" @tagClick="getSelectedTag" />
        </div>

        <div class="wrapper-item">
          <!-- 文章列表 -->
          <div class="head-label article-title">
            <h2>全部文章</h2>
            <a-radio-group @change="handleRadioChange" v-model="radioVal">
              <a-radio value="latest">最新</a-radio>
              <a-radio value="hottest">最热</a-radio>
            </a-radio-group>
          </div>
          <fetch-loading ref="fetch">
            <div v-if="aList.length" >
              <home-articles :article-list="aList" />
              
              <!-- 分页 -->
              <div class="pagiation-wrapper" v-if="this.total > this.pageSize">
                <a-pagination
                  :current="pageNum"
                  :total="total"
                  :page-size="pageSize"
                  :showTotal="(total, range) =>`${range[0]} - ${range[1]} 共 ${total} 篇文章`"
                  @change="onPagerChange"
                />
              </div>
            </div>
            <div class="empty" v-else>
              <a-empty description="暂无数据"/>
            </div>
          </fetch-loading>
        </div>
      </a-col>

      <a-col :lg="6" :md="8">
        <!-- 标签分类 -->
        <!-- <div class="wrapper-item">
          <div class="head-label">
            <h2>标签分类</h2>
          </div>
          <home-tags :tag-list="allTags" @tagClick="getSelectedTag" />
        </div> -->
        
        <!-- 推荐 最新 -->
        <div class="wrapper-item" v-for="item in wrapperList" :key="item.label">
          <div class="head-label">
            <h2>{{ item.title }}</h2>
          </div>
          <div class="list">
            <ul>
              <li v-for="p in (item.label === 'hottest' ? hottest : latest)" :key="p._id">
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
        </div>

        <!-- 和我交流 -->
        <div class="wrapper-item">
          <div class="head-label">
            <h2>和我交流</h2>
          </div>
        </div>
      </a-col>
    </a-row>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import HomeArticles from '@/components/article'
import HomeTags from '@/components/tag'
import FetchLoading from '@/components/loading'
import { articleList } from '@/services/api'

export default {
  name: 'Home',
  components: {
    HomeArticles,
    HomeTags,
    FetchLoading
  },
  data() {
    return {
      /* article */
      aList: [],
      hottest: [],  // 最热
      latest: [],  // 最新
      
      pageNum: 1,
      pageSize: 15,
      total: 0,

      params: {
        sortBy: 'latest'
      },
      radioVal: 'latest',

      wrapperList: [{
        title: '推荐文章',
        label: 'hottest'
      }, {
        title: '最新文章',
        label: 'latest'
      }]
    }
  },
  computed: {
    ...mapGetters(['allTags'])
  },
  mounted() {
    this.getList()
    this.getHottest()
    this.getLatest()
  },
  methods: {
    ...mapActions(['setHottest', 'setLatest']),

    /* 数据获取 */
    fetch(callBack, size) {
      this.$refs['fetch'].fetchData({
        api: articleList,
        params: {
          pageNum: this.pageNum,
          pageSize: size,
          ...this.params
        },
        withLoading: true,
        handleFn: result => callBack(result)
      })
    },
    
    /* 文章列表 */
    getList() {
      this.fetch(result => {
        this.aList = result.data
        this.total = result.total
      }, this.pageSize)
    },

    /* 最新，最热排序 */
    handleRadioChange() {
      this.$set(this.params, 'sortBy', this.radioVal)
      this.getList()
    },

    /* 热门文章 */
    commonFn(arg) {
      this.$set(this.params, 'sortBy', arg)
      this.fetch(result => this[arg] = result.data, 5)
    },
    getHottest() {
      this.commonFn('hottest')
      // this.setHottest({ pageSize: 5, sortBy: 'hottest' })
    },

    /* 最新文章 */
    getLatest() {
      this.commonFn('latest')
      // this.setLatest({ pageSize: 5, sortBy: 'latest' })
    },
    
    /* 标签选择 */
    getSelectedTag(tag) {
      this.$set(this.params, 'tags', tag._id)
      this.pageNum = 1
      this.getList()
    },

    /* 分页 */
    onPagerChange(cur, size) {
      this.pageNum = cur
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
      .head-label {
        position: relative;
        padding: 0 0 10px 15px;
        margin-bottom: 15px;
        border-bottom: 1px solid #eee;
        line-height: 24px;
        h2 {
          margin: 0;
          font-size: 18px;
          font-weight: bold;
        }
        &:before {
          content: "#";
          position: absolute;
          left: 0;
          top: 0;
          font-size: 20px;
        }
      }
      .pagiation-wrapper {
        @include flex($justify: flex-end);
        margin-top: 60px;
      }
    }
    .article-title {
      @include flex($justify: space-between, $align: center);
    }
    .list {
      border-radius: 2px;
      padding: 0 10px;
      ul {
        li {
          @include flex($align: center);
          margin-bottom: 15px;
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
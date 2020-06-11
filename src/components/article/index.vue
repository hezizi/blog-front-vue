<template>
  <div>
    <div class="article-item df" v-for="item in articleList" :key="item._id">
      <router-link
        :to="{ name: 'article', params: { articleId: item._id } }"
        class="link" />
      <div class="flex1">
        <!-- 标题 -->
        <h3 class="title">{{ item.title }}</h3>

        <!-- 标签 -->
        <div class="tags">
          <a-tag
            class="tag"
            v-for="tag in item.tags"
            :key="tag._id"
          >
            {{ tag.name }}
          </a-tag>
        </div>
        
        <!-- 描述 -->
        <p class="desc">{{ desc(item) }}</p>
        <div class="meta df-aic">
          <a-tooltip placement="top">
            <template slot="title">
              <span>{{ createDate(item, 'tooltip') }}</span>
            </template>
            <span><a-icon type="clock-circle" /> {{ createDate(item) }}</span>
          </a-tooltip>
          <span><a-icon type="eye" /> {{ item.views }}</span>
        </div>
      </div>
      <div class="cover-wrapper df-aic">
        <!-- 封面 -->
        <div class="cover">
          <img :src="coverUrl(item)" class="w100" alt="cover">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { dateFormat } from '@/utils'

export default {
  name: 'Articles',
  props: {
    articleList: {
      type: Array,
      default: []
    }
  },
  computed: {
    desc: () => item => item.desc,
    // createDate: () => item => dateFormat(item.create_time),
    createDate() {
      return (item, v) => {
        return v ? dateFormat(item.create_time) : this.moment(item.create_time).fromNow()
      }
    },
    coverUrl: () => item => {
      return item.cover 
        ? `http://localhost:5000/upload/${item.cover}`
        : require('@/assets/images/cover_default.png')
    }
  }
}
</script>

<style lang="scss" scoped>
  .article-item {
    @media screen and (max-width: 576px) {
      height: auto
    }
    @include flex($justify: space-between);
    position: relative;
    margin-bottom: 20px;
    padding: 10px;
    height: 165px;
    color: #666;
    border-bottom: 1px solid rgba(238, 238, 238, 0.5);
    transition: all .3s ease;
    &:hover {
      box-shadow: 0 0 25px rgba($themeColor, .15);
      transition: all .3s ease;
    }
    .link {
      position: absolute;
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
    }
    .title {
      margin-bottom: 10px;
      color: #454545;
      font-size: 16px;
      font-weight: bold;
    }
    .tags {
      margin-bottom: 12px;
      .tag {
        color: #666;
        border: 1px solid transparent;
        background-color: rgba($themeColor, .15);
      }
    }
    .desc {
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
    }
    .meta {
      position: absolute;
      left: 10px;
      bottom: 10px;
      & > span {
        margin-right: 10px;
      }
      @media screen and (max-width: 576px) {
        position: inherit;
        margin-top: 8px;
      }
    }
    .cover-wrapper {
      margin-left: 20px;
      @media screen and (max-width: 414px) {
        display: none;
      }
      @media screen and (max-width: 576px) {
        margin-left: 10px;
      }
      .cover {
        width: 200px;
        @media screen and (max-width: 576px) {
          width: 160px;
        }
      }
    }
  }
</style>
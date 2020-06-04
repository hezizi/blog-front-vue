<template>
  <div>
    <div class="article-item" v-for="item in articleList" :key="item._id">
      <router-link
        :to="{ name: 'article', params: { articleId: item._id } }"
        class="link" />
      <h3 class="title">{{ item.title }}</h3>
      <div class="tags">
        <!-- <a-icon type="tags" :style="{marginRight: '5px'}"/> -->
        <a-tag
          class="tag"
          v-for="tag in item.tags"
          :key="tag._id"
        >
          {{ tag.name }}
        </a-tag>
      </div>
      <p class="desc">{{ desc(item) }}</p>
      <div class="meta df-aic">
        <span><a-icon type="clock-circle" /> {{ createDate(item) }}</span>
        <span><a-icon type="eye" /> {{ item.views }}</span>
      </div>
      <div class="img">
        <img src="https://img-blog.csdnimg.cn/20200406211621706.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3l1Y2loZW50,size_16,color_FFFFFF,t_70#pic_center" alt="logo">
      </div>
    </div>
  </div>
</template>

<script>
import { markdownToHtml, dateFormat } from '@/utils'

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
    createDate: () => item => dateFormat(item.create_time)
  }
}
</script>

<style lang="scss" scoped>
  .article-item {
    position: relative;
    margin-bottom: 15px;
    padding: 10px 190px 10px 10px;
    height: 165px;
    color: #666;
    border-bottom: 1px solid #eee;
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
        border: 1px solid transparent;
        color: #666;
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
    }
    .img {
      position: absolute;
      right: 10px;
      top: 50%;
      transform: translateY(-50%);
      width: 160px;
      height: 120px;
      overflow: hidden;
      border-radius: 4px;
      border: 1px solid #eee;
      img {
        width: 100%;
        height: 100%;
      }
    }
  }
</style>
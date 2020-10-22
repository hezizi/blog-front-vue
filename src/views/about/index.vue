<template>
  <div class="about-page">
    <div class="author mb30">
      <a-avatar :size="80" :src="userInfo.USER_AVATAR" />
      <div class="name">
        <h3>{{ userInfo.USER_NAME }}</h3>
      </div>
      <p>{{ userInfo.USER_INTRODUCE }}</p>

      <a-icon :component="require('@/icons/svg/segmentfault.svg')" />
      <a-icon :component="require('@/icons/svg/juejin.svg')" />
      <a-icon :component="require('@/icons/svg/github.svg')" />
    </div>

    <div class="info mb30">
      <!-- 关于我 -->
      <a-divider orientation="left">关于我</a-divider>
      <div class="about mb30">
        <p>{{ userInfo.USER_DESC }}</p>
        <div class="mb15">
          <p>也可以在这些地方看到我：</p>
          <ul>
            <li v-for="l in userInfo.OTHER_LINKS" :key="l.title">
              <a target="blank" :href="l.link">{{ l.title }}</a>
            </li>
          </ul>
        </div>
        <div>
          <p>和我交流：</p>
          <p>{{ userInfo.USER_WX.wx }}</p>
          <img :src="userInfo.USER_WX.wx_img" alt="wx" :style="{width: '120px', height: '120px'}">

          <p>{{ userInfo.USER_WX.wxgzh }}</p>
          <img :src="userInfo.USER_WX.wxgzh_img" alt="wxgzh" :style="{width: '120px', height: '120px'}">
        </div>
      </div>

      <!-- 关于博客 -->
      <a-divider orientation="left">关于博客</a-divider>
      <div class="about mb30">
        <p>博客申明：仅作个人学习，记录使用</p>
        <p>源码：<a href="https://github.com/hezizi/blog-front-vue" target="_blank">Github地址</a></p>
        <div>
          <p>技术栈：</p>
          <ul>
            <li>前台：Vue2.x</li>
            <li>管理：React Hooks</li>
            <li>后端：Node + Express + MongoDB + Mongoose</li>
          </ul>
        </div>
        <div>
          <p>后期计划：</p>
          <ul>
            <li>前台：React Hooks + TypeScript（第二版本）</li>
            <li>前台：Vite + Vue3 + Composition API + TypeScript（第三版本）</li>
          </ul>
        </div>
      </div>
    </div>

    <!-- 留言评论 -->
    <div class="comment">
      <a-divider orientation="left">留言</a-divider>
      <Comment />
    </div>
  </div>
</template>

<script>
import Comment from '@/components/comment'
import userConf from '@/config'

export default {
  name: 'AboutMe',
  components: { Comment },
  data: () => ({ userInfo: userConf() })
}
</script>

<style lang="scss" scoped>
  .about-page {
    @media screen and (max-width: 992px) {
      padding: 0 60px;
    }
    @media screen and (max-width: 576px) {
      padding: 0;
    }
    a {
      color: $themeColor;
    }
    .mb15 {
      margin-bottom: 15px;
    }
    .mb30 {
      margin-bottom: 30px;
    }
    padding: 0 100px;
    .author {
      @include flex($align: center, $direction: column);
      .name {
        margin: 10px 0;
        h3 {
          font-weight: bold;
          font-size: 18px;
        }
      }
    }
    .info {
      overflow: hidden;
      .about {
        @media screen and (max-width: 576px) {
          padding: 0 15px;
        }
        padding-left: 25px;
        p {
          margin-bottom: 10px;
        }
        ul {
          padding-left: 30px;
          list-style: circle;
          li {
            margin-bottom: 5px;
          }
        }
      }
    }
    .comment {
      overflow: hidden;
    }
  }
</style>

<template>
  <div class="about-page">
    <div class="author mb30">
      <a-avatar :size="80" :src="userConfig.USER_AVATAR" />
      <div class="name">
        <h3>{{ userConfig.USER_NAME }}</h3>
      </div>
      <p>{{ userConfig.USER_INTRODUCE }}</p>
    </div>

    <div class="info mb30">
      <!-- 关于我 -->
      <a-divider orientation="left">关于我</a-divider>
      <div class="about mb30">
        <p>{{ userConfig.USER_DESC }}</p>

        <div class="mb15">
          <h4 class="sub-title">和我交流：</h4>
          <ul class="wx-info df">
            <li v-for="wx in userConfig.USER_WX" :key="wx.text">
              <p>
                <svg-icon :icon-name="wx.icon" />
                <span>{{ wx.text }}</span>
              </p>
              <img :src="wx.img" alt="wx" :style="{height: '120px'}" />
            </li>
          </ul>
        </div>

        <div>
          <h4 class="sub-title">也可以在这些地方找到我：</h4>
          <ul>
            <li v-for="link in userConfig.OTHER_LINKS" :key="link.label">
              <svg-icon :icon-name="link.icon" />
              <a class="link" target="_blank" :href="link.link">
                {{ link.label }}
              </a>
            </li>
          </ul>
        </div>
      </div>

      <!-- 关于博客 -->
      <a-divider orientation="left">关于博客</a-divider>
      <div class="about mb30">
        <p>博客申明：仅作个人学习，记录使用</p>
        <p>源码：<a class="link" href="https://github.com/hezizi/blog-front-vue" target="_blank">Github地址</a></p>
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
import userConfig from '@/config'

export default {
  name: 'AboutMe',
  components: { Comment },
  data: () => ({ userConfig })
}
</script>

<style lang="scss" scoped>
  .mb15 {
    margin-bottom: 15px;
  }
  .mb30 {
    margin-bottom: 30px;
  }
  .about-page {
    @media screen and (max-width: 992px) {
      padding: 0 60px;
    }
    @media screen and (max-width: 576px) {
      padding: 0;
    }
    padding: 0 100px;
    .link {
      color: $themeColor;
    }
    .icon {
      margin-right: 5px;
    }
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
        p, .sub-title {
          margin-bottom: 10px;
        }
        ul {
          padding-left: 30px;
          list-style: circle;
          li {
            margin-bottom: 6px;
          }
          &.wx-info {
            @media screen and (max-width: 768px) {
              display: inherit;
              li:first-child {
                margin-right: 0;
              }
            }
            padding-left: 0;
            list-style: none;
            li:first-child {
              margin-right: 80px;
            }
          }
        }
      }
    }
    .comment {
      overflow: hidden;
    }
  }
</style>

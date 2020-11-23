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
        <p class="desc">{{ userConfig.USER_DESC }}</p>

        <div class="mb15">
          <h4 class="sub-title">和我交流：</h4>
          <ul class="wx-info df">
            <li v-for="wx in userConfig.USER_WX" :key="wx.text">
              <p>
                <svg-icon :icon-name="wx.icon" />
                <span>{{ wx.text }}</span>
              </p>
              <img :class="wx.icon" :src="wx.img" alt="wx" />
            </li>
          </ul>
        </div>

        <div>
          <h4 class="sub-title">😉😉😉 也可以在这些地方找到我：</h4>
          <ul>
            <li v-for="link in userConfig.OTHER_LINKS" :key="link.label">
              <svg-icon :icon-name="link.icon" />
              <a class="link" :href="link.link" target="_blank" rel="noopener">
                {{ link.label }}
              </a>
            </li>
          </ul>
        </div>
      </div>

      <!-- 关于博客 -->
      <a-divider orientation="left">关于博客</a-divider>
      <div class="about mb30">
        <div class="blockquote">
          <p>博客申明：作为个人记录使用，开放源码，如对你有所帮助可点击小星星以示鼓励</p>
        </div>
        <p>
          源码：
          <a class="link" href="https://github.com/hezizi/blog-front-vue" target="_blank" rel="noopener">Github地址</a>
        </p>
        <div class="blockquote">
          <p>说明：此博客项目前前后后有一段时间，断断续续的开发，中途忙于其他事情停产了，近期开始完善和优化，于2020.11月正式上线第一版本。</p>
          <p>计划会开发三个版本，第二版使用 Vue3 + Ts 开发，会新增部分功能，第三版使用 React Hooks + Ts 开发，欢迎大家关注。</p>
        </div>

        <div>
          <p>技术栈：</p>
          <ul>
            <li>前台：Vue2.x</li>
            <li>管理端：React Hooks</li>
            <li>服务端：Node.js + Express</li>
            <li>数据库：MongoDB + Mongoose</li>
            <li>服务器：阿里云</li>
          </ul>
        </div>
        <div>
          <p>后期计划：</p>
          <ul>
            <li>前台：Vue3 + Composition API + TypeScript（即将开源）</li>
            <li>前台：React Hooks + TypeScript（第三版本）</li>
          </ul>
        </div>
        <div>
          <p>
            UI框架：
            <a class="link" href="https://www.antdv.com/docs/vue/introduce-cn/" target="_blank" rel="noopener">Ant Design Vue 1.x</a>
          </p>
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
        .desc {
          text-indent: 20px;
          color: #666;
        }
        .blockquote {
          padding: 5px 10px;
          margin: 10px 0;
          border-left: 4px solid rgba($themeColor, .1);
          background-color: rgba($themeColor, .05);
          p {
            margin: 5px 0;
          }
        }
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
            @media screen and (max-width: 480px) {
              img.weixingzh {
                height: auto;
                width: 100%;
              }
            }
            padding-left: 0;
            list-style: none;
            img {
              height: 120px;
            }
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

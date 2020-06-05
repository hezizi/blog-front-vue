<template>
  <div class="about-wrapper">
    <div class="author">
      <a-avatar :size="80" :src="require('@/assets/images/ahh.png')" />
      <div class="name">
        <h3>赫子子</h3>
      </div>
      <p>API 码农，年纪轻轻脑壳就很凉</p>
    </div>

    <div class="info">
      <!-- 关于我 -->
      <a-divider orientation="left">关于我</a-divider>
      <div class="about">
        <p>熟练掌握前端领域部分技术栈 API 的调用，目标是能写 API 供他人调用</p>
        <div class="mb15">
          <p>也可以在这些地方找到我：</p>
          <ul>
            <li v-for="l in links" :key="l.title">
              <a target="blank" :href="l.link">{{ l.title }}</a>
            </li>
          </ul>
        </div>
        <div>
          <span>和我交流：</span>
          <a-popover placement="top">
            <template slot="content">
              <img src="@/assets/images/wx.jpg" alt="wx" :style="{width: '120px', height: '120px'}">
            </template>
            <span>微信：KK1340599486</span>
          </a-popover>
          <a-popover placement="top">
            <template slot="content">
              
            </template>
            <span>微信公众号：</span>
          </a-popover>
        </div>
      </div>

      <!-- 关于博客 -->
      <a-divider orientation="left">关于博客</a-divider>
      <div class="about">
        <p>博客申明：仅作个人学习，记录使用</p>
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
            <li>前台：React服务端渲染（第三版本）</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'About',
  data() {
    return {
      links: [{
        title: 'Github',
        icon: '',
        link: 'https://github.com/hezizi'
      }, {
        title: '掘金',
        icon: '',
        link: 'https://juejin.im/user/59c126ce6fb9a00a3d134eea'
      }, {
        title: '思否',
        icon: '',
        link: 'https://segmentfault.com/u/hezizi'
      }, {
        title: 'CSDN',
        icon: '',
        link: 'https://blog.csdn.net/yucihent'
      }, {
        // title: '知乎',
        // icon: '',
        // link: ''
      }, {
        title: '简书',
        icon: '',
        link: 'https://www.jianshu.com/u/c1096b3b83eb'
      }]
    }
  }
}
</script>

<style lang="scss" scoped>
  .about-wrapper {
    a {
      color: $themeColor;
    }
    .mb15 {
      margin-bottom: 15px;
    }
    // @include flex;
    @media screen and (max-width: 992px) {
    padding: 0 60px;
    }
    @media screen and (max-width: 576px) {
      padding: 0;
    }
    padding: 0 100px;
    .author {
      @include flex($align: center, $direction: column);
      margin-bottom: 30px;
      // width: 250px;
      // padding-top: 15px;
      .name {
        margin: 10px 0;
        h3 {
          font-weight: bold;
          font-size: 18px;
        }
      }
    }
    .info {
      .about {
        @media screen and (max-width: 576px) {
          padding: 0 15px;
        }
        margin-bottom: 30px;
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
  }
</style>
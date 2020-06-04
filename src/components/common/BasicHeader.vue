<template>
  <header class="header-wrapper w100">
    <div class="inner">
      <!-- logo -->
      <div class="logo">
        <router-link to="/">
          <!-- <img src="@/assets/images/ahh.png" alt="logo"> -->
          <!-- <span class="logo-title">Yucihzz's Blog</span> -->
          <span class="logo-title">赫子子的博客</span>
        </router-link>
      </div>

      <!-- navbar -->
      <ul class="navbar">
        <li 
          v-for="item in navBarList"
          :key="item.to"
          :class="{ 'active': item.to === activeClass }"
          @click="handleJump(item.to)">
          <a-icon 
            :type="item.icon"/>
          {{ item.name }}
          <span></span>
        </li>
      </ul>

      <!-- register-login -->
      <!-- <div class="login-group">
        <router-link to="/login">登录/注册</router-link>
      </div> -->
      <!-- search -->
      <!-- <div class="search df-aic">
        <a-input placeholder="请输入关键词搜索" style="border: none; box-shadow: none"/>
        <a-icon type="search" />
      </div> -->
    </div>
  </header>
</template>

<script>
export default {
  name: 'Header',
  data() {
    return {
      activeClass: '',
      navBarList: [{
        name: '首页',
        icon: 'home',
        to: '/'
      }, {
        name: '分类',
        icon: 'tags',
        to: '/tag'
      }, {
        name: '归档',
        icon: 'bars',
        to: '/archive'
      }, {
        name: '关于',
        icon: 'user',
        to: '/about'
      }]
    }
  },
  created() {
    this.activeClass = this.$route.path
  },
  watch: {
    $route() {
      this.activeClass = this.$route.path
      // 路由变化时调用滑动到顶部方法
      // this.smoothscroll()
    }
  },
  methods: {
    handleJump(to) {
      this.activeClass = to
      this.$router.push(to)
    },
    smoothscroll() {
      let currentScroll = document.documentElement.scrollTop || document.body.scrollTop
      if (currentScroll > 0) {
        window.requestAnimationFrame(this.smoothscroll)
        // scrollTo() 方法可把内容滚动到指定的坐标
        window.scrollTo(0, currentScroll - (currentScroll/5))
      }
    }
  },
}
</script>

<style lang="scss" scoped>
  .header-wrapper {
    position: fixed;
    z-index: 99;
    background-color: #fff;
    box-shadow: 0 2px 8px #f0f1f2;
    .inner {
      @media screen and (max-width: 576px) {
        @include flex($justify: space-around, $direction: column);
        height: 120px;
        padding: 10px 0;
      }
      @include flex($justify: space-between, $align: center);
      @include layout;
      height: $headerHeight;
      .logo {
        img {
          margin-right: 10px;
          width: 55px;
          border-radius: 50%;
        }
        &-title {
          position: relative;
          // top: 4px;
          color: #333;
          font-size: 20px;
          font-family: 'Lato';
          font-weight: bold;
          &:before, &:after {
            content: "";
            position: absolute;
            left: 14px;
            right: 14px;
            height: 2px;
            background-color: #555;
          }
          &:before {
            top: -5px;
          }
          &:after {
            bottom: -5px;
          }
        }
      }
      .navbar {
        @include flex($justify: flex-end);
        margin: 0;
        li {
          position: relative;
          margin: 0 6px;
          padding: 4px 12px;
          color: #666;
          cursor: pointer;
          transition: all .5s ease;
          &:last-child {
            margin-right: 0;
          }
          &:before, &:after {
            content: "";
            position: absolute;
            right: 0;
            width: 1px;
            height: 1px;
            opacity: 0;
            background-color: $themeColor;
            transition: all .5s ease;
          }
          &:before {
            bottom: 0;
          }
          &:after {
            top: 0;
          }
          &:hover, &.active {
            color: $themeColor;
            transition: all .5s ease;
            &:before, &:after {
              opacity: 1;
            }
            span {
              &:before, &:after {
                opacity: 1;
              }
              &:before {
                height: 100%;
              }
              &:after {
                width: 100%;
              }
            }
            &:before {
              width: 100%;
            }
            &:after {
              height: 100%;
            }
          }
          span {
            &:before, &:after {
              content: "";
              position: absolute;
              left: 0;
              width: 1px;
              height: 1px;
              opacity: 0;
              background-color: $themeColor;
              transition: all .5s ease;
            }
            &:before {
              bottom: 0;
            }
            &:after {
              top: 0;
            }
          }
        }
      }
    }
  }
</style>
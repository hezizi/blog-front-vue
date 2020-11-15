<template>
  <header class="header-wrapper w100">
    <div class="inner">
      <!-- logo -->
      <div class="logo">
        <router-link to="/">
          <span class="logo-title">赫子子的博客</span>
        </router-link>
      </div>

      <div class="df-aic">
        <!-- navbar -->
        <ul class="navbar df">
          <li
            v-for="item in navBarList"
            :key="item.to"
            :class="{ 'active': item.to === activeClass }"
            @click="handleJump(item.to)">
            <a-icon
              :type="item.icon"
              :style="{'margin-right': '3px'}" />
            {{ item.name }}
            <span></span>
          </li>
        </ul>

        <!-- github login -->
        <div class="github-login">
          <div class="user df-aic" v-if="githubConfig.COMMENT_AVATAR">
            <a-avatar :src="githubConfig.COMMENT_AVATAR" />
            <a-icon
              @click="logout"
              type="logout"
              :style="{ fontSize: '16px', marginLeft: '10px', cursor: 'pointer' }"
            />
          </div>
          <div class="login-btn df-aic" @click="githubAuth" v-else>
            <a-icon type="github" :style="{ fontSize: '22px' }" />
            <span>登录</span>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
import { mapActions } from 'vuex'
import githubConfig from '@/config'
import { showMessage } from '@/utils'

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
        name: '标签',
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
      }],
      githubConfig
    }
  },
  watch: {
    $route() {
      this.activeClass = this.$route.path
      // 路由变化时调用滑动到顶部方法
      // this.smoothscroll()
    },
  },
  created() {
    this.activeClass = this.$route.path
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
    },

    // github登录授权
    githubAuth() {
      this.$confirm({
        title: 'Github授权登录',
        okText: '确认',
        cancelText: '取消',
        icon: h => <svg-icon icon-name="warn" />,
        onOk: () => {
          const { auth_url, client_id } = this.githubConfig.GITHUB
          window.location.href = `${auth_url}?client_id=${client_id}&scope=read:user`
        }
      })
    },

    ...mapActions(['logoutAction']),
    // 退出登录
    logout() {
      this.logoutAction().then(res => {
        showMessage('success', res)
        setTimeout(() => {
          window.location.reload()
        }, 500)
      })
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
        padding-top: 10px;
      }
      @include flex($justify: space-between, $align: center);
      @include layout;
      height: $headerHeight;
      .logo {
        &-title {
          position: relative;
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
        // margin-right: 30px;
        li {
          position: relative;
          margin: 0 6px;
          padding: 4px 10px;
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
      .github-login {
        margin-left: 22px;
        .login-btn {
          cursor: pointer;
          span {
            margin-left: 5px;
          }
        }
      }
    }
  }
</style>

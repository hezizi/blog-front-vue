<template>
  <div class="breadcrumb-wrapper">
    <!-- 目前仅在文章详情页和标签文章列表页使用 -->
    <a-breadcrumb>
      <a-breadcrumb-item>
        <router-link to="/"><a-icon type="home" /></router-link>
      </a-breadcrumb-item>
      <a-breadcrumb-item>
        <router-link :to="breadcrumb.link">{{ breadcrumb.title }}</router-link>
      </a-breadcrumb-item>
      <a-breadcrumb-item>
        <a-dropdown>
          <a href="javascript: void(0)">{{ current.name }}</a>
          <a-menu slot="overlay">
            <a-menu-item v-for="item in menuList" :key="item._id">
              <router-link :to="routerInfo(item)">
                {{ breadcrumb.link.includes('tags') ? item.name : item.title }}
              </router-link>
            </a-menu-item>
          </a-menu>
        </a-dropdown>
      </a-breadcrumb-item>
    </a-breadcrumb>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Breadcrumb',
  props: {
    current: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      breadcrumb: {}
    }
  },
  computed: {
    ...mapGetters(['allTags']),
    ...mapGetters(['allPosts']),
    menuList() {
      const { link } = this.breadcrumb
      const which = link.includes('tags') ? 'allTags' : 'allPosts'
      return this[which].filter(item => this.current.id !== item._id)
    },
    routerInfo() {
      const { link } = this.breadcrumb
      return item => {
        return link.includes('tags')
          ? { name: 'tag', params: { tagId: item._id } }
          : { name: 'article', params: { articleId: item._id } }
      }
    }
  },
  created() {
    this.breadcrumb = this.$route.meta.breadcrumb
  }
}
</script>

<style lang="scss" scoped>
  .breadcrumb-wrapper {
    margin-bottom: 20px;
  }
</style>

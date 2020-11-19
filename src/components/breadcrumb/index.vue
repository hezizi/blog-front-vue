<template>
  <div class="breadcrumb-wrapper">
    <a-breadcrumb>
      <a-breadcrumb-item>
        <router-link to="/"><a-icon type="home" /></router-link>
      </a-breadcrumb-item>
      <a-breadcrumb-item>
        <router-link :to="breadcrumb.link">{{ breadcrumb.title }}</router-link>
      </a-breadcrumb-item>
      <a-breadcrumb-item>
        <a href="javascript: void(0)">{{ current.name || current.title }}</a>
        <a-menu slot="overlay">
          <a-menu-item v-for="item in menuList" :key="item._id">
            <router-link :to="{ path: `/tag/${encodeURI(item.name)}`, query: { tag_id: item._id } }">{{ item.name || item.title }}</router-link>
          </a-menu-item>
        </a-menu>
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
  computed: {
    ...mapGetters(['allTags']),
    ...mapGetters(['allPosts']),
    breadcrumb() {
      console.log(this.allPosts)
      return this.$route.meta.breadcrumb
    },
    menuList() {
      const { id } = this.$route.meta.breadcrumb
      if (id === 'tag') return this.allTags.filter(tag => this.current.id !== tag._id)
      else return this.allPosts.filter(post => this.current.id !== post._id)
    }
  }
}
</script>

<style lang="scss" scoped>
  .breadcrumb-wrapper {
    margin-bottom: 20px;
  }
</style>

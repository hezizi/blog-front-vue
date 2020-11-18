<template>
  <div class="breadcrumb-wrapper">
    <a-breadcrumb>
      <a-breadcrumb-item>
        <router-link to="/"><a-icon type="home" /></router-link>
      </a-breadcrumb-item>

      <a-breadcrumb-item>
        <a href="javascript: void(0)">General</a>
        <a-menu slot="overlay">
          <a-menu-item>

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
  data () {
    return {

    }
  },
  computed: {
    ...mapGetters(['allTags'])
  },
}
</script>

<style lang="scss" scoped>
  .breadcrumb-wrapper {
    margin-bottom: 20px;
  }
</style>

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
            <a target="_blank" rel="noopener noreferrer" href="http://www.alipay.com/">
              General
            </a>
          </a-menu-item>
        </a-menu>
      </a-breadcrumb-item>
    </a-breadcrumb>
  </div>
</template>

<script>
export default {
  name: 'Breadcrumb',
  data () {
    return {

    }
  }
}
</script>

<style lang="scss" scoped>
  .breadcrumb-wrapper {
    margin-bottom: 20px;
  }
</style>

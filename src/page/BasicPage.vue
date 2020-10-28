<template>
  <div class="basic-page h100">
    <!-- header -->
    <slot name="header"></slot>

    <!-- main -->
    <main>
      <slot name="main"></slot>
    </main>

    <!-- footer --> 
    <slot name="footer"></slot>
  </div>
</template>

<script>
export default {
  name: 'BasicPage',
  data() {
    return {
      
    }
  }
}
</script>

<style lang="scss" scoped>
  .basic-page {
    main {
      @media screen and (max-width: 576px) {
        padding-top: 150px;
      }
      @include layout;
      padding: 100px 20px 60px;
      min-height: calc(100% - #{$footerHeight});
    }
  }
</style>
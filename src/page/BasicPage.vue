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
        padding: 150px 15px 30px;
      }
      @include layout;
      padding: 100px 15px 30px;
      min-height: calc(100% - #{$footerHeight});
    }
  }
</style>
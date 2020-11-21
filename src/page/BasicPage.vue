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
  name: 'BasicPage'
}
</script>

<style lang="scss" scoped>
  .basic-page {
    main {
      @media screen and (max-width: 576px) {
        padding: 150px 20px 35px;
      }
      @include layout;
      padding: $mainPaddingTop 20px $mainPaddingBottom;
      min-height: calc(100% - #{$footerHeight});
    }
  }
</style>
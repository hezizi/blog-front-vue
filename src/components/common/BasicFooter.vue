<template>
  <footer class="footer-wrapper w100">
    <h4>Yucihzz'Blog ©2020 Created by 赫子子</h4>
    <a class="link" target="blank" href="http://www.beian.miit.gov.cn">鄂ICP备20004755号-1</a>
  </footer>
</template>

<script>
export default {
  name: 'Footer',
  data() {
    return {
      
    }
  }
}
</script>

<style lang="scss" scoped>
  .footer-wrapper {
    @include flex($justify: center, $align: center);
    height: $footerHeight;
    .link {
      margin-left: 8px;
      color: #333;
    }
  }
</style>
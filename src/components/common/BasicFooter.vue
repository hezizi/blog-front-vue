<template>
  <footer class="footer-wrapper w100">
    <h4>Yucihzz'Blog ©{{ date }} Created by 赫子子</h4>
    <a class="link" target="_blank" href="http://beian.miit.gov.cn" rel="noopener">鄂ICP备20004755号-1</a>
  </footer>
</template>

<script>
export default {
  name: 'Footer',
  data() {
    return {
      currentYear: new Date().getFullYear()
    }
  },
  computed: {
    date() {
      return this.currentYear === 2020 ? 2020 : `2020-${this.currentYear}`
    }
  }
}
</script>

<style lang="scss" scoped>
  .footer-wrapper {
    @media screen and (max-width: 576px) {
      @include flex($justify: center, $direction: column);
    }
    @include flex($justify: center, $align: center);
    height: $footerHeight;
    box-shadow: 0 -2px 8px #f0f1f2;
    .link {
      @media screen and (max-width: 576px) {
        margin: 0;
      }
      margin-left: 8px;
      color: #333;
    }
  }
</style>

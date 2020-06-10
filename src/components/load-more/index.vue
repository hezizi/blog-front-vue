<template>
  <div class="loading-wrapper" v-if="isShowLoadMore">
    <div class="loader" v-if="loadingMore">
      <div class="line line1"></div>
      <div class="line line2"></div>
      <div class="line line3"></div>
    </div>
    <a-button v-else @click="onLoadMore">
      加载更多
    </a-button>
  </div>
</template>

<script>
export default {
  name: 'LoadMore',
  props: {
    isShowLoadMore: {
      type: Boolean,
      default: false
    },
    loadingMore: {
      type: Boolean,
      default: false
    },
    total: {
      type: Number
    }
  },
  data() {
    return {
      page: 1
    }
  },
  methods: {
    onLoadMore() {
      this.$emit('getPageNum', ++this.page)
    }
  },
}
</script>

<style lang="scss" scoped>
  .loading-wrapper {
    @include flex($align: center, $justify: center);
    height: 100px;
    .loader {
      position: relative;
      width: 60px;
      height: 50px;
      .line {
        position: absolute;
        width: 8px;
        bottom: 0;
        // background-color: $themeColor;
        background: linear-gradient(to bottom, #eee, $themeColor);
        border-radius: 5px;
      }
      .line1 {
        left: 0;
        animation: line-grow 0.5s ease alternate infinite;
      }
      .line2 {
        left: 20px;
        animation: line-grow 0.5s 0.2s ease alternate infinite;
      }
      .line3 {
        left: 40px;
        animation: line-grow 0.5s 0.2s ease alternate infinite;
      }
    }

    @keyframes line-grow {
      0% {
        height: 0;
      }
      100% {
        height: 75%;
      }
    }
  }
</style>
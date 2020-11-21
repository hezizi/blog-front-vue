<template>
  <div class="error-page">
    <div class="error-img">
      <img src="@/assets/images/error_404.jpg" alt="error_logo" />
    </div>
    <div class="error-desc">
      <p>抱歉，访问的页面不存在</p>
      <a-button
        type="primary"
        @click="$router.go(-1)"
        style="marginRight: 10px"
        >返回上一页</a-button>
      <a-button type="primary" @click="$router.push('/')">返回首页</a-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'NotFound'
}
</script>

<style lang="scss" scoped>
  .error-page {
    @include flex($justify: center, $align: center, $direction: column);
    margin-top: 60px;
    .error-img {
      img {
        width: 800px;
      }
    }
    .error-desc {
      margin-top: -60px;
      h1 {
        margin-bottom: 24px;
        color: #434e59;
        font-weight: 600;
        font-size: 72px;
        line-height: 72px;
      }
      p {
        margin-bottom: 16px;
        font-size: 20px;
        color: rgba(0, 0, 0, .45);
      }
    }
  }
</style>

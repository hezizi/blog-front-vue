<template>
  <div id="app">
    <router-view />
    <a-back-top :visibilityHeight="100" />
  </div>
</template>

<script>
export default {
  name: 'App',
}
</script>

<style lang="scss">
  #app {
    height: 100%;
  }
  .ant-back-top {
    bottom: 80px;
    .ant-back-top-content {
      border-radius: 50%;
      background-color: rgba(0, 0, 0, 0.25);
      &:hover {
        border-radius: 2px;
        background-color: rgba(0, 0, 0, 0.45);
      }
    }
  }
</style>
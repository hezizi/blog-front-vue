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
</style>
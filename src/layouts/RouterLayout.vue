<template>
  <transition name="router" mode="out-in">
    <!-- <keep-alive include="Home">
      <router-view />
    </keep-alive> -->
    <router-view />
  </transition>
</template>

<script>
export default {
  name: 'RouterLayout'
}
</script>

<style lang="scss" scoped>
  @include transition;
</style>
<template>
  <transition name="router" mode="out-in">
    <template v-if="keepAliveRouter">
      <keep-alive> 
        <router-view />
      </keep-alive>
    </template>

    <template v-else>
      <router-view />
    </template>
  </transition>
</template>

<script>
export default {
  name: 'RouterLayout',
  computed: {
    keepAliveRouter() {
      const { keepAlive = true } = this.$route.meta
      return keepAlive
    }
  }
}
</script>

<style lang="scss" scoped>
  @include transition;
</style>
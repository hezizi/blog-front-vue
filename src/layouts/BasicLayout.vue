<template>
  <div class="basic-layout h100">
    <basic-page>
      <!-- header -->
      <template #header>
        <basic-header />
      </template>

      <!-- main -->
      <template #main>
        <router-layout />
      </template>

      <!-- footer -->
      <template #footer>
        <basic-footer />
      </template>
    </basic-page>
  </div>
</template>

<script>
import BasicPage from '@/page/BasicPage'
import RouterLayout from './RouterLayout'
import { BasicHeader, BasicFooter } from '@/components/common'

export default {
  name: 'BasicLayout',
  components: { 
    BasicPage, 
    RouterLayout,
    BasicHeader,
    BasicFooter
  },
  data() {
    return {
      
    }
  }
}
</script>

<style lang="scss" scoped>
  .basic-layout {
    // min-height: 100vh;
    // height: 100vh;
  }
</style>
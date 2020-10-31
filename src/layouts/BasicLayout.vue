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
import { BasicHeader, BasicFooter } from '@/components/common'

export default {
  name: 'BasicLayout',
  components: {
    BasicPage: () => import('@/page/BasicPage'),
    RouterLayout: () => import('./RouterLayout'),
    BasicHeader,
    BasicFooter
  }
}
</script>
<template>
  <a-skeleton :loading="loading" active>
    <slot />
  </a-skeleton>
  <!-- <a-spin tip="Loading..." :spinning="loading">
    <slot />
  </a-spin> -->
</template>

<script>
import { showMessage } from '@/utils'

export default {
  name: 'Loading',
  data() {
    return {
      loading: false
    }
  },
  methods: {
    /* 处理请求成功与失败 */
    async fetchData({ api, params, withLoading, handleFn }) {
      if (withLoading) this.loading = true
      const res = await api(params)
      this.loading = false

      if (!res) return
      
      const { status, message, result } = res
      status ? handleFn(result) : showMessage('error', message)
    }
  }
}
</script>

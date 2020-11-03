<template>
  <a-pagination
    :current="pager.pageNum"
    :page-size="pager.pageSize"
    :total="pager.total"
    :showTotal="(total, range) =>`${range[0]} - ${range[1]} 总共 ${total} 篇文章`"
    @change="onPagerChange"
  />
</template>

<script>
export default {
  name: 'Pagination',
  props: {
    pager: {
      type: Object,
      required: true
    }
  },
  methods: {
    onPagerChange(current) {
      this.$emit('on-pager-change', current)
    }
  }
}
</script>

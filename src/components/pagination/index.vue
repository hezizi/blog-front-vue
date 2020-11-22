<template>
  <a-pagination
    :current="pager.pageNum"
    :page-size="pager.pageSize"
    :total="pager.total"
    :item-render="itemRender"
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
    itemRender(current, type, originalElement) {
      if (type === 'prev') {
        return <a>Previous</a>
      } else if (type === 'next') {
        return <a>Next</a>
      }
      return originalElement
    },
    onPagerChange(current) {
      this.$emit('on-pager-change', current)
    }
  }
}
</script>

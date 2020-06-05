<template>
  <div class="comment-list">
    <a-list
      v-if="commList.length"
      :data-source="commList"
      :header="`${commList.length} ${commList.length > 1 ? 'replies' : 'reply'}`"
      item-layout="horizontal"
    >
      <a-list-item slot="renderItem" slot-scope="item, index">
        <a-comment
          :author="item.author"
          :avatar="item.avatar"
          :content="item.content"
          :datetime="item.datetime"
        />
      </a-list-item>
    </a-list>
  </div>
</template>

<script>
export default {
  name: 'CommentList',
  props: {
    commList: {
      type: Array
    }
  },
  data() {
    return {
      
    }
  }
}
</script>

<style lang="scss" scoped>
  
</style>
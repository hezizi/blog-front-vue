<template>
  <div class="comment-wrapper">
    <a-comment>
      <a-avatar
        slot="avatar"
        src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
        alt="Han Solo"
      />
      <div slot="content">
        <a-form-item>
          <a-textarea
            placeholder="不想说点啥吗..."
            :rows="5"
            :value="value"
            @change="e => value = e.target.value"
          />
        </a-form-item>
        <a-form-item>
          <a-button
            html-type="submit"
            type="primary"
            :loading="submitting"
            @click="handleSubmit"
          >
            给你留言啦
          </a-button>
        </a-form-item>
      </div>
    </a-comment>

    <!-- 留言列表 -->
    <comment-list :comm-list="commList" />
  </div>
</template>

<script>
import CommentList from './list'
import { comment, commentList } from '@/services/api'

export default {
  name: 'Comment',
  components: { CommentList },
  data() {
    return {
      value: '',  // 留言
      submitting: false,
      commList: []
    }
  },
  methods: {
    // 我要留言了
    handleSubmit() {
      if (!this.value) return

      // this.submitting = true
      // setTimeout(() => {
      //   this.submitting = false
      // }, 1000);
      this.submitting = true
      comment({ content: this.value }).then(res => {
        this.$message.success(res.message, 1.5)
        this.submitting = false
        this.value = ''

        this.getCommentList()
      })
    },

    // 留言列表
    getCommentList() {
      commentList({
        pageNum: 1,
        pageSize: 10
      }).then(res => {
        console.log('res', res)
        this.commList = res.result.data
      })
    }
  },
}
</script>

<style lang="scss" scoped>
  
</style>
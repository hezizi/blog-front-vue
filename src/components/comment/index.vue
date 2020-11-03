<template>
  <div class="comment-wrapper">
    <a-comment>
      <a-avatar
        v-if="userAvatar"
        slot="avatar"
        :src="userAvatar"
        alt="头像"
      />
      <a-avatar slot="avatar" icon="user" v-else />
      <div slot="content">
        <div class="textarea">
          <a-textarea
            placeholder="说点啥... （支持 markdown 语法）"
            :rows="5"
            :value="value"
            @change="e => value = e.target.value"
          />
        </div>
        <a-button
          html-type="submit"
          type="primary"
          :loading="submitting"
          @click="handleSubmit"
        > 我要留言
        </a-button>
      </div>
    </a-comment>

    <!-- 留言列表 -->
    <comment-list ref="commlist" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import CommentList from './list'
import { comment } from '@/services/api'
import config from '@/config'

export default {
  name: 'Comment',
  components: { CommentList },
  data() {
    return {
      value: '',  // 留言
      submitting: false,
      userAvatar: config.COMMENT_AVATAR,
    }
  },
  computed: {
    ...mapGetters(['token', 'userInfo'])
  },
  methods: {
    // 我要留言了
    handleSubmit() {
      if (!this.token && !this.userInfo) {
        this.$message.warn('未登录，请先登录 !', 2)
        this.value = ''
        return
      }

      if (!this.value) return

      this.submitting = true
      comment({ userId: this.userInfo.user_id, content: this.value })
        .then(res => {
          this.$message.success(res.message, 1.5)

          this.$refs['commlist'].commListApi(true)
        })
        .finally(() => {
          this.submitting = false
          this.value = ''
        })
    }
  },
}
</script>
<style lang="scss" scoped>
  .textarea {
    margin-bottom: 20px;
  }
</style>

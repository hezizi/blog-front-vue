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
        <a-form-item>
          <a-textarea
            placeholder="说点啥..."
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
          > 我要留言
          </a-button>
        </a-form-item>
      </div>
    </a-comment>

    <!-- 留言列表 -->
    <comment-list :comm-list="commList" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import CommentList from './list'
// import { getStorage } from '@/utils/storage'
import { comment, commentList } from '@/services/api'
import conf from '@/config'

export default {
  name: 'Comment',
  components: { CommentList },
  data() {
    return {
      value: '',  // 留言
      submitting: false,
      commList: [],
      userAvatar: conf().COMMIT_AVATAR
    }
  },
  computed: {
    ...mapGetters(['token', 'userInfo'])
  },
  mounted() {
    this.getCommentList()
  },
  methods: {
    // 我要留言了
    handleSubmit() {
      // const token = getStorage('GITHUB_ACCESS_TOKEN')
      // const userInfo = getStorage('GITHUB_INFO')
      console.log('this.token', this.token)
      console.log(this.userInfo)
      if (!this.token && !this.userInfo) {
        this.$message.warn('未登录，请先登录!', 2)
      }
      
      if (!this.value) return

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
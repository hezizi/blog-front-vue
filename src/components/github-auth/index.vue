<template>
  <div class="github-auth">
    <div class="icon">
      <a-icon type="github" :style="{ fontSize: '40px', marginRight: '15px' }" />
      <a-icon type="loading" :style="{ fontSize: '40px' }" />
    </div>
    <p>Github Auth Loading...</p>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'GithubAuth',
  beforeRouteEnter (to, from, next) {
    console.log('from', from)
    next(vm => {
      vm.prevRoute = from
    })
  },
  data() {
    return {
      prevRoute: ''
    }
  },
  mounted() {
    this.githubLogin()
  },
  methods: {
    ...mapActions(['loginAction']),
    githubLogin() {
      const { code } = this.$route.query
      this.loginAction({ code })
        .then(response => {
          this.$message.success(`欢迎 ${response.name}`, 1.5)
        })
        .catch(err => {
          this.$message.error(err, 1.5)
        })
        .finally(() => {
          this.$router.push({ path: this.prevRoute.path })
          // console.log('this.prevRoute.path', this.prevRoute.path)
          // window.location.href = this.prevRoute.path
        })
    }
  },
}
</script>

<style lang="scss" scoped>
  .github-auth {
    @include flex($align: center, $direction: column);
    margin-top: 100px;
    .icon {
      margin-bottom: 30px;
    }
    p {
      font-size: 20px;
    }
  }
</style>
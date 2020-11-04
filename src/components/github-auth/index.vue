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
          this.$message.success({
            content: `欢迎 ${response.name}`,
            duration: 1.5,
            icon: h => <svg-icon icon-name="success" />
          })
        })
        .catch(err => {
          this.$message.error({
            content: err,
            duration: 1.5,
            icon: h => <svg-icon icon-name="error" />
          })
        })
        .finally(() => {
          // this.$router.push({ path: this.prevRoute.path })
          // window.location.href = this.prevRoute.path
          setTimeout(() => {
            window.location.href = '/'
          }, 500)
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

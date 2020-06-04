<template>
  <fetch-loading ref="fetch">
    <a-timeline>
      <a-timeline-item
        :color="color"
        v-for="item in articlesList"
        :key="item._id"
      >
        <span class="date">{{ item.create_time.slice(5, 10) }}</span>
        <router-link :to="{ name: 'article', params: { articleId: item._id } }">{{ item.title }}</router-link>
      </a-timeline-item>
    </a-timeline>
  </fetch-loading>
</template>

<script>
import { themeColor } from '@/assets/styles/variables.scss'
import FetchLoading from '@/components/loading'
import { articleList } from '@/services/api'

export default {
  name: 'Archive',
  components: {
    FetchLoading
  },
  data() {
    return {
      color: themeColor,
      articlesList: [],
      newList: []
    }
  },
  mounted() {
    this.getAllArticle()
  },
  methods: {
    async getAllArticle() {
      this.$refs['fetch'].fetchData({
        api: articleList,
        params: {
          pageNum: this.pageNum,
          pageSize: this.pageSize
        },
        withLoading: true,
        handleFn: result => {
          new Promise(resolve => {
            this.articlesList = result.data
            resolve(this.articlesList)
          }).then(res => {
            const dateObj = {}
            console.log('this.articlesList', this.articlesList)
            this.newList = this.articlesList.map(item => {
              const group = item.create_time.slice(0, 4)
              dateObj[group] = dateObj[group] || []
              dateObj[group].push(item)
              console.log('dateObj', dateObj, Object.keys(dateObj))
              // return Object.keys(dateObj).map(group => dateObj[group])
            })

            console.log('this.newList', this.newList)
          })
        }
      })
    },
  },
}
</script>

<style lang="scss" scoped>
  .date {
    margin-right: 10px;
  }
</style>
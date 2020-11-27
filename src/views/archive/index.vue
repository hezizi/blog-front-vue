<template>
  <div class="achieve-page">
    <!-- <fetch-loading ref="fetch"> -->
      <a-timeline>
        <template v-for="(list, i) in newPostList">
          <a-timeline-item
            :key="i"
            :color="color"
            :style="{ color: color }"
          >
            <a-icon slot="dot" type="clock-circle-o" style="font-size: 18px;" />
            <span class="header-year">{{ list[0].create_time.slice(0, 4) }}</span>
          </a-timeline-item>

          <a-timeline-item
            v-for="item in list"
            :key="item._id"
            :color="color"
          >
            <span class="date">{{ item.create_time.slice(5, 10) }}</span>
            <router-link
              :to="{ name: 'article', params: { articleId: item._id } }"
            >{{ item.title }}</router-link>
          </a-timeline-item>
        </template>
      </a-timeline>
    <!-- </fetch-loading> -->
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import FetchLoading from '@/components/loading'
import { articleList } from '@/services/api'
import { themeColor } from '@/assets/styles/variables.scss'

export default {
  name: 'Archive',
  components: {
    FetchLoading
  },
  data() {
    return {
      // pageNum: 1,
      // pageSize: 20,
      // articlesList: [],
      // newList: [],
      color: themeColor
    }
  },
  computed: {
    ...mapGetters(['allPosts']),
    newPostList() {
      const dateObj = {}
      this.allPosts.map(item => {
        const year = item.create_time.slice(0, 4)
        dateObj[year] = dateObj[year] || []
        dateObj[year].push(item)
      })
      return Object.keys(dateObj).map(group => dateObj[group])
    }
  },
  mouted() {
    // this.getAllPosts()
  },
  methods: {
    async getAllPosts() {
      // this.$refs['fetch'].fetchData({
      //   api: articleList,
      //   params: {
      //     pageNum: this.pageNum,
      //     pageSize: this.pageSize
      //   },
      //   withLoading: true,
      //   handleFn: result => {
      //     this.articlesList = result.data

      //     const dateObj = {}
      //     this.articlesList.map(item => {
      //       const year = item.create_time.slice(0, 4)
      //       dateObj[year] = dateObj[year] || []
      //       dateObj[year].push(item)
      //     })
      //     this.newList = Object.keys(dateObj).map(group => dateObj[group])
      //   }
      // })
    }
  }
}
</script>

<style lang="scss" scoped>
  .achieve-page {
    @media screen and (max-width: 480px) {
      padding: 0 20px;
    }
    margin-top: 15px;
    padding: 0 60px;
    .header-year {
      position: relative;
      top: -8px;
      margin-left: 10px;
      font-size: 24px;
      font-weight: bold;
      color: $themeColor;
    }
    .date {
      margin-right: 10px;
    }
  }
</style>

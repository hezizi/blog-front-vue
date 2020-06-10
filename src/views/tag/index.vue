<template>
  <div class="tag-page">
    <!-- <div class="tags" v-for="tag in allTags" :key="tag._id">
      <a-tag :color="tagColor" :style="{fontSize: `${tagStyle(tag.article.length)}px`}">
        {{ tag.name }}
      </a-tag>
    </div> -->
    <ul>
      <li v-for="tag in allTags" :key="tag._id">
        <a-badge
          :count="tag.article.length"
          show-zero
          :style="{fontSize: `${tagStyle(tag.article.length)}px`}"
        >
         <router-link :to="{ path: `/tag/${tag.name}` }" >{{ tag.name }}</router-link>
        </a-badge>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { setSizeByCount } from '@/utils'

export default {
  name: 'TagPage',
  data() {
    return {
      
    }
  },
  computed: {
    ...mapGetters(['allTags']),
    tagStyle: () => len => setSizeByCount(len)
  },
  watch: {
    $route() {
      console.log('this.$route.path', this.$route.path)
    }
  },
}
</script>

<style lang="scss" scoped>
  .tag-page {
    margin-top: 30px;
    ul {
      @include flex($justify: center);
      flex-wrap: wrap;
      li {
        margin: 20px;
        span {
          padding-bottom: 6px;
          border-bottom: 1px dashed $themeColor;
        }
      }
    }
  }
  /deep/ .ant-badge-count {
    right: -10px;
  }
</style>
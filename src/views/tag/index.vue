<template>
  <div class="tag-page">
    <ul>
      <li
        :key="tag._id"
        v-for="tag in allTags"
      >
        <a-badge
          :count="tag.article.length"
          :number-style="{
            backgroundColor: badgeColor
          }"
          :style="{fontSize: `${tagStyle(tag.article.length)}px`}"
          show-zero
        >
          <router-link :to="{ name: 'tag', params: { tagId: tag._id } }">{{ tag.name }}</router-link>
        </a-badge>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { setSizeByCount } from '@/utils'
import { themeColor } from '@/assets/styles/variables.scss'

export default {
  name: 'TagPage',
  data () {
    return {
      badgeColor: themeColor
    }
  },
  computed: {
    ...mapGetters(['allTags']),
    tagStyle: () => len => setSizeByCount(len)
  }
}
</script>

<style lang="scss" scoped>
.tag-page {
  margin-top: 30px;
  padding: 0 60px;
  @media screen and (max-width: 576px) {
    padding: 0;
  }
  ul {
    @include flex($justify: center);
    flex-wrap: wrap;
    li {
      @include flex($align: center);
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

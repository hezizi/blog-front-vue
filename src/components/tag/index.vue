<template>
  <div class="tags-wrapper">
    <ul class="df">
      <li
        v-for="tag in tagList"
        :key="tag._id"
        @click="handleTagClick(tag)"
        :class="{ 'active': current === tag._id && on }"
      >
        <span></span>
        {{ tag.name }}
      </li>
    </ul>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'Tags',
  props: {
    tagList: {
      type: Array,
      default: []
    }
  },
  data() {
    return {
      on: false,
      current: ''
    }
  },
  watch: {
    // current(newV, oldV) {
    //   this.on = true
    // }
  },
  computed: {
    ...mapGetters(['selectedTag'])
  },
  mounted() {
    this.setSelectedTag('')
  },
  methods: {
    ...mapActions(['setSelectedTag']),
    handleTagClick(val) {
      this.current = val._id
      if (val._id === this.selectedTag) {
        this.on = !this.on
      } else {
        this.setSelectedTag(val._id)
        this.on = true
      }
      this.$emit('tagClick', this.on ? val : {})
    }
  },
}
</script>

<style lang="scss" scoped>
  .tags-wrapper {
    user-select: none;
    ul {
      flex-wrap: wrap;
      li {
        @include flex($justify: center, $align: center);
        position: relative;
        margin: 5px;
        padding: 2px 10px;
        color: #666;
        border-radius: 4px;
        border: 1px solid transparent;
        background-color: rgba($themeColor,  .15);
        cursor: pointer;
        &:before, &:after {
          content: "";
          position: absolute;
          top: 50%;
          width: 1px;
          height: 1px;
          opacity: 0;
          background-color: $themeColor;
          transition: all .3s ease;
        }
        &:before {
          left: 0;
        }
        &:after {
          right: 0;
        }
        &:hover, &.active {
          color: #333;
          transition: all .3s ease;
          &:before, &:after {
            top: 0;
            height: 100%;
            opacity: 1;
          }
          span {
            &:before, &:after {
              left: 0;
              width: 100%;
              opacity: 1;
            }
          }
        }
        span {
          &:before, &:after {
            content: "";
            position: absolute;
            left: 50%;
            width: 1px;
            height: 1px;
            opacity: 0;
            background-color: $themeColor;
            transition: all .3s ease;
          }
          &:before {
            top: 0;
          }
          &:after {
            bottom: 0;
          }
        }
      }
    }
  }
  
</style>
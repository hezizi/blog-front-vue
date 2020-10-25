<template>
  <a-icon v-if="iconName" class="icon" :component="require(`@/icons/${iconName}.svg`)" />
  <a-icon v-else class="icon" :type="type" />
</template>

<script>
export default {
  name: 'SvgIcon',
  props: {
    type: {
      type: String
    },
    iconName: {
      type: String
    }
  }
}
</script>

<style scoped>
.icon {
  /* width: 1.5em;
  height: 1.5em; */
}
</style>

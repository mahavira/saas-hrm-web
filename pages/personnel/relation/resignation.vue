<template>
  <div class="el-container is-vertical">
    <div class="sp-tabs__three">
      <nuxt-link
        v-for="(item, index) in tabs"
        :key="index"
        :to="`/personnel/relation/resignation/${item.path}`"
        :class="{active: item.path===currentPath}"
        class="el-link item"
      >
        <span>{{ item.label }}</span>
      </nuxt-link>
    </div>
    <nuxt-child class="sp-container" />
  </div>
</template>
<script>
const tabs = [{
  path: 'wait',
  name: 'wait',
  label: '待离职'
}, {
  path: 'abandon',
  name: 'abandon',
  label: '已离职'
}]
export default {
  data () {
    return {
      tabs
    }
  },
  computed: {
    currentPath () {
      return this.$route.params.type || ''
    }
  }
}
</script>
<style lang="scss" scoped>
</style>

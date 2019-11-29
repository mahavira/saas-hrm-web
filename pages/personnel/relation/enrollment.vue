<template>
  <div class="el-container is-vertical">
    <div class="sp-tabs__three">
      <nuxt-link
        v-for="(item, index) in tabs"
        :key="index"
        :to="`/personnel/relation/enrollment/${item.path}`"
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
  label: '待入职'
}, {
  path: 'new',
  name: 'new',
  label: '最近入职'
}, {
  path: 'abandon',
  name: 'abandon',
  label: '放弃入职'
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

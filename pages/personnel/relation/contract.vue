<template>
  <div class="el-container is-vertical">
    <div class="sp-tabs__three">
      <nuxt-link
        v-for="(item, index) in tabs"
        :key="index"
        :to="`/personnel/relation/contract/${item.path}`"
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
  path: 'sign',
  name: 'sign',
  label: '已签订合同'
}, {
  path: 'not',
  name: 'not',
  label: '未签订合同'
}, {
  path: 'log',
  name: 'log',
  label: '合同签订记录'
}, {
  path: 'info',
  name: 'info',
  label: '合同概况'
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

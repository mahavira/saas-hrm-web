<template>
  <div>
    <div class="sp-tabs__two">
      <nuxt-link
        v-for="(item, index) in tabs"
        :key="index"
        :to="`/personnel/relation/${item.path}`"
        :class="{active: item.name===currentPath}"
        class="el-link item"
      >
        <span>{{ item.label }}</span>
      </nuxt-link>
    </div>
    <el-scrollbar
      class="is-vertical sp-fixed-height__126"
      view-class=""
    >
      <nuxt-child />
    </el-scrollbar>
  </div>
</template>
<script>
const tabs = [{
  name: 'enrollment',
  path: 'enrollment/wait',
  label: '入职管理'
}, {
  name: 'probation',
  path: 'probation',
  label: '转正管理'
}, {
  name: 'resignation',
  path: 'resignation/wait',
  label: '离职管理'
}, {
  name: 'transfer',
  path: 'transfer',
  label: '人事调动'
}, {
  name: 'contract',
  path: 'contract/info',
  label: '合同管理'
}]
export default {
  data () {
    return {
      tabs
    }
  },
  computed: {
    currentPath () {
      return this.$route.path.split('/')[3]
    }
  }
}
</script>

<template>
  <div>
    <div class="sp-tabs__two">
      <nuxt-link
        v-for="(item, index) in tabs"
        :key="index"
        :to="`/personnel/manage/${item.path}`"
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
  name: 'roster',
  path: 'roster',
  label: '员工花名册'
}, {
  name: 'archive',
  path: 'archive/education',
  label: '员工档案库'
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

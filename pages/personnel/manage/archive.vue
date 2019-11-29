<template>
  <div class="el-container is-vertical">
    <div class="sp-tabs__three">
      <nuxt-link
        v-for="(item, index) in tabs"
        :key="index"
        :to="`/personnel/manage/archive/${item.path}`"
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
  path: 'education',
  name: 'education',
  label: '教育经历'
}, {
  path: 'work',
  name: 'work',
  label: '工作经历'
}, {
  path: 'cert',
  name: 'cert',
  label: '证书/证件'
}, {
  path: 'contact',
  name: 'contact',
  label: '紧急联系人'
}, {
  path: 'family',
  name: 'family',
  label: '家庭成员'
}, {
  path: 'position',
  name: 'position',
  label: '职称'
}, {
  path: 'skill',
  name: 'skill',
  label: '工作技能'
}, {
  path: 'language',
  name: 'language',
  label: '语言能力'
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

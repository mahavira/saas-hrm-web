<template>
  <tab-warp :tabs="tabs" :show-delete="true">
    <t-sidebar class="intro" />
  </tab-warp>
</template>
<script>
import TSidebar from './-sidebar'
import modA from './.mods/a.vue'
import modB from './.mods/b.vue'
import modC from './.mods/c.vue'
import modD from './.mods/d.vue'
import modE from './.mods/e.vue'
import modF from './.mods/f.vue'
import modG from './.mods/g.vue'
import modH from './.mods/h.vue'
import TabWarp from '~/components/tab-warp'
const tabs = [{
  label: '在职信息', name: 'a', comp: modA
}, {
  label: '个人信息', name: 'b', comp: modB
}, {
  label: '联系信息', name: 'c', comp: modC
}, {
  label: '工资社保', name: 'd', comp: modD
}, {
  label: '合同信息', name: 'e', comp: modE
}, {
  label: '材料附件', name: 'f', comp: modF
}, {
  label: '异动记录', name: 'g', comp: modG
}, {
  label: '操作记录', name: 'h', comp: modH
}]
export default {
  components: { TabWarp, TSidebar },
  data () {
    return {
      tabs
    }
  },
  methods: {
  }
}
</script>
<style lang='scss' scoped>
.sp-container{
  height: calc(100vh - 126px - 64px);
}
</style>

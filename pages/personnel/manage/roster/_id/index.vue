<template>
  <div class="el-row el-row--flex sp-container">
    <t-sidebar />
    <div class="sp-material">
      <el-tabs v-model="activeTab" @tab-click="onTab" class="sp-material-tabs" type="card">
        <el-tab-pane
          v-for="(item,index) in tabs"
          :key="index"
          :name="item.name"
          :label="item.label"
        />
      </el-tabs>
      <t-main />
    </div>
  </div>
</template>
<script>
import TSidebar from './-sidebar'
import TMain from './-main'
const tabs = [{
  label: '在职信息', name: 'a'
}, {
  label: '个人信息', name: 'b'
}, {
  label: '联系信息', name: 'c'
}, {
  label: '工资社保', name: 'd'
}, {
  label: '合同信息', name: 'e'
}, {
  label: '材料附件', name: 'f'
}, {
  label: '异动记录', name: 'g'
}, {
  label: '操作记录', name: 'h'
}]
export default {
  components: { TSidebar, TMain },
  data () {
    return {
      tabs,
      activeTab: 'a'
    }
  },
  created () {
  },
  methods: {
    onTab () {}
  }
}
</script>
<style lang='scss' scoped>
.sp-container{
  height: calc(100vh - 126px - 64px);
}
</style>

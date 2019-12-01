<template>
  <div class="el-row el-row--flex sp-container" style="margin-top:32px">
    <t-sidebar />
    <div class="main">
      <el-tabs v-model="activeTab" @tab-click="onTab" class="tabs" type="card">
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
  .main{
    flex: 1;
    display: flex;
    overflow: hidden;
    flex-direction: column;
  }
  .tabs{
    width: 100%;
    /deep/{
      .el-tabs__header{
        border-radius: 0 10px 0px 0px;
        background: #E5E8EC;
        .el-tabs__nav{
          border: none
        }
        .el-tabs__item{
          padding: 6px 40px !important;
          height: auto;
          border: none;
          &.is-active{
            background: #FFF;
            border-radius: 10px 10px 0px 0px;
          }
          &:first-of-type{
            border-radius: 0 10px 0px 0px;
          }
        }
        .el-tabs__nav-next, .el-tabs__nav-prev{
          line-height: 52px;
          text-align: center;
          width: 20px;
        }
      }
      .el-tabs__content{
        display: none !important
      }
    }
  }
</style>

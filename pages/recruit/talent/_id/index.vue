<template>
  <div>
    <div class="sp-filter is-white-bg">
      <div class="selection">
        <div class="title">架构师</div>
        <div>
          新候选人 I 其他
          <el-popover
            placement="bottom-start"
            trigger="hover"
            width="300"
          >
            <div class="popover">
              <div class="item">
                <span>产品架构师</span> <span class="is-primary">待接受offer</span>
              </div>
              <div class="item">
                <span>高级架构师</span> <span class="is-primary">初选通过</span>
              </div>
              <div class="item">
                <span>高级工程师</span> <span class="is-primary">初选通过</span>
              </div>
            </div>
            <span slot="reference" class="is-primary">3</span>
          </el-popover>
          个应聘
        </div>
      </div>
      <div class="handler">
        <el-dropdown @command="onDropdown($event)">
          <el-button type="default" size="small" class="is-shadow">
            <i class="el-icon-finished is-primary" /> 移动人才
          </el-button>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="update"><i class="el-icon-plus is-primary" /> 移动到初选通过</el-dropdown-item>
            <el-dropdown-item command="import"><i class="el-icon-edit is-primary" /> 移动到面试通过</el-dropdown-item>
            <el-dropdown-item command="delete"><i class="el-icon-delete is-primary" /> 添加到待入职</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <el-button @click="onDelete" type="default" class="is-shadow" size="small"><i class="el-icon-s-claim is-primary" /> 淘汰/流失</el-button>
        <el-button @click="onDelete" type="default" class="is-shadow" size="small"><i class="el-icon-delete is-primary" /> 删除候选</el-button>
      </div>
    </div>
    <div class="el-row el-row--flex sp-container" style="height: calc(100vh - 192px)">
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
  </div>
</template>
<script>
import TSidebar from './-sidebar'
import TMain from './-main'
const tabs = [{
  label: '个人信息', name: 'b'
}, {
  label: '简历材料', name: 'c'
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
    onTab () {},
    onDropdown () {}
  }
}
</script>
<style scoped lang="scss">
.selection{
  display: -webkit-box;
  color:rgba(0,0,0,0.5);
  line-height: 32px;
  .title{
    font-size:20px;
    font-weight:800;
    color:rgba(0,0,0,1);
    margin-right: 16px;
  }
}
.search{
  margin-left: 30px;
}
.popover{
  .item{
    display: flex;
    padding: 16px;
    justify-content: space-between;
  }
}
</style>

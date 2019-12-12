<template>
  <div class="sp-fixed-height__one">
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
            <i class="icon-ico_transformation is-primary" /> 移动人才
          </el-button>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="update"><i class="icon-ico_revoke is-primary" /> 移动到初选通过</el-dropdown-item>
            <el-dropdown-item command="import"><i class="icon-ico_revoke is-primary" /> 移动到面试通过</el-dropdown-item>
            <el-dropdown-item command="delete"><i class="icon-ico_revoke is-primary" /> 添加到待入职</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <el-button @click="onDelete" type="default" class="is-shadow" size="small"><i class="icon-ico_eliminate is-primary" /> 淘汰/流失</el-button>
        <el-button @click="onDelete" type="default" class="is-shadow" size="small"><i class="icon-ico_delete is-primary" /> 删除候选</el-button>
      </div>
    </div>
    <tab-warp :tabs="tabs" :show-delete="false" style="flex: 1;">
      <t-sidebar />
    </tab-warp>
  </div>
</template>
<script>
import TSidebar from './-sidebar'
import modA from './.mods/a.vue'
import modB from './.mods/b.vue'
import modC from './.mods/c.vue'
import TabWarp from '~/components/tab-warp'

const tabs = [{
  label: '个人信息', name: 'a', comp: modA
}, {
  label: '简历材料', name: 'b', comp: modB
}, {
  label: '操作记录', name: 'c', comp: modC
}]
export default {
  components: { TSidebar, TabWarp },
  data () {
    return {
      tabs
    }
  },
  created () {
  },
  methods: {
    onDropdown () {},
    onDelete () {}
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

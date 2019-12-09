<template>
  <div style="height:0">
    <div class="header">
      <div>
        <div class="top is-justify-space-between el-row--flex">
          <div class="title">
            我是最大组织名称
          </div>
          <Summary />
        </div>
        <div class="sp-filter">
          <div class="search">
            <el-input
              v-model="keyword"
              @keyup.enter.native="onSearch"
              size="small"
              placeholder="请输入搜索关键词"
              suffix-icon="el-icon-search"
            />
          </div>
          <div class="handler">
            <el-button @click="onAdd" type="primary" class="is-shadow" size="small"><i class="el-icon-plus" /> 新增组织</el-button>
            <el-button @click="onExport" type="default" class="is-shadow" size="small"><i class="el-icon-download is-primary" /> 导 出</el-button>
            <el-dropdown @command="onDorpdownHandler($event)">
              <el-button type="default" size="small" class="is-shadow">
                <i class="el-icon-finished is-primary" /> 批 量
              </el-button>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="update"><i class="el-icon-plus is-primary" /> 批量更新</el-dropdown-item>
                <el-dropdown-item command="import"><i class="el-icon-edit is-primary" /> 批量导入</el-dropdown-item>
                <el-dropdown-item command="delete"><i class="el-icon-delete is-primary" /> 批量删除</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
        </div>
      </div>
    </div>
    <el-scrollbar class="is-vertical" style="flex: 1">
      <div class="org-items el-container">
        <org-item v-for="i in 7" :key="i" :showCheckbox="showCheckbox" />
      </div>
    </el-scrollbar>
    <transition name="transform-y">
      <div v-if="showCheckbox" class="footer el-container">
        <div>已选择 <span class="count">4</span> 条</div>
        <div>
          <el-button @click="cancelDelete" :loading="loading" size="small">取消</el-button>
          <el-button @click="confirmDelete" :loading="loading" size="small" type="primary">确认删除</el-button>
        </div>
      </div>
    </transition>
  </div>
</template>
<script>
import OrgItem from './-org-item'
import Summary from './-summary'

export default {
  components: { OrgItem, Summary },
  data () {
    return {
      keyword: '',
      showCheckbox: false,
      loading: false
    }
  },
  methods: {
    onAdd () { },
    onExport () { },
    onSearch () {},
    onDorpdownHandler (e) {
      if (e === 'delete') {
        this.showCheckbox = true
      } else if (e === 'import') {

      } else if (e === 'update') {

      }
    },
    cancelDelete () {
      this.showCheckbox = false
    },
    confirmDelete () {
      this.$message.success('删除成功')
      this.showCheckbox = false
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~/assets/var.scss';
.header{
  background: #FFF;
  box-shadow: 1px 5px 5px 1px #F1F2F4;
  .top{
    padding: 32px 32px 0;
  }
  .title{
    font-size: 20px;
    font-weight: 600;
  }
  .sp-filter{
    padding-top: 32px;
  }
}
.org-items{
  margin: 26px;
  flex-wrap: wrap;
  padding-bottom: 72px;
  justify-content: space-between;
}
.footer{
  position: fixed;
  bottom: 0;
  left: 80px;
  right: 0;
  padding: 16px 32px 24px;
  background: #FFF;
  justify-content: space-between;
  align-items: center;
  z-index: 1;
  box-shadow:0px 4px 20px 0px rgba(0,0,0,0.2);
  border-radius: 10px 10px 0px 0px;
  .count{
    font-size: 20px;
    color: $color-primary
  }
}
</style>

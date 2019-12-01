<template>
  <div style="height:0">
    <div class="sp-filter is-white-bg">
      <div />
      <div class="handler">
        <el-button @click="onDelete" type="primary" class="is-shadow" size="mini"><i class="el-icon-plus" /> 新增组织</el-button>
        <el-dropdown>
          <el-button @click="onDelete" type="default" class="is-shadow" size="mini">
            <i class="el-icon-finished is-primary" />
            导出/导入
          </el-button>
          <el-dropdown-menu>
            <el-dropdown-item>
              <i class="el-icon-plus is-primary" /> 导入岗位编制
            </el-dropdown-item>
            <el-dropdown-item>
              <i class="el-icon-edit is-primary" /> 导出岗位编制表
            </el-dropdown-item>
            <el-dropdown-item>
              <i class="el-icon-delete is-primary" /> 导出岗位信息表
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <el-dropdown>
          <el-button @click="onDelete" type="default" class="is-shadow" size="mini">
            <i class="el-icon-finished is-primary" />
            批 量<i class="el-icon-arrow-down el-icon--right" />
          </el-button>
          <el-dropdown-menu>
            <el-dropdown-item>
              <i class="el-icon-plus is-primary" /> 批量新增
            </el-dropdown-item>
            <el-dropdown-item>
              <i class="el-icon-edit is-primary" /> 批量修改
            </el-dropdown-item>
            <el-dropdown-item>
              <i class="el-icon-delete is-primary" /> 批量删除
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>
    <el-scrollbar class="is-vertical" style="flex: 1">
      <div class="el-row el-row--flex sp-container" style="margin-top:32px;">
        <t-sidebar />
        <div class="main">
          <t-main />
          <div class="sp-container__footer">
            <el-pagination
              :total="pagination.total"
              :page-size="pagination.size"
              :current-page="pagination.page"
              background
              layout="prev, pager, next, sizes, total"
            />
          </div>
        </div>
      </div>
    </el-scrollbar>
  </div>
</template>
<script>
import TSidebar from './-sidebar'
import TMain from './-main'
export default {
  components: { TSidebar, TMain },
  data () {
    return {
      pagination: {
        total: 0,
        page: 0,
        size: 10
      }
    }
  },
  mounted () {
  },
  methods: {
    onDelete () {}
  }
}
</script>
<style lang="scss" scoped>
.sp-container{
  flex: 1;
}
.main{
  flex: 1;
}
</style>

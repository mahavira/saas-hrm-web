<template>
  <div class="sp-container">
    <div class="sp-filter">
      <div class="search">
        <el-input
          v-model="keyword"
          @keyup.enter.native="onSearch"
          size="small"
          placeholder="岗位名称/编码"
          suffix-icon="icon-ico_Search"
        />
      </div>
      <div class="handler">
        <el-button @click="onDelete" type="primary" class="is-shadow" size="small"><i class="icon-ico_new-additions" /> 新增岗位</el-button>
        <el-dropdown @command="onDropdownImport">
          <el-button @click="onDelete" type="default" class="is-shadow" size="small">
            <i class="el-icon-arrow-down el-icon--left" />导出/导入
          </el-button>
          <el-dropdown-menu>
            <el-dropdown-item>
              <i class="icon-ico_new-additions is-primary" command="import1" /> 导入岗位编制
            </el-dropdown-item>
            <el-dropdown-item>
              <i class="icon-ico_edit is-primary" command="import2" /> 导出岗位编制表
            </el-dropdown-item>
            <el-dropdown-item>
              <i class="icon-ico_delete is-primary" command="import3" /> 导出岗位信息表
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <el-dropdown @command="onDropdownBatch">
          <el-button type="default" class="is-shadow" size="small">
            <i class="el-icon-arrow-down el-icon--left" /> 批 量
          </el-button>
          <el-dropdown-menu>
            <el-dropdown-item command="add">
              <i class="icon-ico_new-additions is-primary" /> 批量新增
            </el-dropdown-item>
            <el-dropdown-item command="update">
              <i class="icon-ico_edit is-primary" /> 批量修改
            </el-dropdown-item>
            <el-dropdown-item command="delete">
              <i class="icon-ico_delete is-primary" /> 批量删除
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>
    <div class="el-row el-row--flex">
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
    <select-imput-dialog :visible.sync="visibleSelectImput" @select="showImportDialog" />
    <transition name="transform-y">
      <div v-if="showCheckbox" class="footer el-container is-justify-space-between">
        <div>已选择 <span class="count">0</span> 条</div>
        <div>
          <el-button @click="cancelDelete" :loading="loading" size="small">取消</el-button>
          <el-button @click="confirmDelete" :loading="loading" size="small" type="primary">确认删除</el-button>
        </div>
      </div>
    </transition>
  </div>
</template>
<script>
import TSidebar from './-sidebar'
import TMain from './-main'
import SelectImputDialog from '~/components/select-import-dialog'

export default {
  components: { TSidebar, TMain, SelectImputDialog },
  data () {
    return {
      visibleSelectImput: false,
      showCheckbox: false,
      keyword: '',
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
    onDelete () {},
    onSearch () {},
    showImportDialog (e) {
      this.visibleSelectImput = false
    },
    onDropdownImport (e) {

    },
    onDropdownBatch (e) {
      if (e === 'delete') {
        this.showCheckbox = true
      } else if (e === 'update') {
        this.visibleSelectImput = true
      }
    },
    cancelDelete () {
      this.showCheckbox = false
    },
    confirmDelete () {
      this.showCheckbox = false
    }
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
.footer{
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  padding: 16px 24px;
  background: #FFF;
  align-items: center;
  box-shadow: -2px -5px 5px rgba($color: #000000, $alpha: 0.05);
}
</style>

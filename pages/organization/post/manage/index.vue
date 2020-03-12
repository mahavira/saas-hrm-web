<template>
  <div class="sp-container">
    <div class="sp-filter">
      <div class="search">
        <el-input
          v-model="keyword"
          @keyup.enter.native="onSearch"
          :placeholder="岗位名称/编码"
          size="small"
        >
          <el-button slot="append" @click="onSearch" icon="el-icon-search" />
        </el-input>
      </div>
      <div class="handler">
        <el-button @click="onCreate" type="primary" class="is-shadow" size="small"><i class="icon-ico_new-additions" /> 新增岗位</el-button>
        <el-dropdown @command="onDropdown">
          <el-button @click="onDelete" type="default" class="is-shadow" size="small">
            <i class="icon-ico_drop-down el-icon--left" />导出/导入
          </el-button>
          <el-dropdown-menu>
            <el-dropdown-item command="import">
              <i class="icon-ico_import is-primary" /> 导入岗位编制
            </el-dropdown-item>
            <el-dropdown-item command="import2">
              <i class="icon-ico_export is-primary" /> 导出岗位编制表
            </el-dropdown-item>
            <el-dropdown-item command="import3">
              <i class="icon-ico_export is-primary" /> 导出岗位信息表
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <el-dropdown @command="onDropdown">
          <el-button type="default" class="is-shadow" size="small">
            <i class="icon-ico_drop-down el-icon--left" /> 批 量
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
    <select-import-dialog
      :visible.sync="visibleSelectImport"
      @select="onSelectImport"
      :items="[{title: '方法一：在线修改', intro: '通过在线修改的方式批量修改岗位'}, {title: '方法二：导入岗位信息', intro: '适用于批量修改系统已存在岗位信息.'}]"
    />
    <dialog-import :visible.sync="visibleImport" :title="isImportUpdate?'导入岗位信息':'批量修改岗位信息'">
      <file-card
        :label="isImportUpdate?'导出空模版':'导出岗位列表'"
        :desc="isImportUpdate?'导出标准模板':'录入需要修改的岗位类别信息'"
        href="http://172.16.17.106:9590/hrEducationInfo/template/export"
        download="export.excel"
        guide="1"
        icon="icon_ic_import_excel"
      />
      <file-card
        label="导入文件"
        desc="导入文件，针对存在的岗位，修改岗位信息"
        guide="2"
        icon="icon_ic_export_excel"
      />
    </dialog-import>
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
import { dialog } from './index.conf'
import SelectImportDialog from '~/components/select-import-dialog'
import DialogImport from '~/components/dialog/import'
import FileCard from '~/components/file-card'

export default {
  components: { TSidebar, TMain, SelectImportDialog, DialogImport, FileCard },
  data () {
    return {
      visibleSelectImport: false,
      visibleImport: false,
      isImportUpdate: 0,
      showCheckbox: false,
      keyword: '',
      loading: false,
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
    onCreate () {
      this.$bus.$emit('dialog:form', dialog.create)
    },
    onUpdate () {
      this.$bus.$emit('dialog:form', dialog.update)
    },
    onDelete () {},
    onSearch () {},
    onDropdown (e) {
      if (e === 'delete') {
        this.showCheckbox = true
      } else if (e === 'update') {
        this.onUpdate()
      } else if (e === 'import') {
        this.visibleSelectImport = true
      }
    },
    onSelectImport (e) {
      this.isImportUpdate = e
      this.visibleImport = true
      this.visibleSelectImport = false
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

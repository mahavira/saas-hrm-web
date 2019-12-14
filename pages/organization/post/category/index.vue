<template>
  <div class="sp-container">
    <div class="sp-filter">
      <div class="search">
        <el-input
          v-model="keyword"
          @keyup.enter.native="onSearch"
          placeholder="岗位名称/编码"
          size="small"
          suffix-icon="icon-ico_Search"
        />
      </div>
      <div class="handler">
        <el-button @click="onCreate" type="primary" class="is-shadow" size="small"><i class="icon-ico_new-additions" /> 新增类别</el-button>
        <el-button @click="onImport" type="default" class="is-shadow" size="small"><i class="icon-ico_export is-primary" /> 导 出</el-button>
        <el-dropdown @command="onDropdown">
          <el-button type="default" class="is-shadow" size="small">
            <i class="icon-ico_drop-down el-icon--left" /> 批 量
          </el-button>
          <el-dropdown-menu>
            <el-dropdown-item command="import">
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
    <div v-loading="loading" class="sp-container__table">
      <el-table
        ref="table"
        :data="tableData"
        :default-expand-all="true"
        :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
        row-key="id"
      >
        <el-table-column
          v-if="selected"
          type="selection"
          width="60"
        />
        <el-table-column
          v-for="(item,name) in tableFields"
          :key="name"
          :prop="name"
          :label="item.label"
        />
        <el-table-column
          label="操作"
          width="90"
        >
          <template slot-scope="scope">
            <a @click="onUpdate(scope.row)" href="javascript:;" class="handler-icon">
              <i class="icon-ico_edit" />
            </a>
            <a href="javascript:;" class="handler-icon">
              <i class="icon-ico_delete" />
            </a>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="sp-container__footer">
      <el-pagination
        :total="pagination.total"
        :page-size="pagination.size"
        :current-page="pagination.page"
        :page-sizes="pageSizes"
        @size-change="onPageSizeChange"
        @current-change="onPageCurrentChange"
        background
        layout="prev, pager, next, sizes, total"
      />
      <transition name="transform-y">
        <div v-if="selected" class="handler">
          <span>已选择 <span class="is-primary">{{ selectedRows.length }}</span> 条</span>
          <el-button @click="cancelDelete" type="default" size="small" class="is-shadow">取消</el-button>
          <el-button
            @click="confirmDelete"
            :disabled="!selectedRows.length"
            :loading="loading"
            type="primary"
            size="small"
            class="is-shadow"
          >
            <i class="icon-ico_delete" /> 确认删除
          </el-button>
        </div>
      </transition>
    </div>
    <dialog-import :visible.sync="visibleImportUpdateDialog" title="批量修改">
      <file-card
        :label="['导出空模版', '导出类别列表']"
        desc="导出标准模板，录入需要修改的岗位类别信息"
        href="http://172.16.17.106:9590/hrEducationInfo/template/export"
        download="export.excel"
        guide="1"
        icon="icon_ic_import_excel"
      />
      <file-card
        label="导入文件"
        desc="导入文件，针对已经存在的岗位类别，修改岗位信息"
        guide="2"
        icon="icon_ic_export_excel"
      />
    </dialog-import>
    <dialog-import :visible.sync="visibleImportDialog" title="导入">
      <file-card
        label="导出模版"
        desc="导出标准模板，支持批量更新岗位类别。"
        href="http://172.16.17.106:9590/hrEducationInfo/template/export"
        download="export.excel"
        guide="1"
        icon="icon_ic_import_excel"
      />
      <file-card
        label="导入文件"
        desc="导入岗位类别列表后，完成新增。"
        guide="2"
        icon="icon_ic_export_excel"
      />
    </dialog-import>
  </div>
</template>
<script>
import * as conf from './index.conf'
import DialogImport from '~/components/dialog/import'
import FileCard from '~/components/file-card'
export default {
  components: { DialogImport, FileCard },
  data () {
    return {
      visibleImportDialog: false,
      visibleImportUpdateDialog: false,
      tableFields: null,
      loading: true,
      keyword: '',
      currentRow: {},
      selectedRows: [],
      tableData: [],
      selected: false, // 选择中
      pagination: {
        total: 0,
        page: 1,
        size: 10
      },
      pageSizes: [10, 20, 30, 50],
      ...conf
    }
  },
  created () {
    this.fetch()
  },
  methods: {
    async fetch (page = 1) {
      this.loading = true
      try {
        if (!this.urls || !this.urls.query) { throw new Error('需要提供Url') }
        const { data } = await this.$axios.post(this.urls.query, {
          searchText: this.keyword,
          limit: this.pagination.size,
          page
        })
        this.tableData = data.data.rows
        this.pagination.total = data.data.total
      } catch (e) {
        console.warn(e.message || e)
      } finally {
        this.loading = false
      }
    },
    cancelDelete () {
      this.selected = false
      this.selectedRows = []
      if (this.$refs.table) { this.$refs.table.clearSelection() }
    },
    async confirmDelete () {
      if (!this.urls || !this.urls.delete) { throw new Error('需要提供Url') }
      if (this.selectedRows.length) {
        try {
          this.loading = true
          const ids = this.selectedRows.map(row => row[this.primaryKey])
          const { data } = await this.$axios.post(this.urls.delete, {
            educationInfoId: ids.join()
          })
          console.table(data)
          this.selected = false
          this.selectedRows = []
          if (this.$refs.table) { this.$refs.table.clearSelection() }
          this.fetch()
        } catch (e) {} finally {
          this.loading = false
        }
      }
    },
    onSearch (e) {
      this.pagination.page = 1
      this.fetch()
    },
    onPageCurrentChange (e) {
      this.fetch(e)
    },
    onPageSizeChange (e) {
      this.pagination.page = 1
      this.pagination.size = e
      this.fetch()
    },
    onDropdown (e) {
      if (e === 'import') {
        this.visibleImportDialog = true
      } else {
        this.visibleImportUpdateDialog = true
      }
    },
    onCreate () {
      this.$bus.$emit('dialog:form', this.dialog.create)
    },
    onUpdate (row) {
      this.$bus.$emit('dialog:form', this.dialog.update)
    },
    onImport () {}
  }
}
</script>

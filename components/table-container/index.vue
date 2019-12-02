<template>
  <div class="sp-container">
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
      <div v-if="!selected" class="handler">
        <t-handler v-for="(item, index) in handlerOptions" :key="index" :item="item" />
      </div>
    </div>
    <div v-loading="loading" class="sp-container__table">
      <el-table
        ref="table"
        :data="tableData"
        :highlightCurrentRow="isHighlightCurrentRow"
        @row-click="onRowClick"
        @selection-change="onSelectionChange"
        v-if="tableFields"
      >
        <el-table-column
          v-if="selected"
          type="selection"
          width="60"
        />
        <el-table-column
          v-for="(item, name) in tableFields"
          :key="name"
          :prop="name"
          v-bind="item"
          :show-overflow-tooltip="true"
        />
        <el-table-column
          :width="60"
          label="操作"
        >
          <template slot-scope="scope">
            <el-button
              @click="openDetail(scope.row)"
              size="mini"
              type="primary"
              class="detail-btn"
              icon="el-icon-arrow-right"
            />
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="sp-container__footer">
      <el-pagination
        :total="pagination.total"
        :page-size="pagination.size"
        :current-page="pagination.page"
        :page-sizes="[10, 20, 30, 50]"
        @size-change="onPageSizeChange"
        @current-change="onPageCurrentChange"
        background
        layout="prev, pager, next, sizes, total"
      />
      <div v-if="selected" class="handler">
        <span>已选择 <span class="is-primary">{{ selectedRows.length }}</span> 条</span>
        <el-button @click="cancelDelete" type="default" size="small" class="is-shadow">取消</el-button>
        <el-button @click="confirmDelete" :disabled="!selectedRows.length" type="primary" size="small" class="is-shadow"><i class="el-icon-delete" /> 确认删除</el-button>
      </div>
    </div>
    <transition name="slide-left">
      <t-detail
        v-if="visibleDetail"
        :url="urls.update"
        :fields="editFields"
        :handler="editHandlerOptions"
        :data.sync="currentRow"
      />
    </transition>
  </div>
</template>
<script>
import THandler from './handler'
import TDetail from './detail'
import defaultHandler from './defaultHandler'
import defaultEditHandler from './defaultEditHandler'
/**
 * 该组件提供常规增删改查
 * 扩展其他功能可通过再次封装实现
 */
export default {
  provide () {
    return {
      parent: this
    }
  },
  components: { TDetail, THandler },
  props: {
    handler: { type: Array, default: () => null },
    editHandler: { type: Array, default: () => null },
    urls: { type: Object, default: () => {} },
    primaryKey: { type: String, default: 'id' },
    tableFields: { type: Object, default: () => {} },
    addFields: { type: Object, default: () => {} },
    editFields: { type: Object, default: () => {} }
  },
  data () {
    return {
      loading: true,
      keyword: '',
      visibleDetail: false,
      isHighlightCurrentRow: false,
      currentRow: {},
      selectedRows: [],
      tableData: [],
      selected: false, // 选择中
      pagination: {
        total: 0,
        page: 1,
        size: 10
      }
    }
  },
  computed: {
    handlerOptions () {
      return this.handler ? this.handler : defaultHandler
    },
    editHandlerOptions () {
      return this.editHandler ? this.editHandler : defaultEditHandler
    }
  },
  watch: {
    visibleDetail (val) {
      this.isHighlightCurrentRow = val
    }
  },
  created () {
    this.fetch()
  },
  methods: {
    async fetch (page = 1) {
      this.loading = true
      try {
        if (!this.urls || !this.urls.list) { throw new Error('需要提供Url') }
        const { data } = await this.$axios.post(this.urls.list, {
          searchText: this.keyword,
          limit: this.pagination.size,
          page
        })
        this.tableData = data.data.rows
        this.pagination.total = data.data.total
      } catch (e) {
        console.error(e.message || e)
      } finally {
        this.loading = false
      }
    },
    async fetchDetail () {
      try {
        const { data } = await this.$axios.post(this.urls.detail, {
          [this.primaryKey]: this.currentRow[this.primaryKey]
        })
        if (data.data) {
          this.currentRow = data.data
        }
      } catch (e) {}
    },
    onRowClick (row) {
      if (this.visibleDetail) {
        this.currentRow = row
        this.fetchDetail()
      }
    },
    openDetail (row) {
      this.visibleDetail = true
    },
    cancelDelete () {
      this.selected = false
      this.selectedRows = []
      this.$refs.table.clearSelection()
    },
    async confirmDelete () {
      if (!this.urls || !this.urls.delete) { throw new Error('需要提供Url') }
      if (this.selectedRows.length) {
        try {
          const ids = this.selectedRows.map(row => row[this.primaryKey])
          const { data } = await this.$axios.post(this.urls.delete, {
            educationInfoId: ids.join()
          })
          console.table(data)
          this.selected = false
          this.selectedRows = []
          this.$refs.table.clearSelection()
          this.fetch()
        } catch (e) {} finally {
        }
      }
    },
    onSearch (e) {
      this.pagination.page = 1
      this.fetch()
    },
    onSelectionChange (e) {
      this.selectedRows = e
    },
    openAddDialog () {
      try {
        if (!this.urls || !this.urls.add) { throw new Error('需要提供Url') }
        let isFetch = false
        this.$bus.$emit('dialog:insert', {
          title: '新增教育经历',
          fields: this.addFields,
          url: this.urls.add,
          showCancelButton: false,
          showConfirmNextButton: true,
          callback: (e) => {
            if (e === 'confirm') {
              this.fetch()
            } else if (e === 'next') {
              isFetch = true
            } else if (isFetch) { this.fetch() }
          }
        })
      } catch (e) {
        console.error(e.message || e)
      }
    },
    onPageCurrentChange (e) {
      this.fetch(e)
    },
    onPageSizeChange (e) {
      this.pagination.page = 1
      this.pagination.size = e
      this.fetch()
    }
  }
}
</script>

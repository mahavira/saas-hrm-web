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
      <div v-if="!deleting" class="handler">
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
          v-if="deleting"
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
        background
        layout="prev, pager, next, sizes, total"
      />
      <div v-if="deleting" class="handler">
        <span>已选择 <span class="is-primary">{{ selectedRows.length }}</span> 条</span>
        <el-button @click="cancelDelete" type="default" size="small" class="is-shadow">取消</el-button>
        <el-button @click="confirmDelete" :disabled="!selectedRows.length" type="primary" size="small" class="is-shadow"><i class="el-icon-delete" /> 确认删除</el-button>
      </div>
    </div>
    <transition name="slide-left">
      <div v-if="visibleDetail" class="sp-container__detail">
        <div class="header">
          <div>
            <el-button @click="closeDetail" class="back" size="small" icon="el-icon-arrow-right" />
          </div>
          <div v-if="!editing">
            <t-handler v-for="(item, index) in editHandlerOptions" :key="index" :item="item" />
          </div>
        </div>
        <el-scrollbar class="body is-vertical">
          <t-detail :data="currentRow" :formMeta="editFields" :editing="editing" />
        </el-scrollbar>
        <div v-if="editing" class="footer">
          <el-button @click="cancelEdit" type="default" size="small" class="is-shadow">取消</el-button>
          <el-button @click="onSave" :loading="loading" type="primary" size="small" class="is-shadow">保存</el-button>
        </div>
      </div>
    </transition>
  </div>
</template>
<script>
import TDetail from './detail'
import THandler from './handler'

const defaultHandler = [{
  type: 'button',
  color: 'primary',
  icon: 'el-icon-plus',
  handler: 'ADD',
  label: '新 增'
}, {
  type: 'dropdown',
  color: 'default',
  icon: 'el-icon-plus',
  handler: 'DROPDOWN',
  label: '批量操作',
  options: [{
    label: '批量删除',
    value: 'DELETE'
  }, {
    label: '批量更新',
    value: 'UPDATE'
  }]
}]
const defaultEditHandler = [{
  type: 'button',
  color: 'default',
  icon: 'el-icon-edit',
  handler: 'EDIT',
  label: '快速编辑'
}]

export default {
  inject: ['$app'],
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
      deleting: false, // 删除中
      editing: false, // 编辑中
      pagination: {
        total: 0,
        page: 0,
        size: 15
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
      this.editing = false
    }
  },
  created () {
    this.fetch()
    console.log(this)
    // this.$store.dispatch('dict/fetch', 'degree_type')
    // this.$store.dispatch('dict/fetch', 'education')
    // this.$store.dispatch('dict/fetch', 'learning_way')
  },
  methods: {
    async fetch () {
      this.loading = true
      try {
        if (!this.urls || !this.urls.list) { throw new Error('需要提供Url') }
        const { data } = await this.$axios.post(this.urls.list, {
          limit: 10,
          page: 1
        })
        this.tableData = data.data.rows
        this.pagination.total = data.data.total
      } catch (e) {
        console.error(e.message)
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
    closeDetail () {
      this.visibleDetail = false
    },
    openDetail (row) {
      this.visibleDetail = true
    },
    cancelDelete () {
      this.deleting = false
      this.selectedRows = []
      this.$refs.table.clearSelection()
    },
    confirmDelete () {
      this.deleting = false
      this.selectedRows = []
      this.$refs.table.clearSelection()
    },
    onSearch (e) {
      console.log(e)
    },
    onSelectionChange (e) {
      this.selectedRows = e
    },
    onEdit () {
      this.editing = true
    },
    cancelEdit () {
      this.editing = false
    },
    onSave () {
      this.save()
    },
    async save () {
      const formData = Object.assign({}, this.formData)
      this.loading = true
      try {
        await this.$axios.post(this.urls.update, formData)
        this.editing = false
      } catch (e) {} finally {
        this.loading = false
      }
    },
    openAddDialog () {
      try {
        if (!this.urls || !this.urls.add) { throw new Error('需要提供Url') }
        this.$bus.$emit('dialog:insert', {
          fields: this.addFields,
          url: this.urls.add,
          callback (e) {
            if (e === 'confirm') {
              this.fetch()
            }
          }
        })
      } catch (e) {
        console.error(e.message || e)
      }
    }
  }
}
</script>

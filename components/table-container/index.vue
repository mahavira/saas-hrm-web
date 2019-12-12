<template>
  <div class="sp-container">
    <div v-if="!hideHeader" class="sp-filter">
      <div class="search">
        <el-input
          v-model="keyword"
          @keyup.enter.native="onSearch"
          :placeholder="searchPlaceholder || '请输入搜索关键词'"
          size="small"
          suffix-icon="icon-ico_Search"
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
          v-for="(item,name) in tableFields"
          :key="name"
          :prop="name"
          :show-overflow-tooltip="true"
          v-bind="item"
        >
          <template slot-scope="scope">
            <span v-if="name!=='handler'" :class="item['cell-class-name']" v-html="formatter(scope, item)" />
            <a
              v-else
              :class="item['cell-class-name']"
              v-for="(action,index) in item.actions"
              :key="index"
              @click="openDetail(scope.row)"
              href="javascript:;"
              class="handler-icon is-primary"
            >
              <i class="icon-ico_next2" />
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
import getConf from '~/config/mods'
import { isString, isArray, isObject } from '~/utils'

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
  data () {
    const conf = getConf(this.$route.path)
    return {
      tableFields: null,
      searchPlaceholder: '',
      hideHeader: false,
      loading: true,
      keyword: '',
      visibleDetail: false,
      isHighlightCurrentRow: false,
      currentRow: {},
      selectedRows: [],
      tableData: [],
      selected: false, // 选择中
      edited: false,
      pagination: {
        total: 0,
        page: 1,
        size: 10
      },
      pageSizes: [10, 20, 30, 50],
      opts: {},
      ...conf
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
    this.setOpts(this.tableFields)
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
    async fetchDetail () {
      try {
        const { data } = await this.$axios.post(this.urls.read, {
          [this.primaryKey]: this.currentRow[this.primaryKey]
        })
        if (data.data) {
          this.currentRow = data.data
        }
      } catch (e) {}
    },
    setOpts (fields) {
      if (!fields) { return }
      Object.keys(fields).forEach((name) => {
        const item = fields[name]
        if (isString(item.options) && item.options) {
          const opts = this.$store.state.dict[item.options]
          if (opts && Object.keys(opts).length) {
            this.$set(this.opts, name, opts)
          } else {
            this.$store.dispatch('dict/fetch', item.options).then(() => {
              this.$set(this.opts, name, this.$store.state.dict[item.options])
            })
          }
        } else if (isArray(item.options)) {
          this.$set(this.opts, name, item.options)
        } else if (isObject(item.options)) {
          this.$set(this.opts, name, item.options)
        }
      })
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
    onSelectionChange (e) {
      this.selectedRows = e
    },
    onPageCurrentChange (e) {
      this.fetch(e)
    },
    onPageSizeChange (e) {
      this.pagination.page = 1
      this.pagination.size = e
      this.fetch()
    },
    formatter ({ row, column, $index }, item) {
      const { property } = column
      const value = row[property]
      if (item.options) {
        if (this.opts[property] && this.opts[property][value]) {
          return this.opts[property][value]
        }
      }
      if (item.formatter) {
        return item.formatter(row)
      }
      return value
    }
  }
}
</script>

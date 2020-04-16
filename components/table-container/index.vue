<template>
  <div class="sp-container is-flex-column">
    <div v-if="!hideHeader" class="sp-filter">
      <div class="search">
        <el-input
          v-model="keyword"
          @keyup.enter.native="onSearch"
          :placeholder="searchPlaceholder || '请输入搜索关键词'"
          size="small"
        >
          <el-button slot="append" @click="onSearch" icon="el-icon-search" />
        </el-input>
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
        v-scroll-bar:el-table
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
            <div v-if="item.formType" @click.stop="">
              <!-- eslint-disable vue/require-component-is -->
              <component :is="FormItemComps[item.formType]" :data="scope.row" :value.sync="scope.row[name]" v-bind="item" />
            </div>
            <span v-else-if="name!=='handler'" :class="item['cell-class-name']" v-html="formatter(scope, item)" />
            <a
              v-else
              :class="item['cell-class-name']"
              v-for="(action,index) in item.actions"
              :key="index"
              @click.native.stop="openDetail(scope.row)"
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
          <el-button @click="cancelSelectedRows" type="default" size="small" class="is-cancel">取消</el-button>
          <el-button
            @click="confirmSelectedRows"
            :disabled="!selectedRows.length"
            :loading="loading"
            type="primary"
            size="small"
            class="is-shadow"
          >
            <i class="icon-ico_delete" /> 确认
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
import FormItem from '../form-item'
import THandler from './handler'
import TDetail from './detail'
import defaultHandler from './defaultHandler'
import defaultEditHandler from './defaultEditHandler'
import { isString, isArray, isObject, isFunction, toBooble } from '~/utils'
import * as formtype from '~/constant/FORMITEM_TYPE'

const props = {
  urls: { type: Object, default: () => {} },
  primaryKey: { type: String, default: 'id' },
  tableFields: { type: Object, default: () => {} },
  editFields: { type: Object, default: () => {} },
  dialog: { type: Object, default: () => {} },
  handler: { type: Array, default: () => [] },
  editHandler: { type: Array, default: () => [] },
  searchPlaceholder: { type: String, default: '' }
}
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
  props,
  data () {
    return {
      FormItemComps: FormItem,
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
      formtype
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
    formatterData (rows) {
      const filterItems = []
      Object.keys(this.tableFields).forEach((key) => {
        const field = this.tableFields[key]
        if (field.formType && field.formType === formtype.SWITCH) {
          filterItems.push(key)
        }
      })
      return rows.map((obj) => {
        filterItems.forEach((k) => {
          obj[k] = toBooble(obj[k])
        })
        return obj
      })
    },
    async fetch (page = 1) {
      this.loading = true
      try {
        let url
        let formdata = {}
        if (!this.urls || !this.urls.query) { throw new Error('需要提供Url') }
        if (isFunction(this.urls.query)) {
          const res = this.urls.query()
          url = res.url
          formdata = res.data
        } else if (isObject(this.urls.query)) {
          url = this.urls.query.url
          formdata = this.urls.query.data
        } else {
          url = this.urls.query
        }
        const { data } = await this.$axios.post(url, {
          searchText: this.keyword,
          limit: this.pagination.size,
          page,
          ...formdata
        })
        if (this.tableFields) {
          this.tableData = this.formatterData(data.data.rows)
        } else {
          this.tableData = data.data.rows
        }
        this.pagination.total = data.data.total
      } catch (e) {
        console.warn(e.message || e)
      } finally {
        this.loading = false
      }
    },
    async fetchDetail () {
      if (!this.urls.read) { return }
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
          const opts = this.$store.getters['dict/g'](item.options)
          if (opts && Object.keys(opts).length) {
            this.$set(this.opts, name, opts)
          } else {
            this.$store.dispatch('dict/fetch', item.options).then(() => {
              this.$set(this.opts, name, this.$store.getters['dict/g'](item.options))
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
      this.visibleDetail = true
      this.currentRow = row
      this.fetchDetail()
    },
    openDetail (row) {
      this.visibleDetail = true
    },
    cancelSelectedRows () {
      this.selected = false
      this.selectedRows = []
      if (this.$refs.table) { this.$refs.table.clearSelection() }
    },
    async confirmSelectedRows () {
      if (this.selectAfter) {
        this.selectAfter(this.selectedRows)
        this.selectAfter = null
        return
      }
      if (!this.urls || !this.urls.delete) { throw new Error('需要提供Url') }
      if (this.selectedRows.length) {
        try {
          this.loading = true
          let url, formdata
          if (this.selectedFunc) {
            const res = this.selectedFunc(this.selectedRows)
            url = res.url
            formdata = res.data
          } else if (isFunction(this.urls.delete)) {
            const res = this.urls.delete(this.selectedRows)
            url = res.url
            formdata = res.data
          } else {
            const ids = this.selectedRows.map(row => row[this.primaryKey])
            url = this.urls.delete
            formdata = {
              ids: ids.join()
            }
          }
          const { data } = await this.$axios.post(url, formdata)
          console.table(data)
          this.selected = false
          this.selectedRows = []
          this.selectedFunc = null
          if (this.$refs.table) { this.$refs.table.clearSelection() }
          this.fetch()
        } catch (e) {
          console.error(e)
        } finally {
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
        return item.formatter(row, this)
      }
      return value
    }
  }
}
</script>

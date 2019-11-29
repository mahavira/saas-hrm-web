<template>
  <div>
    <div class="sp-container__filter">
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
        <el-button @click="onAdd" type="primary" class="is-shadow" size="small"><i class="el-icon-plus" /> 新 增</el-button>
        <el-button @click="onDelete" type="default" class="is-shadow" size="small"><i class="el-icon-delete" /> 批量删除</el-button>
        <el-dropdown>
          <el-button size="small" class="is-shadow">批量操作 <i class="el-icon-arrow-down el-icon--right" /></el-button>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>批量删除</el-dropdown-item>
            <el-dropdown-item>批量更新</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>
    <div v-loading="loading" class="sp-container__table">
      <el-table
        ref="table"
        :data="tableData"
        :highlightCurrentRow="highlightCurrentRow"
        @row-click="onRowClick"
        @selection-change="onSelectionChange"
        v-if="tableFields"
      >
        <el-table-column
          v-if="currentStatus===status.DELETE"
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
        :total="1000"
        background
        layout="prev, pager, next, sizes, total"
      />
      <div v-if="currentStatus===status.DELETE" class="handler">
        <span>已选择 <span class="is-primary">{{ selecteds.length }}</span> 条</span>
        <el-button @click="onCancelDelete" type="default" size="small" class="is-shadow">取消</el-button>
        <el-button @click="onConfirmDelete" :disabled="!selecteds.length" type="primary" size="small" class="is-shadow"><i class="el-icon-delete" /> 确认删除</el-button>
      </div>
    </div>
    <transition name="slide-left">
      <comp-detail v-if="visibleDetail" :visible.sync="visibleDetail" :data="currentData" />
    </transition>
    <comp-add :visible.sync="visibleAddDialog" />
  </div>
</template>
<script>
import compDetail from './detail'
import compAdd from './add.vue'
import { getConf } from './conf'

const status = {
  DELETE: 'DELETE',
  UPDATE: 'UPDATE',
  ADD: 'ADD'
}

export default {
  components: { compDetail, compAdd },
  data () {
    return {
      keyword: '',
      tableData: [],
      visibleDetail: false,
      visibleAddDialog: false,
      highlightCurrentRow: false,
      currentData: {},
      status,
      currentStatus: '',
      selecteds: [],
      loading: true
    }
  },
  computed: {
    tableFields () {
      const type = this.$route.params.type
      return getConf(type, 'tableFields')
    }
  },
  watch: {
    visibleDetail (val) {
      this.highlightCurrentRow = val
    },
    $route: {
      handler () {
        this.fetch()
      },
      immediate: true
    }
  },
  created () {
    this.$store.dispatch('dict/fetch', 'degree_type')
    this.$store.dispatch('dict/fetch', 'education')
    this.$store.dispatch('dict/fetch', 'learning_way')
  },
  methods: {
    async fetch () {
      this.loading = true
      // const type = this.$route.params.type
      const { data } = await this.$axios.post('/hrEducationInfo/list', {
        limit: 10,
        page: 1
      })
      this.tableData = data.data.rows
      this.loading = false
    },
    openDetail (row) {
      this.visibleDetail = true
      this.highlightCurrentRow = true
      this.currentData = row
    },
    onRowClick (row) {
      if (this.visibleDetail) {
        this.openDetail(row)
      }
    },
    onAdd () {
      this.visibleAddDialog = true
    },
    onDelete () {
      this.currentStatus = status.DELETE
    },
    onCancelDelete () {
      this.currentStatus = ''
      this.selecteds = []
      this.$refs.table.clearSelection()
    },
    onConfirmDelete () {
      this.currentStatus = ''
      this.selecteds = []
      this.$refs.table.clearSelection()
    },
    onSearch (e) {
      console.log(e)
    },
    onSelectionChange (e) {
      this.selecteds = e
    }
  }
}
</script>
<style lang="scss" scoped>

</style>

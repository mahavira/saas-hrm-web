<template>
  <div class="container" v-loading="loading">
      <el-table :data="tableData">
        <el-table-column prop="contactName" label="联系人姓名" />
        <el-table-column prop="contactRelationship" label="联系人关系" />
        <el-table-column prop="contactTel" label="联系人电话" />
        <el-table-column prop="isPrimaryContact":formatter="formatter" label="是否主要联系人" />
        <el-table-column prop="contactAddress" label="联系人地址" />
      </el-table>
  </div>
</template>
<script>
import { toBooble } from '~/utils'
export default {
  data () {
    return {
      loading: true,
      tableData: [],
      pagination: {
        page: 1,
        limit: 10
      }
    }
  },
  created () {
    this.fetch()
  },
  methods: {
    async fetch() {
      this.loading = true
      try {
        const { data } = await this.$axios.post('/hrTaUrgentContact/list', {
          tenantId: this.$route.params.id,
          searchText: this.keyword,
          limit: this.pagination.size,
          page: this.pagination.page
        })
        if (data.status === 200 || data.status === 0) {
          this.tableData = data.data.rows
        } else {
          throw new Error(data.message)
        }
      } finally {
        this.loading = false
      }
    },
    formatter(row, { property }, cellValue) {
      if (property === 'birthday') return this.$moment(cellValue).format('YYYY-MM-DD')
      else if (property === 'isPrimaryContact') return toBooble(cellValue) ? '是' : '否'
    }
  }
}
</script>
<style scoped lang="scss">

</style>
